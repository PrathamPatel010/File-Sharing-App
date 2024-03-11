document.addEventListener('DOMContentLoaded', async() => {
    const fileInfo = await getFileInfo();

    // code to remove the wrong password message when user is entering new password
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', function() {
        const errorDiv = document.querySelector('.msg-err');
        if (errorDiv) {
            errorDiv.innerHTML = '';
        }
    });
    const infoDiv = document.getElementById('file-info');
    infoDiv.innerHTML = `
    <h4>Filename: ${fileInfo.name}</h4>
    <h4>File-size: ${fileInfo.size} MB</h4>
    <h5>Enter password and download will start automatically</h5>
    `;
})

async function getFileInfo () {
    const fileID = window.location.pathname.split('/file/')[1];
    const fileInfo = await axios.get(`/fileInfo/${fileID}`);
    if (fileInfo.data.status!==200){
        return null;
    }
    return fileInfo.data;
}
