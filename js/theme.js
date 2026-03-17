(function () {
  function isLightTheme() {
    return document.documentElement.classList.contains("light-theme");
  }

  function updateButtons() {
    var buttons = document.querySelectorAll(".js-theme-toggle");
    var light = isLightTheme();

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", light ? "true" : "false");
      btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
      btn.setAttribute("title", light ? "Switch to dark mode" : "Switch to light mode");
    });
  }

  function setTheme(theme) {
    var light = theme === "light";
    document.documentElement.classList.toggle("light-theme", light);

    try {
      localStorage.setItem("site-theme", light ? "light" : "dark");
    } catch (e) {}

    updateButtons();
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".js-theme-toggle");
    if (!button) {
      return;
    }

    setTheme(isLightTheme() ? "dark" : "light");
  });

  updateButtons();
})();
