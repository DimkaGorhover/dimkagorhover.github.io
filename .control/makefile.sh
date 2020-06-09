#!/bin/zsh
if (( $+commands[yarn] )); then
    echo -n "local.Makefile";
else
    echo -n "docker.Makefile";
fi
