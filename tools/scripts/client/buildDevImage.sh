#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

repository=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used.\033[0m"
    repository=myshx # my repository at DockerHub
fi

imageTag=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo image tag provided. Latest will be used.\033[0m"
    imageTag=latest
fi

imageFullName=$repository/muse-client-dev:$imageTag

echo [MUSE CLIENT DEV STARTING] building "$imageFullName"...

echo [MUSE CLIENT DEV] remove old image "$imageFullName"...

# Check if the image exists before attempting to remove it
if docker images -q "$imageFullName" &> /dev/null; then
  echo [MUSE CLIENT DEV] remove old image "$imageFullName"...
  docker rmi -f "$imageFullName"
fi

echo [MUSE CLIENT DEV] creating docker image "$imageFullName"...
(DOCKER_BUILDKIT=1 docker buildx build \
  --platform linux/arm64,linux/amd64 \
  -f "${rootDir}/client/Dockerfile.dev" \
  -t "$imageFullName" \
  "$rootDir" \
  --push)

echo -e "\033[0;32m[MUSE CLIENT DEV FINISHED] image '$imageFullName' has been built.\033[0m"
#  --platform linux/amd64,linux/arm64 \