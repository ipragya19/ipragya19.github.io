const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heartsContainer = document.getElementById("hearts");

/* ---------------- NO BUTTON LOGIC ---------------- */

function randomPosition() {
  const padding = 20;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

function moveNoButton() {
  if (!noBtn) return;

  const { x, y } = randomPosition();

  noBtn.style.position = "fixed"; // critical for mobile
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none"; // escape parent transforms

  if (navigator.vibrate) {
    navigator.vibrate(25);
  }
}

/* Immediate + continuous movement */
window.addEventListener("load", moveNoButton);
setInterval(moveNoButton, 550);

/* Escape interactions */
noBtn?.addEventListener("mouseover", moveNoButton);
noBtn?.addEventListener("touchstart", moveNoButton);

/* YES button navigation */
yesBtn?.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 450);
});

/* ---------------- PAGE RESTORE FIX ---------------- */

/* Fix blank page when navigating back */
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.body.classList.remove("fade-out");
  }
});

/* ---------------- FLOATING HEARTS ---------------- */

const heartEmojis = ["💙", "💙", "✨"];

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  heart.style.fontSize = 14 + Math.random() * 14 + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 400);
