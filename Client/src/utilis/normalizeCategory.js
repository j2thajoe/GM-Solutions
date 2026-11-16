export const normalizeCategory = (str) =>
  str?.toLowerCase().replace(/\s+/g, "").replace(/&/g, "and").trim();