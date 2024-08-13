import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DevelopmentForm from "./Form";
import styles from "../styles/details.module.scss";
import {
  editDevelopment,
  fetchOneDevelopment,
  deleteDevelopment,
} from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function DevelopmentDetail() {
  const { id } = useParams();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteDevelopment(id);
      setIsModalOpen(false);
      setErrorMessage("");
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting development:", error);
      setErrorMessage("Error deleting development: " + error.message);
    }
  };

  const refreshData = async () => {
    try {
      const result = await fetchOneDevelopment(id);
      setDevelopment(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    const { _id, ...dataToSend } = formData;

    try {
      const result = await editDevelopment({ _id, ...dataToSend });
      console.log(result);
      refreshData();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error editing development:", error);
      setErrorMessage("Error editing development: " + error.message);
    }
  };

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
    <>
      <div>
        <h1>{development.name}</h1>
        <p>Zone: {development.zone}</p>
        <p>Parking: {development.parking ? "Yes" : "No"}</p>
        <p>Landing Page: {development.landingPage ? "Yes" : "No"}</p>
        <p>Copy 1: {development.copy1 || "N/A"}</p>
        <p>Copy 2: {development.copy2 || "N/A"}</p>
        <p>Features: {development.features?.join(", ") || "N/A"}</p>
        <p>Amenities: {development.amenities?.join(", ") || "N/A"}</p>
        <p>Nearest Station: {development.nearestStation || "N/A"}</p>
        <p>
          Nearest Station Distance: {development.nearestStationDistance} meters
        </p>
        <p>
          Images:{" "}
          {development.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Image ${idx + 1}`}
              style={{ maxWidth: "200px", margin: "5px" }}
            />
          )) || "N/A"}
        </p>

        <h2>Availability</h2>
        <p>
          1 Bed Availability:{" "}
          {development.availability?.oneBed?.available ? "Yes" : "No"}
        </p>
        <p>1 Bed Price From: £{development.availability?.oneBed?.priceFrom}</p>
        <p>
          2 Bed Availability:{" "}
          {development.availability?.twoBed?.available ? "Yes" : "No"}
        </p>
        <p>2 Bed Price From: £{development.availability?.twoBed?.priceFrom}</p>
        <p>
          3 Bed Availability:{" "}
          {development.availability?.threeBed?.available ? "Yes" : "No"}
        </p>
        <p>
          3 Bed Price From: £{development.availability?.threeBed?.priceFrom}
        </p>
        <p>
          4+ Bed Availability:{" "}
          {development.availability?.fourPlusBed?.available ? "Yes" : "No"}
        </p>
        <p>
          4+ Bed Price From: £{development.availability?.fourPlusBed?.priceFrom}
        </p>

        <p>Postcode: {development.postcode}</p>
        <p>Developer: {development.developer}</p>
        <p>Cardinal Location: {development.cardinalLocation}</p>
        <p>Fee: {development.fee}%</p>
        <p>Contact Email: {development.contactEmail}</p>
        <p>Completion: {development.completion}</p>
        <p>
          Created At: {new Date(development.createdAt).toLocaleDateString()}
        </p>
        <p>
          Updated At: {new Date(development.updatedAt).toLocaleDateString()}
        </p>
        <button onClick={handleEditClick}>Edit Development</button>
        {isModalOpen && (
          <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
              <span className={styles["close"]} onClick={handleCloseModal}>
                &times;
              </span>
              <DevelopmentForm
                onSubmit={handleFormSubmit}
                id={development._id}
              />
              {errorMessage && (
                <div
                  className={styles["error-message"]}
                  style={{ color: "red" }}
                >
                  Error creating development
                </div>
              )}
            </div>
          </div>
        )}
        <button onClick={handleDeleteClick}>Delete Development</button>
        {isDeleteModalOpen && (
          <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
              <span
                className={styles["close"]}
                onClick={handleCloseDeleteModal}
              >
                &times;
              </span>
              <div>Are you sure you want to delete?</div>
              <button onClick={handleConfirmDelete}>YES</button>
              <button onClick={handleCloseDeleteModal}>NO</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
