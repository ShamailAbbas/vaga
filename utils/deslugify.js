export default function deslugify(slug) {
  return slug
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
}
