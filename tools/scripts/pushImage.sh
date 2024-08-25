#!/bin/bash
set -e

repository=$1
imageName=$2
imageTag=$3

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used."
    repository=myshx # my repository at DockerHub
fi

if [ -z "$2" ]
  then
    echo -e "\033[0;31mNo image name provided. Can not continue."
    exit 1
fi

if [ -z "$3" ]
  then
    echo -e "\033[0;33mNo imageTag provided. Latest will be used."
    imageTag=latest
fi

imageFullName=$imageName:$imageTag
dockerHubImageFullName=$repository/$imageFullName

(docker tag "$imageFullName" "$dockerHubImageFullName")
(docker push "$dockerHubImageFullName")
