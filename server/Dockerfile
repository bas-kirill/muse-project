FROM openjdk:21-jdk

WORKDIR /app

# https://github.com/vishnubob/wait-for-it
COPY ../tools/docker/wait-for-it.sh wait-for-it.sh
COPY ../tools/docker/docker-entrypoint.sh docker-entrypoint.sh
COPY ./server/app/build/libs/*.jar app.jar

# use with postgres: ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["java", "-jar", "./app.jar"]
