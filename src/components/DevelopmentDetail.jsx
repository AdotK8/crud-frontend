import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneDevelopment } from "../utils/api";

export default function DevelopmentDetail() {
  const { id } = useParams();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDevelopment = async () => {
      try {
        const result = await fetchOneDevelopment(id);
        setDevelopment(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDevelopment();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!development) {
    return <div>No development found</div>;
  }

  return (
    <div>
      <h1>{development.name}</h1>
      <p>Zone: {development.zone}</p>
      <p>Parking: {development.parking ? "Yes" : "No"}</p>
      <p>
        1 Bed Availability:{" "}
        {development.availability?.oneBed?.available ? "Yes" : "No"}
      </p>
      <p>1 Bed Price From: £{development.availability?.oneBed?.priceFrom}</p>
      {/* Add more fields as necessary */}
    </div>
  );
}
