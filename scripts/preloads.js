const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', 
{
    sendPlaylist: (url) => ipcRenderer.invoke('send-playlist', url),
    sendLink: (url) => ipcRenderer.invoke('send-link', url),
    sendSearch: (value) => ipcRenderer.invoke('send-search', value),
    addToDownloads: (videos, type) => ipcRenderer.invoke('send-videos', videos, type),
    getDownloads: () => ipcRenderer.invoke('get-downloads'),
    getLibrary: () => ipcRenderer.invoke('get-library'),
});