#!/bin/sh

./Clean.sh
clear

#   Build (Debug Mode)

cargo build

#   Place binary in main folder
#   for ease of use.

cp target/debug/Pinout Pinout

#   Test it

./Pinout
