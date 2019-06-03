// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");

const URL = process.env.ROBODOMO_URL || "http://robodomo:5000";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // Open the DevTools.
  //  mainWindow.webContents.openDevTools();

  console.log(URL);
  await mainWindow.loadURL(URL);

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object.
    mainWindow = null;
  });
};

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
