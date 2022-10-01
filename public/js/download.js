const div = document.querySelector('.videos');

let videos = new Array();
async function GetDownloads()
{
    let response = await window.electronAPI.getDownloads();
    response = JSON.parse(response);

    for (let i = 0; i < div.children.length; i++) 
    {
        const child = div.children[i];
        
        if(!response.some(res => res.video.id == child.getAttribute('id')))
            child.remove();
    }
    
    response = response.filter(res => !videos.some(video => JSON.stringify(video) == JSON.stringify(res)));
    console.log(response);

    response.forEach(res => 
    {
        const video = res.video;

        if(res.status == "DOWNLOADING...")
        {
            for (let i = 0; i < div.children.length; i++) 
            {
                const child = div.children[i];
                
                if(video.id == child.getAttribute('id'))
                    child.querySelector('.status').innerText = res.status;
            }
            return;
        }

        const videoDiv = document.createElement('div');
        videoDiv.setAttribute('id', video.id);

        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;
        
        const duration = document.createElement('p');
        duration.innerText = video.duration;
    
        const title = document.createElement('h4');
        title.innerText = video.title;
        
        const owner = document.createElement('p');
        owner.innerText = video.owner;
        
        const status = document.createElement('p');
        status.className = 'status';
        status.innerText = res.status;
        
        videoDiv.appendChild(thumbnail);
        videoDiv.appendChild(duration);
        videoDiv.appendChild(title);
        videoDiv.appendChild(owner);
        videoDiv.appendChild(status);

        div.appendChild(videoDiv);

        videos.push(res);
    });
}

GetDownloads();
setInterval(GetDownloads, 1000);