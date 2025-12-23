#!/bin/sh

echo "=== Starting application ==="
echo "DATABASE_URL is set: $([ -n "$DATABASE_URL" ] && echo 'YES' || echo 'NO')"
echo "PORT is set: $([ -n "$PORT" ] && echo 'YES' || echo 'NO')"

# Parse DATABASE_URL and extract components
# Expected format: postgresql://username:password@host:port/database
if [ -n "$DATABASE_URL" ]; then
  echo "Parsing DATABASE_URL..."

  # Remove the postgresql:// prefix
  DB_CREDS=$(echo "$DATABASE_URL" | sed 's|^postgresql://||')

  # Extract everything before @ (username:password)
  USER_PASS=$(echo "$DB_CREDS" | cut -d@ -f1)

  # Extract username (before the :)
  SPRING_DATASOURCE_USERNAME=$(echo "$USER_PASS" | cut -d: -f1)
  export SPRING_DATASOURCE_USERNAME

  # Extract password (after the :)
  SPRING_DATASOURCE_PASSWORD=$(echo "$USER_PASS" | cut -d: -f2)
  export SPRING_DATASOURCE_PASSWORD

  # Extract everything after @ (host:port/database)
  DB_HOST=$(echo "$DB_CREDS" | cut -d@ -f2)

  # Build JDBC URL
  SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}"
  export SPRING_DATASOURCE_URL

  echo "Database configuration:"
  echo "  URL: $SPRING_DATASOURCE_URL"
  echo "  User: $SPRING_DATASOURCE_USERNAME"
else
  echo "WARNING: DATABASE_URL not set! Using defaults from application.properties"
fi

# Start the application
echo "Starting Spring Boot application..."
exec java -Dspring.profiles.active=prod -Dserver.port="$PORT" -jar app.jar

