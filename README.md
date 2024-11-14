# Metro Station Data Visualization

This project is a web application built with Express.js that visualizes metro station data. It provides an API to fetch station and link data, and renders views using Pug templates. This API is developped for the [Metro cool](https://github.com/Hubrec/metro_cool) project.

## Project Structure

- `index.js`: Main server file that sets up routes and handles API requests.
- `views/`: Directory containing Pug templates for rendering HTML.
  - `layout.pug`: Base layout template.
  - `error.pug`: Error page template.
- `data/`: Directory containing data files.
  - `metro.txt`: Contains metro station and link data.
  - `pospoints.txt`: Contains positional data for metro stations.

## API Endpoints

- `GET /api/data/stations`: Returns a list of metro stations with their details.
- `GET /api/data/links`: Returns a list of links between metro stations.

## Local Development Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
    ```
   
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the Express.js server:**
   ```sh
   npm start
   ```
4. **Access the application:**

    Open `http://localhost:3000` in your browser.
    You now can also setup the [Metro cool](https://github.com/Hubrec/metro_cool) project to use this API.