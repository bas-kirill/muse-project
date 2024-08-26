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

(cd "$rootDir" && exec docker compose \
   -f ./tools/docker/docker-compose.yml \
   --env-file ./tools/docker/env/$stage.env \
   --project-name=muse-$stage \
   down -v)

echo -e "\033[0;32mDocker Service has been stopped.\033[0m"
