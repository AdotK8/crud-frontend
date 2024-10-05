# matching/database-frontend

<h2>Description</h2>
<p>This project is a frontend web application utilized by Yase Property, a real estate and media agency. The app is designed to support sales consultants in carrying out their duties more quickly and effectively.</p>

<p>From a technological standpoint, this frontend web app utilizes a RESTful API backend built with the MERN stack.</p>

## [Live Preview](https://yase-databae.netlify.app/)

<h2>Database Section</h2>>

![Alt text](https://raw.githubusercontent.com/AdotK8/crud-frontend/refs/heads/main/readme-database.png)

<ul>
  <li>
    <strong>Database of New Build Developments</strong>: Utilizes MongoDB to store data. Users can scroll down to view over 100 developments and access key information.
  </li>
  <li>
    <strong>Search Bar</strong>: A search bar at the top allows users to quickly find specific developments for ease of access.
  </li>
  <li>
    <strong>Filters</strong>: Filters along the column headers (e.g., parking availability, number of beds, zones 1-9, and geographical directions) enable users to efficiently narrow down their search for developments.
  </li>
  <li>
    <strong>Create New Development</strong>: A "Create New Development" button at the bottom opens a form where users can quickly add new developments.
  </li>

  <li>
    <strong>Details Page</strong>: When a development is clicked, a details page opens showcasing all relevant information, including price lists and brochures. Users can amend or delete details from this page. Price lists and availability are intended to be updated as needed.
  </li>
</ul>

<h2>Matching Tool</h2>
<ul>
  <li>
    <strong>Requirements Section</strong>: The leftmost section of the page prompts users to enter information about their client's property search, such as maximum price (required), parking availability, zone, completion date, etc.
  </li>
  <li>
    <strong>Matches Section</strong>: Once the requirements are entered and the "search" button is clicked, corresponding property developments are displayed in the matches section, along with an "add" button to include the development in the 'property selection.'
  </li>
  <li>
    <strong>Selection Section</strong>: 
    <ul>
      <li>The rightmost section of the page displays all developments added to the property selection, indicating whether a price list or brochure is available. Developments can be removed from selection using the "remove" button.</li>
      <li>Once the user is satisfied with their selection, they can click on their respective name, and an email will be sent to them with price lists, brochures, and key points for each development. This email can be personalized in their inbox and forwarded to clients.</li>
    </ul>
  </li>
</ul>

<h2>Maps Page</h2>
<ul>
  <li>
    This page utilizes the Google Maps API to display all properties on a map of London, employing icon clustering for more convenient viewing. When a property is clicked, an info window appears, showing the name of each development. Clicking on the name will navigate to the details page mentioned earlier. Additionally, Street View can be toggled from the top left corner of the map.
  </li>
</ul>

<h2>💻 Built with</h2>
<ul>
  <li>React</li>
  <li>MongoDB/Mongoose</li>
  <li>SCSS</li>
  <li>Google Maps API</li>
  <li>Nodemailer</li>
</ul>
