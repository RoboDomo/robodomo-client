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

 
