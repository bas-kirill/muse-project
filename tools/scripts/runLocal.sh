#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

(cd "$rootDir" && exec ./tools/scripts/stop.sh)
(cd "$rootDir" && exec ./tools/scripts/clean.sh)
(cd "$rootDir" && exec ./tools/scripts/buildAndPush.sh)
(cd "$rootDir" && exec ./tools/scripts/run.sh)

echo -e "\033[0;32mList of available ports:\n\033[0m"
(cd "$rootDir" && exec cat ./tools/docker/env/local.env)
