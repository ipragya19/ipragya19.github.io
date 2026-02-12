// Fix blank page on back navigation
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

/* ---------- INDEX PAGE ---------- */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const countdown = document.getElementById("countdown");

if (noBtn) {
  function moveNoButton() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  setInterval(moveNoButton, 700);

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", moveNoButton);
}

if (yesBtn) {
  let count = 3;
  yesBtn.addEventListener("click", () => {
    fireworksBurst();
    countdown.textContent = "Preparing something special…";

    const timer = setInterval(() => {
      countdown.textContent = `Redirecting in ${count}…`;
      count--;
      if (count < 0) {
        clearInterval(timer);
        window.location.href = "yes.html";
      }
    }, 700);
  });
}

/* ---------- YES PAGE ---------- */
const messages = [
  "Thank you for saying yes. Some moments don’t need grand gestures — just sincerity.",
  "You chose yes, and that already makes this Valentine special.",
  "This wasn’t a question. It was an inevitability.",
  "Simple choices. Meaningful consequences. Happy Valentine’s."
];

const msg = document.getElementById("dynamicMessage");
if (msg) {
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];
}

/* Music fade-in */
const music = document.getElementById("music");
if (music) {
  music.volume = 0;
  music.play().catch(() => {});
  let v = 0;
  const fade = setInterval(() => {
    v += 0.04;
    music.volume = Math.min(v, 0.8);
    if (v >= 0.8) clearInterval(fade);
  }, 120);
}

/* Fireworks */
function fireworksBurst() {
  for (let i = 0; i < 24; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";
    const angle = Math.random() * 2 * Math.PI;
    const dist = 120 + Math.random() * 80;
    spark.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}

/* Floating hearts on tap/click */
document.addEventListener("click", () => {
  const heart = document.createElement("div");
  heart.className = "heart-float";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
});
