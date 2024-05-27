document.addEventListener('DOMContentLoaded', (event) => {
  const loadingScreen = document.getElementById('loadingScreen');

  // Hide the loading screen after a delay
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 3000); // 3 seconds delay

  const iframe = document.getElementById('vimeoPlayer');
  const player = new Vimeo.Player(iframe);
  const audioPlayer = document.getElementById('audioPlayer');
  const backgroundVideo = document.getElementById('backgroundVideo');
  const visualizerCanvas = document.getElementById('visualizer');
  const visualizerCtx = visualizerCanvas.getContext('2d');
  const topVisualizerCanvas = document.getElementById('topVisualizer');
  const topVisualizerCtx = topVisualizerCanvas.getContext('2d');

  const buttons = document.querySelectorAll('.control-button');
  const playPauseButton = document.getElementById('playPause');
  const stopButton = document.getElementById('stop');
  const speedDownButton = document.getElementById('speedDown');
  const speedUpButton = document.getElementById('speedUp');
  const muteButton = document.getElementById('mute');
  const volumeDownButton = document.getElementById('volumeDown');
  const volumeUpButton = document.getElementById('volumeUp');
  const fullscreenButton = document.getElementById('fullscreen');

  const videoContainer = document.querySelector('.video-container');

  // Function to initialize the positions and speeds
  function initializeElements(elements) {
    elements.forEach(element => {
      element.style.left = Math.random() * (window.innerWidth - element.offsetWidth) + 'px';
      element.style.top = Math.random() * (window.innerHeight - element.offsetHeight) + 'px';
      element.dataset.dx = (Math.random() - 0.5) * 4;
      element.dataset.dy = (Math.random() - 0.5) * 4;
    });
  }

  // Function to move the elements and make them bounce off the edges
  function moveElements(elements) {
    elements.forEach(element => {
      let x = parseFloat(element.style.left);
      let y = parseFloat(element.style.top);
      let dx = parseFloat(element.dataset.dx);
      let dy = parseFloat(element.dataset.dy);

      if (x + dx > window.innerWidth - element.offsetWidth || x + dx < 0) {
        dx = -dx;
      }
      if (y + dy > window.innerHeight - element.offsetHeight || y + dy < 0) {
        dy = -dy;
      }

      element.style.left = (x + dx) + 'px';
      element.style.top = (y + dy) + 'px';
      element.dataset.dx = dx;
      element.dataset.dy = dy;
    });
  }

  // Initialize and move the buttons
  initializeElements(buttons);
  setInterval(() => moveElements(buttons), 20);

  // Initialize and move the video container
  initializeElements([videoContainer]);
  setInterval(() => moveElements([videoContainer]), 20);

  // Sync play/pause between video, audio, and background video
  playPauseButton.addEventListener('click', () => {
    player.getPaused().then(paused => {
      if (paused) {
        player.play();
        audioPlayer.play();
        backgroundVideo.play();
        playPauseButton.querySelector('img').src = "icons8-pause-64 green.png";
        playPauseButton.querySelector('img').setAttribute('data-hover', 'pause.gif');
      } else {
        player.pause();
        audioPlayer.pause();
        backgroundVideo.pause();
        playPauseButton.querySelector('img').src = "icons8-play-64 green.png";
        playPauseButton.querySelector('img').setAttribute('data-hover', 'icons8-play-64 green.png');
      }
    });
  });

  stopButton.addEventListener('click', () => {
    player.pause().then(() => {
      player.setCurrentTime(0);
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      backgroundVideo.pause();
      backgroundVideo.currentTime = 0;
      playPauseButton.querySelector('img').src = "icons8-play-64 green.png";
      playPauseButton.querySelector('img').setAttribute('data-hover', 'icons8-play.gif');
    });
  });

  speedDownButton.addEventListener('click', () => {
    player.getPlaybackRate().then(rate => {
      if (rate > 0.5) {
        player.setPlaybackRate(rate - 0.5);
        audioPlayer.playbackRate = rate - 0.5;
        backgroundVideo.playbackRate = rate - 0.5;
      }
    });
  });

  speedUpButton.addEventListener('click', () => {
    player.getPlaybackRate().then(rate => {
      if (rate < 2) {
        player.setPlaybackRate(rate + 0.5);
        audioPlayer.playbackRate = rate + 0.5;
        backgroundVideo.playbackRate = rate + 0.5;
      }
    });
  });

  muteButton.addEventListener('click', () => {
    player.setVolume(0);
    audioPlayer.muted = true;
  });

  volumeDownButton.addEventListener('click', () => {
    player.getVolume().then(volume => {
      if (volume > 0.1) {
        player.setVolume(volume - 0.1);
        audioPlayer.volume = volume - 0.1;
      } else {
        player.setVolume(0);
        audioPlayer.volume = 0;
      }
    });
  });

  volumeUpButton.addEventListener('click', () => {
    player.getVolume().then(volume => {
      if (volume < 1) {
        player.setVolume(volume + 0.1);
        audioPlayer.volume = volume + 0.1;
      }
    });
  });

  fullscreenButton.addEventListener('click', () => {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  });

  // Music visualizer
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  const audioSource = audioCtx.createMediaElementSource(audioPlayer);
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    topVisualizerCtx.clearRect(0, 0, topVisualizerCanvas.width, topVisualizerCanvas.height);

    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      const red = (barHeight + 100) * 2;
      const green = 50 * (i / bufferLength);
      const blue = 50;

      visualizerCtx.fillStyle = `rgb(${red},${green},${blue})`;
      visualizerCtx.fillRect(x, visualizerCanvas.height - barHeight / 2, barWidth, barHeight / 2);

      topVisualizerCtx.fillStyle = `rgb(${red},${green},${blue})`;
      topVisualizerCtx.fillRect(x, barHeight / 2, barWidth, -barHeight / 2); // Inverted

      x += barWidth + 1;
    }
  }

  drawVisualizer();

  // Resize the visualizer canvas when the window is resized
  window.addEventListener('resize', () => {
    visualizerCanvas.width = visualizerCanvas.clientWidth;
    visualizerCanvas.height = visualizerCanvas.clientHeight;
    topVisualizerCanvas.width = topVisualizerCanvas.clientWidth;
    topVisualizerCanvas.height = topVisualizerCanvas.clientHeight;
  });
  visualizerCanvas.width = visualizerCanvas.clientWidth;
  visualizerCanvas.height = visualizerCanvas.clientHeight;
  topVisualizerCanvas.width = topVisualizerCanvas.clientWidth;
  topVisualizerCanvas.height = topVisualizerCanvas.clientHeight;
});
