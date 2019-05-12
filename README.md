# react-client

## Design Criteria

1) Dark Theme

Consider the app will run on a tablet on a nightstand next to the bed.  We want the display visible, but we don't want
it so bright it lights up the room!

2) Dashboards

Dashboards are likely used 99% of the time.  They are tile based.  A tile is read only - displays information, or a
button, or a tile with other controls (like thermostat with up/down setting buttons).

I want a different dashboard for the TV room than for the bedroom.  Controls for the lights and ceiling fans are
different for the two rooms.  

Tiles should be designed with visibility in mind.  Consider a tablet on the wall next to your TV.  You want to be able
to see the current time, temperature, etc., from the couch (some feet away from the tablet).

3) Tabbed interface

Each mode has a tabbed interface.  Each tab represents one instance of a group of things to display.  For example, each
dashboard is rendered in its own tab, as are nest thermostats, TVs, and so on.

4) Config file driven.

A .js file instead of json.  The .js file allows for comments and doesn't require typing so many double quotes.

The config file defines all the devices, the dashboards, MQTT interaction, hosts, etc.

5) Separate designs for Browser, Tablet, and Phone.

Render a UI that is appropriate for the browser's dimensions.  Instead of tiles on Phone, we render lists.  And so on.

# Design Decisions

1) For a html5 UI framework, react-bootstrap was chosen.  A key function of the version supporting bootstrap 3,
specifically, is the ability to mount tab content onenter and to unmount onexit.  This is vital to performance,
especially on slower mobile type devices - having components mounted but not visible would mean a lot of extra MQTT
subscriptions for information not used/rendered.  

# Quick Start

To get RoboDomo and this client up and running, you will need to:
1) Set up MQTT broker.  We recommend using Mosca Docker container.
2) Set up MongoDB.  This will be used as backing store for Mosca.  Use Docker container.
3) Set up Smartthings MQTT Bridge.  Instructions are in the MQTT Bridge repo.  This is required only if you want to
control SmartThings devices.  Use the Docker image for MQTT Bridge as well.
4) Start additional RoboDomo microservices (Docker) for devices you want to control.
5) Edit Config.js to match your setup and to design the Dashboards and macros you want to present in the UI.
6) in this repository, npm install and then npm start.  This will run the React development server
7) Point your browser at this host, port 3000.

There is a [docker scripts](https://github.com/RoboDomo/docker-scripts) repository for RoboDomo.  These are handy
scripts for setting up and installing the MQTT broker, MQTT bridge, and the various microservices.  It's relatively fast
to edit those scripts to suit your needs (mostly MQTT host name env variable and devices env variable), and use those.

