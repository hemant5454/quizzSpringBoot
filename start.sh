#!/bin/sh

# Parse DATABASE_URL and extract components
# Format: postgresql://username:password@host:port/database
if [ -n "$DATABASE_URL" ]; thensss
  # Extract username
  export SPRING_DATASOURCE_USERNAME=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')

  # Extract password
  export SPRING_DATASOURCE_PASSWORD=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')

  # Extract host and database, then format as JDBC URL
  export SPRING_DATASOURCE_URL=$(echo $DATABASE_URL | sed 's/postgresql:\/\/[^@]*@/jdbc:postgresql:\/\//')

  echo "Database configuration set from DATABASE_URL"
  echo "JDBC URL: $SPRING_DATASOURCE_URL"
  echo "Username: $SPRING_DATASOURCE_USERNAME"
fi

# Start the application
exec java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar app.jar
