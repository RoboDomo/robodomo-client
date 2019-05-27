#!/bin/sh

./node_modules/.bin/electron-packager --overwrite .
sudo chown root.root ./RoboDomo-linux-x64/chrome-sandbox
sudo chmod 4755 ./RoboDomo-linux-x64/chrome-sandbox
