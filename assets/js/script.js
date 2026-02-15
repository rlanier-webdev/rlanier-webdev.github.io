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

        // Build the full card
        const card = document.createElement("a");
        card.href = project.link;
        card.target = "_blank";
        card.className = "project-card";
        card.style.animationDelay = `${(index + 1) * 0.1}s`;

        card.innerHTML = `
            <div class="project-top">
                <span class="project-number">${project.number}</span>
                <span class="project-arrow">↗</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <p class="project-usecase">Use case: ${project.useCase}</p>
            <div class="project-tags">${tagsHTML}</div>
        `;

        grid.appendChild(card);
    });
    })
    .catch((error) => {
        console.error("Error loading projects:", error);
    }
);
