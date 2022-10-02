function AddListeners(object)
{
    const videoButton = object.querySelector('.video');
    const audioButton = object.querySelector('.audio');

    videoButton.addEventListener('click', async () =>
    {
        let response = await window.electronAPI.addToDownloads({ videos: object.getAttribute('url'), type: "video" });

        console.log(response);
    });
    audioButton.addEventListener('click', async () =>
    {
        let response = await window.electronAPI.addToDownloads({ videos: object.getAttribute('url'), type: "audio" });

        console.log(response);
    });
}