# IBM Weather Forecast Application

A responsive weather forecasting web application built for the IBM JavaScript Application Developer internship task. The project features a React frontend integrated with the IBM Carbon Design System and a Node.js backend for user action logging.

## Features

### Frontend
- **Searchable City Dropdown**: Integrated with Open-Meteo Geocoding API to find cities worldwide.
- **Current Weather**: Displays temperature, wind speed, and location details.
- **5-Day Forecast**: Responsive grid showing daily temperature trends.
- **Most Viewed Cities**: Persistent tracking of the 3 most-viewed cities using Browser LocalStorage.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile using SASS and Carbon's Grid system.

### Backend
- **Action Logger**: A Node.js server that logs city selection events with timestamps to the console.
- **CORS Enabled**: Configured to communicate securely with the Vite development server.

## Tech Stack
- **Frontend**: React (Vite), Carbon Design System, SASS.
- **Backend**: Node.js.
- **APIs**: Open-Meteo (Weather & Geocoding).

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd vite-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the backend server
```bash
node server.js
```
The backend will run on **http://localhost:5000**

### 4. Start the frontend application
Open a new terminal and run:
```bash
npm run dev
```
The frontend will run on **http://localhost:5173**

## Project Structure
- **App.jsx** – Main application logic and UI components  
- **server.js** – Node.js server for logging user actions  
- **storage.jsx** – LocalStorage utility for tracking city views  
- **App.scss** – Custom styling and responsive grid overrides  
- **index.html** – Entry point featuring the Carbon Design System CDN  

## Documentation Notes
- **Styling**: Styles are managed via `App.scss` using custom SASS logic and the Carbon Design System’s pre-compiled CSS via CDN to ensure consistent font rendering and layout.
- **State Management**: Uses React Hooks (`useState`, `useEffect`) for data fetching and UI updates.
- **Storage**: `storage.jsx` handles the logic for counting city views and retrieving the top 3 most-viewed cities from `localStorage`.

---

**Built as part of the IBM JavaScript Application Developer Internship task**
