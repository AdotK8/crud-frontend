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

export const createDevelopment = async (development) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(development),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const editDevelopment = async (development) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mod`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(development),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteDevelopment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
