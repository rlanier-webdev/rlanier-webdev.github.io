// Modal elements
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

function openModal(imageSrc) {
    modalImage.src = imageSrc;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
    modalImage.src = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
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
    }
);
