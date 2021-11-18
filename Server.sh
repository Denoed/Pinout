#!/bin/sh

./Clean.sh
clear

#   Local execution relies on
#   the relatively located
#   source files.

deno run                                  \
    --allow-net                           \
    --allow-read=./                       \
    --importmap=./Webserver/Imports.json  \
    --unstable                            \
    ./Webserver/Server.js
