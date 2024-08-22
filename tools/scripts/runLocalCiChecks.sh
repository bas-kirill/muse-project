#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

(cd "$rootDir" && exec ./tools/scripts/openapi/runLinter.sh)

(cd "$rootDir" && exec ./tools/scripts/client/runLinterFix.sh)
(cd "$rootDir" && exec ./tools/scripts/client/runStaticAnalyzer.sh)

(cd "$rootDir" && exec ./tools/scripts/server/runUnitTests.sh)
(cd "$rootDir" && exec ./tools/scripts/server/runLinter.sh)
(cd "$rootDir" && exec ./tools/scripts/server/runStaticAnalyzer.sh)
