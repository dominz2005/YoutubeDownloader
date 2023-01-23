const { getVideo, search } = require('@fabricio-191/youtube');
const yt = require("yt-converter");

async function GetInfo(url)
{
    const info = await yt.getInfo(url).then(info => info);

    const object = {
        url: url,
        title: info.title,
        owner: info.owner,
        duration: millisToMinutesAndSeconds(info.formats[0].approxDurationMs),
        thumbnail: info.thumbnails[0].url
    }
    
    return object;
}
async function Search(value)
{
    const info = await search(value).then(info => info);

    const videos = new Array();
    Object.values(info.results).forEach(video => 
    {
        try 
        {
            const object = {
                url: video.URL,
                title: video.title,
                owner: video.owner.name,
                duration: video.duration.normal,
                thumbnail: video.thumbnails[0].url
            }
    
            videos.push(object);
        } 
        catch (err) { return; }
    });

    return videos;
}

module.exports = {
    getVideo: async (url) => await GetInfo(url),
    search: async (value) => await Search(value)
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}