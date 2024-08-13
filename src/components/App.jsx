import React, { useState, useEffect } from "react";
import DevelopmentsTable from "./Table";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { fetchAllDevelopments } from "../utils/api";
import DevelopmentDetail from "./Details";
import Navbar from "./Navbar";

function AppContent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  const fetchData = async () => {
    setLoading(true);
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
    <>
      <Navbar />
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
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
