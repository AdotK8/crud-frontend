import React, { useState, useEffect } from "react";
import DevelopmentsTable from "./DevelopmentsTable";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch of data
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all developments
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/developments/get"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  function clickHandler() {
    console.log(data);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <DevelopmentsTable data={data} />;
}
