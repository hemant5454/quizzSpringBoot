#!/bin/sh

echo "=== Starting application ==="
echo "DATABASE_URL is set: $([ -n "$DATABASE_URL" ] && echo 'YES' || echo 'NO')"
echo "PORT is set: $([ -n "$PORT" ] && echo 'YES' || echo 'NO')"

# Parse DATABASE_URL and extract components
# Expected format: postgresql://username:password@host:port/database
if [ -n "$DATABASE_URL" ]; then
  echo "Original DATABASE_URL: $DATABASE_URL"

  # Use parameter expansion to parse the URL
  # Remove postgresql:// prefix
  temp="${DATABASE_URL#postgresql://}"

  # Extract username (everything before first :)
  SPRING_DATASOURCE_USERNAME="${temp%%:*}"
  export SPRING_DATASOURCE_USERNAME

  # Remove username and : to get password@host/db
  temp="${temp#*:}"

  # Extract password (everything before @)
  SPRING_DATASOURCE_PASSWORD="${temp%%@*}"
  export SPRING_DATASOURCE_PASSWORD

  # Extract host/port/database (everything after @)
  DB_HOST="${temp#*@}"

  # Build JDBC URL
  SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}"
  export SPRING_DATASOURCE_URL

  echo "Parsed database configuration:"
  echo "  URL: $SPRING_DATASOURCE_URL"
  echo "  User: $SPRING_DATASOURCE_USERNAME"
  echo "  Password length: ${#SPRING_DATASOURCE_PASSWORD}"
else
  echo "WARNING: DATABASE_URL not set! Using defaults from application.properties"
fi

# Start the application
echo "Starting Spring Boot application..."
exec java -Dspring.profiles.active=prod -Dserver.port="$PORT" -jar app.jar

