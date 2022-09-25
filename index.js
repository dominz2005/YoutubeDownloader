const { getPlaylist } = require('@fabricio-191/youtube');
const yt = require("yt-converter");

const fs = require('fs');

const url = 'https://www.youtube.com/playlist?list=PLmWtmp6K2OBf3ZsMXwqqRitcf3Gic-cLB';

const folderName = "songs";

let install = 1;
let installMax = 0;

function GetPlaylist()
{
    getPlaylist(url)
    .then(data => 
    {
        let rawdata = fs.readFileSync('videos.json');
        rawdata = JSON.parse(rawdata);

        const videos = data.videos.filter(video => !rawdata.some(id => video.ID == id));

        installMax = videos.length;

        videos.forEach(video => 
        {
            yt.convertAudio({
                url: video.URL,
                itag: 140,
                directoryDownload: `${__dirname}\\${folderName}`,
                title: video.title
            }, 
            () => { }, 
            async () =>
            {
                process.stdout.cursorTo(0);
                process.stdout.clearLine(0);
                process.stdout.write(`PRZETWORZONO - ${install}/${installMax}`);
                
                let rawdata = fs.readFileSync('videos.json');
                rawdata = JSON.parse(rawdata);
                rawdata.push(video.ID);
                fs.writeFileSync('videos.json', JSON.stringify(rawdata));
                
                install++;
            });
        });
    })
    .catch(console.error);
}

GetPlaylist();