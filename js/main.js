/* ============================================
   DailyVerse Bible App — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. Mobile Hamburger Menu Toggle
     ------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  /* ------------------------------------------
     2. Navbar Scroll Effect
     — Adds `.scrolled` class after 50px of
       scroll so CSS can swap from transparent
       to a solid background.
     ------------------------------------------ */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    // Apply correct state on load (in case user refreshes mid-page)
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);
  }

  /* ------------------------------------------
     3. Smooth Scroll for Anchor Links
     — Offsets by the navbar height so the
       target section isn't hidden behind it.
     ------------------------------------------ */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Skip empty hash links
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  /* ------------------------------------------
     4. Scroll Animations (Intersection Observer)
     — Elements with `.fade-in` receive a
       `.visible` class once they scroll into
       view (threshold 10 %).
     ------------------------------------------ */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible (animation plays only once)
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
  }

  /* ------------------------------------------
     5. FAQ Accordion
     — Clicking a `.faq-question` toggles
       `.active` on its parent `.faq-item` and
       shows / hides the `.faq-answer`.
     ------------------------------------------ */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const parentItem = question.closest('.faq-item');
      if (!parentItem) return;

      // Close other open items (optional accordion behaviour)
      faqQuestions.forEach((q) => {
        const otherItem = q.closest('.faq-item');
        if (otherItem && otherItem !== parentItem) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle the clicked item
      parentItem.classList.toggle('active');
    });
  });

  /* ------------------------------------------
     6. Contact Form Handling
     — Prevents default submission and shows
       a confirmation message.
     ------------------------------------------ */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you! We'll get back to you within 48 hours.");
      contactForm.reset();
    });
  }

  /* ------------------------------------------
     7. Close Mobile Menu on Nav Link Click
     — Ensures the menu collapses after the
       user selects a destination.
     ------------------------------------------ */
  if (navLinks) {
    const navItems = navLinks.querySelectorAll('a');

    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      });
    });
  }

  /* ------------------------------------------
     8. Current Year in Footer
     — Auto-updates the element with
       id="current-year" to the current year.
     ------------------------------------------ */
  const yearEl = document.getElementById('current-year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
