import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DevelopmentForm from "./Form";
import styles from "../styles/details.module.scss";
import {
  editDevelopment,
  fetchOneDevelopment,
  deleteDevelopment,
} from "../utils/api";

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
      await deleteDevelopment(id);
      setIsModalOpen(false);
      setErrorMessage("");

      // Wait for the modal to close before navigating
      setTimeout(() => {
        navigate(`/`);
      }, 1000); // Adjust the delay as needed
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
      await editDevelopment({ _id, ...dataToSend });
      refreshData();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error editing development:", error);
      setErrorMessage("Error editing development: " + error.message);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!development) {
    return <div className={styles.error}>No development found</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{development.name}</h1>
          <div className={styles.actions}>
            <button className={styles.editButton} onClick={handleEditClick}>
              Edit
            </button>
            <button className={styles.deleteButton} onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2>General Information</h2>
          <div className={styles.infoGrid}>
            <div>
              <strong>Zone:</strong> {development.zone}
            </div>
            <div>
              <strong>Parking:</strong> {development.parking ? "Yes" : "No"}
            </div>

            <div>
              <strong>Postcode:</strong> {development.postcode}
            </div>

            <div>
              <strong>Nearest Station:</strong> {development.nearestStation}
            </div>
            <div>
              <strong>Nearest Station Distance:</strong>{" "}
              {development.nearestStationDistance} mins walk
            </div>
            <div>
              <strong>Area:</strong> {development.area}
            </div>
            <div>
              <strong>Developer:</strong> {development.developer}
            </div>
            <div>
              <strong>Cardinal Location:</strong> {development.cardinalLocation}
            </div>
            <div>
              <strong>Fee:</strong> {development.fee}%
            </div>
            <div>
              <strong>Contact Email:</strong> {development.contactEmail}
            </div>
            <div>
              <strong>Completion Year:</strong> {development.completionQuarter}{" "}
              {development.completionYear}
            </div>
            <div>
              <strong>Email Copy (Key Features):</strong>{" "}
              {development.emailCopy}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(development.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Media</h2>
          <div className={styles.mediaSection}>
            <div>
              <strong>Images:</strong>
              <div className={styles.imageGallery}>
                {development.images?.length > 0
                  ? development.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Image ${idx + 1}`}
                        className={styles.image}
                      />
                    ))
                  : "N/A"}
              </div>
            </div>

            <div>
              <strong>Brochures:</strong>
              <div className={styles.links}>
                {development.brochures?.length > 0
                  ? development.brochures.map((brochure, idx) => (
                      <a
                        key={idx}
                        href={brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        Brochure {idx + 1}
                      </a>
                    ))
                  : "N/A"}
              </div>
            </div>

            <div>
              <strong>Price Lists:</strong>
              <div className={styles.links}>
                {development.priceLists?.length > 0
                  ? development.priceLists.map((pl, idx) => (
                      <a
                        key={idx}
                        href={pl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        Price List {idx + 1}
                      </a>
                    ))
                  : "N/A"}
              </div>
            </div>

            <div>
              <strong>Price Lists Last Updated:</strong>{" "}
              {new Date(development.priceListsLastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Availability</h2>
          <div className={styles.infoGrid}>
            {development.availability && (
              <>
                <div>
                  <strong>Studio Availability:</strong>{" "}
                  {development.availability.zeroBed?.available ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Studio Price From:</strong>{" "}
                  {development.availability.zeroBed?.priceFrom
                    ? "£" +
                      formatNumber(development.availability.zeroBed.priceFrom)
                    : "N/A"}
                </div>
                <div>
                  <strong>1 Bed Availability:</strong>{" "}
                  {development.availability.oneBed?.available ? "Yes" : "No"}
                </div>
                <div>
                  <strong>1 Bed Price From:</strong>{" "}
                  {development.availability.oneBed?.priceFrom
                    ? "£" +
                      formatNumber(development.availability.oneBed.priceFrom)
                    : "N/A"}
                </div>
                <div>
                  <strong>2 Bed Availability:</strong>{" "}
                  {development.availability.twoBed?.available ? "Yes" : "No"}
                </div>
                <div>
                  <strong>2 Bed Price From:</strong>{" "}
                  {development.availability.twoBed?.priceFrom
                    ? "£" +
                      formatNumber(development.availability.twoBed.priceFrom)
                    : "N/A"}
                </div>
                <div>
                  <strong>3 Bed Availability:</strong>{" "}
                  {development.availability.threeBed?.available ? "Yes" : "No"}
                </div>
                <div>
                  <strong>3 Bed Price From:</strong>{" "}
                  {development.availability.threeBed?.priceFrom
                    ? "£" +
                      formatNumber(development.availability.threeBed.priceFrom)
                    : "N/A"}
                </div>
                <div>
                  <strong>4+ Bed Availability:</strong>{" "}
                  {development.availability.fourPlusBed?.available
                    ? "Yes"
                    : "No"}
                </div>
                <div>
                  <strong>4+ Bed Price From:</strong>{" "}
                  {development.availability.fourPlusBed?.priceFrom
                    ? "£" +
                      formatNumber(
                        development.availability.fourPlusBed.priceFrom
                      )
                    : "N/A"}
                </div>
                <div>
                  <strong>Availability Last Updated:</strong>{" "}
                  {new Date(
                    development.availability.lastUpdated
                  ).toLocaleDateString()}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Website Information</h2>
          <div className={styles.infoGrid}>
            <div>
              <strong>Copy 1:</strong> {development.copy1 || "N/A"}
            </div>
            <div>
              <strong>Copy 2:</strong> {development.copy2 || "N/A"}
            </div>
            <div>
              <strong>Amenities:</strong>{" "}
              {development.amenities && development.amenities.length > 0
                ? development.amenities.join(", ")
                : "N/A"}
            </div>
            <div>
              <strong>Features:</strong>{" "}
              {development.features && development.features.length > 0
                ? development.features.join(", ")
                : "N/A"}
            </div>

            <div>
              <strong>Landing Page:</strong>{" "}
              {development.landingPage ? "Yes" : "No"}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <DevelopmentForm
                onSubmit={handleFormSubmit}
                id={development._id}
                handleCloseModal={handleCloseModal}
              />
              {errorMessage && (
                <div className={styles.errorMessage}>Error: {errorMessage}</div>
              )}
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={handleCloseDeleteModal}>
                &times;
              </span>
              <div>Are you sure you want to delete?</div>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmDelete}
              >
                YES
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCloseDeleteModal}
              >
                NO
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
