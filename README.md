<h1><img src="https://avatars1.githubusercontent.com/u/30448185?s=200&v=4" alt="RoboDomo" align="left" height="40" style="margin-right: 8px;" />

RoboDomo Client

</h1>

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Powered by Modus_Create](https://img.shields.io/badge/powered_by-Modus_Create-blue.svg?longCache=true&style=flat&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIwIDMwMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNOTguODI0IDE0OS40OThjMCAxMi41Ny0yLjM1NiAyNC41ODItNi42MzcgMzUuNjM3LTQ5LjEtMjQuODEtODIuNzc1LTc1LjY5Mi04Mi43NzUtMTM0LjQ2IDAtMTcuNzgyIDMuMDkxLTM0LjgzOCA4Ljc0OS01MC42NzVhMTQ5LjUzNSAxNDkuNTM1IDAgMCAxIDQxLjEyNCAxMS4wNDYgMTA3Ljg3NyAxMDcuODc3IDAgMCAwLTcuNTIgMzkuNjI4YzAgMzYuODQyIDE4LjQyMyA2OS4zNiA0Ni41NDQgODguOTAzLjMyNiAzLjI2NS41MTUgNi41Ny41MTUgOS45MjF6TTY3LjgyIDE1LjAxOGM0OS4xIDI0LjgxMSA4Mi43NjggNzUuNzExIDgyLjc2OCAxMzQuNDggMCA4My4xNjgtNjcuNDIgMTUwLjU4OC0xNTAuNTg4IDE1MC41ODh2LTQyLjM1M2M1OS43NzggMCAxMDguMjM1LTQ4LjQ1OSAxMDguMjM1LTEwOC4yMzUgMC0zNi44NS0xOC40My02OS4zOC00Ni41NjItODguOTI3YTk5Ljk0OSA5OS45NDkgMCAwIDEtLjQ5Ny05Ljg5NyA5OC41MTIgOTguNTEyIDAgMCAxIDYuNjQ0LTM1LjY1NnptMTU1LjI5MiAxODIuNzE4YzE3LjczNyAzNS41NTggNTQuNDUgNTkuOTk3IDk2Ljg4OCA1OS45OTd2NDIuMzUzYy02MS45NTUgMC0xMTUuMTYyLTM3LjQyLTEzOC4yOC05MC44ODZhMTU4LjgxMSAxNTguODExIDAgMCAwIDQxLjM5Mi0xMS40NjR6bS0xMC4yNi02My41ODlhOTguMjMyIDk4LjIzMiAwIDAgMS00My40MjggMTQuODg5QzE2OS42NTQgNzIuMjI0IDIyNy4zOSA4Ljk1IDMwMS44NDUuMDAzYzQuNzAxIDEzLjE1MiA3LjU5MyAyNy4xNiA4LjQ1IDQxLjcxNC01MC4xMzMgNC40Ni05MC40MzMgNDMuMDgtOTcuNDQzIDkyLjQzem01NC4yNzgtNjguMTA1YzEyLjc5NC04LjEyNyAyNy41NjctMTMuNDA3IDQzLjQ1Mi0xNC45MTEtLjI0NyA4Mi45NTctNjcuNTY3IDE1MC4xMzItMTUwLjU4MiAxNTAuMTMyLTIuODQ2IDAtNS42NzMtLjA4OC04LjQ4LS4yNDNhMTU5LjM3OCAxNTkuMzc4IDAgMCAwIDguMTk4LTQyLjExOGMuMDk0IDAgLjE4Ny4wMDguMjgyLjAwOCA1NC41NTcgMCA5OS42NjUtNDAuMzczIDEwNy4xMy05Mi44Njh6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+)](https://moduscreate.com)

RoboDomo is an IoT framework for developers. This GUI is a web client designed to work on tablets and phones either as a mobile app or as a persistent dashboard for controlling IoT automation.

# Getting Started

RoboDomo Client uses the MQTT protocol to get and set IoT status messages. We built in a demo mode that showcases functionalities without having to set up any servers that connect to actual **things**.

## Demo Environment

You need to pass environment variable `REACT_APP_DEMO=true` to enable the demo.

An easy way to do that is by creating a `.env` file in project root. Simply add a line with:

```
REACT_APP_DEMO=true
```

See [.env.sample](./.env.sample) for more information.

**Note:** `.env.sample` is an example file. It's not going to be recognized by the app. You will need to create your own `.env` file some or all of the content in `.env.sample`.

## Connecting to MQTT

The app will attempt to connect to `ws://robodomo:80` (using Web Sockets) by default. You can change the hostname or the port with environment variables:

- `REACT_APP_MQTT_HOST=robodomo`
- `REACT_APP_MQTT_PORT=80`

Refer to [.env.sample](./.env.sample) for more info.

## Setting up a MQTT server

Clone [docker-scripts](https://github.com/RoboDomo/docker-scripts) repository. You can use docker-compose or provided shell scripts to launch docker containers.

At minimum, the setup requires the following containers:

- `db` (MongoDB)
- `mqtt`
- `config`

The `config` microservice contains your configuration, which gets stored in the database. You can use Config and Macro samples from `https://github.com/RoboDomo/config`. Put them in `./config/robodomo` folder of your `docker-scripts` project.

You can instantitate the service like this:

```sh
docker-compose up config
```

Since `config` depends on `db` and `mqtt`, it will boot all of the needed services automatically.

## Troubleshooting

If you set the DEMO flag to true, but you're still getting errors, it's possible that there's a caching issue. Environment variables change the code that gets bundled and you may need to delete cache to pick up the changes. Simply delete the `node_modules/.cache` folder.

```bash
rm -rd ./node_modules/.cache
```

# How it works

The client uses EventEmitter to subscribe to MQTT messages. The UI is reactive and responds instantaneously.

SAMPLES

# Testing

E2E testing on mobile devices is brought to you by [BrowserStack](https://browserstack.com).

<p align="left">
<a href="https://browserstack.com"><img src="./.github/Browserstack-logo.svg" height="60" alt="Browser stack"/></a>
</p>

# Modus Create

[Modus Create](https://moduscreate.com) is a digital product consultancy. We use a distributed team of the best talent in the world to offer a full suite of digital product design-build services; ranging from consumer facing apps, to digital migration, to agile development training, and business transformation.

<a href="https://moduscreate.com/?utm_source=labs&utm_medium=github&utm_campaign=robodomo"><img src="https://res.cloudinary.com/modus-labs/image/upload/h_80/v1533109874/modus/logo-long-black.svg" height="80" alt="Modus Create"/></a>
<br />

This project is part of [Modus Labs](https://labs.moduscreate.com/?utm_source=labs&utm_medium=github&utm_campaign=robodomo).

<a href="https://labs.moduscreate.com/?utm_source=labs&utm_medium=github&utm_campaign=robodomo"><img src="https://res.cloudinary.com/modus-labs/image/upload/h_80/v1531492623/labs/logo-black.svg" height="80" alt="Modus Labs"/></a>

# Licensing

This project is [MIT licensed](./LICENSE).
