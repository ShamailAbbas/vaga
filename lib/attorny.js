// utils/api.js

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/attornies`;

// Function to fetch all attorneys
export const fetchAttorneys = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching attorneys:", error.message);
    throw error;
  }
};

// Function to fetch a specific attorney by ID
export const fetchAttorneyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching attorney by ID:", error.message);
    throw error;
  }
};
// Function to fetch Attorney by city
export const fetchAttorneyByCity = async (city) => {
  try {
    const response = await fetch(`${API_BASE_URL}/city/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Attorney by city:", error.message);
    throw error;
  }
};
// Function to add a new attorney
export const addAttorney = async (newAttorney) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttorney),
    });

    if (!response.ok) {
      console.error("Failed to add attorney:", response.statusText);
      throw new Error("Failed to add attorney");
    }

    const addedAttorney = await response.json();
    return addedAttorney;
  } catch (error) {
    console.error("Error adding attorney:", error.message);
    throw error;
  }
};

// Function to update an attorney by ID
export const updateAttorney = async (id, updatedAttorney) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAttorney),
    });

    if (!response.ok) {
      console.error("Failed to update attorney:", response.statusText);
      throw new Error("Failed to update attorney");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating attorney:", error.message);
    throw error;
  }
};

// Function to delete an attorney by ID
export const deleteAttorney = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete attorney:", response.statusText);
      throw new Error("Failed to delete attorney");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting attorney:", error.message);
    throw error;
  }
};
