<template>
  <div class="container">
    <h1 class="title">Random Pokémon</h1>
    <div v-if="pokemon" class="pokemon-info">
      <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />
      <p><strong>HP:</strong> {{ pokemon.hp }}</p>
      <p><strong>Type(s):</strong> {{ pokemon.types.join(', ') }}</p>
      <p><strong>Height:</strong> {{ pokemon.height / 10 }} m</p>
      <p><strong>Weight:</strong> {{ pokemon.weight / 10 }} kg</p>
      <p><strong>Abilities:</strong> {{ pokemon.abilities.join(', ') }}</p>
      <h3>Base Stats:</h3>
      <p>
        <li v-for="stat in pokemon.baseStats" :key="stat.name">
          {{ stat.name }}: {{ stat.value }}
        </li>
      </p>
    </div>
    <button class="fetch-button" @click="fetchRandomPokemon">
      Get Random Pokémon
    </button>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemon: null,
      maxPokemonId: 1010,
    };
  },
  methods: {
    async fetchRandomPokemon() {
      try {
        const randomId = Math.floor(Math.random() * this.maxPokemonId) + 1;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = response.data;
        const hpStat = data.stats.find(stat => stat.stat.name === 'hp');

        this.pokemon = {
          name: data.name,
          hp: hpStat ? hpStat.base_stat : 'N/A',
          types: data.types.map(t => t.type.name),
          image: data.sprites.front_default || '',

          // Additional info:
          height: data.height,             // height in decimetres
          weight: data.weight,             // weight in hectograms
          abilities: data.abilities.map(a => a.ability.name),  // list of abilities
          baseStats: data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          }))
        };
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        this.pokemon = null;
      }
    }
  },
  mounted() {
    this.fetchRandomPokemon();
  }
};
</script>


<style scoped>
.container {
  padding: 1.5rem;
  max-width: 28rem;
  margin: 0 auto;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.pokemon-info {
  text-align: center;
}

.pokemon-name {
  font-size: 1.25rem;
  text-transform: capitalize;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pokemon-image {
  display: block;
  margin: 0 auto 1rem;
}

.fetch-button {
  display:block;
  margin:2.5rem auto ;
  background-color: #e94141;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  transition: background-color 0.3s ease;
}

.fetch-button:hover {
  background-color: #f17b7b;
}
</style>
