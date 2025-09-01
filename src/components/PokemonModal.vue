<!--
  Pokemon Modal Component - Shows evolution chain and plays Pokemon cry sound
-->
<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Close button -->
      <button class="close-button" @click="closeModal">✕</button>

      <!-- Pokemon header with sound button -->
      <div class="pokemon-header">
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        <div class="pokemon-info">
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
          <button 
            class="sound-button" 
            @click="playPokemonCry" 
            :disabled="isPlayingSound"
          >
          {{ isPlayingSound ? 'Playing...' : '▶ Play Cry' }}
          </button>
        </div>
      </div>

      <!-- Evolution chain -->
      <div class="evolution-section">
        <h3>Evolution Chain</h3>
        
        <div v-if="isLoadingEvolution" class="loading">
          Loading evolution chain...
        </div>
        
        <div v-else-if="evolutionChain.length > 1" class="evolution-chain">
          <div v-for="(evolution, index) in evolutionChain" :key="evolution.id" class="evolution-item">
            <div v-if="index > 0" class="evolution-arrow">→</div>
            <div class="evolution-pokemon">
              <img :src="evolution.image" :alt="evolution.name" />
              <p>{{ evolution.name }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="no-evolution">
          This Pokémon doesn't evolve.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PokemonModal',
  
  props: {
    pokemon: Object,
    isVisible: Boolean
  },
  
  data() {
    return {
      isLoadingEvolution: false,
      isPlayingSound: false,
      evolutionChain: [],
      pokemonCryUrl: null
    };
  },
  
  watch: {
    isVisible(newValue) {
      if (newValue && this.pokemon) {
        this.loadPokemonData();
      }
    }
  },
  
  methods: {
    async loadPokemonData() {
        await this.loadEvolutionChain();
        await this.loadPokemonCry();
    },
    
    async loadPokemonCry() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}`);
        // Get the cry URL from the API response
        this.pokemonCryUrl = response.data.cries?.latest || response.data.cries?.legacy || null;
      } catch (error) {
        console.error('Error loading Pokemon cry:', error);
        this.pokemonCryUrl = null;
      }
    },
    
    async playPokemonCry() {
      if (!this.pokemonCryUrl || this.isPlayingSound) return;
      
      try {
        this.isPlayingSound = true;
        
        // Create and play audio
        const audio = new Audio(this.pokemonCryUrl);
        audio.volume = 0.5;
        
        // Handle when sound finishes or errors
        audio.addEventListener('ended', () => {
          this.isPlayingSound = false;
        });
        
        audio.addEventListener('error', () => {
          this.isPlayingSound = false;
        });
        
        await audio.play();
      } catch (error) {
        console.error('Error playing sound:', error);
        this.isPlayingSound = false;
      }
    },
    
    async loadEvolutionChain() {
      this.isLoadingEvolution = true;
      
      try {
        // Get species data first
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        //console.log(speciesResponse.data)
        
        // Get evolution chain data
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const chain = evolutionResponse.data.chain;
        
        // Process the chain into a simple array
        this.evolutionChain = await this.processEvolutionChain(chain);
      } catch (error) {
        console.error('Error loading evolution chain:', error);
        this.evolutionChain = [];
      } finally {
        this.isLoadingEvolution = false;
      }
    },
    
    async processEvolutionChain(chain) {
      const evolutions = [];
      let currentChain = chain;
      
      // Walk through the evolution chain
      while (currentChain) {
        try {
          const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentChain.species.name}`);
          const pokemonData = pokemonResponse.data;
          //console.log(pokemonData)
          
          evolutions.push({
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default
          });
          
          // Move to next evolution
          currentChain = currentChain.evolves_to.length > 0 ? currentChain.evolves_to[0] : null;
        } catch (error) {
          console.error('Error processing evolution:', error);
          break;
        }
      }
      
      return evolutions;
    },
    
    closeModal() {
      this.$emit('close');
    }
  },
  
  emits: ['close']
};
</script>

<style scoped>
/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: #fff;
  cursor: pointer;
}

.pokemon-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.pokemon-name {
  font-size: 1.8rem;
  color: #fff;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

/* Sound button */
.sound-button {
  background: linear-gradient(135deg, #ff6b6b 10%, #ee5a24 80%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sound-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.evolution-section h3 {
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
}

.evolution-chain {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.evolution-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.evolution-arrow {
  font-size: 1.5rem;
  color: #fff;
}

.evolution-pokemon {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
}

.evolution-pokemon img {
  width: 60px;
  height: 60px;
}

.evolution-pokemon p {
  color: #fff;
  margin: 0.5rem 0;
  text-transform: capitalize;
}

.loading, .no-evolution {
  text-align: center;
  color: #ccc;
  padding: 2rem;
}
</style>
