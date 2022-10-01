const form = document.querySelector('form');
form.addEventListener('submit', async event =>
{
    event.preventDefault();

    const input = form.querySelector('input[type=text]');

    switch (form.getAttribute('purpose')) 
    {
        case "playlist":
            let response = await window.electronAPI.sendPlaylist(input.value);
            response = JSON.parse(response);

            const div = document.querySelector('.videos');
            div.innerHTML = "";

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
    }
})