(function () {
  var projects = {
    "gimbal-cli": {
      title: "Gimbal CLI",
      subtitle: "Java, Maven, CLI Architecture, Developer Automation",
      liveUrl: "https://gimbal-docs.netlify.app/#/",
      sourceUrl: "https://github.com/PravinChoudhary11",
      facts: [
        "Role: Individual creator and maintainer",
        "Stack: Java, Maven, CLI tooling",
        "Category: Developer productivity",
        "Priority: Flagship personal project"
      ],
      what: "Gimbal CLI is a command-line toolkit that streamlines repetitive development tasks into simple, discoverable commands. It reduces manual setup steps and gives developers a faster and more consistent workflow.",
      how: "I designed it with modular command handlers, strong argument validation, and reusable utility layers. Maven handles dependency and build flows, while docs and command help are integrated for better developer experience.",
      why: "I created Gimbal CLI as a unique personal project to solve everyday developer friction and prove a complete automation-first workflow from idea to implementation.",
      learnings: [
        "Building maintainable CLI architecture with scalable command modules",
        "Designing user-friendly command interfaces and error feedback",
        "Balancing extensibility with simplicity in developer tools",
        "Shipping a unique project independently end-to-end"
      ]
    },
    unishare: {
      title: "UniShare",
      subtitle: "Spring Boot, Supabase, PostgreSQL",
      liveUrl: "https://unisharelpu.vercel.app",
      sourceUrl: "https://github.com/PravinChoudhary11",
      facts: [
        "Role: Backend and platform architecture",
        "Stack: Spring Boot, Supabase, PostgreSQL",
        "Category: University community platform",
        "Modules: Users, Assets, Scores"
      ],
      what: "UniShare is a university community platform where students can connect, share resources, and collaborate through a structured academic social ecosystem.",
      how: "The platform is built on Spring Boot services backed by Supabase PostgreSQL. I modeled Users, Assets, and Scores as core entities and designed APIs to support collaboration workflows.",
      why: "I wanted to build something meaningful for student communities and solve real campus collaboration challenges with a reliable backend architecture.",
      learnings: [
        "Designing relational schemas for community platforms",
        "Building scalable Spring Boot APIs with clean domain models",
        "Integrating managed PostgreSQL with Supabase",
        "Balancing feature growth with maintainable backend structure"
      ]
    },
    rangolistore: {
      title: "RangoliStore.me",
      subtitle: "React.js, Node.js, Strapi, E-commerce",
      liveUrl: "https://rangolistore.vercel.app",
      sourceUrl: "https://github.com/PravinChoudhary11",
      facts: [
        "Role: Full-stack web development",
        "Stack: React.js, Node.js, Strapi",
        "Category: E-commerce",
        "Live: rangolistore.me"
      ],
      what: "RangoliStore is a modern e-commerce platform with dynamic product management, secure authentication, cart flow, and a fully responsive customer experience.",
      how: "I built a modular frontend in React, connected it to Node.js services, and used Strapi as a headless CMS for flexible product and content operations.",
      why: "I wanted to build a production-style commerce project and learn how to structure a scalable storefront with clean backend-content separation.",
      learnings: [
        "Designing reusable e-commerce UI flows in React",
        "Implementing secure authentication and cart interactions",
        "Using Strapi effectively in a headless CMS architecture",
        "Deploying and maintaining a real live commerce website"
      ]
    },
    "memory-allocation-visualizer": {
      title: "Real Time Memory Tracker",
      subtitle: "Python, Tkinter, Matplotlib, NumPy",
      liveUrl: "#",
      sourceUrl: "https://github.com/PravinChoudhary11/memory-allocation-tracker",
      facts: [
        "Role: Designer and builder",
        "Stack: Python 3.8+, Tkinter, Matplotlib, NumPy",
        "Category: Educational systems simulator",
        "Methods: Paging and Segmentation"
      ],
      what: "Memory Allocation Visualizer is an interactive learning tool that helps students and developers understand how operating systems allocate memory using paging and segmentation.",
      how: "I built a Python desktop app with Tkinter for controls, Matplotlib for live charts, and NumPy-backed simulation logic. It supports process add/remove, auto-generation, event logs, and memory statistics.",
      why: "I created this project to make core OS memory concepts visual, practical, and easier to grasp beyond textbook theory.",
      learnings: [
        "Turning operating system concepts into interactive visual experiences",
        "Designing simulation controls for educational clarity",
        "Combining Tkinter UI with data visualizations effectively",
        "Building configurable and extensible simulation workflows"
      ]
    }
  };

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = value || "";
    }
  }

  function setList(id, items) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = "";
    (items || []).forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      el.appendChild(li);
    });
  }

  function setLink(id, href) {
    var el = document.getElementById(id);
    if (!el) return;

    if (!href || href === "#") {
      el.style.display = "none";
      return;
    }

    el.href = href;
    el.style.display = "inline-flex";
  }

  function renderProject() {
    var params = new URLSearchParams(window.location.search);
    var key = params.get("project") || "gimbal-cli";
    var project = projects[key] || projects["gimbal-cli"];

    document.title = project.title + " - Project Detail";

    setText("project-title", project.title);
    setText("project-subtitle", project.subtitle);
    setText("project-what", project.what);
    setText("project-how", project.how);
    setText("project-why", project.why);

    setList("project-facts", project.facts);
    setList("project-learnings", project.learnings);

    setLink("project-live-link", project.liveUrl);
    setLink("project-source-link", project.sourceUrl);
  }

  renderProject();
})();
