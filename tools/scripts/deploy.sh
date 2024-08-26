#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

if [ -z "$SSH_HOST" ]; then
    echo -e "\033[0;31mError: The required environment variable 'SSH_HOST' is not set.\033[0m"
    exit 1
fi

if [ -z "$SSH_PORT" ]; then
    echo -e "\033[0;31mError: The required environment variable 'SSH_HOST' is not set.\033[0m"
    exit 1
fi

if [ -z "$SSH_USER" ]; then
    echo -e "\033[0;31mError: The required environment variable 'SSH_USER' is not set.\033[0m"
    exit 1
fi

if [ -z "$SSH_PASS" ]; then
    echo -e "\033[0;31mError: The required environment variable 'SSH_PASS' is not set.\033[0m"
    exit 1
fi

function finish {
    echo "Script finished. Executing final command."
    docker context use default
}

trap 'finish' EXIT


stage=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo stage provided. 'DEV' stage will be used.\033[0m"
    stage="dev"
fi

dockerRepository=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used.\033[0m"
    dockerRepository="myshx"
fi

dockerTag="$stage-$(git rev-parse --short HEAD)"
(cd "$rootDir" && exec ./tools/scripts/stop.sh "$stage")
(cd "$rootDir" && exec ./tools/scripts/clean.sh "$stage")
(cd "$rootDir" && exec ./tools/scripts/buildAndPush.sh "$dockerRepository" "$dockerTag")

context_name=muse-deploy-server
if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
    docker context create "${context_name}" --description "[MUSE] Deploy Server" --docker "host=ssh://kiryuxa@88.201.171.120"
fi

#if ! docker context inspect "$context_name" &>/dev/null; then
#
#fi

docker context use muse-deploy-server

(cd "$rootDir" && exec ./tools/scripts/run.sh "$stage" "prod")

echo -e "\033[0;32mList of available ports:\n\033[0m"
(cd "$rootDir" && exec cat ./tools/docker/env/local.env)


#sshpass -p "$SSH_PASS" ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" \
#  -o UserKnownHostsFile=/dev/null \
#  -o StrictHostKeyChecking=no \
#  env dockerRepository="$dockerRepository" \
#  env dockerTag="$dockerTag" \
#  env stage="$stage" \
#  env MUSE_JWT_SECRET_KEY="$MUSE_JWT_SECRET_KEY" \
#  'bash -s' << 'EOF'
#set -e
#
#random_number="$RANDOM"
#muse_project_path="/tmp/muse-project-$random_number"
#echo "Project path: '$muse_project_path'"
#
#git clone https://github.com/bas-kirill/muse-project.git "$muse_project_path"
#cd "$muse_project_path"
#
#export MUSE_SERVER_IMAGE="$dockerRepository/muse-server:$dockerTag"
#export MUSE_CLIENT_IMAGE="$dockerRepository/muse-client:$dockerTag"
#export MUSE_CLIENT_DEV_IMAGE="$dockerRepository/muse-client-dev:$dockerTag"
#
#echo "one"
#(cd ./tools/docker && docker compose config)
#echo "two"
#
#./tools/scripts/stop.sh "$stage"
#./tools/scripts/run.sh "$stage"
#EOF
#
