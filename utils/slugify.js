export default function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove non-word characters (except spaces)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Trim any leading or trailing spaces
}
