clear

deno run                                  \
    --allow-net                           \
    --allow-read=./                       \
    --importmap=./src/server/Imports.json \
    --unstable                            \
    src/server/Webserver.js
