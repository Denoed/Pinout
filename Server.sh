#!/bin/sh

clear

deno run                                  \
    --allow-net                           \
    --allow-read=./                       \
    --importmap=./WebServer/Imports.json \
    --unstable                            \
    WebServer/Server.js
