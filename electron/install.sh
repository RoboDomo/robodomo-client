#!/bin/sh

OUT=/usr/local/share
./node_modules/.bin/electron-packager --overwrite . --out=$OUT
sudo chown root.root $OUT/RoboDomo-linux-x64/chrome-sandbox
sudo chmod 4755 $OUT/RoboDomo-linux-x64/chrome-sandbox
ln -sf $OUT/RoboDomo-linux-x64/RoboDomo /usr/local/bin/
