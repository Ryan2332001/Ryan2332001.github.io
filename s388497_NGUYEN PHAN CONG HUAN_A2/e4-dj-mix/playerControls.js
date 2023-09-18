let audioElement = document.getElementById("audioElement");
let playButton = document.getElementById("playButton");
let progressBar = document.getElementById("progressBar");
let loopButton = document.getElementById("loopButton");

audioElement.addEventListener('loadedmetadata', () => {
    progressBar.setAttribute('max', audioElement.duration);
});

audioElement.addEventListener("timeupdate", () => {
    progressBar.value = audioElement.currentTime;
});

function playPause() {
    if (audioElement.paused || audioElement.ended) {
        audioElement.play();
        playButton.style.backgroundImage = "url('./icons/pause.svg')";
        document.getElementById("leftVinyl").classList.add("glow");
        document.getElementById("rightVinyl").classList.add("glow");
    } else {
        audioElement.pause();
        playButton.style.backgroundImage = "url('./icons/play.svg')";
        document.getElementById("leftVinyl").classList.remove("glow");
        document.getElementById("rightVinyl").classList.remove("glow");
    }
}

playButton.addEventListener('click', playPause);

document.getElementById("increasePitch").addEventListener("click", function() {
    audioElement.playbackRate += 0.1;
});

document.getElementById("decreasePitch").addEventListener("click", function() {
    audioElement.playbackRate -= 0.1;
});

let isLooping = false;

loopButton.addEventListener('click', function() {
    isLooping = !isLooping;
    audioElement.loop = isLooping;
    if (isLooping) {
        loopButton.classList.add("active");
    } else {
        loopButton.classList.remove("active");
    }
});
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let sourceNode = audioContext.createMediaElementSource(audioElement);
let analyser = audioContext.createAnalyser();
sourceNode.connect(analyser);
analyser.connect(audioContext.destination);

let canvas = document.getElementById("waveformCanvas");
let canvasContext = canvas.getContext("2d");

function drawWaveform() {
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.beginPath();

    let sliceWidth = canvas.width / dataArray.length;
    let x = 0;

    for(let i = 0; i < dataArray.length; i++) {
        let v = dataArray[i] / 128.0;
        let y = v * canvas.height / 2;

        if(i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasContext.lineTo(canvas.width, canvas.height / 2);
    canvasContext.strokeStyle = "#5252ff";
    canvasContext.stroke();

    requestAnimationFrame(drawWaveform);
}

audioElement.addEventListener("play", function() {
    if(audioContext.state === "suspended") {
        audioContext.resume();
    }
    drawWaveform();
});

let rewindButton = document.getElementById("rewindButton");
let fastForwardButton = document.getElementById("fastForwardButton");
let muteButton = document.getElementById("muteButton");

// Rewind functionality
rewindButton.addEventListener('click', function() {
    audioElement.currentTime -= 5; // Rewind by 5 seconds
});

// Fast forward functionality
fastForwardButton.addEventListener('click', function() {
    audioElement.currentTime += 5; // Fast forward by 5 seconds
});

// Mute/Unmute functionality
muteButton.addEventListener('click', function() {
    if (audioElement.muted) {
        audioElement.muted = false;
        muteButton.style.backgroundImage = "url('./icons/unmute.svg')"; // Change to unmute icon
    } else {
        audioElement.muted = true;
        muteButton.style.backgroundImage = "url('./icons/mute.svg')"; // Change to mute icon
    }
});