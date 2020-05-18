#!/bin/bash  

set -eo pipefail

id_rsa="${HOME}/.ssh/id_rsa"

if [ ! -f $id_rsa ]; then
    echo "file \"$id_rsa\" does't exist";
    exit 1;
fi

eval "$(ssh-agent -s)"
ssh-add $id_rsa

yarn deploy
