#!/bin/sh

clear

#   Local execution relies on
#   the relatively located
#   source files.

deno run                                  \
    --allow-net                           \
    --allow-read=./                       \
    --importmap=./WebServer/Imports.json  \
    --unstable                            \
    ./WebServer/Server.js
