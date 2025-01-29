# Étape 1 : Construire l'application avec Maven
FROM maven:3.8.6 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml et télécharger les dépendances
COPY pom.xml .
RUN mvn dependency:go-offline

# Copier le reste de l'application (y compris les fichiers de configuration)
COPY src ./src

# Construire l'application avec une nouvelle version du .jar
RUN mvn clean package -DskipTests

# Étape 2 : Exécuter l'application avec OpenJDK
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le jar construit depuis l'étape précédente
COPY --from=build /app/target/*.jar app.jar

# Copier la configuration (application.yml)
COPY src/main/resources/application.properties /app/application.properties

# Exposer le port 9090
EXPOSE 9090

# Démarrer l'application Spring Boot
CMD ["java", "-jar", "app.jar"]

