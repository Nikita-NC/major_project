// document.getElementById('fileInput').addEventListener('change', function () {
//     const previewContainer = document.getElementById('previewContainer');
//     const previewImage = document.getElementById('previewImage');
//     const submitButton = document.getElementById('submitButton');
//     const uploadMessage = document.getElementById('uploadMessage');
//     const fileInput = this;

//     if (fileInput.files && fileInput.files[0]) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             previewImage.src = e.target.result;
//             previewContainer.style.display = 'block';
//             submitButton.classList.remove('hidden');
//             uploadMessage.classList.remove('hidden');
//         };

//         reader.readAsDataURL(fileInput.files[0]);
//     }
// });


// document.getElementById('fileInput').addEventListener('change', function () {
//     const previewContainer = document.getElementById('previewContainer');
//     const previewImage = document.getElementById('previewImage');
//     const submitButton = document.getElementById('submitButton');
//     const uploadMessage = document.getElementById('uploadMessage');
//     const fileInput = this;

//     if (fileInput.files && fileInput.files[0]) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             previewImage.src = e.target.result;
//             previewContainer.style.display = 'block';
//             submitButton.classList.remove('hidden');
//             uploadMessage.classList.remove('hidden');
//         };

//         reader.readAsDataURL(fileInput.files[0]);
//     }
// });

// from chat 
function allowDrop(event) {
    event.preventDefault();
    var uploaderContainer = document.querySelector('.uploader-container');
    uploaderContainer.style.border = '2px dashed #4CAF50';
}

function drop(event) {
    event.preventDefault();
    var uploaderContainer = document.querySelector('.uploader-container');
    uploaderContainer.style.border = '2px dashed #ccc';

    var fileInput = document.getElementById('fileInput');
    fileInput.files = event.dataTransfer.files;

    handleFileChange();
}

function handleFileChange() {
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const submitButton = document.getElementById('submitButton');
    const uploadMessage = document.getElementById('uploadMessage');
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
            submitButton.classList.remove('hidden');
            uploadMessage.classList.remove('hidden');
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}
// take picture 
var videoStream;

// Function to start the camera
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            videoStream = stream;

            // Create a video element to display the camera stream
            var video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            // Append the video element to the document
            document.getElementById('info').appendChild(video);

            // Show the capture button
            document.getElementById('captureButton').classList.remove('hidden');
        })
        .catch(function (error) {
            console.error('Error accessing camera:', error);
        });
}

// Function to capture photo from the camera
function capturePhoto() {
    // Capture a frame from the video stream and convert it to an image
    var video = document.querySelector('video');
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to a Blob representing the captured image
    canvas.toBlob(function (blob) {
        // Create a File object from the Blob
        var file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });

        // Set the captured image as the preview
        document.getElementById('previewImage').src = URL.createObjectURL(blob);

        // Stop the video stream
        videoStream.getTracks().forEach(track => track.stop());

        // Hide the capture button
        document.getElementById('captureButton').classList.add('hidden');

        // Show the submit button
        document.getElementById('submitButton').classList.remove('hidden');

        // Set the File object as the value of the file input
        var fileInput = document.getElementById('fileInput');
        var formData = new FormData();
        formData.append('file', file);
        fileInput.files = formData;
    }, 'image/jpeg');
}