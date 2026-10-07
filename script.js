 // Ambil elemen dari HTML
      const form = document.getElementById("registrationForm");
      const nama = document.getElementById("nama");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirmPassword");
      const ekskul = document.getElementById("ekskul");
      const successMessage = document.getElementById("successMessage");

     const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}
      // Fungsi otomatis memilih ekskul & scroll ke form pendaftaran
     function bukaFileEkskul(namaFile) {
        if (namaFile) {
    // Mengarahkan browser ke file/halaman HTML ekskul tujuan
      window.location.href = namaFile;
        }
        }


      // Tampilkan error: border merah + pesan
      function showError(input, errorId, message) {
        input.classList.remove("input-success");
        input.classList.add("input-error");
        document.getElementById(errorId).textContent = message;
      }

      // Tampilkan benar: border hijau, hapus pesan
      function showSuccess(input, errorId) {
        input.classList.remove("input-error");
        input.classList.add("input-success");
        document.getElementById(errorId).textContent = "";
      }

      // Validasi nama
      function validateNama() {
        const value = nama.value.trim();
        if (value === "") {
          showError(nama, "namaError", "Nama tidak boleh kosong.");
          return false;
        }
        if (value.length < 3) {
          showError(nama, "namaError", "Nama minimal 3 karakter.");
          return false;
        }
        showSuccess(nama, "namaError");
        return true;
      }

      // Validasi email
      function validateEmail() {
        const value = email.value.trim();
        const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") {
          showError(email, "emailError", "Email tidak boleh kosong.");
          return false;
        }
        if (!pola.test(value)) {
          showError(email, "emailError", "Format email tidak valid.");
          return false;
        }
        showSuccess(email, "emailError");
        return true;
      }

      // Validasi password
      function validatePassword() {
        const value = password.value;
        if (value === "") {
          showError(password, "passwordError", "Password tidak boleh kosong.");
          return false;
        }
        if (value.length < 8) {
          showError(password, "passwordError", "Password minimal 8 karakter.");
          return false;
        }
        showSuccess(password, "passwordError");
        return true;
      }

      // Validasi konfirmasi password
      function validateConfirmPassword() {
        const value = confirmPassword.value;
        if (value === "") {
          showError(
            confirmPassword,
            "confirmPasswordError",
            "Konfirmasi password tidak boleh kosong.",
          );
          return false;
        }
        if (value !== password.value) {
          showError(
            confirmPassword,
            "confirmPasswordError",
            "Password tidak sama.",
          );
          return false;
        }
        showSuccess(confirmPassword, "confirmPasswordError");
        return true;
      }

      // Validasi pilihan ekstrakurikuler
      function validateEkskul() {
        if (ekskul.value === "") {
          showError(ekskul, "ekskulError", "Silakan pilih ekstrakurikuler.");
          return false;
        }
        showSuccess(ekskul, "ekskulError");
        return true;
      }

      // Event listener real-time saat mengisi
      nama.addEventListener("input", validateNama);
      email.addEventListener("input", validateEmail);
      password.addEventListener("input", function () {
        validatePassword();
        if (confirmPassword.value !== "") {
          validateConfirmPassword();
        }
      });
      confirmPassword.addEventListener("input", validateConfirmPassword);
      ekskul.addEventListener("change", validateEkskul);

      // Event submit form
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const namaOk = validateNama();
        const emailOk = validateEmail();
        const passwordOk = validatePassword();
        const confirmOk = validateConfirmPassword();
        const ekskulOk = validateEkskul();

        if (namaOk && emailOk && passwordOk && confirmOk && ekskulOk) {
          successMessage.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Pendaftaran Berhasil! Selamat bergabung di <strong>${ekskul.value}</strong>.`;
          successMessage.style.display = "block";

          form.reset();
          [nama, email, password, confirmPassword, ekskul].forEach((input) => {
            input.classList.remove("input-success", "input-error");
          });
        } else {
          successMessage.style.display = "none";
        }
      });

      // ===== SYSTEM SEARCH & FILTER EKSKUL =====
      const searchInput = document.getElementById("searchEkskul");
      const filterButtons = document.querySelectorAll(".filter-pill");
      const ekskulItems = document.querySelectorAll(".ekskul-card-item");

      function filterEkskul() {
        const query = searchInput.value.toLowerCase();
        const activeFilter = document
          .querySelector(".filter-pill.active")
          .getAttribute("data-filter");

        ekskulItems.forEach((item) => {
          const name = item.getAttribute("data-name").toLowerCase();
          const category = item.getAttribute("data-category");

          const matchesSearch = name.includes(query);
          const matchesCategory =
            activeFilter === "all" || category === activeFilter;

          if (matchesSearch && matchesCategory) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }

      searchInput.addEventListener("input", filterEkskul);

      filterButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          filterButtons.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          filterEkskul();
        });
      });