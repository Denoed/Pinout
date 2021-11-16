#!/bin/sh

#   Install The Desktop Entry

sudo desktop-file-install pinout.desktop
sudo rm pinout.desktop

#   Remove Old

sudo rm -r /usr/local/Pinout

#   Place new

sudo cp -r -a . /usr/local/Pinout

#   Remove Installer

sudo rm /usr/local/Pinout/Install.sh
