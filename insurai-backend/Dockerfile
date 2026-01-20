# Stage 1: Build the JAR inside a Maven container
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Build the Spring Boot JAR
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight runtime image
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port for Render
EXPOSE 8080
ENV PORT=8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
