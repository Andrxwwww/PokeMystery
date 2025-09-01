<!--
  Pokedex Page Component
  
  This component displays a collection of all caught Pokemon in a grid layout.
  Users can view their caught Pokemon, release them, and see detailed information.
  
  Features:
  - Loads caught Pokemon from localStorage
  - Displays Pokemon in responsive grid cards
  - Shows Pokemon count at the top
  - Allows releasing Pokemon with confirmation
  - Opens detailed modal on Pokemon card click
  - Displays catch timestamp for each Pokemon
  - Responsive design with type-based styling
-->
<template>
  <div class="container">
    <!-- Page header with title and count -->
    <div class="header">
      <h1 class="page-title">My Pokedex</h1>
      <div class="pokemon-count">{{ caughtPokemon.length }} Pokemon caught</div>
    </div>

    <!-- Grid of caught Pokémon cards -->
    <div class="pokemon-wrapper">
      <div class="pokemon-grid">
        <div 
          v-for="pokemon in caughtPokemon" 
          :key="pokemon.id + '-' + pokemon.caughtAt"
          class="pokemon-card"
          :class="'type-' + pokemon.types[0]"
          @click="openPokemonModal(pokemon)"
        >
          <!-- Release button -->
          <button class="release-btn" @click.stop="releasePokemon(pokemon)" title="Release Pokémon">
            X
          </button>
          
          <!-- Simplified card content -->
          <div class="card-content">
            <!-- Top section: HP and Name side by side -->
            <div class="top-info">
              <div class="hp-display">
                <span class="hp-value">{{ pokemon.hp }}</span>
                <span class="hp-label">HP</span>
              </div>
              <h3 class="pokemon-name">{{ pokemon.name }}</h3>
            </div>

            <!-- Center: Pokémon image -->
            <img 
              :src="pokemon.image" 
              :alt="pokemon.name"
              class="pokemon-image"
            />

            <!-- Bottom section: Type -->
            <div class="type-display">
              <span class="type-value">{{ pokemon.types[0] }}</span>
            </div>

            <!-- Caught date at the very bottom -->
            <div class="caught-date">
              {{ formatDate(pokemon.caughtAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simple Pokemon Modal -->
    <SimplePokemonModal 
      :pokemon="selectedPokemon" 
      :isVisible="showModal" 
      @close="closeModal" 
    />
  </div>
</template>

<script>
import SimplePokemonModal from '../components/PokemonModal.vue';

export default {
  name: 'Pokedex',
  
  components: {
    SimplePokemonModal
  },
  
  data() {
    return {
      caughtPokemon: [],
      selectedPokemon: null,
      showModal: false
    };
  },

  methods: {
    // Load caught PokEmon from localStorage
    loadCaughtPokemon() {
      const stored = localStorage.getItem('caughtPokemon');
      this.caughtPokemon = stored ? JSON.parse(stored) : [];
    },

    // Release (delete) a Pokémon from the collection
    releasePokemon(pokemon) {
      if (confirm(`Are you sure you want to release ${pokemon.name}?`)) {
        this.caughtPokemon = this.caughtPokemon.filter(p =>
          !(p.id === pokemon.id && p.caughtAt === pokemon.caughtAt)
        );
        localStorage.setItem('caughtPokemon', JSON.stringify(this.caughtPokemon));
      }
    },

    // Format the caught date for display
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    // Open Pokemon detail modal
    openPokemonModal(pokemon) {
      this.selectedPokemon = pokemon;
      this.showModal = true;
    },

    // Close Pokemon detail modal
    closeModal() {
      this.showModal = false;
      this.selectedPokemon = null;
    }
  },

  mounted() {
    this.loadCaughtPokemon();
  }
};
</script>

<style scoped>
@import '../styles/pokemon-types.css';

/* Main container - matches DexMystery exactly */
.container {
  padding: 170px 2rem 2rem;
  max-width: 1800px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* Page header */
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #e9e9e9;
  margin-bottom: 0.5rem;
}

.pokemon-count {
  font-size: 1.1rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
}

/* Wrapper for pokemon grid */
.pokemon-wrapper {
  width: 100%;
  max-width: 1400px;
}

/* Grid layout for Pokémon cards */
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

/* Individual Pokémon card */
.pokemon-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.2rem;
  position: relative;
  transition: all 0.3s ease;
  min-width: 220px;
  max-width: 280px;
  cursor: pointer;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Release button */
.release-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  opacity: 0.7;
  z-index: 10;
}

.release-btn:hover {
  background: rgba(255, 107, 107, 0.3);
  opacity: 1;
  transform: scale(1.1);
}

/* Card content layout - more compact */
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
}

/* Top section: HP and Name */
.top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.hp-display {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}

.hp-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e94141;
}

.hp-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #e9e9e9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pokemon-name {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: capitalize;
  color: #e9e9e9;
  margin: 0;
}

/* Pokémon image - smaller for compact cards */
.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* Type display */
.type-display {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 0.5rem 1rem;
}

.type-value {
  font-size: 1rem;
  font-weight: bold;
  color: #e9e9e9;
  text-transform: capitalize;
}

/* Caught date */
.caught-date {
  font-size: 0.8rem;
  color: #838383;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
}
</style>