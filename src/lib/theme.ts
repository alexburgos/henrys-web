export type Theme = "light" | "dark";

const COOKIE_NAME = "theme";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function persistTheme(theme: Theme): void {
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}
