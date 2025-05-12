# Weather Explore 2.0

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.2.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)](https://vitejs.dev/)
[![SCSS](https://img.shields.io/badge/SCSS-1.83.4-CC6699?logo=sass)](https://sass-lang.com/)

## 📝 Project Description

Weather Explore 2.0 is a modern web application for monitoring weather in different cities around the world with an intuitive interface and rich functionality. The app allows users to add, edit, and delete cities, get current weather details, and forecast for the upcoming days.

## 🔥 Key Features

- 🌓 Light and dark theme support with automatic adaptation of interface elements
- 🔍 City search with automatic data fetching when selecting from the list
- 📊 Detailed weather forecast with various meteorological indicators
- 🔒 User authentication via Firebase
- 🔄 Context-oriented architecture for effective state management
- 🛡️ Isolated error handling for improved user experience
- 📱 Responsive design for different screen sizes
- 🎵 Built-in music system with random track playback
- 📝 Feedback form via Google Forms for collecting user reviews

## 🛠️ Technical Stack

### Frontend
- **React 18** - library for building user interfaces
- **TypeScript** - typed superset of JavaScript
- **React Router** - routing in the application
- **Context API** - managing global application state

### Styling
- **SCSS** - CSS preprocessor for enhanced styling
- **Material UI** - library of ready-made components
- **Bootstrap** - framework for creating responsive design

### Backend & Data Storage
- **Firebase Authentication** - user authentication
- **Firestore** - storing data about cities and user settings

### Additional Tools
- **Vite** - fast build tool
- **React Joyride** - interactive user tutorials
- **OpenWeatherMap API** - retrieving weather data
- **React Player** - library for media content playback
- **Google Forms** - system for collecting user feedback

## 🏗️ Project Architecture

```
src/
├── assets/           # Static resources (images, icons)
├── components/       # React components
│   ├── FirstCard/    # Component for the initial screen
│   ├── MainCards/    # Components for displaying weather information
│   │   ├── AddCard/  # Adding a new city
│   │   ├── UpdateCard/ # Updating an existing city
│   │   ├── DeleteCard/ # Deleting a city
│   │   ├── WeatherCard/ # Weather display
│   │   └── ForecastCard/ # Weather forecast
│   └── shared/       # Shared components (icons, buttons, etc.)
├── contexts/         # React contexts
│   ├── AuthContext   # User authentication
│   ├── ThemeContext  # Theme management
│   ├── WeatherContext # Weather data management
│   ├── RefetchContext # Data refresh
│   └── JoyrideContext # Interactive hints
├── hooks/            # Custom hooks
│   └── useAudioPlayer # Hook for audio player management
├── layouts/          # Layout components
│   └── Header/        # Application header
│       ├── MusicSystem/ # Music system with visualization
│       │   └── Wawe/     # Animated sound visualization
│       └── Feedback/    # Component for collecting feedback (Google Forms)
├── pages/            # Application pages
├── styles/           # Global styles
└── types/            # TypeScript types
```

## 📦 Installation and Setup

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/arhipov35/Weather-Explore-2.0.git
   cd Weather-Explore-2.0
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a .env.local file in the project root directory and add your API keys
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_api_key
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the project in development mode
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. For production build
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🚀 Usage

1. Register or log in to the app
2. Add new cities through the add form
3. View current weather in your cities
4. For detailed forecast, click on the forecast icon
5. To edit or delete a city, use the corresponding icons

---

© 2025 Weather Explore. Made with ❤️ in Ukraine.