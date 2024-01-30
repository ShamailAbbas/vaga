// utils/api.js

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`;

// Function to fetch all reviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    //throw error;
  }
};

// Function to fetch a specific review by ID
export const fetchReviewById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching review by ID:", error.message);
    //throw error;
  }
};
// Function to fetch Review by city
export const fetchReviewByCity = async (city) => {
  try {
    const response = await fetch(`${API_BASE_URL}/city/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Review by city:", error.message);
    //throw error;
  }
};

// Function to fetch average stars for a city
export const fetchAverageStarsByCity = async (city) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/average/${encodeURIComponent(city)}`
    );
    const data = await response.json();
    console.log("avaeregae stars data is ", data);
    return data;
  } catch (error) {
    console.error("Error fetching average stars:", error.message);
    //throw error;
  }
};
// Function to add a new review
export const addReview = async (newReview) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      console.error("Failed to add review:", response.statusText);
      //throw new Error("Failed to add review");
    }

    const addedReview = await response.json();
    return addedReview;
  } catch (error) {
    console.error("Error adding review:", error.message);
    //throw error;
  }
};

// Function to update a review by ID
export const updateReview = async (id, updatedReview) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    });

    if (!response.ok) {
      console.error("Failed to update review:", response.statusText);
      //throw new Error("Failed to update review");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating review:", error.message);
    //throw error;
  }
};

// Function to delete a review by ID
export const deleteReview = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete review:", response.statusText);
      //throw new Error("Failed to delete review");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    //throw error;
  }
};
