<template>
  <div class="container">
    <!-- Loading state -->
    <LoadingSpinner v-if="isLoading" message="Catching a Pokemon..." />

    <div class="pokemon-wrapper" v-else-if="pokemon">

      <button class="fetch-button" @click="fetchRandomPokemon" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : 'Get New Pokemon' }}
      </button>

      <div class="pokemon-card" :class="'type-' + pokemon.types[0]">
        <div class="pokemon-layout">
          <!-- Left side - Image with name and HP -->
          <div class="pokemon-image-section">
            <h2 class="pokemon-name">{{ pokemon.name }}</h2>
            <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />
            <div class="hp-display">
              <span class="hp-label">HP</span>
              <span class="hp-value">{{ pokemon.hp }}</span>
            </div>
          </div>

          <!-- Right side - Stats in two columns -->
          <div class="pokemon-stats-section">
            <!-- First column - Type, Abilities, Speed -->
            <div class="stats-column">
              <div class="stat-item type-stat">
                <span class="stat-label">Type</span>
                <span class="stat-value">{{ pokemon.types.join(', ') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Location</span>
                <span class="stat-value">{{ pokemon.location }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Abilities</span>
                <span class="stat-value">{{ pokemon.abilities.join(', ') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Speed</span>
                <span class="stat-value">{{ getStatValue('speed') }}</span>
              </div>
            </div>

            <!-- Second column - Attack stats -->
            <div class="stats-column">
              <div class="stat-item">
                <span class="stat-label">Attack</span>
                <span class="stat-value">{{ getStatValue('attack') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Defense</span>
                <span class="stat-value">{{ getStatValue('defense') }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Sp. Attack</span>
                <span class="stat-value">{{ getStatValue('special-attack') }}</span>
              </div>
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
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner
  },
  data() {
    return {
      pokemon: null,
      maxPokemonId: 1010,
      isLoading: false,
    };
  },

  methods: {
    async fetchRandomPokemon() {
      try {
        this.isLoading = true;
        const randomId = Math.floor(Math.random() * this.maxPokemonId) + 1;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = response.data;
        const hpStat = data.stats.find(stat => stat.stat.name === 'hp');

        // Fetch location area encounters
        let locationAreas = [];
        try {
          const locationResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}/encounters`);
          locationAreas = locationResponse.data.slice(0, 3).map(encounter => encounter.location_area.name.replace(/-/g, ' '));
        } catch (locationError) {
          console.log('No location data available for this Pokémon');
        }

        this.pokemon = {
          name: data.name,
          hp: hpStat ? hpStat.base_stat : 'N/A',
          location: locationAreas.length > 0 ? locationAreas.join(', ') : 'Unknown',
          types: data.types.map(t => t.type.name),
          image: data.sprites.front_default || '',
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map(a => a.ability.name),
          baseStats: data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          }))
        };
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        this.pokemon = null;
      } finally {
        this.isLoading = false;
      }
    },
    getStatValue(statName) {
      const stat = this.pokemon.baseStats.find(s => s.name === statName);
      return stat ? stat.value : 'N/A';
    }
  },
  mounted() {
    this.fetchRandomPokemon();
  }
};
</script>


<style>
@import '../styles/pokemon-types.css';

/* General section */
.container {
  padding: 200px 2rem 2rem;
  max-width: 1800px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.pokemon-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

/* Left side - Image section */
.pokemon-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pokemon-name {
  font-size: 2rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.pokemon-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.hp-display {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.hp-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e9e9e9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hp-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e94141;
}

/* Right side - Stats section */
.pokemon-stats-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.stats-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.type-stat {
  position: relative;
  overflow: hidden;
}

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

.type-stat:hover::before {
  left: 100%;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #838383;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e9e9e9;
  text-transform: capitalize;
}

/* Wrapper for pokemon card and button */
.pokemon-wrapper {
  position: relative;
  width: 100%;
  max-width: 1400px;
}

/* Button for fetching new pokemons */
.fetch-button {
  position: absolute;
  top: -4rem;
  right: 0;
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

.fetch-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}
</style>
