const { app, BrowserWindow } = require('electron');
const url = require('url');
const querystring = require('querystring');

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 300,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const authHost = 'localhost';
    const authPath = '/';

    win.webContents.on('will-redirect', function(event, urlString) {
        console.log('Redirect');
        const urlObject = url.parse(urlString);
        if (urlObject.hostname === authHost && urlObject.pathname === authPath) {
            console.log('Auth redirect');
            const qs = urlObject.hash.substring(1);
            global.authQuery = querystring.parse(qs);
            win.loadFile('index.html');
        }
    });
    win.loadFile('index.html');
}

app.on('ready', createWindow);
