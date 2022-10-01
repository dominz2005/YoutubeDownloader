const div = document.querySelector('.videos');

let videos = new Array();
async function GetLibrary()
{
    let response = await window.electronAPI.getLibrary();

    for (let i = 0; i < div.children.length; i++) 
    {
        const child = div.children[i];
        
        if(!response.some(video => video.id == child.getAttribute('id')))
            child.remove();
    }
    
    response = response.filter(video => !videos.some(vid => JSON.stringify(vid) == JSON.stringify(video)));
    console.log(response);

    response.forEach(video => 
    {
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
        
        videoDiv.appendChild(thumbnail);
        videoDiv.appendChild(duration);
        videoDiv.appendChild(title);
        videoDiv.appendChild(owner);

        div.appendChild(videoDiv);

        videos.push(video);
    });
}

GetLibrary();
setInterval(GetLibrary, 1000);