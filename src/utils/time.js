/**
 * Returns the current timestamp in the format: YYYY-MM-DD HH:MM:SS.
 *
 * @returns {string} The formatted timestamp string.
 */
export function getCurrentTimestamp() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}
