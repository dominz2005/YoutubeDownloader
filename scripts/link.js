const { getVideo, search } = require('@fabricio-191/youtube');

async function GetInfo(url)
{
    const info = await getVideo(url).then(info => info);

    const object = {
        url: info.URL,
        title: info.name,
        owner: info.owner.name,
        duration: info.duration.normal,
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