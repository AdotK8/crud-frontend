const API_BASE_URL = "http://localhost:3000/api/developments";

export const fetchAllDevelopments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchOneDevelopment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const createDevelopment = async ([development]) => {
  console.log(development);
};
