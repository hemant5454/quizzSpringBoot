#!/bin/sh

# Parse DATABASE_URL and extract components
# Expected format: postgresql://username:password@host:port/database
if [ -n "$DATABASE_URL" ]; then
  echo "Original DATABASE_URL: $DATABASE_URL"

  # Extract username (part between :// and first :)
  SPRING_DATASOURCE_USERNAME=$(echo "$DATABASE_URL" | sed 's|postgresql://||' | cut -d: -f1)
  export SPRING_DATASOURCE_USERNAME

  # Extract password (part between first : and @)
  SPRING_DATASOURCE_PASSWORD=$(echo "$DATABASE_URL" | sed 's|postgresql://||' | cut -d: -f2 | cut -d@ -f1)
  export SPRING_DATASOURCE_PASSWORD

  # Extract host/port/database (part after @)
  DB_HOST=$(echo "$DATABASE_URL" | cut -d@ -f2)

  # Build JDBC URL
  SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}"
  export SPRING_DATASOURCE_URL

  echo "Parsed database configuration:"
  echo "  JDBC URL: $SPRING_DATASOURCE_URL"
  echo "  Username: $SPRING_DATASOURCE_USERNAME"
  echo "  Password: [hidden]"
fi

# Start the application
exec java -Dspring.profiles.active=prod -Dserver.port="$PORT" -jar app.jar

