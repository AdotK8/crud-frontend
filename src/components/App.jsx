import React, { useState, useEffect } from "react";
import DevelopmentsTable from "./DevelopmentsTable";
import { fetchAllDevelopments } from "../utils/api";

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
      const result = await fetchAllDevelopments();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DevelopmentsTable data={data} setData={setData} setLoading={setLoading} />
  );
}
