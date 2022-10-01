const { getPlaylist } = require('@fabricio-191/youtube');

async function GetPlaylist(url)
{
    return await getPlaylist(url)
    .then(async data => 
    {
        const videos = new Array();
        data.videos.forEach(video => 
        {
            const object = {
                id: video.ID,
                url: video.URL,
                title: video.title,
                owner: video.owner.name,
                duration: video.duration.normal,
                thumbnail: video.thumbnails[0].url
            }

            videos.push(object);
        });
        
        return { status: 'ok', data: videos };
    })
    .catch(err => { return { status: 'error', data: err } });
}

module.exports = {
    getPlaylist: async (url) => await GetPlaylist(url),
}