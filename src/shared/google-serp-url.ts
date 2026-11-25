/** Google wraps many organic results in a google.com/goto redirect. */
export function isGoogleRedirect(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.pathname === "/goto" &&
      /^(www\.)?google\.[a-z.]+$/.test(parsed.hostname)
    );
  } catch {
    return false;
  }
}
