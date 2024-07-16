#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

(cd "$rootDir/server" && exec ./gradlew clean)
(cd "$rootDir" && exec docker-compose -f ./tools/docker/docker-compose.yaml --env-file \
        ./tools/docker/env/local.env --project-name=muse down -v)
(cd "$rootDir" && exec docker-compose -f ./tools/docker/docker-compose.yaml --env-file \
        ./tools/docker/env/local.env --project-name=muse rm -f)
