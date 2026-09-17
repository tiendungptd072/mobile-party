const themeInitializationScript = `
(() => {
  try {
    const theme = localStorage.getItem("mobile-guide:theme");
    if (theme === "light" || theme === "dark") {
      document.documentElement.classList.add(theme);
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
})();
`;

export function ThemeScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
  );
}
