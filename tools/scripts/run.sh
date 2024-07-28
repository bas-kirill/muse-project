#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

(cd "$rootDir" && exec ./tools/scripts/clean.sh)

(cd "$rootDir" && exec ./tools/scripts/server/buildJar.sh)
(cd "$rootDir" && exec ./tools/scripts/server/buildImage.sh)

(cd "$rootDir" && exec ./tools/scripts/client/build.sh)
(cd "$rootDir" && exec ./tools/scripts/client/buildDevImage.sh)
(cd "$rootDir" && exec ./tools/scripts/client/buildImage.sh)

(cd "$rootDir" && exec docker compose \
  -f ./tools/docker/docker-compose.yml \
  --env-file ./tools/docker/env/local.env \
  --project-name=muse \
  up -d \
  --remove-orphans)

printf 'List of available ports:\n'
(cd "$rootDir" && exec cat ./tools/docker/env/local.env)
