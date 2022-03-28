const electron = require("electron/main");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");
const open = require("open");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 700,
    title: "Central Agricultural University",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
    // fullscreen: true
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("copy-file", async(event, arg) => {
  // var fs = require('fs');
  console.log(arg);
  var dir = arg[1].substring(0, arg[1].lastIndexOf("/"));
  console.log(dir);
  if (!fs.existsSync(dir)) {
    console.log("does not exist");
    fs.mkdirSync(dir, {
      recursive: true
    });
  }
  let res = fs.copyFileSync( arg[0], arg[1] );
  console.log(res);
});

ipcMain.handle("open-file", async(event, arg) => {
  let res = await open(arg);
  console.log(res);
});

