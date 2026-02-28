// Image Modal elements
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const imageModalClose = document.getElementById("modal-close");

// Contact Modal elements
const contactModal = document.getElementById("contact-modal");
const contactBtn = document.getElementById("contact-btn");
const contactModalClose = document.getElementById("contact-close");

// Open image modal
function openModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.classList.add("active");
}

// Close image modal
function closeImageModal() {
    imageModal.classList.remove("active");
    modalImage.src = "";
}

// Open contact modal
let recaptchaLoaded = false;

function openContactModal() {
  contactModal.classList.add("active");

  if (!recaptchaLoaded) {
    recaptchaLoaded = true;
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6Le8OXEsAAAAAJkXvboavh5ICAWus_nDtUJD9nsz";
    script.onload = function () {
      grecaptcha.ready(function () {
        grecaptcha
          .execute("6Le8OXEsAAAAAJkXvboavh5ICAWus_nDtUJD9nsz", {
            action: "formbackend_frontpage",
          })
          .then(function (token) {
            document.getElementById("g-recaptcha-response").value = token;
          });
      });
    };
    document.head.appendChild(script);
  }
}


// Close contact modal
function closeContactModal() {
    contactModal.classList.remove("active");
}

// Image modal event listeners
imageModalClose.addEventListener("click", closeImageModal);
imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) closeImageModal();
});

// Contact modal event listeners
contactBtn.addEventListener("click", openContactModal);
contactModalClose.addEventListener("click", closeContactModal);
contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) closeContactModal();
});

// Close any modal with Escape key
document.addEventListener("keydown", (e) => {
if (e.key === "Escape") {
    closeImageModal();
    closeContactModal();
}
});
