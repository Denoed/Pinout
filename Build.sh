#!/bin/sh

clear

cargo build

cp target/debug/Pinout Pinout

./Pinout
