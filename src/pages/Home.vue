<template>
    <div class="home-container">
        <div class="content-card">
            <div class="hero-section">
                <h1 class="hero-title">Welcome to PokeMystery</h1>
                <p class="hero-subtitle">
                    A new way to explore more of the world of Pokémon...
                </p>
                <div class="hero-buttons">
                    <router-link to="/dexmystery" class="cta-button">
                        Start Exploring
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
.home-container {
    max-width: 850px;
    margin: 0 auto;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    padding: 3rem 2.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1000px;
}

.hero-section {
    text-align: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #3689e7 10%, #183ea5 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: #333333;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    margin-top: 2rem;
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #80b4ee 10%, #4b6fd4 80%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(107, 142, 240, 0.6);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .home-container {
        padding: 100px 1rem 2rem;
    }
    
    .content-card {
        padding: 2rem 1.5rem;
        border-radius: 25px;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .cta-button {
        padding: 0.875rem 1.75rem;
        font-size: 1rem;
    }
}

</style>