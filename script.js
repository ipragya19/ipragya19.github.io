const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

function randomPosition() {
  const padding = 20;

  // Avoid center area where the card & YES button are
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
  noBtn.style.transform = "none";

  // subtle vibration on mobile
  if (navigator.vibrate) {
    navigator.vibrate(15);
  }
}

/* 🚀 MOVE IMMEDIATELY ON LOAD (key fix) */
window.addEventListener("load", () => {
  moveNoButton();
});

/* 🔁 AUTO MOVE */
setInterval(() => {
  moveNoButton();
}, 1200);

/* 🖱️ Laptop: escape on hover */
noBtn.addEventListener("mouseover", moveNoButton);

/* 📱 Mobile: escape on tap */
noBtn.addEventListener("touchstart", moveNoButton);

/* YES button */
yesBtn.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 500);
});
