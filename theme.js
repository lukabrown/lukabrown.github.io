(function () {
  const root = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(mediaQuery.matches ? "dark" : "light");
  }
})();