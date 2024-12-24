<template>
 
    <Header></Header>
    <Navigation></Navigation>
    <div style="text-align: center;">
    <h2>Ваша идеальная пара на все случаи жизни .</h2>
    </div>

    <section class="products">
    <div class="product-card">
        <img src="..\\img\\зима.jpg" alt="Ботинки">
        <h3>Обувь для зимы</h3>
        <p>Утепленная обувь на меху</p>
    
    </div>
  
    <div class="product-card">
        <img src="..\\img\\классические туфли.webp">
        <h3>Весенняя - Осенняя</h3>
       
    </div>
    <div class="product-card">
        <img src="..\\img\\лето.jpg" alt="Летняя обувь">
        <h3>Летняя обувь</h3>
        
    </div>
    <div class="product-card">
        <img src="..\\img\\демисезонные.webp" alt="Ботинки">
        <h3>Демисезонная</h3>
        <p >Обувь с небольшим утеплением внутри </p>
        <p>(байка, текстиль)</p>
    </div>
    
    </section>

   
    <Footer></Footer>

</template>

<script>
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';

export default {
    name: 'Home',
    components: {
    Navigation,
    Header,
    Footer,
  }
};
</script>

<style scoped>


h2 {
    background-color:  #233870; /* Заливка фона */
    color: #ffffff;
    font-size: 2rem; /* Размер шрифта для h2 */
    font-family: 'Segoe Script', cursive; /* Шрифт для h2 */
     margin-bottom: 0px;/* Уменьшаем нижний отступ */
}

.hero {
    background-image: url('shoes-banner.jpg');
    background-size: cover;
    background-position: center;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
}
.hero h2 {
    font-size: 48px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}
.product-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
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
.product-card button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
}
.product-card button:hover {
    background-color: #45a049;
}


</style>


