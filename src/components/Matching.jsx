import React, { useState } from "react";
import styles from "../styles/matching.module.scss";
import { sendMatchEmail } from "../utils/api";
import { users } from "../utils/users";

export default function Matching({ data }) {
  const [filters, setFilters] = useState({
    parking: "All",
    zone: "All",
    cardinal: "All",
    beds: "All",
    completionYear: "All",
    maxPrice: 0,
  });

  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userSelectError, setUserSelectError] = useState("");

  const runFilter = () => {
    const filteredData = data.filter((development) => {
      const hasPriceWithinRange = () => {
        if (filters.beds === "All") {
          return Object.keys(development.availability).some((bedType) => {
            return (
              development.availability[bedType].available === true &&
              parseInt(filters.maxPrice) >=
                development.availability[bedType].priceFrom
            );
          });
        } else {
          return (
            development.availability[filters.beds] &&
            development.availability[filters.beds].available === true &&
            parseInt(filters.maxPrice) >=
              development.availability[filters.beds].priceFrom
          );
        }
      };

      return (
        (filters.parking === "All" ||
          development.parking === (filters.parking === "Yes")) &&
        (filters.zone === "All" ||
          development.zone === parseInt(filters.zone)) &&
        (filters.cardinal === "All" ||
          development.cardinalLocation === filters.cardinal) &&
        (filters.completionYear === "All" ||
          development.completionYear === filters.completionYear) &&
        hasPriceWithinRange()
      );
    });

    setMatches(filteredData);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const price = parseInt(filters.maxPrice, 10);
    setError("");

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (price < 100000) {
      setError("Price must be at least 100,000.");
      return;
    }

    runFilter();
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const addToSelection = (development) => {
    const isAlreadySelected = selection.some(
      (selectedDevelopment) => selectedDevelopment.name === development.name
    );

    if (isAlreadySelected) {
      setError(`"${development.name}" has already been selected`);
    } else {
      setSelection((prevSelection) => [...prevSelection, development]);
      setError("");
    }
  };

  const removeFromSelection = (developmentToRemove) => {
    setSelection((prevSelection) =>
      prevSelection.filter(
        (development) => development.name !== developmentToRemove.name
      )
    );
  };

  const sendEmail = async () => {
    if (!selectedUser) {
      setUserSelectError("Please select a user to send the email.");
      return;
    }

    const selectedUserObj = users.find(
      (user) => user[Object.keys(user)[0]] === selectedUser
    );
    const selectedUserName = selectedUserObj
      ? Object.keys(selectedUserObj)[0]
      : "";

    try {
      await sendMatchEmail(selection, selectedUser, selectedUserName);
      setSelection([]);
      setUserSelectError("");
      alert("Email sent successfully and selection cleared!");
    } catch (error) {
      setUserSelectError("Error sending email: " + error.message);
    }
  };

  return (
    <>
      <div className={styles.error}>{error}</div>
      <div className={styles.container}>
        {/* Filter Section */}
        <div className={styles.filterSection}>
          <h2>Filters</h2>
          <form onSubmit={handleSubmit}>
            {/* Parking Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="parking-filter">Parking</label>
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

            {/* Zone Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="zone-filter">Zone</label>
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

            {/* Cardinal Location Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="cardinal-filter">Location</label>
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

            {/* Bedrooms Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="beds-filter">Bedrooms</label>
              <select
                id="beds-filter"
                name="beds"
                value={filters.beds}
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                <option value="zeroBed">Studio</option>
                <option value="oneBed">1</option>
                <option value="twoBed">2</option>
                <option value="threeBed">3</option>
                <option value="fourPlusBed">4+</option>
              </select>
            </div>

            {/* Completion Year Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="completion-filter">Completion Year</label>
              <select
                id="completion-filter"
                name="completionYear"
                value={filters.completionYear}
                onChange={handleFilterChange}
              >
                <option value="All">Any</option>
                <option value="Completed">Completed</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div className={styles.filterGroup}>
              <label htmlFor="price-filter">Max Price</label>
              <input
                type="number"
                id="price-filter"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Search
            </button>
          </form>
        </div>

        {/* Matches Section */}
        <div className={styles.matchesSection}>
          <h2>Matches</h2>
          {matches.length > 0 ? (
            <ul className={styles.matchesList}>
              {matches.map((match) => (
                <li key={match._id} className={styles.matchItem}>
                  <div className={styles.matchName}>
                    {match.name} - ({match.area})
                  </div>
                  <button
                    onClick={() => addToSelection(match)}
                    className={styles.addButton}
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matches found</p>
          )}
        </div>

        {/* Selection Section */}
        <div className={styles.selectionSection}>
          <h2>Selection</h2>
          {selection.length > 0 ? (
            <div className={styles.cardContainer}>
              {selection.map((development) => (
                <div key={development._id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{development.name}</h3>
                    {development.availability &&
                      Object.keys(development.availability).map((bedType) => {
                        const { available, priceFrom } =
                          development.availability[bedType];
                        if (available) {
                          const formattedBedType = bedType
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())
                            .trim();

                          return (
                            <p key={bedType} className={styles.bedInfo}>
                              {bedType === "zeroBed"
                                ? "Studios"
                                : formattedBedType}
                              {"'s "}
                              from £{formatNumber(priceFrom)}
                            </p>
                          );
                        }
                        return null;
                      })}
                    {development.priceLists &&
                    development.priceLists.length > 0 ? (
                      <p className={styles.priceInfo}>
                        Price list available from{" "}
                        {new Date(
                          development.priceListsLastUpdated
                        ).toLocaleDateString()}
                      </p>
                    ) : (
                      <p className={styles.priceInfo}>
                        No price list available
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromSelection(development)}
                    className={styles.removeButton}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No selections made</p>
          )}
          {userSelectError && (
            <div className={styles.error}>{userSelectError}</div>
          )}
          {selection.length > 0 && (
            <div className={styles.emailSection}>
              <label htmlFor="user-filter">Select User</label>
              <select
                id="user-filter"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select a user</option>
                {users.map((user) => {
                  const userName = Object.keys(user)[0];
                  const userEmail = user[userName];
                  return (
                    <option key={userName} value={userEmail}>
                      {userName}
                    </option>
                  );
                })}
              </select>
              <button onClick={sendEmail} className={styles.sendButton}>
                Send email
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
