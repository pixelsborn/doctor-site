/* =========================
   GLOBAL INIT
========================== */
(function () {

  document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       AUTO ACTIVE NAV LINK
    ========================== */
    const currentPath = window.location.pathname.replace(/\/$/, "");

    document.querySelectorAll('.navbar a').forEach(link => {
      try {
        const url = new URL(link.getAttribute("href"), window.location.origin);
        const linkPath = url.pathname.replace(/\/$/, "");

        if (linkPath && currentPath === linkPath) {
          link.classList.add('active-link');

          const dropdown = link.closest('.dropdown');
          if (dropdown) {
            dropdown.classList.add('show');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.classList.add('active-link');
          }
        }
      } catch (e) {
        // ignore invalid href like "#"
      }
    });


    /* =========================
       TESTIMONIAL SLIDER (FIXED)
    ========================== */
    document.querySelectorAll('.testimonial-slider').forEach(slider => {

      const track = slider.querySelector('.testimonial-track');
      const items = slider.querySelectorAll('.testimonial-item');
      const prev = slider.querySelector('.prev');
      const next = slider.querySelector('.next');
      const dotsContainer = slider.querySelector('.dots');

      if (!track || !items.length || !prev || !next || !dotsContainer) return;

      let index = 0;
      const total = items.length;

      // Clear old dots (important)
      dotsContainer.innerHTML = '';

      items.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
          index = i;
          update();
        });
      });

      const dots = dotsContainer.querySelectorAll('span');

      function update() {
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      }

      next.addEventListener('click', () => {
        index = (index + 1) % total;
        update();
      });

      prev.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        update();
      });

      /* SWIPE SUPPORT */
      let startX = 0;

      track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
      });

      track.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) next.click();
        if (startX < endX - 50) prev.click();
      });

    });


    /* =========================
       SCROLL TO TOP
    ========================== */
    const scrollBtn = document.querySelector(".scroll-top");

    if (scrollBtn) {
      window.addEventListener("scroll", () => {
        scrollBtn.classList.toggle("active", window.scrollY > 300);
      });

      scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }


    /* =========================
       REVEAL ANIMATION
    ========================== */
    const reveals = document.querySelectorAll('.reveal');

    window.addEventListener('load', () => {
      reveals.forEach(el => el.classList.add('active'));
    });


    /* =========================
       YEAR AUTO UPDATE
    ========================== */
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      });
    }

  });

})();

const buttons = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".treat-item");

buttons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    buttons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    items.forEach(item=>{
      item.style.display =
        (filter === "all" || item.dataset.category === filter)
        ? "block" : "none";
    });
  });
});

$(document).ready(function(){

  $('.blog-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,

    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,

    smartSpeed: 800,
    slideTransition: 'linear',   // 👈 smooth continuous feel

    fluidSpeed: 800,
    dragEndSpeed: 800,

    responsive:{
      0:{items:1.2},
      600:{items:2.2},
      1000:{items:2.5}   // 👈 partial next card visible (premium feel)
    }
  });

});