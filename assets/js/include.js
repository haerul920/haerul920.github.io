// assets/js/include.js

document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk memuat file HTML ke dalam elemen
  const loadHTML = (filePath, elementId, callback) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal memuat: " + filePath);
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById(elementId).innerHTML = data;
        if (callback) {
          callback(); // Jalankan fungsi callback setelah konten dimuat
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Muat Header
  loadHTML("/components/header.html", "header-placeholder", () => {
    // Setelah header dimuat, jalankan logika untuk menandai link aktif
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  });

  // Muat Footer
  loadHTML("/components/footer.html", "footer-placeholder", () => {
    // Setelah footer dimuat, jalankan logika untuk tahun copyright dan form email
    const copyrightYearElement = document.getElementById("copyright-year");
    if (copyrightYearElement) {
      copyrightYearElement.textContent = new Date().getFullYear();
    }

    const footerForm = document.getElementById("footer-email-form");
    if (footerForm) {
      footerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailInput = document.getElementById("footer-email-input");
        const message = emailInput.value;
        const yourEmail = "haerulalgifar920@gmail.com";
        const subject = "Message from Portfolio Website";
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${yourEmail}&su=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(message)}`;
        window.open(gmailUrl, "_blank");
        emailInput.value = "";
      });
    }
  });
});
