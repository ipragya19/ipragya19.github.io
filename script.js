// Fix blank page on browser back (safe, minimal)
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const heartsContainer = document.getElementById("hearts");
  const particlesContainer = document.getElementById("particles");
  const messageEl = document.getElementById("valentineMessage");
  const music = document.getElementById("music");
  const countdown = document.getElementById("countdown");
  const dots = document.getElementById("dots");

  /* ---------------- NO BUTTON ---------------- */

  function moveNoButton() {
    if (!noBtn) return;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    navigator.vibrate?.(20);
  }

  if (noBtn) {
    moveNoButton();
    setInterval(moveNoButton, 500);
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("touchstart", moveNoButton);
  }

  /* ---------------- YES CLICK EFFECTS ---------------- */

  yesBtn?.addEventListener("click", (e) => {
    sparkleBurst(e.clientX, e.clientY);
    countdown.classList.remove("hidden");
    startDots();

    setTimeout(() => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "yes.html";
      }, 500);
    }, 2200);
  });

  /* ---------------- SPARKLES ---------------- */

  function sparkleBurst(x, y) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent = "✨";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--x", `${Math.random()*120-60}px`);
      p.style.setProperty("--y", `${Math.random()*120-60}px`);
      particlesContainer.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  }

  /* ---------------- COUNTDOWN DOTS ---------------- */

  function startDots() {
    let count = 1;
    setInterval(() => {
      dots.textContent = ".".repeat(count % 4 || 1);
      count++;
    }, 400);
  }

  /* ---------------- HEARTS ON TAP ---------------- */

  document.addEventListener("click", (e) => {
    for (let i = 0; i < 6; i++) {
      const h = document.createElement("div");
      h.className = "heart";
      h.textContent = "💙";
      h.style.left = e.clientX + "px";
      h.style.top = e.clientY + "px";
      h.style.fontSize = "16px";
      h.style.animationDuration = "2.5s";
      heartsContainer.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }
  });

  /* ---------------- FLOATING HEARTS ---------------- */

  setInterval(() => {
    if (!heartsContainer) return;
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💙";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 14 + Math.random() * 14 + "px";
    h.style.animationDuration = 4 + Math.random() * 3 + "s";
    heartsContainer.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 450);

  /* ---------------- MUSIC FADE-IN ---------------- */

  if (music) {
    music.volume = 0;
    music.play().catch(() => {});
    let v = 0;
    const fade = setInterval(() => {
      if (v < 0.8) {
        v += 0.04;
        music.volume = v;
      } else {
        clearInterval(fade);
      }
    }, 100);
  }

  /* ---------------- RANDOM MESSAGE ---------------- */

  if (messageEl) {
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
    messageEl.innerHTML = messages[Math.floor(Math.random() * messages.length)];
  }
});

function sparkBurst() {
  for (let i = 0; i < 22; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 80;

    spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }
}

