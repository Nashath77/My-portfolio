document.addEventListener("DOMContentLoaded", () => {
  // Navigation scroll effect
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinksContainer = document.getElementById("navLinks");
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
    });
  }

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinksContainer) navLinksContainer.classList.remove("open");
    });
  });

  // Scroll animations
  const fadeElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right",
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  let skillsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate skill bars once when the skills section becomes visible
        if (
          !skillsAnimated &&
          entry.target.closest &&
          entry.target.closest("#skills")
        ) {
          skillsAnimated = true;
          const skillFills = document.querySelectorAll("#skills .skill-fill");
          skillFills.forEach((fill, i) => {
            const widthAttr = fill.getAttribute("data-width") || "";
            const cleaned = widthAttr.toString().trim();
            const width = cleaned.endsWith("%") ? cleaned : cleaned + "%";
            setTimeout(
              () => {
                fill.style.width = width;
              },
              300 + i * 100,
            );
          });
        }
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
