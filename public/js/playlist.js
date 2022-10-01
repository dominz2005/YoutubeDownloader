const videoButton = document.querySelector('.video');
const audioButton = document.querySelector('.audio');

const div = document.querySelector('.videos');

videoButton.addEventListener('click', async () =>
{
    let response = await window.electronAPI.addToDownloads({ videos: div.getAttribute('urls'), type: "video" });

    console.log(response);
});
audioButton.addEventListener('click', async () =>
{
    let response = await window.electronAPI.addToDownloads({ videos: div.getAttribute('urls'), type: "audio" });

    console.log(response);
});