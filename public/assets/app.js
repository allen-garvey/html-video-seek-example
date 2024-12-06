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
    seeker.disabled = false;
    seeker.value = 0;
    seeker.max = video.duration;
});

video.addEventListener('canplaythrough', () => {
    if (videoLoaded) {
        return;
    }
    console.log('data loaded');
    videoLoaded = true;
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;

    setTimeout(() => {
        drawFrame();
    }, 1000);
});

seeker.addEventListener('change', () => {
    if (!videoLoaded) {
        return;
    }
    video.currentTime = seeker.value;
    drawFrame();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length < 1) {
        return;
    }
    videoLoaded = false;
    const file = fileInput.files[0];

    video.src = URL.createObjectURL(file);
    video.load();
});
