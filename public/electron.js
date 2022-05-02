const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const express = require('express');

let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  // Start server
  if (!isDev) {
    const server = express();
    const publicPath = path.join(__dirname, '..', 'public');
    const port = process.env.PORT || 9090;

    server.use(express.static(publicPath));

    server.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'calculator', 'index.html'));
    });

    server.listen(port, () => {
      console.log('Server is up!');
    });
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 830,
    title: "IOI Calculator",
    icon: `file://${path.join(__dirname, 'ioi-icon.png')}`
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000/calculator' : 'http://localhost:9090/calculator');
  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}