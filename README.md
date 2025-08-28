# PokeMystery 🌲✨

A web application that displays random Pokémon with a mystical forest background. Discover new Pokémon with each click and explore their stats in an immersive natural setting.

## Features

- **Random Pokémon Discovery**: Get a random Pokémon from over 1000 available creatures
- **Pokémon Details**: View name, HP, type(s), and official artwork
- **Forest Background**: Atmospheric forest background with 50% opacity for immersive experience
- **Responsive Design**: Clean, centered layout that works on all devices
- **Auto-load**: Automatically displays a random Pokémon when the app loads

## Tech Stack

- **Vue 3** with Composition API
- **Vite** for fast development and building
- **Axios** for API requests
- **PokéAPI** for Pokémon data
- **CSS3** with custom styling and hover effects

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd pokemystery
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── RandPokemon.vue    # Main Pokémon component
├── App.vue                # Root component with forest background
└── main.js               # Application entry point
public/
└── images/
    └── background_forest.jpg  # Forest background image
```

## API

This app uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data. No API key required.
