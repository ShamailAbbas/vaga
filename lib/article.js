// utils/api.js

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`;

// Function to fetch all articles
export const fetchArticles = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    //throw error;
  }
};

// Function to fetch a specific article by slug
export const fetchArticleBySlug = async (slug, city, state) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${state}/${city}/${slug}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching article by slug:", error.message);
    //throw error;
  }
};
// Function to fetch Article by city
export const fetchArticleByCity = async (city, page = 1, limit = 3) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/city/${city}?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Article by city:", error.message);
    //throw error;
  }
};
// Function to add a new article
export const addArticle = async (newArticle) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    });

    if (!response.ok) {
      console.error("Failed to add article:", response.statusText);
     // throw new Error("Failed to add article");
    }

    const addedArticle = await response.json();
    return addedArticle;
  } catch (error) {
    console.error("Error adding article:", error.message);
    //throw error;
  }
};

// Function to update an article by slug
export const updateArticle = async (slug, updatedArticle) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArticle),
    });

    if (!response.ok) {
      console.error("Failed to update article:", response.statusText);
      throw new Error("Failed to update article");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating article:", error.message);
    throw error;
  }
};

// Function to delete an article by slug
export const deleteArticle = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete article:", response.statusText);
      throw new Error("Failed to delete article");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting article:", error.message);
    throw error;
  }
};
