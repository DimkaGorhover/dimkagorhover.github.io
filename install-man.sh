#!/usr/bin/env bash

yarn build \
    && rm -rf ./public/ ./src/ ./.idea/ ./README.md ./node_modules/ ./package-lock.json ./package.json ./yarn.lock \
    && mv build/* ./ && rm -rf build/
