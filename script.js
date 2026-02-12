const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heartsContainer = document.getElementById("hearts");
const messageEl = document.getElementById("valentineMessage");

/* ---------------- NO BUTTON LOGIC ---------------- */

function randomPosition() {
  const padding = 20;
  const maxX = window.innerWidth - (noBtn?.offsetWidth || 0) - padding;
  const maxY = window.innerHeight - (noBtn?.offsetHeight || 0) - padding;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

function moveNoButton() {
  if (!noBtn) return;

  const { x, y } = randomPosition();

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";

  if (navigator.vibrate) {
    navigator.vibrate(25);
  }
}

window.addEventListener("load", moveNoButton);
setInterval(moveNoButton, 550);

noBtn?.addEventListener("mouseover", moveNoButton);
noBtn?.addEventListener("touchstart", moveNoButton);

/* ---------------- YES NAVIGATION ---------------- */

yesBtn?.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 450);
});

/* Fix blank screen on back navigation */
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

/* ---------------- PHASE 2B: RANDOM MESSAGE ---------------- */

const messages = [
  `Thank you for saying yes.<br><br>
   This response has been logged, verified, and marked as high priority.<br><br>
   Expect warmth, laughter, and a few carefully planned surprises.<br><br>
   Some things are worth building properly.`,

  `You could have said anything.<br>
   You didn’t.<br><br>
   And that means more than you think.<br><br>
   Stay close.<br>
   Something thoughtful is on its way.`,

  `No grand speeches.<br>
   No dramatic promises.<br><br>
   Just this:<br>
   I’m glad it’s you.<br><br>
   Now wait. The good part is loading.`,

  `Your answer has been accepted without retries.<br><br>
   This Valentine comes with attention, intention, and zero shortcuts.<br><br>
   Thank you for trusting the process.`
];

if (messageEl) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  messageEl.innerHTML = messages[randomIndex];
}
