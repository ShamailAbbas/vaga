export async function getCities(page, limit) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cities?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      //throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const cities = await response.json();

    // console.log("Fetched cities:", cities);
    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    return [];
  }
}

export const GetCityByName = async (city, state) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cities/${state}/${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching city:", error.message);
    //throw error;
  }
};
