const {
    app,
    BrowserWindow
} = require('electron')

var config = require('./config.js');
require('electron-reload')(__dirname);

let win

function createWindow() {
    win = new BrowserWindow({
        width: config.debug ? 1280 : 800,
        height: config.debug ? 900 : 600,
        minWidth: 580,
        minHeight: 200,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', () => {
    createWindow()
    if(config.debug){
        win.toggleDevTools()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})