#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir" && ./tools/scripts/openapi/regenerateOpenApi.sh)
(cd "$rootDir/client" && exec npm run build)
