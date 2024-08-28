#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir" && npx prettier . --check)
(cd "$rootDir" && npx prettier . --write)
