(() => {
  const storageKey = "jt-theme";
  const root = document.body;

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const updateToggleButtons = (theme) => {
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const isDark = theme === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      const label = button.querySelector(".theme-toggle__label");
      if (label) {
        label.textContent = isDark ? "Light mode" : "Dark mode";
      }
    });
  };

  const applyTheme = (theme) => {
    if (!root) return;
    root.dataset.theme = theme;
    updateToggleButtons(theme);
  };

  const toggleTheme = () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  };

  const init = () => {
    const theme = getPreferredTheme();
    applyTheme(theme);

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", toggleTheme);
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncOSPreference = (event) => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncOSPreference);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(syncOSPreference);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
