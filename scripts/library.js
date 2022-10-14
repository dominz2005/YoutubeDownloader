const path = require('path');
const fs = require('fs');

const directory = path.join(__dirname, '..', "library", "videos.json");

function GetVideos()
{
    const rawData = fs.readFileSync(directory);
    const videos = JSON.parse(rawData);

    return videos;
}

function AddToLibrary(video)
{
    const videos = GetVideos();

    videos.push(video);
    const data = JSON.stringify(videos);

    fs.writeFileSync(directory, data);
}
function RemoveFromLibrary(vid)
{
    const videos = GetVideos();

    const index = videos.findIndex(video => video.url == vid.url);

    videos.splice(index, 1);
    const data = JSON.stringify(videos);

    fs.writeFileSync(directory, data);
}

module.exports = {
    isInLibrary: (url) => 
    { 
        const videos = GetVideos();

        return videos.some(video => video.url == url);
    },
    addToLibrary: (video) => { AddToLibrary(video) },
    getLibrary: () => GetVideos(),
    removeFromLibrary: (video) => RemoveFromLibrary(video),
}