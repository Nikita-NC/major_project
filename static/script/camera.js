function startCamera() {
    fetch('/start_camera')
        .then(response => response.text())
        .then(data => console.log(data));
    document.getElementById('cameraFeed').src = "{{ url_for('video_feed') }}";
}

function stopCamera() {
    fetch('/stop_camera')
        .then(response => response.text())
        .then(data => console.log(data));
    document.getElementById('cameraFeed').src = "";
}

function captureImage() {
    fetch('/capture')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            document.getElementById('file').value = "captured_image.jpg";
            document.getElementById('uploadForm').submit();
        });
}