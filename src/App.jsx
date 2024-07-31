import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //initial fetch of data
  useEffect(() => {
    fetchData();
  }, []);

  //fetch all devlelopments
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

  return (
    <>
      <button onClick={clickHandler}>test</button>
    </>
  );
}
