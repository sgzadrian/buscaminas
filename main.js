const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require('path');
const url = require('url')

process.env.NODE_ENV = 'production';

let mainWindow;

const mainMenu = [{
    label: 'Juego',
    submenu: [{
        label: 'Nuevo',
        accelerator: process.platform == 'darwin' ? 'Cmd+N' : 'Ctrl+N',
        click() { createWindow(); }
    }, {
        label: 'Salir',
        accelerator: process.platform == 'darwin' ? 'Cmd+q' : 'Alt+F4',
        click() { app.quit(); }
    }]
}];

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow == null) {
        createWindow()
    }
});

function createWindow() {
    // Create main window
    mainWindow = new BrowserWindow({
        width: 360,
        height: 458,
        fullscreen: false,
        resizable: false,
        center: true,
        transparent: true,
        frame: false,
        toolbar: false,
        webPreferences: {
            webSecurity: false
        }
    });

    // mainWindow.loadURL('file://'+__dirname+'/dist/index.html');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Garbage collect, here must destroy app windows
    mainWindow.on('closed', () => {
        mainWindow = null
    });

    // If app is in test mode
    if (process.env.NODE_ENV != 'production') {
        mainWindow.setSize(900, 600);
        mainWindow.openDevTools();
        mainMenu.push({
            label: 'Develop',
            submenu: [{
                label: 'Open tools',
                accelerator: 'Ctrl+Alt+i',
                click() { mainWindow.toggleDevTools(); }
            }]
        });
    }

    // adjust menu bar and extra setting for mac
    if (process.platform == 'darwin') {
        mainMenu.unshift({});
    }
    const menuTemp = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menuTemp);
}
