// utils/api.js
const API_BASE_URL = "http://localhost:3001/videos";

// Function to fetch all videos
export const fetchVideos = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    throw error;
  }
};

// Function to fetch videos by city
export const fetchVideosByCity = async (city) => {
  try {
    const response = await fetch(`${API_BASE_URL}/city/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos by city:", error.message);
    throw error;
  }
};

// Function to fetch a specific video by ID
export const fetchVideoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching video by ID:", error.message);
    throw error;
  }
};

// Function to add a new video
export const addVideo = async (newVideo) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    });

    if (!response.ok) {
      console.error("Failed to add video:", response.statusText);
      throw new Error("Failed to add video");
    }

    const addedVideo = await response.json();
    return addedVideo;
  } catch (error) {
    console.error("Error adding video:", error.message);
    throw error;
  }
};

// Function to update a video by ID
export const updateVideo = async (id, updatedVideo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVideo),
    });

    if (!response.ok) {
      console.error("Failed to update video:", response.statusText);
      throw new Error("Failed to update video");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating video:", error.message);
    throw error;
  }
};

// Function to delete a video by ID
export const deleteVideo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete video:", response.statusText);
      throw new Error("Failed to delete video");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting video:", error.message);
    throw error;
  }
};
