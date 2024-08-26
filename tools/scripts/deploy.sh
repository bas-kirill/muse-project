#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"
gitCommitSha="$(git rev-parse --short HEAD)"

if [ -z "$SSH_HOST" ]; then
    echo "Error: The required environment variable 'SSH_HOST' is not set."
    exit 1
fi

if [ -z "$SSH_PORT" ]; then
    echo "Error: The required environment variable 'SSH_HOST' is not set."
    exit 1
fi

if [ -z "$SSH_USER" ]; then
    echo "Error: The required environment variable 'SSH_USER' is not set."
    exit 1
fi

if [ -z "$SSH_PASS" ]; then
    echo "Error: The required environment variable 'SSH_PASS' is not set."
    exit 1
fi


dockerRepository=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used."
    dockerRepository="myshx"
fi

stage=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo stage provided. 'DEV' stage will be used."
    stage="dev"
fi

dockerTag="$stage-$gitCommitSha"

(cd "$rootDir" && exec ./tools/scripts/clean.sh local)

(cd "$rootDir" && ./tools/scripts/openapi/regenerateOpenApi.sh)

(cd "$rootDir" && exec ./tools/scripts/server/buildJar.sh)
(cd "$rootDir" && exec ./tools/scripts/server/buildImage.sh "$dockerRepository" "$dockerTag")

(cd "$rootDir" && exec ./tools/scripts/client/build.sh)

(cd "$rootDir" && exec ./tools/scripts/client/buildDevImage.sh "$dockerRepository" "$dockerTag")
(cd "$rootDir" && exec ./tools/scripts/client/buildImage.sh "$dockerRepository" "$dockerTag")

sshpass -p "$SSH_PASS" ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" \
  -o UserKnownHostsFile=/dev/null \
  -o StrictHostKeyChecking=no \
  -q \
  env dockerRepository="$dockerRepository" \
  env dockerTag="$dockerTag" \
  env stage="$stage" \
  'bash -s' << 'EOF'
set -e
#
#export dockerRepository="$dockerRepository"
#export stage="$stage"
#export dockerTag="$dockerTag"

echo $dockerRepository
echo $stage
echo $dockerTag
echo $DOCKER_HUB_TOKEN

echo "one"

#docker login -u "$dockerRepository" -p "$DOCKER_HUB_TOKEN"

echo "two"

echo "four"
echo $RANDOM
random_number="$RANDOM"
echo "Debug: random_number is set to: '$random_number'"
echo "Random number: '$random_number'"
muse_project_path="/tmp/muse-project-$random_number"
echo "Project path: '$muse_project_path'"

git clone https://github.com/bas-kirill/muse-project.git "$muse_project_path"
echo "five"
cd "$muse_project_path"
echo "six"

./tools/scripts/clean.sh $stage

echo "seven"

export MUSE_SERVER_IMAGE="$dockerRepository/muse-server:$dockerTag"
export MUSE_CLIENT_IMAGE="$dockerRepository/muse-client:$dockerTag"
export MUSE_CLIENT_DEV_IMAGE="$dockerRepository/muse-client-dev:$dockerTag"

(cd ./tools/docker && docker compose config)

echo "eight"

docker compose \
  -f ./tools/docker/docker-compose.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
  up -d \
  --remove-orphans

echo -e "\033[0;32mList of available ports:\n\033[0m"
cat ./tools/docker/env/$stage.env
EOF

echo -e "\033[0;32mServices has been deployed to '$stage'.\033[0m"
