const { app, BrowserWindow } = require('electron')
const path = require('path')

try {
    require('electron-reloader')(module)
} catch (_) {}


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true,
    resizable: false,
  })

  // uncomment this when the game is finished
  //win.removeMenu()
  win.loadFile('app/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
