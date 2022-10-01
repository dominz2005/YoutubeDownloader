const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', 
{
    sendPlaylist: (url) => ipcRenderer.invoke('send-playlist', url),
    addToDownloads: (videos, type) => ipcRenderer.invoke('send-videos', videos, type),
    getDownloads: () => ipcRenderer.invoke('get-downloads'),
    getLibrary: () => ipcRenderer.invoke('get-library'),
});