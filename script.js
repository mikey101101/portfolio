
/* ==========================================
   DEVELOPER PORTFOLIO
   PROJECT DATA & INTERACTIONS
   ========================================== */

const projects = [
  {
    id: "hollow",
    title: "The Hollow Spire",
    year: "current",
    period: "2026 — Goldsmiths, University of London",
    subtitle: "Interactive browser game",
    description:
      "The Hollow Spire is an interactive browser-based game developed during my Computer Science undergraduate studies at Goldsmiths, University of London. The project explores interactive storytelling, gameplay mechanics, visual design and frontend programming.",
    tech: ["HTML", "CSS", "JavaScript"],
    images: [
      "images/hollow-1.webp",
      "images/hollow-2.webp",
      "images/hollow-3.webp",
      "images/hollow-4.webp",
      "images/hollow-5.webp",
      "images/hollow-6.webp"
    ]
  },

  {
    id: "gaming",
    title: "Gaming Map",
    year: "current",
    period: "2026 — Goldsmiths, University of London",
    subtitle: "Interactive Gaming Map",
    description:
      "Gaming Map is an interactive web project developed during my undergraduate studies at Goldsmiths, University of London. It focuses on visual navigation, interactive elements and presenting gaming-related content through an accessible web interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    images: [
      "images/gaming-1.webp",
      "images/gaming-2.webp",
      "images/gaming-3.webp",
      "images/gaming-4.webp",
      "images/gaming-5.webp",
      "images/gaming-6.webp"
    ]
  },

  {
    id: "newjeans",
    title: "NewJeans Archive",
    year: "2025",
    period:
      "2025 — City, University of London · Computer Science Foundation Year",
    subtitle: "Interactive music and artist website",
    description:
      "NewJeans Archive is an interactive music-inspired website developed in 2025 during my Computer Science Foundation Year at City, University of London. The project explores creative frontend development, artist presentation, interactive elements and user interface design.",
    tech: ["HTML", "CSS", "JavaScript"],
    images: [
      "images/newjeans-1.webp",
      "images/newjeans-2.webp",
      "images/newjeans-3.webp",
      "images/newjeans-4.webp",
      "images/newjeans-5.webp",
      "images/newjeans-6.webp"
    ]
  },

  {
    id: "heritage",
    title: "Heritage",
    year: "2025",
    period:
      "2025 — City, University of London · Computer Science Foundation Year",
    subtitle: "Travel and cultural discovery website",
    description:
      "UK Heritage Trails is a travel and cultural discovery website developed in 2025 during my Computer Science Foundation Year at City, University of London. It explores responsive web design, destination presentation, visual storytelling and interactive frontend development.",
    tech: ["HTML", "CSS", "JavaScript"],
    images: [
      "images/heritage-1.webp",
      "images/heritage-2.webp",
      "images/heritage-3.webp",
      "images/heritage-4.webp"
    ]
  }
];

/* ==========================================
   DOM ELEMENTS
   ========================================== */

const grid = document.getElementById("project-grid");
const dialog = document.getElementById("project-dialog");

/* ==========================================
   CREATE TECHNOLOGY TAGS
   ========================================== */

function makeTags(technologies) {
  return technologies.map(tech => {
    const span = document.createElement("span");
    span.textContent = tech;
    return span;
  });
}

/* ==========================================
   IMAGE FALLBACK
   ========================================== */

function createPlaceholder(title) {
  const placeholder = document.createElement("div");

  placeholder.className = "placeholder";
  placeholder.textContent = title;

  return placeholder;
}

/* ==========================================
   CREATE PROJECT CARDS
   ========================================== */

function createProjectCard(project) {
  const article = document.createElement("article");

  article.className = "project";
  article.dataset.year = project.year;

  const button = document.createElement("button");

  button.type = "button";
  button.className = "project-button";
  button.setAttribute(
    "aria-label",
    `View ${project.title} project details`
  );

  /* PROJECT IMAGE */

  const imageBox = document.createElement("div");
  imageBox.className = "project-image";

  if (project.images.length > 0) {
    const img = document.createElement("img");

    img.src = project.images[0];
    img.alt = `${project.title} website screenshot`;
    img.loading = "lazy";

    img.onerror = () => {
      img.remove();
      imageBox.appendChild(createPlaceholder(project.title));
    };

    imageBox.appendChild(img);
  } else {
    imageBox.appendChild(createPlaceholder(project.title));
  }

  /* PROJECT INFORMATION */

  const content = document.createElement("div");
  content.className = "project-content";

  const meta = document.createElement("div");
  meta.className = "project-meta";

  const fileName = document.createElement("span");
  fileName.textContent = `${project.id}.project`;

  const arrow = document.createElement("span");
  arrow.textContent = "↗";

  meta.append(fileName, arrow);

  const heading = document.createElement("h3");
  heading.textContent = project.title;

  const subtitle = document.createElement("p");
  subtitle.textContent = project.subtitle;

  const tags = document.createElement("div");
  tags.className = "tags";
  tags.append(...makeTags(project.tech));

  content.append(meta, heading, subtitle, tags);

  button.append(imageBox, content);

  button.addEventListener("click", () => {
    openProject(project);
  });

  article.appendChild(button);

  return article;
}

/* ==========================================
   DISPLAY PROJECTS
   ========================================== */

if (grid) {
  projects.forEach(project => {
    grid.appendChild(createProjectCard(project));
  });
}

/* ==========================================
   PROJECT FILTERS
   ========================================== */

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    document.querySelectorAll(".project").forEach(card => {
      card.hidden =
        filter !== "all" &&
        card.dataset.year !== filter;
    });
  });
});

/* ==========================================
   PROJECT DETAIL POPUP
   ========================================== */

function openProject(project) {
  if (!dialog) return;

  document.getElementById("dialog-date").textContent =
    project.period;

  document.getElementById("dialog-title").textContent =
    project.title;

  document.getElementById("dialog-description").textContent =
    project.description;

  /* TECHNOLOGIES */

  const tags = document.getElementById("dialog-tags");
  tags.replaceChildren(...makeTags(project.tech));

  /* SCREENSHOT GALLERY */

  const gallery = document.getElementById("dialog-gallery");
  gallery.replaceChildren();

  project.images.forEach((source, index) => {
    const img = document.createElement("img");

    img.src = source;
    img.alt = `${project.title} screenshot ${index + 1}`;
    img.loading = "lazy";

    img.onerror = () => {
      img.remove();
    };

    gallery.appendChild(img);
  });

  dialog.showModal();
}

/* ==========================================
   CLOSE PROJECT POPUP
   ========================================== */

const closeButton = document.getElementById("close-dialog");

if (closeButton && dialog) {
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

/* ==========================================
   CONSOLE MESSAGE
   ========================================== */

console.log(
  "%c Developer Portfolio Loaded ",
  "background:#007acc;color:white;padding:8px;font-family:Consolas;"
);

console.log("Projects loaded:", projects.length);
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const message = document.getElementById("form-status");

    if (message) {
      message.textContent = "Message validated successfully! Message will be sent by 2030.";
    }
  });
}
