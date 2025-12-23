# Use Maven image to build the application
FROM maven:3.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use JDK image to run the application
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/target/demo_hemant-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application (using shell form to support environment variables)
CMD java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar app.jar
