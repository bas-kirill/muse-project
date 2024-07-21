#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

(cd "$rootDir" && exec ./tools/scripts/clean.sh)
(cd "$rootDir" && exec ./tools/scripts/run.sh)

printf 'List of available ports:\n'
(cd "$rootDir" && exec cat ./tools/docker/env/local.env)
