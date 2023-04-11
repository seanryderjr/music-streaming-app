
  
  const tracks = [
    {
      name: 'Rock and Roll All Nite',
      artist: 'Kiss',
      source: 'images/music/KISS_Rock_And_Roll_All_Nite.mp3',
      image: 'images/kiss.jpg'
    },
    {
      name: 'Enter Sandman',
      artist: 'Metallica',
      source: 'images/music/Metallica_Enter_Sandman.mp3',
      image: 'images/metallica1.jpg'
    },
    {
      name: 'Master of Puppets',
      artist: 'Metallica',
      source: 'images/music/Metallica_Master_Of_Puppets.mp3',
      image: 'images/master.jpg'
    }
  ];
  
  let currentTrack = 0;
  const audio = new Audio();
  
  function displayTrack() {
    const track = tracks[currentTrack];
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const songImage = document.querySelector('.song-image');
  
    songTitle.textContent = track.name;
    songArtist.textContent = track.artist;
    songImage.src = track.image;
  
    audio.src = track.source;
  }
  
  function playTrack() {
    audio.play();
  }
  
  function pauseTrack() {
    audio.pause();
  }
  
  function skipTrack() {
    if (currentTrack === tracks.length - 1) {
      currentTrack = 0;
    } else {
      currentTrack++;
    }
  
    displayTrack();
  }
  
  function updateProgress() {
    const progress = document.querySelector('#progress');
    const progressBar = document.querySelector('.progress-bar-fill');
    const handle = document.querySelector('.progress-bar-handle');
    const duration = audio.duration;
    const currentTime = audio.currentTime;
  
    progress.value = (currentTime / duration) * 100;
    handle.style.left = `${progress.value}%`;
    handle.setAttribute('data-time', formatTime(currentTime));
    progress.setAttribute('aria-valuenow', progress.value);
  
    const remainingTime = formatTime(duration - currentTime);
    const totalTime = formatTime(duration);
    const progressLabel = `${remainingTime}/${totalTime}`;
    const label = document.querySelector('label[for="progress"]');
    label.textContent = progressLabel;
  
    if (currentTime === duration) {
      skipTrack();
    }
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
  
  displayTrack();
  
  const playButton = document.querySelector('.play-button');
  const skipButton = document.querySelector('.skip-button');
  const backButton = document.querySelector('.back-button');
  
  playButton.addEventListener('click', playTrack);
  skipButton.addEventListener('click', skipTrack);
  backButton.addEventListener('click', function () {
    if (audio.currentTime > 5) {
      audio.currentTime = 0;
    } else {
      if (currentTrack === 0) {
        currentTrack = tracks.length - 1;
      } else {
        currentTrack--;
      }
      displayTrack();
    }
  });
  
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', skipTrack);