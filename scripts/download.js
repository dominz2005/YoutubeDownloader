const yt = require('yt-converter');

const library = require('./library');

const toDownload = new Array();

function OnDownload() 
{
    toDownload[0].status = "DOWNLOADING..."
}
function OnFinish()
{
    downloading = false;

    if(!toDownload[0].lib)
        library.addToLibrary(toDownload[0].video);

    toDownload.shift();
}

let downloading = false;
setInterval(() => 
{
    if(downloading || toDownload.length <= 0) return;
    downloading = true;
    
    const video = toDownload[0].video;
    const type = toDownload[0].type;

    if(type == "audio")
        yt.convertAudio({
            url: video.url,
            itag: 140,
            directoryDownload: `${__dirname}\\..\\songs`,
            title: video.title
        }, OnDownload, OnFinish);
    else
        yt.convertVideo({
            url: video.url,
            itag: 136,
            directoryDownload: `${__dirname}\\..\\songs`,
            title: video.title
        }, OnDownload, OnFinish);

}, 1000);

function AddToDownload(video, type, lib)
{
    if(!lib && library.isInLibrary(video.url)) return;

    toDownload.push( { video, type, lib, status: "WAITING..." });
}

module.exports = {
    addToDownload: (video, type, lib) => AddToDownload(video, type, lib),
    getDownloads: () => JSON.stringify(toDownload),
}