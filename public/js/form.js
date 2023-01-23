const form = document.querySelector('form');
form.addEventListener('submit', async event =>
{
    event.preventDefault();

    const input = form.querySelector('input[type=text]');

    let response;
    
    const div = document.querySelector('.videos');
    div.innerHTML = "";

    const text = document.createElement('h2');

    switch (form.getAttribute('purpose')) 
    {
        case "playlist":
            const videoButton = document.querySelector('.video');
            const audioButton = document.querySelector('.audio');

            response = await window.electronAPI.sendPlaylist(input.value);
            response = JSON.parse(response);

            videoButton.classList.remove('hidden');
            audioButton.classList.remove('hidden');

            text.innerText = "VIDEOS";
            div.appendChild(text);

            const urls = new Array();

            response.data.forEach(video => 
            {
                urls.push(video);

                const videoDiv = document.createElement('div');
                videoDiv.className = "playlist";
                
                const info = document.createElement('div');
                info.className = "info";

                const thumbnail = document.createElement('img');
                thumbnail.src = video.thumbnail;
                
                const duration = document.createElement('p');
                duration.innerText = video.duration;
                duration.className = "duration";
    
                const title = document.createElement('h4');
                title.innerText = video.title;
                
                const owner = document.createElement('p');
                owner.innerText = `by: ${video.owner}`;
                
                info.appendChild(thumbnail);
                info.appendChild(duration);
                info.appendChild(title);
                info.appendChild(owner);

                videoDiv.appendChild(info);

                div.appendChild(videoDiv);
            });

            div.setAttribute('urls', JSON.stringify(urls));
        break;
        case "link":
            response = await window.electronAPI.sendLink(input.value);
            response = JSON.parse(response);

            text.innerText = "VIDEO";
            div.appendChild(text);

            const videoDiv = document.createElement('div');

            const info = document.createElement('div');
            info.className = "info";

            const thumbnail = document.createElement('img');
            thumbnail.src = response.thumbnail;
            
            const duration = document.createElement('p');
            duration.innerText = response.duration;
            duration.className = "duration";

            const title = document.createElement('h4');
            title.innerText = response.title;
            
            const owner = document.createElement('p');
            owner.innerText = `by: ${response.owner}`;

            const buttons = document.createElement('div');
            buttons.className = "buttons";

            const downloadVideo = document.createElement('button')
            downloadVideo.innerText = "DOWNLOAD VIDEO";
            downloadVideo.className = "video";
            
            const downloadAudio = document.createElement('button')
            downloadAudio.innerText = "DOWNLOAD AUDIO";
            downloadAudio.className = "audio";
            
            info.appendChild(thumbnail);
            info.appendChild(duration);
            info.appendChild(title);
            info.appendChild(owner);

            buttons.appendChild(downloadVideo);
            buttons.appendChild(downloadAudio);

            videoDiv.appendChild(info);
            videoDiv.appendChild(buttons);

            div.appendChild(videoDiv);

            div.setAttribute('url', JSON.stringify(response));

            AddListeners();
        break;
        case "search":
            response = await window.electronAPI.sendSearch(input.value);
            response = JSON.parse(response);

            text.innerText = "VIDEOS";
            div.appendChild(text);

            response.forEach(video => 
            {
                const videoDiv = document.createElement('div');
                videoDiv.setAttribute('url', JSON.stringify(video));
                
                const info = document.createElement('div');
                info.className = "info";

                const thumbnail = document.createElement('img');
                thumbnail.src = video.thumbnail;
                
                const duration = document.createElement('p');
                duration.innerText = video.duration;
                duration.className = "duration";
    
                const title = document.createElement('h4');
                title.innerText = video.title;
                
                const owner = document.createElement('p');
                owner.innerText = `by: ${video.owner}`;
                
                const buttons = document.createElement('div');
                buttons.className = "buttons";

                const downloadVideo = document.createElement('button');
                downloadVideo.innerText = "DOWNLOAD VIDEO";
                downloadVideo.className = "video";
                
                const downloadAudio = document.createElement('button');
                downloadAudio.innerText = "DOWNLOAD AUDIO";
                downloadAudio.className = "audio";
                
                info.appendChild(thumbnail);
                info.appendChild(duration);
                info.appendChild(title);
                info.appendChild(owner);

                buttons.appendChild(downloadVideo);
                buttons.appendChild(downloadAudio);

                videoDiv.appendChild(info);
                videoDiv.appendChild(buttons);

                div.appendChild(videoDiv);

                AddListeners(videoDiv);
            });
        break;
    }
})