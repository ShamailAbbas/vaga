export const articles = [
  {
    imageUrl: "/images/profilepic.jpg",
    title: "Discovering the Wonders of Deep Space",
    date: "January 1, 2023",
    type: "Astronomy",
    description:
      "Embark on a journey through the cosmos as we explore the mysteries of deep space and uncover the beauty of distant galaxies.",
    state: "California",
    city: "Los Angeles",
    slug: "discovering-the-wonders-of-deep-space",
  },
  {
    imageUrl: "/images/profilepic.jpg",
    title: "Innovative Solutions for Sustainable Living",
    date: "February 15, 2023",
    type: "Environment",
    description:
      "Learn about groundbreaking technologies and initiatives that are contributing to a more sustainable and eco-friendly way of life.",
    state: "New York",
    city: "New York City",
    slug: "innovative-solutions-for-sustainable-living",
  },
  {
    imageUrl: "/images/profilepic.jpg",
    title: "Artificial Intelligence Revolutionizing Industries",
    date: "March 10, 2023",
    type: "Technology",
    description:
      "Discover how artificial intelligence is reshaping various industries, from healthcare to finance, and revolutionizing the way we work and live.",
    state: "Texas",
    city: "Austin",
    slug: "ai-revolutionizing-industries",
  },
  {
    imageUrl: "/images/profilepic.jpg",
    title: "Exploring the Rich History of Ancient Civilizations",
    date: "April 5, 2023",
    type: "History",
    description:
      "Delve into the fascinating histories of ancient civilizations, from the majestic pyramids of Egypt to the vibrant cultures of Mesopotamia.",
    state: "Arizona",
    city: "Phoenix",
    slug: "exploring-rich-history-ancient-civilizations",
  },
  {
    imageUrl: "/images/profilepic.jpg",
    title: "The Culinary Delights of Global Cuisine",
    date: "May 20, 2023",
    type: "Food & Travel",
    description:
      "Savor the diverse flavors of global cuisine as we take you on a gastronomic journey around the world, exploring unique dishes and culinary traditions.",
    state: "Florida",
    city: "Miami",
    slug: "culinary-delights-global-cuisine",
  },
];
export const attorney = [
  {
    image: "/images/profilepic.jpg",
    phone: 32243423445,
    name: "Steve Smith",
    city: "Los Angeles",
    state: "CA",
    desctiption:
      "Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry.",
    firm: "Sitkoff & Hanrahan, LLP",
    website: "https://google.com",
  },
  {
    image: "/images/profilepic.jpg",
    phone: 32243423445,
    name: "Steve Smith",
    city: "Los Angeles",
    state: "CA",
    desctiption:
      "Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry.",
    firm: "XYL Law Firm, LLP",
    website: "https://google.com",
  },
  {
    image: "/images/profilepic.jpg",
    phone: 32243423445,
    name: "Steve Smith",
    city: "Los Angeles",
    state: "CA",
    desctiption:
      "Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry.",
    firm: "Sitkoff & Hanrahan, LLP",
    website: "https://google.com",
  },
];
export const header = {
  title: `Personal Injury attorney near me
    in `,
  description: `Top Rated Personal Injury Layers in `,
};

export const videoIds = ["6nz8GXjxiHg", "QUNrBEhvXWQ"];

const today = new Date(); // Current date and time
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); // 1 day ago
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 5); // 7 days ago
const customDate = new Date(2023, 0, 15);

export const reviews = [
  {
    reviewer: "Dany",
    stars: 4,
    date: new Date(),
    review: "Gorgious, just wow",
    picture: "/images/profilepic.jpg",
  },
  {
    reviewer: "Dany",
    stars: 4,
    date: yesterday,
    review: "Gorgious, just wow",
    picture: "/images/profilepic.jpg",
  },
  {
    reviewer: "Dany",
    stars: 4,
    date: customDate,
    review: "Gorgious, just wow",
    picture: "/images/profilepic.jpg",
  },
  {
    reviewer: "Dany",
    stars: 4,
    date: lastWeek,
    review: "Gorgious, just wow",
    picture: "/images/profilepic.jpg",
  },
];
