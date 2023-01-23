const div = document.querySelector('.videos');
div.classList.add('lib');

async function Download(video, type)
{
    let response = await window.electronAPI.addToDownloads({ videos: JSON.stringify(video), type: type, lib: true });

    console.log(response);
}

let videos = new Array();
async function GetLibrary()
{
    let response = await window.electronAPI.getLibrary();

    for (let i = 0; i < div.children.length; i++) 
    {
        const child = div.children[i];
        
        if(!response.some(video => video.url == child.getAttribute('url')))
            child.remove();
    }
    
    response = response.filter(video => !videos.some(vid => JSON.stringify(vid) == JSON.stringify(video)));

    response.forEach(video => 
    {
        const videoDiv = document.createElement('div');
        videoDiv.setAttribute('url', video.url);

        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;
        
        const duration = document.createElement('p');
        duration.innerText = video.duration;
        duration.className = "duration";
    
        const info = document.createElement('div');
        info.className = "info";

        const title = document.createElement('h4');
        title.innerText = video.title;
        
        const owner = document.createElement('p');
        owner.innerText = `by: ${video.owner}`;

        const buttons = document.createElement('div');
        buttons.className = "buttons";

        const downloadVideo = document.createElement('button');
        downloadVideo.innerText = "DOWNLOAD VIDEO";
        downloadVideo.addEventListener('click', () => Download(video, "video"));

        const downloadAudio = document.createElement('button');
        downloadAudio.innerText = "DOWNLOAD AUDIO";
        downloadAudio.addEventListener('click', () => Download(video, "audio"));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "D \n E \n L";
        deleteButton.addEventListener('click', async () =>
        {
            let response = await window.electronAPI.removeFromLibrary({ video: video });
        
            switch (response) {
                case "ok":
                    videoDiv.remove();
                break;
                case "err":
                    console.log("error");
                break;
            }
        });
        
        info.appendChild(thumbnail);
        info.appendChild(duration);
        info.appendChild(title);
        info.appendChild(owner);

        buttons.appendChild(downloadVideo);
        buttons.appendChild(downloadAudio);
        buttons.appendChild(deleteButton);

        videoDiv.appendChild(info);
        videoDiv.appendChild(buttons);

        div.appendChild(videoDiv);

        videos.push(video);
    });
}

GetLibrary();
setInterval(GetLibrary, 1000);