<template>
    <Header></Header>
    <Navigation></Navigation>
    <div style="text-align: center;">
        <h2>Ваша идеальная пара на все случаи жизни.</h2>
    </div>

    <section class="products">
        <div class="product-card">
            <img src="..\\img\\зима.jpg" alt="Ботинки">
            <h3 @click="goToCatalog(2)" style="cursor: pointer">Обувь для зимы</h3>
            <p>Утепленная обувь на меху</p>
        </div>
    
        <div class="product-card">
            <img src="..\\img\\классические туфли.webp">
            <h3 @click="goToCatalog(3)" style="cursor: pointer">Весенняя - Осенняя</h3>
        </div>
    
        <div class="product-card">
            <img src="..\\img\\лето.jpg" alt="Летняя обувь">
            <h3 @click="goToCatalog(1)" style="cursor: pointer">Летняя обувь</h3>
        </div>
    
        <div class="product-card">
            <img src="..\\img\\демисезонные.webp" alt="Ботинки">
            <h3 @click="goToCatalog(4)" style="cursor: pointer">Демисезонная</h3>
            <p>Обувь с небольшим утеплением внутри</p>
            <p>(байка, текстиль)</p>
        </div>
    </section>


</template>

<script>
import Navigation from './components/Navigation.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

export default {
    name: 'Home',
    components: {
        Navigation,
        Header,
        Footer,
    },
    methods: {
        goToCatalog(seasonId) {
            // Переход на страницу каталога с выбранным seasonId
            this.$router.push({ name: 'catalogWithSeason', params: { seasonId } });
        }
    }
};
</script>

<style scoped>
h2 {
    background-color: #233870; /* Заливка фона */
    color: #ffffff;
    font-size: 2rem; /* Размер шрифта для h2 */
    font-family: 'Segoe Script', cursive; /* Шрифт для h2 */
    margin-bottom: 0px; /* Уменьшаем нижний отступ */
    padding: 10px;
    text-align: center;
}

.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
}

.product-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: scale(1.05);
}

.product-card img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.product-card h3 {
    margin: 10px 0;
}

.product-card p {
    margin: 10px 0;
}

@media (max-width: 768px) {
    .products {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
    h2 {
        display: none;
    }
    
}
</style>

