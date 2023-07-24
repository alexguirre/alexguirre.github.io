
// This must be the first script loaded by a page to prevent a flash of unstyled content (especifically a white screen when using dark theme).
const THEME_SWITCHER_ID = "theme-switcher";

/**
 * Called early in the page load process to set up the theme.
 */
function themeEarlyInit(): void {
    themeRefresh();

    window.addEventListener("storage", () => {
        themeRefresh();
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        themeRefresh();
    });

    window.addEventListener("DOMContentLoaded", () => {
        const themeSwitcher = window.document   .getElementById(THEME_SWITCHER_ID);
        themeSwitcher?.addEventListener("click", function() {
            themeToggle();
        });
    });
}

/**
 * Refreshes the theme based on the current theme setting, either from local storage or default user preference.
 */
function themeRefresh(): void {
    let theme = localStorage.getItem("theme");
    if (theme === null) {
        const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        theme = systemDarkTheme.matches ? "dark" : "light";
    }

    if (theme === "dark") {
        document.documentElement.classList.add("dark-mode");
    } else {
        document.documentElement.classList.remove("dark-mode");
    }
}

/**
 * Toggles the theme and stores it in local storage.
 */
function themeToggle(): void {
    const usingDarkTheme = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", usingDarkTheme ? "dark" : "light");
}

themeEarlyInit();
