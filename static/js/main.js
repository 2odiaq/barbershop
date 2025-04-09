// Main JavaScript for Precision Cuts Barbershop

document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initNavbar();
  initServiceFilters();
  initGalleryLightbox();
  initTestimonialForm();
  initBackToTop();
  initAnimations();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }
}

// Service category filtering
function initServiceFilters() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const serviceItems = document.querySelectorAll(".service-item");

  if (categoryBtns.length && serviceItems.length) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        categoryBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Get selected category
        const category = this.getAttribute("data-category");

        // Show all services if 'all' category is selected
        if (category === "all") {
          serviceItems.forEach((item) => {
            item.style.display = "block";
          });
        } else {
          // Filter services by category
          serviceItems.forEach((item) => {
            if (item.getAttribute("data-category") === category) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        }
      });
    });
  }
}

// Gallery lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryItems.length) {
    galleryItems.forEach((item) => {
      const link = item.querySelector("a");
      if (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const imgSrc = this.getAttribute("href");
          const alt = this.querySelector("img").getAttribute("alt");

          // Create lightbox
          const lightbox = document.createElement("div");
          lightbox.className = "lightbox";
          lightbox.innerHTML = `
                        <div class="lightbox-content">
                            <button class="close-lightbox">&times;</button>
                            <img src="${imgSrc}" alt="${alt}">
                            <p>${alt}</p>
                        </div>
                    `;

          // Add lightbox to body
          document.body.appendChild(lightbox);
          document.body.style.overflow = "hidden";

          // Close lightbox on click
          lightbox.addEventListener("click", function () {
            document.body.removeChild(lightbox);
            document.body.style.overflow = "";
          });
        });
      }
    });
  }
}

// Testimonial form validation
function initTestimonialForm() {
  const testimonialForm = document.getElementById("testimonial-form");

  if (testimonialForm) {
    testimonialForm.addEventListener("submit", function (e) {
      const nameInput = document.getElementById("testimonial-name");
      const contentInput = document.getElementById("testimonial-content");
      const ratingInputs = document.querySelectorAll('input[name="rating"]');

      let valid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your name");
        valid = false;
      } else {
        removeError(nameInput);
      }

      // Validate content
      if (!contentInput.value.trim()) {
        showError(contentInput, "Please share your experience");
        valid = false;
      } else {
        removeError(contentInput);
      }

      // Validate rating
      let ratingSelected = false;
      ratingInputs.forEach((input) => {
        if (input.checked) {
          ratingSelected = true;
        }
      });

      if (!ratingSelected) {
        const ratingContainer = document.querySelector(".rating-container");
        showError(ratingContainer, "Please select a rating");
        valid = false;
      } else {
        const ratingContainer = document.querySelector(".rating-container");
        removeError(ratingContainer);
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }
}

// Show error message
function showError(input, message) {
  const formGroup = input.closest(".form-group") || input.parentElement;
  const errorElement =
    formGroup.querySelector(".error-message") || document.createElement("div");

  if (!formGroup.querySelector(".error-message")) {
    errorElement.className = "error-message text-danger mt-1";
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
  input.classList.add("is-invalid");
}

// Remove error message
function removeError(input) {
  const formGroup = input.closest(".form-group") || input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");

  if (errorElement) {
    formGroup.removeChild(errorElement);
  }

  input.classList.remove("is-invalid");
}

// Back to top button
function initBackToTop() {
  const scrollToTopBtn = document.createElement("a");
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollToTopBtn.setAttribute("href", "#");
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("active");
    } else {
      scrollToTopBtn.classList.remove("active");
    }
  });

  scrollToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Scroll animations
function initAnimations() {
  const animatedElements = document.querySelectorAll(".animate");

  if (animatedElements.length) {
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    // Add animation class when element is in viewport
    function checkAnimations() {
      animatedElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("animated");
        }
      });
    }

    // Check animations on scroll
    window.addEventListener("scroll", checkAnimations);

    // Check animations on page load
    checkAnimations();
  }
}
