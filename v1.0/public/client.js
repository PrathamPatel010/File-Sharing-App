document.addEventListener('DOMContentLoaded', () => {
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
    <h6>Enter password and download will start automatically</h6>
    `;
})