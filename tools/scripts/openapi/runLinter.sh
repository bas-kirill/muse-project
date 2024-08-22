#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir/openapi" && exec docker run \
  --rm \
  -it \
  -v "$(pwd):/tmp" \
  stoplight/spectral:6.11.1 lint --ruleset "/tmp/.spectral.yml" "/tmp/specs/**/*.yml")
