const { app, BrowserWindow } = require('electron');
const url = require('url');

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    let authHost = 'localhost';
    let authPath = '/';

    win.webContents.on('will-redirect', function(event, urlString) {
        console.log('Redirect');
        const urlObject = url.parse(urlString);
        console.dir(urlObject);
        if (urlObject.hostname === authHost && urlObject.pathname === authPath) {
            console.log('Auth redirect');
            event.preventDefault();
            win.loadFile('page.html');
        }
    });
    win.loadFile('index.html');
}

app.on('ready', createWindow);
