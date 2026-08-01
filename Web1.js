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

/* LOVE TIME COUNTER */
const startDate = new Date(2025, 0, 6, 21, 0, 0);
// Januari = 0
const stopDate = new Date(2026, 3, 12, 12, 0, 0);
// April = 3

function updateLoveTime() {
  const now = new Date();
  const displayDate = now > stopDate ? stopDate : now;

  let years = displayDate.getFullYear() - startDate.getFullYear();
  let months = displayDate.getMonth() - startDate.getMonth();
  let days = displayDate.getDate() - startDate.getDate();
  let hours = displayDate.getHours() - startDate.getHours();
  let minutes = displayDate.getMinutes() - startDate.getMinutes();
  let seconds = displayDate.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const prevMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 0).getDate();
    days += prevMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById("loveTime").innerHTML =
    `💖 Kita sudah bersama selama<br>
     <strong>
     ${years} tahun · ${months} bulan · ${days} hari<br>
     ${hours} jam · ${minutes} menit · ${seconds} detik
     </strong>`;
}

setInterval(updateLoveTime, 1000);
updateLoveTime();
