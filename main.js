const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');

const playlist = require('./scripts/playlist');
const link = require('./scripts/link');
const download = require('./scripts/download');
const library = require('./scripts/library');

app.whenReady().then(() =>
{
    const window = new BrowserWindow({
        width: 1180,
        height: 900,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: { preload: path.join(__dirname, 'scripts', 'preloads.js') }
    });
    window.webContents.openDevTools();

    ipcMain.handle('send-playlist', async (event, url) =>
    {
        const songs = await playlist.getPlaylist(url);

        return JSON.stringify(songs);
    });
    ipcMain.handle('send-link', async (event, url) =>
    {
        const songs = await link.getVideo(url);

        return JSON.stringify(songs);
    });
    ipcMain.handle('send-search', async (event, value) =>
    {
        const songs = await link.search(value);

        return JSON.stringify(songs);
    });
    ipcMain.handle('send-videos', async (event, videos) =>
    {   
        let allVideos = JSON.parse(videos.videos);

        if(!Array.isArray(allVideos))
            allVideos = [allVideos];

        allVideos.forEach(video => 
        {
            download.addToDownload(video, videos.type);
        });    

        return videos;
    });
    ipcMain.handle('get-downloads', (event) => download.getDownloads());
    ipcMain.handle('get-library', (event) => library.getLibrary());

    window.loadFile('public/html/index.html');
});

app.on('window-all-closed', () => app.quit());