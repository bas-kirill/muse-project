FROM openjdk:21

WORKDIR /app

ENV JAVA_TOOL_OPTIONS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005

# https://github.com/vishnubob/wait-for-it
COPY ./server/wait-for-it.sh wait-for-it.sh
COPY ./server/docker-entrypoint.sh docker-entrypoint.sh
COPY ./server/app/build/libs/*.jar app.jar

# use with postgres: ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["java", "-jar", "./app.jar"]
