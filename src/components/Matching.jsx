import React, { useState } from "react";
import styles from "../styles/matching.module.scss";

export default function Matching({ data, setData }) {
  const [filters, setFilters] = useState({
    parking: "All",
    zone: "All",
    cardinal: "All",
    beds: "All",
    completion: "All",
    maxPrice: 0,
  });

  const [matches, setMatches] = useState();
  const [error, setError] = useState("");

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
        (filters.completion === "All" ||
          development.completion === filters.completion) &&
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

    if (price >= 100000 && filters.beds === "All") {
      setError(
        "Please select the number of bedrooms when entering a price above 100,000."
      );
      return;
    }

    runFilter();
  };

  const clickHandlerTest1 = () => {
    console.log(filters);
  };

  const clickHandlerTest2 = () => {
    console.log(data);
    console.log(typeof parseInt(filters.maxPrice));
    console.log(parseInt(filters.maxPrice));
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
              <option value="oneBed">1</option>
              <option value="twoBed">2</option>
              <option value="threeBed">3</option>
              <option value="fourPlusBed">4+</option>
            </select>
          </div>
        </div>

        {/* Completion Filter */}
        <div>
          <label htmlFor="completion-filter">Completion</label>
          <div className={styles["filters"]}>
            <select
              id="completion-filter"
              name="completion"
              value={filters.completion}
              onChange={handleFilterChange}
            >
              <option value="All">Any</option>
              <option value="completed">Completed</option>
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

        <button type="submit">Submit form </button>
      </form>

      <button onClick={clickHandlerTest1}>View Filters</button>
      <button onClick={clickHandlerTest2}>View Data</button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {matches &&
        matches.map((match, index) => <div key={index}>{match.name}</div>)}
    </>
  );
}
