const path = require('path');
const fs = require('fs');

const directory = path.join(__dirname, '..', "library", "videos.json");

const rawData = fs.readFileSync(directory);
const videos = JSON.parse(rawData);

function AddToLibrary(video)
{
    videos.push(video);
    const data = JSON.stringify(videos);

    fs.writeFileSync(directory, data);
}

module.exports = {
    isInLibrary: (url) => videos.some(video => video.url == url),
    addToLibrary: (video) => { AddToLibrary(video) },
    getLibrary: () => videos,
}