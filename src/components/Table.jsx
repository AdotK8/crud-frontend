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
    zeroBed: "All",
    oneBed: "All",
    twoBed: "All",
    threeBed: "All",
    fourBed: "All",
    completionYear: "All",
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
          (filters.completionYear === "All" ||
            development.completionYear === filters.completionYear) &&
          (filters.zeroBed === "All" ||
            development.availability.zeroBed.available ===
              (filters.zeroBed === "Yes")) &&
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
    <>
      <div className={styles["table-container"]}>
        <div className={styles["table-wrapper"]}>
          <table>
            <thead className="table-header">
              <tr>
                {/* TABLE HEADERS */}
                <th>Name</th>
                <th>Area</th>
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
                      {Array.from({ length: 9 }, (_, i) => i + 1).map(
                        (zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </th>
                <th>Developer</th>
                <th>
                  Completion Year
                  <div className={styles["filters"]}>
                    <select
                      id="completion-filter"
                      name="completionYear"
                      value={filters.completionYear}
                      onChange={handleFilterChange}
                    >
                      <option value="All">All</option>
                      <option value="Completed">Completed</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
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
                    </select>
                  </div>
                </th>
                {/* Studio bed Filter */}
                <th>
                  Studio Availability
                  <div className={styles["filters"]}>
                    <select
                      id="availability-filter"
                      name="zeroBed"
                      value={filters.zeroBed}
                      onChange={handleFilterChange}
                    >
                      <option value="All">All</option>
                      <option value="Yes">Yes</option>
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
                    </select>
                  </div>
                </th>
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
                    </select>
                  </div>
                </th>
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
                    </select>
                  </div>
                </th>
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
                    </select>
                  </div>
                </th>
                <th>Fee</th>
                <th>Contact Email</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {data.map((development) => (
                <tr key={development._id}>
                  <td
                    className="dev-name"
                    onClick={() => developmentViewClickHandler(development._id)}
                  >
                    {<span>{development.name}</span>}
                  </td>
                  <td>{development.area}</td>
                  <td>{development.cardinalLocation}</td>
                  <td>{development.zone}</td>
                  <td>{development.developer}</td>
                  <td>{development.completionYear}</td>
                  <td>{development.parking ? "Yes" : "No"}</td>
                  <td>
                    {development.availability?.zeroBed?.available
                      ? "£" +
                        formatNumber(development.availability.zeroBed.priceFrom)
                      : "No"}
                  </td>
                  <td>
                    {development.availability?.oneBed?.available
                      ? "£" +
                        formatNumber(development.availability.oneBed.priceFrom)
                      : "No"}
                  </td>
                  <td>
                    {development.availability?.twoBed?.available
                      ? "£" +
                        formatNumber(development.availability.twoBed.priceFrom)
                      : "No"}
                  </td>
                  <td>
                    {development.availability?.threeBed?.available
                      ? "£" +
                        formatNumber(
                          development.availability.threeBed.priceFrom
                        )
                      : "No"}
                  </td>
                  <td>
                    {development.availability?.fourPlusBed?.available
                      ? "£" +
                        formatNumber(
                          development.availability.fourPlusBed.priceFrom
                        )
                      : "No"}
                  </td>
                  <td>{development.fee + "%"}</td>
                  <td>{development.contactEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles["button-container"]}>
        <button
          onClick={handleAddClick}
          className={styles["button-add-development"]}
        >
          Add New Development
        </button>
      </div>
      {isModalOpen && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <span className={styles["close"]} onClick={handleCloseModal}>
              &times;
            </span>
            <DevelopmentForm
              onSubmit={handleFormSubmit}
              handleCloseModal={handleCloseModal}
            />
            {errorMessage && (
              <div className={styles["error-message"]} style={{ color: "red" }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
