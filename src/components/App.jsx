import React, { useState, useEffect } from "react";
import DevelopmentsTable from "./DevelopmentsTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchAllDevelopments } from "../utils/api";
import DevelopmentDetail from "./DevelopmentDetail";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DevelopmentsTable
              data={data}
              setData={setData}
              setLoading={setLoading}
            />
          }
        />
        <Route path="/development/:id" element={<DevelopmentDetail />} />
      </Routes>
    </Router>
  );
}
