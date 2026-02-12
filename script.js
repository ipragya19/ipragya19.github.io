document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const hearts = document.getElementById("hearts");
  const particles = document.getElementById("particles");
  const countdown = document.getElementById("countdown");
  const dots = document.getElementById("dots");
  const messageEl = document.getElementById("valentineMessage");
  const music = document.getElementById("music");

  let dotsTimer = null;

  /* ---------- NO BUTTON ---------- */

  function moveNo() {
    if (!noBtn) return;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    navigator.vibrate?.(20);
  }

  if (noBtn) {
    moveNo();
    setInterval(moveNo, 500);
    noBtn.addEventListener("mouseover", moveNo);
    noBtn.addEventListener("touchstart", moveNo);
  }

  /* ---------- YES CLICK ---------- */

  yesBtn?.addEventListener("click", () => {
    sparkleAtButton(yesBtn);
    showCountdown();

    setTimeout(() => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "yes.html";
      }, 500);
    }, 1800);
  });

  /* ---------- SPARKLE (CLEAN) ---------- */

  function sparkleAtButton(btn) {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent = "✨";
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.setProperty("--x", `${Math.random()*80 - 40}px`);
      p.style.setProperty("--y", `${Math.random()*80 - 40}px`);
      particles.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }

  /* ---------- COUNTDOWN ---------- */

  function showCountdown() {
    countdown.classList.remove("hidden");
    let count = 1;
    dotsTimer = setInterval(() => {
      dots.textContent = ".".repeat(count % 4 || 1);
      count++;
    }, 400);
  }

  /* ---------- HEARTS ---------- */

  document.addEventListener("click", (e) => {
    if (!hearts) return;
    for (let i = 0; i < 4; i++) {
      const h = document.createElement("div");
      h.className = "heart";
      h.textContent = "💙";
      h.style.left = `${e.clientX}px`;
      h.style.top = `${e.clientY}px`;
      h.style.animationDuration = "2.5s";
      hearts.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }
  });

  setInterval(() => {
    if (!hearts) return;
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💙";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = "5s";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 600);

  /* ---------- MUSIC (YES PAGE) ---------- */

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
    }, 120);
  }

  /* ---------- RANDOM MESSAGE ---------- */

  if (messageEl) {
    const messages = [
      `Thank you for saying yes.<br><br>
       This response has been logged, verified, and marked as high priority.<br><br>
       Some things are worth building properly.`,

      `You could have said anything.<br>
       You didn’t.<br><br>
       And that means more than you think.`,

      `No grand speeches.<br><br>
       Just this:<br>
       I’m glad it’s you.`,

      `Your answer has been accepted without retries.<br><br>
       Thank you for trusting the process.`
    ];
    messageEl.innerHTML = messages[Math.floor(Math.random() * messages.length)];
  }

  /* ---------- BACK NAV FIX ---------- */

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("fade-out");
    countdown?.classList.add("hidden");
    if (dotsTimer) clearInterval(dotsTimer);
  });
});
