    document.addEventListener('DOMContentLoaded', () => {
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = document.getElementById('progressPercentage');
        const uploadForm = document.getElementById('uploadForm');

        const updateProgressBar = (progress) => {
            progressBar.value = progress;
            progressPercentage.textContent = `${progress}%`;
        };
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(uploadForm);
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    updateProgressBar(progress);
                }
            });
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    updateProgressBar(100);

                    // Check if progress is complete and show the file link
                    if (response.progress === 100 && response.fileLink) {
                        const fileLinkContainer = document.createElement('div');
                        fileLinkContainer.classList.add('py-3', 'text-center');
                        fileLinkContainer.innerHTML = `
                        ${response.originalName} is uploaded
                        <div class="py-2">
                            <a href="${response.fileLink}">
                                Click here to download
                            </a>
                        </div>
                    `;
                        uploadForm.parentNode.insertBefore(fileLinkContainer, uploadForm.nextSibling);
                    }
                }
            };
            xhr.open('POST', '/upload');
            xhr.send(formData);
        });
    })