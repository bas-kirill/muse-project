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

imageFullName=muse-server:$imageTag

echo [MUSE SERVER STARTING] building "$imageFullName"...

echo [MUSE SERVER] remove old image "$imageFullName"...

# Check if the image exists before attempting to remove it
if docker images -q "$imageFullName" &> /dev/null; then
  echo [MUSE SERVER] remove old image "$imageFullName"...
  docker rmi -f "$imageFullName"
fi

echo [MUSE SERVER] creating docker image "$imageFullName"...
(docker build -f "${rootDir}/server/Dockerfile" -t "$imageFullName" "$rootDir")

echo -e "\033[0;32m[MUSE SERVER FINISHED] image '$imageFullName' has been built.\033[0m"
