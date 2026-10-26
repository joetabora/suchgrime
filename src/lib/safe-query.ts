/** Runs a DB query for a public page; logs and falls back instead of crashing the page. */
export async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error("[db] query failed:", error);
    return fallback;
  }
}
