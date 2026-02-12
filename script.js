const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

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
  const { x, y } = randomPosition();

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";

  // subtle vibration on mobile
  if (navigator.vibrate) {
    navigator.vibrate(15);
  }
}

/* 🔁 AUTO MOVE (key fix for mobile) */
setInterval(() => {
  moveNoButton();
}, 1200); // moves every 1.2 seconds

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
