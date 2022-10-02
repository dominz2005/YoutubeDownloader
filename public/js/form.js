const form = document.querySelector('form');
form.addEventListener('submit', async event =>
{
    event.preventDefault();

    const input = form.querySelector('input[type=text]');

    let response;
    
    const div = document.querySelector('.videos');
    div.innerHTML = "";

    switch (form.getAttribute('purpose')) 
    {
        case "playlist":
            response = await window.electronAPI.sendPlaylist(input.value);
            response = JSON.parse(response);

            const urls = new Array();

            response.data.forEach(video => 
            {
                urls.push(video);

                const thumbnail = document.createElement('img');
                thumbnail.src = video.thumbnail;
                
                const duration = document.createElement('p');
                duration.innerText = video.duration;
    
                const title = document.createElement('h4');
                title.innerText = video.title;
                
                const owner = document.createElement('p');
                owner.innerText = video.owner;
                
                div.appendChild(thumbnail);
                div.appendChild(duration);
                div.appendChild(title);
                div.appendChild(owner);
            });

            div.setAttribute('urls', JSON.stringify(urls));
        break;
        case "link":
            response = await window.electronAPI.sendLink(input.value);
            response = JSON.parse(response);

            const thumbnail = document.createElement('img');
            thumbnail.src = response.thumbnail;
            
            const duration = document.createElement('p');
            duration.innerText = response.duration;

            const title = document.createElement('h4');
            title.innerText = response.title;
            
            const owner = document.createElement('p');
            owner.innerText = response.owner;

            const downloadVideo = document.createElement('button')
            downloadVideo.innerText = "DOWNLOAD VIDEO";
            downloadVideo.className = "video";
            
            const downloadAudio = document.createElement('button')
            downloadAudio.innerText = "DOWNLOAD AUDIO";
            downloadAudio.className = "audio";
            
            div.appendChild(thumbnail);
            div.appendChild(duration);
            div.appendChild(title);
            div.appendChild(owner);
            div.appendChild(downloadVideo);
            div.appendChild(downloadAudio);

            div.setAttribute('url', JSON.stringify(response));

            AddListeners();
        break;
        case "search":
            response = await window.electronAPI.sendSearch(input.value);
            response = JSON.parse(response);

            response.forEach(video => 
            {
                const videoDiv = document.createElement('div');
                videoDiv.setAttribute('url', JSON.stringify(video));

                const thumbnail = document.createElement('img');
                thumbnail.src = video.thumbnail;
                
                const duration = document.createElement('p');
                duration.innerText = video.duration;
    
                const title = document.createElement('h4');
                title.innerText = video.title;
                
                const owner = document.createElement('p');
                owner.innerText = video.owner;
                
                const downloadVideo = document.createElement('button')
                downloadVideo.innerText = "DOWNLOAD VIDEO";
                downloadVideo.className = "video";
                
                const downloadAudio = document.createElement('button')
                downloadAudio.innerText = "DOWNLOAD AUDIO";
                downloadAudio.className = "audio";
                
                videoDiv.appendChild(thumbnail);
                videoDiv.appendChild(duration);
                videoDiv.appendChild(title);
                videoDiv.appendChild(owner);
                videoDiv.appendChild(downloadVideo);
                videoDiv.appendChild(downloadAudio);

                div.appendChild(videoDiv);

                AddListeners(videoDiv);
            });
        break;
    }
})