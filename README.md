# PokeMystery

A Comprehensive Pokemon web application that allows users to explore the vast world of Pokemon through an intuitive and visually appealing interface. Discover random Pokemon, catch them, and build your personal digital Pokedex.

## Public website

https://pokemystery.vercel.app/

## Development Progression

**August 28**
- Initial research and planning phase
- Explored Vue.js framework and studied existing projects on GitHub
- Discovered and analyzed the PokéAPI capabilities
- Organized main tasks and extra features for the project roadmap

**August 29**
- Implemented the main landing page with welcome interface
- Created the dock navigation menu for seamless page transitions
- Enhanced the Pokemon discovery page (DexMystery) with improved fetching functionality
- Established the core application structure and routing

**August 30**
- Focused on visual improvements and user experience enhancements
- Refined the aesthetic design of the web application
- Implemented glassmorphism effects and a night forest themed styling
- Optimized responsive design for various screen sizes

**August 31**
- Developed the Pokedex collection system
- Added functionality for users to view their caught Pokemon
- Implemented localStorage for persistent data storage
- Laid groundwork for future features (evolution chains and Pokemon sounds)

**September 1**
- Enhanced the Pokedex with detailed Pokemon modal cards
- Integrated evolution chain display functionality
- Added Pokemon cry sound playback feature
- Completed the core user interaction loop from discovery to detailed viewing
- Documentation of the code and updated the README.md file

**September 2**
- Final review of the code and documentation
- Addressed any remaining bugs or/and issues
- Published the project on GitHub and hosted it on Render

## Features

### Core Functionality
- **Random Pokemon Discovery**: Discover random Pokemon from over 1000 creatures (Gen 1-9)
- **Pokemon Collection**: Catch and save Pokemon to your personal Pokédex
- **Detailed Stats**: View comprehensive stats including HP, Attack, Defense, Speed, abilities, and locations
- **Smart Duplicate Prevention**: Prevents catching the same Pokemon twice

### Pages
- **Home**: Welcome page with call-to-action to start catching
- **DexMystery**: Main discovery page for finding and catching new Pokemon
- **Pokédex**: Collection view showing all caught Pokemon with release functionality

## Tech Stack

- **Vue 3** with Composition API and Vue Router
- **Vite** for fast development and building
- **Axios** for API requests
- **PokéAPI** for Pokemon data
- **CSS3** with custom styling and animations
- **LocalStorage** for persistent Pokemon collection

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <repo-url>
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
│   ├── DockNavigation.vue     # Bottom navigation dock
│   ├── LoadingSpinner.vue     # Loading animation component
│   └── PokemonModal.vue       # Detailed Pokemon modal
├── pages/
│   ├── Home.vue              # Landing page
│   ├── DexMystery.vue        # Pokemon discovery page
│   └── Pokedex.vue           # Collection management page
├── router/
│   └── index.js              # Vue Router configuration
├── styles/
│   └── pokemon-types.css     # Type-based styling
├── App.vue                   # Root component with forest background
└── main.js                   # Application entry point
public/
└── images/
    └── background_forest.jpg  # Night Forest background image (from Pokemon Scarlet and Violet)
```

## How It Works

### Pokemon Discovery
1. Navigate to the DexMystery page from the home screen
2. Click "Get New Pokemon" to fetch a random Pokemon (ID 1-1010)
3. View detailed stats including type, abilities, location, and combat stats
4. Click "Catch Pokemon" to add it to your collection (Pokedex)

### Collection Management
1. Visit your Pokédex to see all caught Pokemon
2. View catch timestamps and detailed information
3. Release Pokemon from your collection if desired
4. Click on any Pokemon card for detailed modal view (Evolution Chain & Cry Sound)

### Data Persistence
- All caught Pokemon are stored in browser localStorage
- Collection persists between sessions
- Duplicate prevention ensures unique collections

## API Integration

This app uses the [PokéAPI](https://pokeapi.co/) to fetch Pokemon data:
- **Pokemon Endpoint**: Basic Pokemon data, stats, and sprites
- **Encounters Endpoint**: Location data for where Pokemon can be found
- **No API Key Required**: Free and open API access

## Browser Compatibility

- LocalStorage support required for collection persistence
