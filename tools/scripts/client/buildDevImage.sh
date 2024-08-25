#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

imageTag=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo image tag provided. Latest will be used."
    imageTag=latest
fi

imageFullName=muse-client-dev:$imageTag

echo [MUSE CLIENT DEV STARTING] building "$imageFullName"...

echo [MUSE CLIENT DEV] remove old image "$imageFullName"...

# Check if the image exists before attempting to remove it
if docker images -q "$imageFullName" &> /dev/null; then
  echo [MUSE CLIENT DEV] remove old image "$imageFullName"...
  docker rmi -f "$imageFullName"
fi

echo [MUSE CLIENT DEV] creating docker image "$imageFullName"...
(docker build -f "${rootDir}/client/Dockerfile.dev" -t "$imageFullName" "$rootDir")

echo -e "\033[0;32m[MUSE CLIENT DEV FINISHED] image '$imageFullName' has been built.\033[0m"
