export const SOURCES = ["BBC News", "CNN", "The Verge"];
export const CATEGORIES = ["Business", "Entertainment", "Technology", "Sports"];
export const AUTHORS = [
  "Sarah Turnnidge",
  "Federica Bedendo",
  "Zac Sherratt",
  "Paul Kirby",
  "Anna Zappia",
  "Justin Carter",
];

export const BASE_URL = "https://newsapi.org/v2/everything";

/* function that takes a string of text and converts it into a URL-friendly "slug" */

export const formatToSlug = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-word characters except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
};

/* function that takes a date string as input and formats it into a more readable date format */

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
