#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir/openapi" && exec rm -rf ./openapi.yml)
(cd "$rootDir/openapi" && exec redocly join \
  ./specs/common/ServerError.yml \
  ./specs/login/BasicLoginEndpointApi.yml \
  ./specs/profile/GetProfileApi.yml \
  ./specs/instrument/components/InstrumentDetail.yml \
  ./specs/instrument/components/GetInstrumentByCriteriaRequestBody.yml \
  ./specs/instrument/GetInstrumentsByCriteriaApi.yml \
  ./specs/instrument/GetInstrumentsByCriteriaPaginatedApi.yml \
  ./specs/instrument/GetInstrumentById.yml \
  ./specs/instrument/GetInstrumentTypes.yml \
  ./specs/registration/UserRegistration.yml \
  -o ./openapi.yml
)
(cd "$rootDir/client" && rm -rf ./src/generated)
(cd "$rootDir/client" &&
  mkdir -p ./src/generated &&
  touch ./src/generated/index.ts &&
  touch ./src/generated/base.ts &&
  touch ./src/generated/common.ts &&
  touch ./src/generated/api.ts &&
  touch ./src/generated/configuration.ts &&
  touch ./src/generated/git_push.sh &&
  touch ./src/generated/.gitignore &&
  touch ./src/generated/.npmignore &&
  touch ./src/generated/.openapi-generator-ignore
)
(cd "$rootDir" && exec docker run \
    --rm \
    -v "${PWD}/openapi:/local/openapi" \
    -v "${PWD}/client/src/generated:/local/client/src/generated" \
    openapitools/openapi-generator-cli:v7.8.0 generate \
    --input-spec /local/openapi/openapi.yml \
    --output /local/client/src/generated \
    --generator-name typescript-axios \
    --additional-properties=apiPackage=api,modelPackage=model,supportsES6=true,withSeparateModelsAndApi=true
)
(cd "$rootDir/server" && ./gradlew clean)
(cd "$rootDir/server" && exec ./gradlew openApiGenerate)
