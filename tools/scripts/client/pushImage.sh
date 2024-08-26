#!/bin/bash
set -e

repository=$1
imageTag=$2

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used.\033[0m"
    repository=myshx # my repository at DockerHub
fi

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo imageTag provided. Latest will be used.\033[0m"
    imageTag=latest
fi

imageFullName=muse-client:$imageTag
dockerHubImageFullName=$repository/muse-client:$imageTag

(docker tag "$imageFullName" "$dockerHubImageFullName")
(docker push "$dockerHubImageFullName")
