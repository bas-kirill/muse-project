#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

# do not runs at CI due to it require long time
(cd "$rootDir/server" && ./gradlew pitest)
