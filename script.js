document.addEventListener("DOMContentLoaded", () => {
  /* ========== PAGE LOGIC (INTRO) ========== */
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const btnLetsSee = document.getElementById("btnLetsSee");
  const btnLetsFall = document.getElementById("btnLetsFall");

  // Show first button after 3s
  setTimeout(() => {
    btnLetsSee.classList.add("show");
  }, 3000);

  btnLetsSee.addEventListener("click", () => {
    page1.classList.remove("active");
    page2.classList.add("active");
    btnLetsFall.classList.remove("show");
    setTimeout(() => {
      btnLetsFall.classList.add("show");
    }, 3000);
  });

  const poemBook = document.getElementById("poemBook");
  const pageFinalIntro = document.getElementById("pageFinalIntro");
  const btnShowGujarati = document.getElementById("btnShowGujarati");
  const pageFinalGujarati = document.getElementById("pageFinalGujarati");

  /* ========== OPEN FLIPBOOK AFTER "LET'S FALL" ========== */
  btnLetsFall.addEventListener("click", () => {
    page1.classList.remove("active");
    page2.classList.remove("active");
    poemBook.style.display = "flex";
    loadPoem();
  });

  /* ========== POEM FLIPBOOK LOGIC ========== */
  const poemImages = [
    "poem1.jpg",
    "poem2.jpg",
    "poem3.jpg",
    "poem4.jpg",
    "poem5.jpg",
    "poem6.jpg",
    "poem7.jpg",
    "poem8.jpg",
    "poem9.jpg",
    "poem10.jpg",
    "poem11.jpg",
    "poem12.jpg",
    "poem13.jpg",
    "poem14.jpg"
  ];

  const poemTitles = [
    "Her Eyes",
    "Her Smile",
    "Her Voice",
    "Her Kindness",
    "Her Presence",
    "Her Hair",
    "Her Love",
    "Her Beauty",
    "Her Silent Care",
    "Her Listening",
    "Her Patience",
    "Her Promises",
    "Her Lips",
    "Her Hug"
  ];

  let poemIndex = 0;
  const poemPage = document.getElementById("poemPage");
  const prevBtn = document.getElementById("prevPoem");
  const nextBtn = document.getElementById("nextPoem");
  const flipSound = document.getElementById("pageSound");

  function loadPoem() {
    poemPage.style.backgroundImage = `url('${poemImages[poemIndex]}')`;
    document.getElementById("poemTitle").textContent = poemTitles[poemIndex];
  }

  function playFlip() {
    if (!flipSound) return;
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
  }

  nextBtn.addEventListener("click", () => {
    // If not last poem → go to next
    if (poemIndex < poemImages.length - 1) {
      playFlip();
      poemPage.classList.add("flip-next");
      setTimeout(() => {
        poemIndex++;
        loadPoem();
        poemPage.classList.remove("flip-next");
      }, 300);
    } else {
      // last poem → go to final intro page
      poemBook.style.display = "none";
      pageFinalIntro.classList.add("active");
      // show button after slight delay
      setTimeout(() => {
        btnShowGujarati.classList.add("show");
      }, 2000);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (poemIndex > 0) {
      playFlip();
      poemPage.classList.add("flip-prev");
      setTimeout(() => {
        poemIndex--;
        loadPoem();
        poemPage.classList.remove("flip-prev");
      }, 300);
    }
  });

  // Final intro -> Gujarati text page
  btnShowGujarati.addEventListener("click", () => {
    pageFinalIntro.classList.remove("active");
    pageFinalGujarati.classList.add("active");
  });

  /* ================= MUSIC PLAYER LOGIC ================= */
  const audio = document.getElementById("audioElement");
  const playerToggle = document.getElementById("playerToggle");
  const playerPopup = document.getElementById("playerPopup");
  const playerCloseBtn = document.getElementById("playerCloseBtn");

  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevTrackBtn = document.getElementById("prevTrackBtn");
  const nextTrackBtn = document.getElementById("nextTrackBtn");
  const volumeRange = document.getElementById("volumeRange");
  const playlistList = document.getElementById("playlistList");
  const currentTrackTitle = document.getElementById("currentTrackTitle");
  const currentTrackArtist = document.getElementById("currentTrackArtist");

  const playlist = [
    { title: "Darkhaast", src: "Darkhaast.mp3" },
    { title: "First Love", src: "First Love .mp3" },
    { title: "Ishq Chadha Hai", src: "Ishq Chadha Hai .mp3" },
    { title: "I've Got My Eye On You", src: "I've Got my eye on you..mp3" },
    { title: "Jhol (Acoustic)", src: "Maanu - Jhol (Acoustic) .mp3" },
    { title: "Mast Magan", src: "Mast Magan .mp3" },
    { title: "Rabba Mehar Kari", src: "Rabba Mehar Kari .mp3" },
    { title: "Rishte Naate", src: "Rishte Naate .mp3" },
    { title: "Tu Hi Mera", src: "Tu Hi Mera .mp3" },
  ];

  let currentIndex = 0;
  let isPlaying = false;

  function renderPlaylist() {
    playlistList.innerHTML = "";
    playlist.forEach((track, index) => {
      const li = document.createElement("li");
      li.className = "playlist-item";
      li.dataset.index = index;

      const left = document.createElement("div");
      left.className = "playlist-item-left";

      const titleSpan = document.createElement("span");
      titleSpan.className = "playlist-item-title";
      titleSpan.textContent = track.title;

      const artistSpan = document.createElement("span");
      artistSpan.className = "playlist-item-artist";
      artistSpan.textContent = track.artist || "";

      left.appendChild(titleSpan);
      left.appendChild(artistSpan);

      const durationSpan = document.createElement("span");
      durationSpan.className = "playlist-item-duration";
      durationSpan.textContent = track.duration || "";

      li.appendChild(left);
      li.appendChild(durationSpan);

      li.addEventListener("click", () => {
        currentIndex = index;
        loadTrack(currentIndex);
        playAudio();
      });

      playlistList.appendChild(li);
    });

    updateActivePlaylistItem();
  }

  function updateActivePlaylistItem() {
    const items = playlistList.querySelectorAll(".playlist-item");
    items.forEach((item) => {
      const index = Number(item.dataset.index);
      item.classList.toggle("active", index === currentIndex);
    });
  }

  function loadTrack(index) {
    const track = playlist[index];
    if (!track) return;
    audio.src = track.src;
    currentTrackTitle.textContent = track.title;
    currentTrackArtist.textContent = track.artist || "";
    updateActivePlaylistItem();
  }

  function playAudio() {
    if (!audio.src) {
      loadTrack(currentIndex);
    }
    audio.play().then(() => {
      isPlaying = true;
      playPauseBtn.textContent = "⏸";
      playerToggle.classList.add("playing");
    }).catch(() => {});
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";
    playerToggle.classList.remove("playing");
  }

  playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseAudio() : playAudio();
  });

  prevTrackBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
    playAudio();
  });

  nextTrackBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    playAudio();
  });

  audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    playAudio();
  });

  audio.volume = parseFloat(volumeRange.value) || 0.6;
  volumeRange.addEventListener("input", (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  playerToggle.addEventListener("click", () => {
    if (playerPopup.classList.contains("open")) {
      playerPopup.classList.remove("open");
    } else {
      playerPopup.classList.add("open");
    }
  });

  playerCloseBtn.addEventListener("click", () => {
    playerPopup.classList.remove("open");
  });

  if (playlist.length > 0) {
    loadTrack(currentIndex);
  }
  renderPlaylist();
});
