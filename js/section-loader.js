(function () {
  var sections = [
    { file: "sections/about.html", target: "about-container" },
    { file: "sections/skills.html", target: "skills-container" },
    { file: "sections/projects.html", target: "projects-container" },
    { file: "sections/certificates.html", target: "certificates-container" },
    { file: "sections/education.html", target: "education-container" },
    { file: "sections/contact.html", target: "contact-container" }
  ];

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  function loadSection(item) {
    return fetch(item.file)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + item.file);
        return res.text();
      })
      .then(function (html) {
        var target = document.getElementById(item.target);
        if (target) target.innerHTML = html;
      })
      .catch(function (err) {
        console.error("Section load error:", err);
      });
  }

  Promise.all(sections.map(loadSection))
    .then(function () {
      return loadScript("js/scripts-dist.js");
    })
    .then(function () {
      return loadScript("js/main.js");
    })
    .catch(function (err) {
      console.error("Section loader error:", err);
    });
})();
