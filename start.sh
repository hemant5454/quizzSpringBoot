#!/bin/sh

# Convert DATABASE_URL from postgresql:// to jdbc:postgresql://
if [ -n "$DATABASE_URL" ]; then
  export SPRING_DATASOURCE_URL=$(echo $DATABASE_URL | sed 's/^postgresql:/jdbc:postgresql:/')
  echo "Converted DATABASE_URL to SPRING_DATASOURCE_URL: $SPRING_DATASOURCE_URL"
fi

# Start the application
exec java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar app.jar
