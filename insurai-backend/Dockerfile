# Use Eclipse Temurin JDK 21 (Alpine version for smaller image)
FROM eclipse-temurin:21-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy Maven build output (your JAR) into the container
COPY target/*.jar app.jar

# Expose port for Render deployment
EXPOSE 8080

# Set environment variable (Render uses dynamic PORT)
ENV PORT=8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
