import React, { useState } from "react";
import styles from "../styles/matching.module.scss";

export default function Matching({ data, setData }) {
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

  const clickHandlerTest1 = () => {
    console.log(filters);
  };

  const clickHandlerTest2 = () => {
    console.log("data");
    console.log(data);
    console.log("matches");
    console.log(matches);
  };

  const clickHandlerTest3 = () => {
    console.log(selection);
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

  return (
    <>
      <div>Enter Client Requirements to get suggestions</div>

      <form onSubmit={handleSubmit}>
        {/* Parking Filter */}
        <div>
          <label htmlFor="parking-filter">Parking</label>
          <div className={styles["filters"]}>
            <select
              id="parking-filter"
              name="parking"
              value={filters.parking}
              onChange={handleFilterChange}
              required
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Zone Filter */}
        <div>
          <label htmlFor="zone-filter">Zone</label>
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
        </div>

        {/* Cardinal Location Filter */}
        <div>
          <label htmlFor="cardinal-filter">Location</label>
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
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label htmlFor="beds-filter">Bedrooms</label>
          <div className={styles["filters"]}>
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
        </div>

        {/* Completion Filter */}
        <div>
          <label htmlFor="completion-filter">Completion Year</label>
          <div className={styles["filters"]}>
            <select
              id="completion-filter"
              name="completionYear"
              value={filters.completionYear}
              onChange={handleFilterChange}
            >
              <option value="All">Any</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>

        {/* Max Price Filter */}
        <div>
          <label htmlFor="price-filter">Max Price</label>
          <div className={styles["filters"]}>
            <input
              type="number"
              id="price-filter"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <button type="submit">Submit form</button>
      </form>

      <button onClick={clickHandlerTest1}>View Filters</button>
      <button onClick={clickHandlerTest2}>View Data</button>
      <button onClick={clickHandlerTest3}>View Selection</button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className={styles["section-container"]}>
        {/* Matches Section */}
        <div className={styles["section-box"]}>
          <h3>Matches</h3>
          {matches &&
            matches.map((match, index) => (
              <div key={index} className={styles["match-item"]}>
                <div>{match.name}</div>
                <button onClick={() => addToSelection(match)}>
                  Add to selection
                </button>
              </div>
            ))}
        </div>

        {/* Selection Section */}
        <div className={styles["section-box"]}>
          <h3>Selection</h3>
          {selection &&
            selection.map((development, index) => (
              <div key={index} className={styles["selection-item"]}>
                <div>{development.name}</div>
                <button onClick={() => removeFromSelection(development)}>
                  Remove from selection
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
