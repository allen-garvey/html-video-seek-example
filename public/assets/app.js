const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('video');
const fileInput = document.getElementById('file_picker');
const seeker = document.getElementById('seek');
let videoLoaded = false;

const drawFrame = () => {
    context.drawImage(video, 0, 0);
};

video.addEventListener('loadedmetadata', () => {
    console.log('metadata loaded');
    seeker.disabled = false;
    seeker.value = 0;
    seeker.max = video.duration;
});

video.addEventListener('canplaythrough', () => {
    if (videoLoaded) {
        return;
    }
    console.log('canplaythrough');

    videoLoaded = true;
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    video.currentTime = 0;
});

video.addEventListener('seeked', () => {
    drawFrame();
});

seeker.addEventListener('change', () => {
    if (!videoLoaded) {
        return;
    }
    video.currentTime = seeker.value;
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length < 1) {
        return;
    }
    videoLoaded = false;
    const file = fileInput.files[0];
    console.log(file);

    video.src = URL.createObjectURL(file);
    video.load();
});
