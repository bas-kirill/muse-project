#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

stage=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo stage provided. 'LOCAL' stage will be used."
    stage="local"
fi

(cd "$rootDir/server" && exec ./gradlew clean)
(cd "")
(cd "$rootDir" && exec docker compose \
  -f ./tools/docker/docker-compose.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
   down -v)
(cd "$rootDir" && exec docker compose \
   -f ./tools/docker/docker-compose.yml \
   --env-file ./tools/docker/env/$stage.env \
   --project-name=muse-$stage \
   rm -f)
