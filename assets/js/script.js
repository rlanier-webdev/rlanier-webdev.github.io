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
function openContactModal() {
    contactModal.classList.add("active");
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

// Fetch project data from JSON file and build the cards
fetch("projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const grid = document.getElementById("projects-grid");

    projects.forEach((project, index) => {
      // Build the tags HTML
      const tagsHTML = project.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");

      const hasImage = project.image;
      const card = document.createElement(hasImage ? "div" : "a");

      if (!hasImage) {
        card.href = project.link;
        card.target = "_blank";
      }

      card.className = "project-card";
      card.style.animationDelay = `${(index + 1) * 0.1}s`;

      card.innerHTML = `
            <div class="project-top">
                <span class="project-number">${project.number}</span>
                <span class="project-arrow"><i class="fa-solid ${hasImage ? "fa-expand" : "fa-arrow-up-right-from-square"}"></i></span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <p class="project-usecase">Use case: ${project.useCase}</p>
            <div class="project-tags">${tagsHTML}</div>
        `;

      if (hasImage) {
        card.addEventListener("click", () => openModal(project.image));
      }

      grid.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error loading projects:", error);
  });

const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
    })
    .then((res) => {
        if (res.ok) {
            form.innerHTML =
                "<p class='success-msg'>Thanks! I'll be in touch.</p>";
        }
    })
    .catch((err) => {
        form.innerHTML =
            "<p class='error-msg'>Something went wrong. Please email me directly at <a href='mailto:rashundalanier+dev@gmail.com'>rashundalanier+dev@gmail.com</a>.</p>";
    });
});
