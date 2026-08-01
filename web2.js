const audios = [
    document.getElementById("audio0"),
    document.getElementById("audio1"),
    document.getElementById("audio2")
];

const buttons = document.querySelectorAll(".play-btn");
let started = false;
let current = 1;

/* Auto play lagu tengah */
window.onload = () => {
    createHearts(); // hearts tetap jalan
};

document.addEventListener("click", () => {
    if (!started) {
        audios[current].play();
        updateButtons(current, true);
        started = true;
    }
}, { once: true });


/* Play / Pause */
function playSong(index) {

    // Jika klik lagu yang sama
    if (current === index) {

        if (audios[index].paused) {
            audios[index].play();
            updateButtons(index, true);
        } else {
            audios[index].pause();
            updateButtons(index, false);
        }

        started = true;
        return;
    }

    // Jika pindah lagu
    audios.forEach((audio, i) => {
        audio.pause();
        updateButtons(i, false);
    });

    audios[index].play();
    updateButtons(index, true);
    current = index;
    started = true;
}
function updateButtons(index, isPlaying) {
    if (isPlaying) {
        buttons[index].classList.add("active");
        buttons[index].innerHTML = "⏸ Pause";
    } else {
        buttons[index].classList.remove("active");
        buttons[index].innerHTML = "▶ Play Song";
    }
}


/* Falling Hearts Generator */
function createHearts(){
    const container = document.querySelector(".hearts-container");

    setInterval(()=>{
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (3 + Math.random() * 5) + "s";
        container.appendChild(heart);

        setTimeout(()=>{
            heart.remove();
        },8000);
    },400);
}

const starsContainer = document.querySelector(".stars");
const STAR_COUNT = 180;

for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  const size = Math.random() * 2 + 0.5;
  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.opacity = Math.random();
  star.style.animationDuration = Math.random() * 3 + 2 + "s";

  starsContainer.appendChild(star);
}


// ================= POPUP MODE HANDLER =================

const popup = document.getElementById("popup");
const popupIcon = document.querySelector(".popup-icon");
const popupText = document.querySelector(".popup-text");

const playlistSection = document.getElementById("playlist-section");
const finalSection = document.getElementById("final-section");

let currentMode = "playlist";

// Observer untuk playlist & final
const popupObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    // === HALAMAN 2 (PLAYLIST) ===
    if (entry.target === playlistSection && entry.isIntersecting) {
      currentMode = "playlist";
      popup.classList.remove("hide");
      popupIcon.textContent = "🎵";
      popupText.textContent = "Our Playlist";
    }

    // === HALAMAN 8 (FINAL) ===
    if (entry.target === finalSection) {

  // MASUK HALAMAN 8 → HILANG
  if (entry.isIntersecting) {
    popup.classList.add("hide");
  }

  // KELUAR HALAMAN 8 → MUNCUL LAGI (OUR STORY)
  else {
    currentMode = "story";
    popup.classList.remove("hide");
    popupIcon.textContent = "💖";
    popupText.textContent = "Our Story";
  }

}


  });
}, {
  threshold: 0.5
});

popupObserver.observe(playlistSection);
popupObserver.observe(finalSection);

// Scroll handler untuk halaman 3–7
window.addEventListener("scroll", () => {

  const playlistRect = playlistSection.getBoundingClientRect();
  const finalRect = finalSection.getBoundingClientRect();

  // Sudah lewat playlist & belum masuk final
  if (
    playlistRect.bottom < window.innerHeight * 0.6 &&
    finalRect.top > window.innerHeight * 0.6
  ) {
    if (currentMode !== "story") {
      currentMode = "story";
      popup.classList.remove("hide");
      popupIcon.textContent = "💖";
      popupText.textContent = "Our Story";
    }
  }
});

