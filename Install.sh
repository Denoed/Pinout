#!/bin/sh

sudo desktop-file-install pinout.desktop
sudo rm pinout.desktop

sudo rm -r /usr/local/Pinout
sudo cp -r -a . /usr/local/Pinout

sudo rm /usr/local/Pinout/Install.sh
