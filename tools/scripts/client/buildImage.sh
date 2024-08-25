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

imageFullName=muse-client:$imageTag

echo [MUSE CLIENT STARTING] building "$imageFullName"...

echo [MUSE CLIENT] remove old image "$imageFullName"...

# Check if the image exists before attempting to remove it
if docker images -q "$imageFullName" &> /dev/null; then
  echo [MUSE CLIENT] remove old image "$imageFullName"...
  docker rmi -f "$imageFullName"
fi

echo [MUSE CLIENT] creating docker image "$imageFullName"...
(docker build -f "${rootDir}/client/Dockerfile" -t "$imageFullName" "$rootDir")

echo -e "\033[0;32m[MUSE CLIENT FINISHED] image '$imageFullName' has been built\033[0m"
