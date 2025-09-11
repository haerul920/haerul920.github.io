// KODE BARU untuk assets/js/script.js

document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // 2. Animasi Teks Berganti (Typing Effect)
  // Cari elemen animasi di halaman mana pun yang aktif
  const animatedTextElement =
    document.getElementById("animated-text") ||
    document.getElementById("animated-text-about");

  if (animatedTextElement) {
    const professions = [
      "Full Stack Developer",
      "UI/UX Designer",
      "Internet of Things Engineer",
    ];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayBetweenWords = 2000;

    function type() {
      const currentProfession = professions[professionIndex];

      if (isDeleting) {
        // Hapus karakter
        animatedTextElement.textContent = currentProfession.substring(
          0,
          charIndex - 1
        );
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          professionIndex = (professionIndex + 1) % professions.length;
        }
      } else {
        // Tambah karakter
        animatedTextElement.textContent = currentProfession.substring(
          0,
          charIndex + 1
        );
        charIndex++;
        if (charIndex === currentProfession.length) {
          isDeleting = true;
          setTimeout(type, delayBetweenWords);
          return;
        }
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(type, speed);
    }

    type();
  }

  // 3. Efek Header saat di-scroll
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50 && lastScrollY < window.scrollY) {
      // Scroll ke bawah dan bukan di paling atas
      header.style.top = `-${header.offsetHeight}px`;
    } else {
      // Scroll ke atas
      header.style.top = "0";
    }
    lastScrollY = window.scrollY;
  });
});
// ... (kode JS yang sudah ada sebelumnya) ...

// 4. OTOMATISASI TAHUN PADA COPYRIGHT FOOTER
document.addEventListener("DOMContentLoaded", function () {
  const copyrightYearElement = document.getElementById("copyright-year");
  if (copyrightYearElement) {
    copyrightYearElement.textContent = new Date().getFullYear();
  }
});
// ... (kode JS Anda yang sudah ada sebelumnya) ...

// 5. LIGHT/DARK MODE TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle-button");
  const body = document.body;
  const themeIcon = themeToggleButton.querySelector("i");

  // Fungsi untuk mengubah tema dan ikon
  function setTheme(isLight) {
    body.classList.toggle("light-mode", isLight);
    themeIcon.classList.add("changing"); // Tambah class untuk animasi keluar

    setTimeout(() => {
      if (isLight) {
        themeIcon.classList.remove("bxs-sun");
        themeIcon.classList.add("bxs-moon");
      } else {
        themeIcon.classList.remove("bxs-moon");
        themeIcon.classList.add("bxs-sun");
      }
      themeIcon.classList.remove("changing"); // Hapus class agar ikon muncul kembali
    }, 200); // Durasi harus setengah dari transisi di CSS

    // Simpan preferensi pengguna di localStorage
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // Cek tema yang tersimpan saat halaman dimuat
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  // Tentukan tema awal: prioritas ke simpanan, lalu preferensi OS, defaultnya dark
  let initialThemeIsLight = savedTheme ? savedTheme === "light" : prefersLight;
  setTheme(initialThemeIsLight);

  // Event listener untuk tombol klik
  themeToggleButton.addEventListener("click", () => {
    const isCurrentlyLight = body.classList.contains("light-mode");
    setTheme(!isCurrentlyLight); // Balikkan tema saat ini
  });
});
// === Background particles (tsparticles) ===
document.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("tsparticles", {
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 3 },
      },
    },
    particles: {
      color: { value: ["#00ffcc", "#33ff99", "#00ffaa"] },
      links: {
        color: "#00ffcc",
        distance: 120,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        random: true,
        outModes: { default: "bounce" },
      },
      number: { value: 60, density: { enable: true, area: 800 } },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  });
});

// === Cursor burst circles (versi smooth & kecil) ===
const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class CircleParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 1.5 + 1; // lebih kecil
    this.color = ["#00ffcc", "#33ff99", "#00ffaa"][
      Math.floor(Math.random() * 3)
    ];
    this.speedX = (Math.random() - 0.5) * 2; // gerakan lebih pelan
    this.speedY = (Math.random() - 0.5) * 2;
    this.opacity = 1;
    this.decay = 0.01; // hilangnya lebih smooth
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.decay;
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].opacity <= 0) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) {
    // lebih sedikit
    particlesArray.push(new CircleParticle(e.x, e.y));
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// ... (semua kode JS Anda yang sudah ada sebelumnya) ...

// ---------------------------------------------------------------------
// 7. FORM FOOTER MENGARAH KE GMAIL
// ---------------------------------------------------------------------
const footerForm = document.getElementById("footer-email-form");
if (footerForm) {
  footerForm.addEventListener("submit", function (event) {
    // 1. Mencegah form melakukan submit standar
    event.preventDefault();

    // 2. Ambil elemen input dan pesannya
    const emailInput = document.getElementById("footer-email-input");
    const message = emailInput.value;

    // 3. Tentukan alamat email tujuan dan subjek
    const yourEmail = "haerulalgifar920@gmail.com";
    const subject = "Message from Portfolio Website";

    // 4. Buat URL Gmail dengan parameter yang sudah di-encode
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${yourEmail}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    // 5. Buka Gmail di tab baru dan fokus ke sana
    const newTab = window.open(gmailUrl, "_blank");
    if (newTab) {
      newTab.focus();
    }

    // 6. (Opsional) Kosongkan kembali input field setelah submit
    emailInput.value = "";
  });
}
