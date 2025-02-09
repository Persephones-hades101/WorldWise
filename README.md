# 🌍 WorldWise

WorldWise is a simple web application built with **Vite + React** that helps users log the places they have visited. Users can click anywhere on the map, fill out a form, and add the place to their list.

## 🚀 Features

- 📍 Click on the map to log visited places
- 📝 Add details about each location through a form
- 🗺️ Interactive map powered by Leaflet
- ⚡️ Fast performance using Vite
- 💾 Data stored locally using JSON Server

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **State Management:** React Context API
- **Maps:** Leaflet
- **Backend:** JSON Server (for mock API using `data.json`)

## 📦 Installation

Clone the repository:

```sh
git clone https://github.com/Persephones-hades101/WorldWise.git
cd WorldWise
```

Install dependencies:

```sh
npm install
```

## 🚀 Running the Project

Start the JSON Server:

```sh
npm run server
```

Start the development server:

```sh
npm run dev
```

The app will be available at: **http://localhost:5173/**

## 📦 Build for Production

To create an optimized production build:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

## 📁 Project Structure

```
worldwise/
│── public/         # Static assets (images, icons, etc.)
│── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Different pages of the app
│   ├── hooks/      # Custom React hooks
│   ├── context/    # State management with Context API
│   ├── assets/     # Images, icons, and styles
│   ├── App.jsx     # Main App component
│   ├── main.jsx    # Entry point
│── data.json       # Mock database for JSON Server
│── index.html      # Root HTML file
│── vite.config.js  # Vite configuration
│── package.json    # Dependencies and scripts
```

## 🔧 Configuration

- Ensure `data.json` contains the required mock data.
- Modify `vite.config.js` for proxy settings if needed.

## 🛠️ Development Tools

- **ESLint & Prettier** for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📞 Contact

For any queries, reach out to [sudh4800@gmail.com].
