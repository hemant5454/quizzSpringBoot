#!/bin/sh

# Parse DATABASE_URL and extract components
if [ -n "$DATABASE_URL" ]; then
  # Extract username (part between :// and :)
  SPRING_DATASOURCE_USERNAME=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
  export SPRING_DATASOURCE_USERNAME

  # Extract password (part between : and @)
  SPRING_DATASOURCE_PASSWORD=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
  export SPRING_DATASOURCE_PASSWORD

  # Extract host and database, convert to JDBC URL
  SPRING_DATASOURCE_URL=$(echo "$DATABASE_URL" | sed 's/postgresql:\/\/[^@]*@/jdbc:postgresql:\/\//')
  export SPRING_DATASOURCE_URL

  echo "Database configuration set from DATABASE_URL"
  echo "JDBC URL: $SPRING_DATASOURCE_URL"
  echo "Username: $SPRING_DATASOURCE_USERNAME"
fi

# Start the application
exec java -Dspring.profiles.active=prod -Dserver.port="$PORT" -jar app.jar

