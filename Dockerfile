# Dockerfile (runtime-only)

# Берём готовый JRE для Java 17
FROM eclipse-temurin:17-jre

WORKDIR /app

# Копируем уже собранный JAR из локальной папки target
COPY target/HappyHouse-0.0.1-SNAPSHOT.jar app.jar

# Открываем порт
EXPOSE 8080

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
