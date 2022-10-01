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

function AddToDownload(video, type)
{
    if(library.isInLibrary(video.id))return;

    toDownload.push( { video, type, status: "WAITING..." });
}

module.exports = {
    addToDownload: (video, type) => AddToDownload(video, type),
    getDownloads: () => JSON.stringify(toDownload),
}