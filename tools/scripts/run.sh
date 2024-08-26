#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

stage=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
    stage="local"
fi

profile=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo Docker Profile provided. 'dev' stage will be used.\033[0m"
    profile="dev"
fi

(cd "$rootDir" && exec docker compose \
  -f ./tools/docker/docker-compose.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
  --profile "$profile" \
  up -d \
  --remove-orphans)

echo -e "\033[0;32mDocker Serviced has been started.\n\033[0m"
