// Booking form functionality
document.addEventListener("DOMContentLoaded", function () {
  initDatePicker();
  initServiceSelection();
  initBarberSelection();
  initTimeSlots();
  initBookingForm();
});

// Initialize date picker
function initDatePicker() {
  const dateInput = document.getElementById("booking-date");

  if (dateInput) {
    // Set minimum date to today
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    dateInput.setAttribute("min", formattedDate);

    // Handle date selection
    dateInput.addEventListener("change", function () {
      updateTimeSlots();
    });
  }
}

// Initialize service selection
function initServiceSelection() {
  const serviceSelect = document.getElementById("service-id");
  const durationDisplay = document.getElementById("service-duration");
  const priceDisplay = document.getElementById("service-price");

  if (serviceSelect && durationDisplay && priceDisplay) {
    // Store service data from data attributes
    const services = [];

    Array.from(serviceSelect.options).forEach((option) => {
      if (option.value) {
        services.push({
          id: option.value,
          name: option.textContent,
          duration: option.getAttribute("data-duration"),
          price: option.getAttribute("data-price"),
        });
      }
    });

    // Update service info on selection change
    serviceSelect.addEventListener("change", function () {
      const selectedId = this.value;
      const selectedService = services.find(
        (service) => service.id === selectedId
      );

      if (selectedService) {
        durationDisplay.textContent = `${selectedService.duration} minutes`;
        priceDisplay.textContent = `$${selectedService.price}`;
        updateTimeSlots();
      } else {
        durationDisplay.textContent = "--";
        priceDisplay.textContent = "--";
      }
    });

    // Initialize with default selection
    if (serviceSelect.value) {
      serviceSelect.dispatchEvent(new Event("change"));
    }
  }
}

// Initialize barber selection
function initBarberSelection() {
  const barberSelect = document.getElementById("barber-id");

  if (barberSelect) {
    barberSelect.addEventListener("change", function () {
      updateTimeSlots();
    });
  }
}

// Update available time slots based on selected date, service, and barber
function updateTimeSlots() {
  const dateInput = document.getElementById("booking-date");
  const serviceSelect = document.getElementById("service-id");
  const barberSelect = document.getElementById("barber-id");
  const timeSelect = document.getElementById("booking-time");

  if (dateInput && serviceSelect && barberSelect && timeSelect) {
    const selectedDate = dateInput.value;
    const selectedService = serviceSelect.value;
    const selectedBarber = barberSelect.value;

    if (selectedDate && selectedService && selectedBarber) {
      // In a real application, you would make an AJAX request to the server
      // to get available time slots based on the selected date, service, and barber
      // Here, we're simulating this with dummy data

      // Clear existing options
      timeSelect.innerHTML = '<option value="">Select Time</option>';

      // Get day of week (0-6, Sunday-Saturday)
      const dayOfWeek = new Date(selectedDate).getDay();

      // Simulate different time slots for different days
      let startHour, endHour;

      if (dayOfWeek === 0) {
        // Sunday
        startHour = 10;
        endHour = 16;
      } else if (dayOfWeek === 6) {
        // Saturday
        startHour = 9;
        endHour = 18;
      } else {
        // Weekdays
        startHour = 9;
        endHour = 20;
      }

      // Generate time slots at 30-minute intervals
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          // Skip 12:30-13:00 for lunch break
          if (hour === 12 && minute === 30) continue;

          const timeString = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          const option = document.createElement("option");
          option.value = timeString;

          // Format time for display (12-hour format)
          let displayHour = hour;
          let ampm = "AM";

          if (hour >= 12) {
            ampm = "PM";
            if (hour > 12) {
              displayHour = hour - 12;
            }
          }

          if (displayHour === 0) {
            displayHour = 12;
          }

          option.textContent = `${displayHour}:${minute
            .toString()
            .padStart(2, "0")} ${ampm}`;
          timeSelect.appendChild(option);
        }
      }

      // Enable time select
      timeSelect.disabled = false;
    } else {
      // Disable time select if not all required fields are selected
      timeSelect.disabled = true;
    }
  }
}

// Initialize time slots
function initTimeSlots() {
  const timeSelect = document.getElementById("booking-time");

  if (timeSelect) {
    // Disable time select initially
    timeSelect.disabled = true;
  }
}

// Initialize booking form validation
function initBookingForm() {
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      // Get all required fields
      const requiredFields = bookingForm.querySelectorAll("[required]");
      let valid = true;

      // Validate each required field
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          showError(field, "This field is required");
          valid = false;
        } else {
          removeError(field);
        }
      });

      // Validate email format
      const emailInput = document.getElementById("booking-email");
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          showError(emailInput, "Please enter a valid email address");
          valid = false;
        }
      }

      // Validate phone format
      const phoneInput = document.getElementById("booking-phone");
      if (phoneInput && phoneInput.value.trim()) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ""))) {
          showError(phoneInput, "Please enter a valid 10-digit phone number");
          valid = false;
        }
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
