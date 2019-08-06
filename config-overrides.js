/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

module.exports = function override(config) {
  // custom service workers
  config.plugins = config.plugins
    .map(plugin => {
      if (plugin.constructor.name === "GenerateSW") {
        return new WorkboxWebpackPlugin.InjectManifest({
          swDest: "service-worker.js",
          swSrc: "./src/serviceWorkerCustom.js",
          // chunks: ['main'],
          exclude: [/\.(svg|png|map)$/, /^manifest.*\.js$/],
        });
      }

      return plugin;
    })
    .filter(Boolean);

  // custom alias for src/
  config.resolve.alias["@"] = path.resolve(__dirname, "src");

  // remove eslint plugin (index #1)
  config.module.rules.splice(1, 1);

  if (!process.env.NETLIFY) {
    // these plugins don't do much on Netlify. Chances are, they will only break deployments

    // Webpack 5 will introduce something like this plugin
    config.plugins.push(
      new HardSourceWebpackPlugin({
        info: {
          level: "error",
        },
      })
    );
    config.plugins.push(
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        {
          // HardSource works with mini-css-extract-plugin but due to how
          // mini-css emits assets, assets are not emitted on repeated builds with
          // mini-css and hard-source together. Ignoring the mini-css loader
          // modules, but not the other css loader modules, excludes the modules
          // that mini-css needs rebuilt to output assets every time.
          test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
        },
      ])
    );

    config.plugins.push(
      new AutoDllPlugin({
        inject: true, // will inject the DLL bundle to index.html
        debug: true,
        filename: "[name]_[hash].dll.js",
        path: "./dll",
        entry: {
          vendor: [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "@modus/react-idle",
            "lodash-es",
            "bowser",
            "date-fns",
            "mqtt",
            "bootstrap",
            "react-bootstrap",
            "react-bootstrap-toggle",
            "react-bootstrap-slider",
            "react-dock",
            "react-nest-thermostat",
            "react-popper",
            "react-icons",
            "framer-motion",
            "idb-keyval",
            // cannot DLL ionic due to resolver issues in AutoDLL plugin
          ],
        },
      })
    );

    // Web Workers plugin
    config.plugins.push(new WorkerPlugin());
  }

  return config;
};
