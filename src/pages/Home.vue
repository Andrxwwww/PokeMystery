<template>
    <div class="home-container">
        <div class="content-card">
            <div class="hero-section">
                <h1 class="hero-title">Welcome to PokeMystery</h1>
                <p class="hero-subtitle">
                    A new way to explore more of the world of Pokemon...
                </p>
                <div class="hero-buttons">
                    <router-link to="/dexmystery" class="cta-button">
                        <span class="button-text">Start Catching</span>
                        <div class="button-glow"></div>
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
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes glow {

    0%,
    100% {
        opacity: 0.5;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.1);
    }
}

.home-container {
    max-width: 850px;
    margin: 0 auto;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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
    animation: fadeInUp 1s ease-out;
    position: relative;
    z-index: 2;
}

.hero-section {
    text-align: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #ffffff 0%, #648de6 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    line-height: 1.5;
    animation: float 3s ease-in-out infinite;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: #aaaaaa;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-buttons {
    margin-top: 2rem;
    animation: fadeInUp 1s ease-out 0.6s both;
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
    position: relative;
    overflow: hidden;
    animation: pulse 2s ease-in-out infinite;
}

.cta-button:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(107, 142, 240, 0.6);
    animation-play-state: paused;
}

.button-text {
    position: relative;
    z-index: 2;
}

.button-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    animation: glow 2s ease-in-out infinite;
    pointer-events: none;
}
</style>