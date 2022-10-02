function AddListeners()
{
    const videoButton = document.querySelector('.video');
    const audioButton = document.querySelector('.audio');

    const div = document.querySelector('.videos');

    videoButton.addEventListener('click', async () =>
    {
        let response = await window.electronAPI.addToDownloads({ videos: div.getAttribute('url'), type: "video" });

        console.log(response);
    });
    audioButton.addEventListener('click', async () =>
    {
        let response = await window.electronAPI.addToDownloads({ videos: div.getAttribute('url'), type: "audio" });

        console.log(response);
    });
}