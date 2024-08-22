import React, { useState, useEffect } from "react";
import { fetchOneDevelopment } from "../utils/api";
import styles from "../styles/details.module.scss";
import PropTypes from "prop-types";

const POSTCODE_REGEX = /^([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i;

function DevelopmentForm({ onSubmit, id = null }) {
  const [formData, setFormData] = useState({
    name: "",
    landingPage: false,
    copy1: "",
    copy2: "",
    features: [],
    amenities: [],
    images: [],
    brochures: [],
    priceLists: [],
    zone: "",
    parking: false,
    availability: {
      zeroBed: { available: false, priceFrom: 0 },
      oneBed: { available: false, priceFrom: 0 },
      twoBed: { available: false, priceFrom: 0 },
      threeBed: { available: false, priceFrom: 0 },
      fourPlusBed: { available: false, priceFrom: 0 },
    },
    postcode: "",
    developer: "",
    cardinalLocation: "",
    nearestStation: "",
    nearestStationDistance: "",
    fee: "",
    contactEmail: "",
    completionYear: "",
    completionQuarter: "",
    area: "",
    emailCopy: "",
  });

  const [newAmenity, setNewAmenity] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newBrochure, setNewBrochure] = useState("");
  const [newPriceList, setNewPriceList] = useState("");
  const [error, setError] = useState("");

  const bedtypeObject = {
    zeroBed: "Studio",
    oneBed: "1 Bed",
    twoBed: "2 Bed",
    threeBed: "3 Bed",
    fourPlusBed: "4+ Bed",
  };

  useEffect(() => {
    if (id !== null) {
      const getDevelopment = async () => {
        try {
          const result = await fetchOneDevelopment(id);
          setFormData(result);
        } catch (error) {
          setError(error.message);
        }
      };
      getDevelopment();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    //resets completion quarter to empty if completed is selected
    if (value === "completed") {
      formData.completionQuarter = "";
    }

    //postcode validation
    if (name === "postcode") {
      const input = e.target;
      if (!POSTCODE_REGEX.test(value)) {
        input.setCustomValidity("Please enter a valid UK postcode");
      } else {
        input.setCustomValidity("");
      }
      input.reportValidity();
    }

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAvailabilityChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [bedType, field] = name.split(".");

    setFormData((prevState) => ({
      ...prevState,
      availability: {
        ...prevState.availability,
        [bedType]: {
          ...prevState.availability[bedType],
          [field]: type === "checkbox" ? checked : value,
        },
      },
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        amenities: [...prevState.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const handleAmenityChange = (index, value) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      amenities: updatedAmenities,
    }));
  };

  const handleRemoveAmenity = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      amenities: updatedAmenities,
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        features: [...prevState.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      features: updatedFeatures,
    }));
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      features: updatedFeatures,
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleAddBrochure = () => {
    if (newBrochure.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        brochures: [...prevState.brochures, newBrochure.trim()],
      }));
      setNewBrochure("");
    }
  };

  const handleBrochureChange = (index, value) => {
    const updatedBrochures = [...formData.brochures];
    updatedBrochures[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      brochures: updatedBrochures,
    }));
  };

  const handleRemoveBrochure = (index) => {
    const updatedBrochures = formData.brochures.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      brochures: updatedBrochures,
    }));
  };

  const handleAddPriceList = () => {
    if (newPriceList.trim()) {
      const priceList = {
        url: newPriceList.trim(),
      };
      setFormData((prevState) => ({
        ...prevState,
        priceLists: [...prevState.priceLists, priceList],
      }));
      setNewPriceList("");
    }
  };

  const handlePriceListChange = (index, value) => {
    const updatedPriceLists = [...formData.priceLists];
    updatedPriceLists[index] = { ...updatedPriceLists[index], url: value };
    setFormData((prevState) => ({
      ...prevState,
      priceLists: updatedPriceLists,
    }));
  };

  const handleRemovePriceList = (index) => {
    const updatedPriceLists = formData.priceLists.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      priceLists: updatedPriceLists,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMessage = "";

    const updatedAvailability = { ...formData.availability };
    if (!formData.availability.zeroBed.available) {
      updatedAvailability.zeroBed.priceFrom = 0;
    }
    if (!formData.availability.oneBed.available) {
      updatedAvailability.oneBed.priceFrom = 0;
    }
    if (!formData.availability.twoBed.available) {
      updatedAvailability.twoBed.priceFrom = 0;
    }
    if (!formData.availability.threeBed.available) {
      updatedAvailability.threeBed.priceFrom = 0;
    }
    if (!formData.availability.fourPlusBed.available) {
      updatedAvailability.fourPlusBed.priceFrom = 0;
    }

    if (formData.landingPage) {
      if (formData.features.length === 0) {
        errorMessage = "At least one feature is required.";
      } else if (formData.amenities.length === 0) {
        errorMessage = "At least one amenity is required.";
      } else if (formData.images.length === 0) {
        errorMessage = "At least one image is required.";
      }
    }

    if (formData.brochures.length === 0) {
      errorMessage = "At least one brochure is required.";
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");

    onSubmit({ ...formData, availability: updatedAvailability });
  };

  const clickTest = () => {
    console.log(formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Developer:
              <input
                type="text"
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Postcode:
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Area:
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Zone:
              <input
                type="number"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                required
                min="1"
                max="8"
              />
            </label>
          </div>

          <div>
            <label>
              Cardinal Location:
              <select
                name="cardinalLocation"
                value={formData.cardinalLocation}
                onChange={handleChange}
                required
              >
                <option value="">Select a location</option>
                <option value="north">North</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="central">Central</option>
                <option value="south">South</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Parking:
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              fee:
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                required
                min="0.5"
                max="5"
                step="0.5"
              />
            </label>
          </div>

          <div>
            <label>
              Contact Email:
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Completion Year:
              <select
                name="completionYear"
                value={formData.completionYear}
                onChange={handleChange}
                required
              >
                <option value="">Select Completion Date</option>
                <option value="completed">Completed</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </label>
          </div>

          {formData.completionYear !== "completed" &&
            formData.completionYear !== "" && (
              <>
                <div>
                  <label>
                    Completion Quarter:
                    <select
                      name="completionQuarter"
                      value={formData.completionQuarter}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select completion quarter</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                      <option value="Q4">Q4</option>
                    </select>
                  </label>
                </div>
              </>
            )}

          <div>
            <label>
              Nearest Station:
              <input
                type="text"
                name="nearestStation"
                value={formData.nearestStation}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Nearest Station Distance (minutes):
              <input
                type="number"
                name="nearestStationDistance"
                value={formData.nearestStationDistance}
                onChange={handleChange}
                min="1"
                required
              />
            </label>
          </div>

          <div>
            <label>
              Email Copy (Key Features):
              <input
                type="text"
                name="emailCopy"
                value={formData.emailCopy}
                onChange={handleChange}
                maxLength="100"
                required
              />
            </label>
          </div>

          <fieldset>
            <legend>Availability</legend>

            {["zeroBed", "oneBed", "twoBed", "threeBed", "fourPlusBed"].map(
              (bedType) => (
                <div key={bedType}>
                  <label>
                    {bedtypeObject[bedType]} Available:
                    <input
                      type="checkbox"
                      name={`${bedType}.available`}
                      checked={formData.availability[bedType].available}
                      onChange={handleAvailabilityChange}
                    />
                  </label>
                  {formData.availability[bedType].available && (
                    <label>
                      {bedtypeObject[bedType]} Price From:
                      <input
                        type="number"
                        name={`${bedType}.priceFrom`}
                        value={formData.availability[bedType].priceFrom}
                        onChange={handleAvailabilityChange}
                        min="0"
                        required
                      />
                    </label>
                  )}
                </div>
              )
            )}
          </fieldset>

          <div>
            <label>
              New Brochure:
              <input
                type="text"
                value={newBrochure}
                onChange={(e) => setNewBrochure(e.target.value)}
              />
              <button type="button" onClick={handleAddBrochure}>
                Add Brochure
              </button>
            </label>
          </div>

          <div>
            <label>
              New Price List:
              <input
                type="text"
                value={newPriceList}
                onChange={(e) => setNewPriceList(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleAddPriceList}>
              Add Price List
            </button>
          </div>

          {formData.brochures.length > 0 && (
            <div>
              <h3>Brochures</h3>
              {formData.brochures.map((brochure, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={brochure}
                    onChange={(e) =>
                      handleBrochureChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBrochure(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {formData.priceLists.length > 0 && (
            <div>
              <h3>Price Lists</h3>
              {formData.priceLists.map((priceList, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={priceList.url || ""}
                    onChange={(e) =>
                      handlePriceListChange(index, e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => handleRemovePriceList(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <label>
              Add to landing pages?
              <input
                type="checkbox"
                name="landingPage"
                checked={formData.landingPage}
                onChange={handleChange}
              />
            </label>
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          {formData.landingPage && (
            <>
              <div>
                <label>
                  Copy 1:
                  <input
                    type="text"
                    name="copy1"
                    value={formData.copy1}
                    onChange={handleChange}
                    maxLength="350"
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Copy 2:
                  <input
                    type="text"
                    name="copy2"
                    value={formData.copy2}
                    onChange={handleChange}
                    maxLength="350"
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  New Feature:
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                  <button type="button" onClick={handleAddFeature}>
                    Add Feature
                  </button>
                </label>
              </div>

              <div>
                <label>
                  New Amenity:
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                  />
                  <button type="button" onClick={handleAddAmenity}>
                    Add Amenity
                  </button>
                </label>
              </div>

              <div>
                <label>
                  New Image:
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                  <button type="button" onClick={handleAddImage}>
                    Add Image
                  </button>
                </label>
              </div>

              {formData.amenities.length > 0 && (
                <div>
                  <h3>Amenities</h3>
                  {formData.amenities.map((amenity, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={amenity}
                        onChange={(e) =>
                          handleAmenityChange(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {formData.features.length > 0 && (
                <div>
                  <h3>Features</h3>
                  {formData.features.map((feature, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {formData.images.length > 0 && (
                <div>
                  <h3>Images</h3>
                  {formData.images.map((image, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <button type="submit">Submit</button>
          <button onClick={clickTest}>show form data</button>
        </form>
      </div>
    </div>
  );
}

DevelopmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // onSubmit must be a function and is required
  id: PropTypes.string, // id is an optional string
};

export default DevelopmentForm;
