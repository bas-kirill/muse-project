#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

stage=$1

if [ -z "$1" ]; then
  stage="local"
  echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
fi

repository=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33m[$stage] No Docker Hub username provided. 'myshx' will be used.\033[0m"
    repository=myshx # my repository at DockerHub
fi

imageFullName="$repository/muse-client:$stage-$(git rev-parse --short HEAD)"

echo "[MUSE CLIENT STARTING] building '$imageFullName'..."

echo [MUSE CLIENT] remove old image "$imageFullName"...

# Check if the image exists before attempting to remove it
if docker images -q "$imageFullName" &> /dev/null; then
  echo [MUSE CLIENT] remove old image "$imageFullName"...
  docker rmi -f "$imageFullName"
fi

echo [MUSE CLIENT] creating docker image "$imageFullName"...
(DOCKER_BUILDKIT=1 docker buildx build \
  --no-cache \
  -f "${rootDir}/client/Dockerfile" \
  -t "$imageFullName" \
  "$rootDir" \
  --push)

echo -e "\033[0;32m[MUSE CLIENT FINISHED] image '$imageFullName' has been built.\033[0m"
