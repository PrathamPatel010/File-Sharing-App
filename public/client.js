document.addEventListener('DOMContentLoaded', () => {
    // code to remove the wrong password message when user is entering new password
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', function() {
        const errorDiv = document.querySelector('.msg-err');
        if (errorDiv) {
            errorDiv.innerHTML = '';
        }
    });
})