const div = document.querySelector('.videos');

let videos = new Array();
async function GetDownloads()
{
    let response = await window.electronAPI.getDownloads();
    response = JSON.parse(response);

    for (let i = 0; i < div.children.length; i++) 
    {
        const child = div.children[i];
        
        if(!response.some(res => res.video.url == child.getAttribute('url')))
            child.remove();
    }
    
    response = response.filter(res => !videos.some(video => JSON.stringify(video) == JSON.stringify(res)));

    response.forEach(res => 
    {
        const video = res.video;

        if(res.status == "DOWNLOADING...")
        {
            for (let i = 0; i < div.children.length; i++) 
            {
                const child = div.children[i];
                
                if(video.url == child.getAttribute('url'))
                    child.querySelector('.status').innerText = res.status;
            }
            return;
        }

        const videoDiv = document.createElement('div');
        videoDiv.setAttribute('url', video.url);

        const info = document.createElement('div');
        info.className = "info";

        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;
        
        const duration = document.createElement('p');
        duration.innerText = video.duration;
        duration.className = "duration";

        const type = document.createElement('div');
        type.classList.add('type');

        if(res.type == "audio")
        {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 512 512');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z');
            svg.appendChild(path);

            type.appendChild(svg);
        }
        else
        {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 576 512');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z');
            svg.appendChild(path);

            type.appendChild(svg);
        }
    
        const title = document.createElement('h4');
        title.innerText = video.title;
        
        const owner = document.createElement('p');
        owner.innerText = `by: ${video.owner}`;
        
        const status = document.createElement('p');
        status.className = 'status';
        status.innerText = res.status;
        
        info.appendChild(thumbnail);
        info.appendChild(duration);
        info.appendChild(type);
        info.appendChild(title);
        info.appendChild(owner);
        
        videoDiv.appendChild(info);
        videoDiv.appendChild(status);

        div.appendChild(videoDiv);

        videos.push(res);
    });
}

GetDownloads();
setInterval(GetDownloads, 1000);