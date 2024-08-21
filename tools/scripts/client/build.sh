#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir/client" && exec npm run bundle)
(cd "$rootDir/client" && exec npm run codegen)
(cd "$rootDir/client" && exec npm run build)
