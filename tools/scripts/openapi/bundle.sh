#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir/openapi" && exec rm -rf ./openapi.yml)
(cd "$rootDir/openapi" && exec redocly join ./specs/**/*.yml -o ./openapi.yml)
