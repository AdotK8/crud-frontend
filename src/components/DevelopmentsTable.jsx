import React, { useState } from "react";
import styles from "../styles/table.module.scss";
import AddDevelopment from "./AddDevelopment";
import { createDevelopment } from "../utils/api";
import { fetchAllDevelopments } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function DevelopmentsTable({ data, setData, setLoading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const refreshData = async () => {
    try {
      const result = await fetchAllDevelopments();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const developmentViewClickHandler = (id) => {
    navigate(`/development/${id}`);
  };

  const handleFormSubmit = async (formData) => {
    console.log(formData);
    try {
      const result = await createDevelopment(formData);
      console.log(result);
      refreshData();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating development:", error);
      setErrorMessage("Error creating development: " + error.message);
    }
  };

  return (
    <div className={styles["table-container"]}>
      <h1>Property Developments</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Zone</th>
            <th>Parking</th>
            <th>1 Bed Availability</th>
            <th>1 Bed Price From</th>
            <th>2 Bed Availability</th>
            <th>2 Bed Price From</th>
            <th>3 Bed Availability</th>
            <th>3 Bed Price From</th>
            <th>4+ Bed Availability</th>
            <th>4+ Bed Price From</th>
            <th>Postcode</th>
            <th>Developer</th>
            <th>Cardinal Location</th>
            <th>Fee</th>
            <th>Contact Email</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((development) => (
            <tr
              key={development._id}
              onClick={() => developmentViewClickHandler(development._id)}
            >
              <td>{development.name}</td>
              <td>{development.zone}</td>
              <td>{development.parking ? "Yes" : "No"}</td>
              <td>
                {development.availability?.oneBed?.available ? "Yes" : "No"}
              </td>
              <td>
                {development.availability?.oneBed?.priceFrom
                  ? "£" +
                    formatNumber(development.availability.oneBed.priceFrom)
                  : "N/A"}
              </td>
              <td>
                {development.availability?.twoBed?.available ? "Yes" : "No"}
              </td>
              <td>
                {development.availability?.twoBed?.priceFrom
                  ? "£" +
                    formatNumber(development.availability.twoBed.priceFrom)
                  : "N/A"}
              </td>
              <td>
                {development.availability?.threeBed?.available ? "Yes" : "No"}
              </td>
              <td>
                {development.availability?.threeBed?.priceFrom
                  ? "£" +
                    formatNumber(development.availability.threeBed.priceFrom)
                  : "N/A"}
              </td>
              <td>
                {development.availability?.fourPlusBed?.available
                  ? "Yes"
                  : "No"}
              </td>
              <td>
                {development.availability?.fourPlusBed?.priceFrom
                  ? "£" +
                    formatNumber(development.availability.fourPlusBed.priceFrom)
                  : "N/A"}
              </td>
              <td>{development.postcode}</td>
              <td>{development.developer}</td>
              <td>{development.cardinalLocation}</td>
              <td>{development.fee + "%"}</td>
              <td>{development.contactEmail}</td>
              <td>{new Date(development.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles["add-button"]} onClick={handleAddClick}>
        Add New Development
      </button>

      {isModalOpen && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <span className={styles["close"]} onClick={handleCloseModal}>
              &times;
            </span>
            <AddDevelopment onSubmit={handleFormSubmit} />
            {errorMessage && (
              <div className={styles["error-message"]} style={{ color: "red" }}>
                Error creating development
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
