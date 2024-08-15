import React, { useState, useEffect } from "react";
import styles from "../styles/table.module.scss";
import DevelopmentForm from "./Form";
import { createDevelopment, fetchAllDevelopments } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function DevelopmentsTable({ data, setData, setLoading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filters, setFilters] = useState({
    parking: "All",
    zone: "All",
    cardinal: "All",
    oneBed: "All",
    twoBed: "All",
    threeBed: "All",
    fourBed: "All",
    completion: "All",
  });

  const navigate = useNavigate();

  useEffect(() => {
    refreshData();
  }, [filters]); // Re-fetch when filters change

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
      const filteredData = result.filter((development) => {
        return (
          (filters.parking === "All" ||
            development.parking === (filters.parking === "Yes")) &&
          (filters.zone === "All" ||
            development.zone === parseInt(filters.zone)) &&
          (filters.cardinal === "All" ||
            development.cardinalLocation === filters.cardinal) &&
          (filters.completion === "All" ||
            development.completion === filters.completion) &&
          (filters.oneBed === "All" ||
            development.availability.oneBed.available ===
              (filters.oneBed === "Yes")) &&
          (filters.twoBed === "All" ||
            development.availability.twoBed.available ===
              (filters.twoBed === "Yes")) &&
          (filters.threeBed === "All" ||
            development.availability.threeBed.available ===
              (filters.threeBed === "Yes")) &&
          (filters.fourBed === "All" ||
            development.availability.fourPlusBed.available ===
              (filters.fourBed === "Yes"))
        );
      });
      setData(filteredData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const developmentViewClickHandler = (id) => {
    navigate(`/development/${id}`);
  };

  const handleFormSubmit = async (formData) => {
    try {
      await createDevelopment(formData);
      refreshData();
      setIsModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error creating development: " + error.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-header"]}>
        <h1>Property Developments</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* Zone Filter */}
            <th>
              Zone
              <div className={styles["filters"]}>
                <select
                  id="zone-filter"
                  name="zone"
                  value={filters.zone}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            {/* Parking Filter */}
            <th>
              Parking
              <div className={styles["filters"]}>
                <select
                  id="parking-filter"
                  name="parking"
                  value={filters.parking}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </th>
            {/* 1 bed Filter */}
            <th>
              1 Bed Availability
              <div className={styles["filters"]}>
                <select
                  id="availability-filter"
                  name="oneBed"
                  value={filters.oneBed}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </th>
            <th>1 Bed Price From</th>
            {/* 2 bed Filter */}
            <th>
              2 Bed Availability
              <div className={styles["filters"]}>
                <select
                  id="availability-filter"
                  name="twoBed"
                  value={filters.twoBed}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </th>
            <th>2 Bed Price From</th>
            {/* 3 bed Filter */}
            <th>
              3 Bed Availability
              <div className={styles["filters"]}>
                <select
                  id="availability-filter"
                  name="threeBed"
                  value={filters.threeBed}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </th>
            <th>3 Bed Price From</th>
            {/* 4 bed Filter */}
            <th>
              4+ Bed Availability
              <div className={styles["filters"]}>
                <select
                  id="availability-filter"
                  name="fourBed"
                  value={filters.fourBed}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </th>
            <th>4+ Bed Price From</th>
            <th>Postcode</th>
            <th>Developer</th>
            {/* Cardinal Filter */}
            <th>
              Cardinal Location
              <div className={styles["filters"]}>
                <select
                  id="cardinal-filter"
                  name="cardinal"
                  value={filters.cardinal}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="central">Central</option>
                  <option value="north">North</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="south">South</option>
                </select>
              </div>
            </th>
            <th>
              Completion
              <div className={styles["filters"]}>
                <select
                  id="completion-filter"
                  name="completion"
                  value={filters.completion}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="completed">Completed</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </th>
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
              <td>{development.completion}</td>
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
            <DevelopmentForm onSubmit={handleFormSubmit} />
            {errorMessage && (
              <div className={styles["error-message"]} style={{ color: "red" }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
