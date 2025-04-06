document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      if (scrollTopBtn) {
        scrollTopBtn.style.display = scrollTop > 300 ? "block" : "none";
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // === SLIDESHOW ===
  const slides = document.getElementsByClassName("slide");
  if (slides.length > 0) {
    let slideIndex = 0;
    let autoSlideInterval;

    function showSlides() {
      for (let slide of slides) {
        slide.style.display = "none";
      }
      slides[slideIndex].style.display = "block";
    }

    function changeSlide(n) {
      slideIndex = (slideIndex + n + slides.length) % slides.length;
      showSlides();
      resetAutoSlide();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlides();
      }, 7000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    const left = document.querySelector(".arrow-left");
    const right = document.querySelector(".arrow-right");

    if (left && right) {
      left.addEventListener("click", () => changeSlide(-1));
      right.addEventListener("click", () => changeSlide(1));
    }

    showSlides();
    startAutoSlide();
  }

  // === SCROLL REVEAL ===
  const revealElements = document.querySelectorAll(".reveal");

  const revealAllInstantly = () => {
    revealElements.forEach((el) => el.classList.add("active"));
  };

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  const initReveal = () => {
    const pageHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    if (pageHeight <= windowHeight + 50) {
      setTimeout(revealAllInstantly, 100);
    } else {
      revealOnScroll();
      window.addEventListener("scroll", revealOnScroll);
    }
  };

  initReveal();
  window.addEventListener("resize", initReveal);

  // === BURGER MENU ===
  const burger = document.querySelector(".burger");
  const navButtons = document.querySelector(".nav-buttons");

  if (burger && navButtons) {
    burger.addEventListener("click", () => {
      navButtons.classList.toggle("active");
      burger.textContent = navButtons.classList.contains("active") ? "✖" : "☰";
    });
  }
});
