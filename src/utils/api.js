const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yase-crud-backend-c0bc93f85f45.herokuapp.com"
    : "http://localhost:5500";

const endpoint = `${BASE_URL}/api/developments`;

export const sendMatchEmail = async (selection, email, name) => {
  try {
    const response = await fetch(`${endpoint}/send-match-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selection,
        email,
        name,
      }),
    });

    // Check if the request was successful
    if (response.ok) {
      const data = await response.json();
      console.log("Email sent successfully:", data);
    } else {
      console.error("Error sending email:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export const fetchAllDevelopments = async () => {
  try {
    const response = await fetch(`${endpoint}/get`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchMappingInfo = async () => {
  try {
    const response = await fetch(`${endpoint}/mapping/get`);
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
    const response = await fetch(`${endpoint}/get/${id}`);
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
    const response = await fetch(`${endpoint}/add`, {
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
    const response = await fetch(`${endpoint}/mod`, {
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
    console.log(id);
    const response = await fetch(`${endpoint}/${id}`, {
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

export const fetchCoordinates = async (postcode) => {
  try {
    const response = await fetch(`${endpoint}/coords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postcode }),
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
