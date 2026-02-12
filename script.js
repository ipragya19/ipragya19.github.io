const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heartsContainer = document.getElementById("hearts");

/* ---------------- NO BUTTON LOGIC ---------------- */

function randomPosition() {
  const padding = 30;
  const safeTop = window.innerHeight * 0.2;
  const safeBottom = window.innerHeight * 0.85;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = safeBottom - noBtn.offsetHeight - padding;

  return {
    x: Math.random() * maxX,
    y: safeTop + Math.random() * (maxY - safeTop)
  };
}

function moveNoButton() {
  if (!noBtn) return;

  const { x, y } = randomPosition();
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (navigator.vibrate) {
    navigator.vibrate(25);
  }
}

/* Initial + aggressive movement */
window.addEventListener("load", moveNoButton);
setInterval(moveNoButton, 600);

/* Desktop & mobile evasion */
noBtn?.addEventListener("mouseover", moveNoButton);
noBtn?.addEventListener("touchstart", moveNoButton);

/* Yes button transition */
yesBtn?.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 500);
});

/* ---------------- FLOATING HEARTS ---------------- */

const heartEmojis = ["💙", "💙", "✨"];

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 5 + Math.random() * 3 + "s";
  heart.style.fontSize = 14 + Math.random() * 14 + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 450);
