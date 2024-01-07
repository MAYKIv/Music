document.addEventListener("DOMContentLoaded", function () {
  const audio = new Audio();
  const progressBar = document.querySelector(".progress-bar");
  const trackTitle = document.querySelector(".track-title");
  const artist = document.querySelector(".artist");
  const albumCover = document.querySelector(".album-cover");

  const playlist = [
    { title: "Rizza", artist: "", src: "Musick/Rizza.mp3", cover: "images/Rizza.png" },
    { title: "Face", artist: "", src: "Musick/FACEMY.mp3", cover: "images/Face.jpg" },
    { title: "Bunny", artist: "", src: "Musick/bunnyparty.mp3", cover: "images/Bunny.jpg" },
    { title: "Gudzon", artist: "", src: "Musick/Gudzon.mp3", cover: "images/Gudzon.jpg" },
    { title: "Phonk", artist: "", src: "Musick/House.mp3", cover: "images/House.jpg" },
    { title: "Koseta", artist: "", src: "Musick/Koseta.mp3", cover: "images/Kosetta.jpg" },
    { title: "Tesno", artist: "", src: "Musick/akane.mp3", cover: "images/askane.png" },
    { title: "Genealen", artist: "", src: "Musick/genealen.mp3", cover: "images/genealen.jpg" },
    { title: "Vino", artist: "", src: "Musick/Rozovoevino.mp3", cover: "images/Rozovoevino.jpg" },
    { title: "Lemon Demon", artist: "", src: "Musick/lemon.mp3", cover: "images/lemon.jpg" },

  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    artist.textContent = track.artist;
    albumCover.src = track.cover;
  }

  loadTrack(currentTrackIndex);

  document.querySelector(".play-pause").addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
  });

  document.querySelector(".skip-backward").addEventListener("click", function () {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      audio.play();
    }
  });

  document.querySelector(".skip-forward").addEventListener("click", function () {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      audio.play();
    }
  });

  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  });

  audio.addEventListener("ended", function () {
    document.querySelector(".skip-forward").click();
  });

  progressBar.parentElement.addEventListener("click", function (event) {
    const clickX = event.clientX - progressBar.parentElement.getBoundingClientRect().left;
    const progressBarWidth = progressBar.parentElement.clientWidth;
    const newProgress = (clickX / progressBarWidth) * 100;
    progressBar.style.width = newProgress + "%";
    audio.currentTime = (newProgress / 100) * audio.duration;
  });
});
