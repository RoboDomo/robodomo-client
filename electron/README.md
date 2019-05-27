# Electron App for RoboDomo

This directory contains all that is needed to create an electron app for RoboDomo.

The install.sh script generates the app in /usr/local/share and creates a softlink to the binary in /usr/local/bin.

## NOTES

1) Edit the install.sh script if you want to install somewhere else or otherwise change the steps for installation.
2) Edit main.js and set the URL to your Web App server.
3) In main.js, you might want to enable the menubar.

The electron app is just a dumb browser window that loads the RoboDomo client from the Web App server, but it is an
app that you can run with no system browser open, can launch from an icon, etc.


