<!--
  DexMystery Page Component
  
  This component provides the main Pokemon discovery and catching functionality.
  Users can fetch random Pokemon from the PokeAPI, view detailed stats, and catch them.
  
  Features:
  - Fetches random Pokemon from PokeAPI (IDs 1-1010)
  - Displays Pokemon with detailed stats in a card layout
  - Allows users to catch Pokemon and save to localStorage
  - Shows loading states during API calls
  - Prevents duplicate catches of the same Pokemon
  - Responsive design with glassmorphism styling
-->
<template>
  <div class="container">
    <!-- Loading state: Shows spinner while fetching Pokemon data -->
    <LoadingSpinner v-if="isLoading" message="Finding a Pokemon..." />

    <!-- Main Pokemon display: Only shown when Pokemon data is loaded -->
    <div class="pokemon-wrapper" v-else-if="pokemon">

      <!-- Action buttons: Positioned above the Pokemon card -->
      <div class="action-buttons">
        <!-- Button to fetch a new random Pokemon -->
        <button class="fetch-button" @click="fetchRandomPokemon" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Get New Pokemon' }}
        </button>
        <!-- Button to catch the current Pokemon (disabled if already caught) -->
        <button class="catch-button" @click="catchPokemon" :disabled="!pokemon || isCaught">
          {{ isCaught ? 'Already Caught!' : 'Catch Pokemon' }}
        </button>
      </div>

      <!-- Pokemon card: Styled based on the Pokemon's primary type -->
      <div class="pokemon-card" :class="'type-' + pokemon.types[0]">
        <div class="pokemon-layout">
          <!-- Left side: Pokemon image, name, and HP display -->
          <div class="pokemon-image-section">
            <!-- Pokemon name (capitalized) -->
            <h2 class="pokemon-name">{{ pokemon.name }}</h2>
            <!-- Pokemon sprite image -->
            <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />
            <!-- HP display with label and value -->
            <div class="hp-display">
              <span class="hp-label">HP</span>
              <span class="hp-value">{{ pokemon.hp }}</span>
            </div>
          </div>

          <!-- Right side: Pokemon stats organized in two columns -->
          <div class="pokemon-stats-section">
            <!-- First column: Type, Location, Abilities, Speed -->
            <div class="stats-column">
              <!-- Type stat with special styling and hover effects -->
              <div class="stat-item type-stat">
                <span class="stat-label">Type</span>
                <span class="stat-value">{{ pokemon.types.join(', ') }}</span>
              </div>
              <!-- Location where Pokemon can be found -->
              <div class="stat-item">
                <span class="stat-label">Location</span>
                <span class="stat-value">{{ pokemon.location }}</span>
              </div>
              <!-- Pokemon abilities -->
              <div class="stat-item">
                <span class="stat-label">Abilities</span>
                <span class="stat-value">{{ pokemon.abilities.join(', ') }}</span>
              </div>
              <!-- Speed stat -->
              <div class="stat-item">
                <span class="stat-label">Speed</span>
                <span class="stat-value">{{ getStatValue('speed') }}</span>
              </div>
            </div>

            <!-- Second column: Combat stats (Attack, Defense, Special stats) -->
            <div class="stats-column">
              <!-- Physical attack stat -->
              <div class="stat-item">
                <span class="stat-label">Attack</span>
                <span class="stat-value">{{ getStatValue('attack') }}</span>
              </div>
              <!-- Physical defense stat -->
              <div class="stat-item">
                <span class="stat-label">Defense</span>
                <span class="stat-value">{{ getStatValue('defense') }}</span>
              </div>
              <!-- Special attack stat -->
              <div class="stat-item">
                <span class="stat-label">Sp. Attack</span>
                <span class="stat-value">{{ getStatValue('special-attack') }}</span>
              </div>
              <!-- Special defense stat -->
              <div class="stat-item">
                <span class="stat-label">Sp. Defense</span>
                <span class="stat-value">{{ getStatValue('special-defense') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// Import required dependencies
import axios from 'axios'; // HTTP client for API requests
import LoadingSpinner from '../components/LoadingSpinner.vue'; // Loading component

export default {
  name: 'DexMystery', // Component name for debugging

  // Register child components
  components: {
    LoadingSpinner
  },

  // Component's reactive data
  data() {
    return {
      pokemon: null,        // Currently displayed Pokemon data
      maxPokemonId: 1010,   // Maximum Pokemon ID in PokeAPI (Gen 1-9)
      isLoading: false,     // Loading state for API calls
      isCaught: false,      // Whether current Pokemon is already caught
    };
  },

  methods: {
    /**
     * Fetches a random Pokemon from the PokeAPI
     * Makes two API calls: one for Pokemon data, one for location data
     * Handles errors gracefully and updates loading states
     */
    async fetchRandomPokemon() {
      try {
        // Set loading state to show spinner
        this.isLoading = true;

        // Generate random Pokemon ID (1-1010)
        const randomId = Math.floor(Math.random() * this.maxPokemonId) + 1;

        // Fetch main Pokemon data from PokeAPI
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = response.data;
        //console.log(data)

        // Extract HP stat from the stats array
        const hpStat = data.stats.find(stat => stat.stat.name === 'hp');

        // Attempt to fetch location data (separate API call)
        let locationAreas = [];
        try {
          const locationResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}/encounters`);
          // Take first 3 locations and format names (replace hyphens with spaces)
          locationAreas = locationResponse.data.slice(0, 3).map(encounter =>
            encounter.location_area.name.replace(/-/g, ' ')
          );
        } catch (locationError) {
          // Location data is optional - some Pokemon don't have encounter data
          console.log('No location data available for this Pokémon');
        }

        // Create normalized Pokemon object with all required data
        this.pokemon = {
          id: data.id,
          name: data.name,
          hp: hpStat ? hpStat.base_stat : 'N/A',
          location: locationAreas.length > 0 ? locationAreas.join(', ') : 'Unknown',
          types: data.types.map(t => t.type.name), // Extract type names
          image: data.sprites.front_default || '', // Default sprite image
          abilities: data.abilities.map(a => a.ability.name), // Extract ability names
          baseStats: data.stats.map(stat => ({ // Normalize stats structure
            name: stat.stat.name,
            value: stat.base_stat
          }))
        };

        // Check if this Pokemon is already in the user's collection
        this.checkIfCaught();
      } catch (error) {
        // Handle API errors gracefully
        console.error('Error fetching Pokémon:', error);
        this.pokemon = null;
      } finally {
        // Always clear loading state
        this.isLoading = false;
      }
    },

    /**
     * Helper method to get a specific stat value by name
     * @param {string} statName - The name of the stat to retrieve
     * @returns {number|string} The stat value or 'N/A' if not found
     */
    getStatValue(statName) {
      const stat = this.pokemon.baseStats.find(s => s.name === statName);
      return stat ? stat.value : 'N/A';
    },

    /**
     * Catches the current Pokemon and saves it to localStorage
     * Prevents duplicate catches and adds timestamp
     */
    catchPokemon() {
      // Prevent catching if no Pokemon or already caught
      if (!this.pokemon || this.isCaught) return;

      // Get existing caught Pokemon from localStorage
      const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon') || '[]');

      // Create Pokemon object with catch timestamp
      const pokemonToCatch = {
        ...this.pokemon,
        caughtAt: Date.now() // Add timestamp for sorting/display
      };

      // Add to collection and save back to localStorage
      caughtPokemon.push(pokemonToCatch);
      localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));

      // Update UI state
      this.isCaught = true;
    },

    /**
     * Checks if the current Pokemon is already in the user's collection
     * Updates the isCaught state to disable/enable the catch button
     */
    checkIfCaught() {
      if (!this.pokemon) {
        this.isCaught = false;
        return;
      }

      // Load caught Pokemon from localStorage and check for match by ID
      const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon') || '[]');
      this.isCaught = caughtPokemon.some(p => p.id === this.pokemon.id);
    }
  },

  /**
   * Vue lifecycle hook - runs after component is mounted to DOM
   * Automatically fetches the first Pokemon when page loads
   */
  mounted() {
    this.fetchRandomPokemon();
  }
};
</script>


<style scoped>
@import '../styles/pokemon-types.css';

/* Main page container with centered layout */
.container {
  padding: 220px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Pokemon card with glassmorphism effect */
.pokemon-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Grid layout for Pokemon card content */
.pokemon-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

/* Left side container for image, name, and HP */
.pokemon-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Pokemon name styling */
.pokemon-name {
  font-size: 2rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

/* Pokemon sprite image */
.pokemon-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* HP display container */
.hp-display {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

/* HP label text */
.hp-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e9e9e9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* HP value number */
.hp-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e94141;
}

/* Right side stats container with two columns */
.pokemon-stats-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Individual column of stats */
.stats-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Individual stat item container */
.stat-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

/* Hover effect for stat items */
.stat-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Type stat with shimmer animation */
.type-stat {
  position: relative;
  overflow: hidden;
}

/* Shimmer effect for type stat */
.type-stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

/* Trigger shimmer on hover */
.type-stat:hover::before {
  left: 100%;
}

/* Stat label text */
.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #838383;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Stat value text */
.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e9e9e9;
  text-transform: capitalize;
}

/* Wrapper for Pokemon card and floating buttons */
.pokemon-wrapper {
  position: relative;
  width: 100%;
  max-width: 1400px;
}

/* Container for action buttons above the card */
.action-buttons {
  position: absolute;
  top: -4rem;
  right: 0;
  display: flex;
  gap: 1rem;
}

/* Get New Pokemon button */
.fetch-button {
  background: linear-gradient(135deg, #80b4ee 10%, #4b6fd4 80%);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 25px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  backdrop-filter: blur(10px);
}

/* Hover effect for fetch button */
.fetch-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

/* Catch Pokemon button */
.catch-button {
  background: linear-gradient(135deg, #4ecdc4 10%, #44a08d 80%);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 25px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.4);
  backdrop-filter: blur(10px);
}

/* Hover effect for catch button when enabled */
.catch-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(78, 205, 196, 0.6);
}

/* Disabled state for catch button */
.catch-button:disabled {
  background: linear-gradient(135deg, #666 10%, #555 80%);
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
