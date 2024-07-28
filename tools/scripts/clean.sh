#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

(cd "$rootDir/server" && exec ./gradlew clean)
(cd "$rootDir" && exec docker compose -f ./tools/docker/docker-compose.yml --env-file \
        ./tools/docker/env/local.env --project-name=muse-project down -v)
(cd "$rootDir" && exec docker compose -f ./tools/docker/docker-compose.yml --env-file \
        ./tools/docker/env/local.env --project-name=muse-project rm -f)
