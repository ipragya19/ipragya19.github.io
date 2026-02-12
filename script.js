const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heartsContainer = document.getElementById("hearts");

/* ---------------- NO BUTTON LOGIC ---------------- */

function randomPosition() {
  const padding = 20;
  const safeTop = window.innerHeight * 0.25;
  const safeBottom = window.innerHeight * 0.9;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = safeBottom - noBtn.offsetHeight - padding;

  return {
    x: Math.random() * maxX,
    y: safeTop + Math.random() * (maxY - safeTop)
  };
}

function moveNoButton() {
  const { x, y } = randomPosition();
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (navigator.vibrate) {
    navigator.vibrate(15);
  }
}

window.addEventListener("load", moveNoButton);
setInterval(moveNoButton, 1200);
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 500);
});

/* ---------------- FLOATING HEARTS ---------------- */

const heartEmojis = ["💙", "💎", "✨"];

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  heart.style.fontSize = 14 + Math.random() * 12 + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

setInterval(createHeart, 600);
