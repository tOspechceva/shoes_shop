<template>
  <Header></Header>
    <Navigation></Navigation>
   <div id="main">
    <div class="container_contact">
    <section >
            <h2 class="header">Адрес и контактная информация</h2>
            <p class="text" >Мы находимся по адресу:Россия, Белгород, Белгородский просп., 87. Ряд 17 место 5.</p>
            <p class="text">Телефон для связи с нами: +7 (952) 425 - 65 - 79 (Алекс)</p>
            <div class="map-container">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A6fdbc05b6deb6cdd39dd51297f4dff65e5015a9193113d1b9092c3772b7630b0&width=500&height=508&lang=ru_RU&scroll=true"
        width="500"
        height="400"
        frameborder="0"
        style="border:0;"
        allowfullscreen
      ></iframe>
    </div>
        </section>
    </div>
  </div>
   <Footer></Footer>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

export default {
    name: 'Contact',
    components: {
        Navigation,
        Header,
        Footer,
  },
  data() {
    return {
      email: "example@example.com",
      web: "https://example.com",
    };
  },
};
</script>
<style scoped>
footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #333;
        color: white;
        text-align: center;
        padding: 10px 0;
    }
.header {
    color: #000000;
    font-size: 2rem;
    font-family: 'Segoe Script', cursive;
    margin-bottom: 0px;
    text-align: center;
}

.text{
    color: #000000;   /* Цвет текста*/
    text-align: left;   /* Выравнивание в лево */
    font-size: 16px;    /* Размер текста */
}

.map-container {
    width: 100%;        /* Установите ширину контейнера */
    max-width: 500px;   /* Максимальная ширина */
    height: 500px;      /* Высота карты */
    margin: 0 auto;         /* Центрирование на странице */
}

.container_contact {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 700px;
  
}

#main {
    display: flex;
    justify-content: center;
    /* Центрирование по горизонтали */
    align-items: center;
    /* Центрирование по вертикали */
    flex: 1;
    /* Этот блок займет все оставшееся пространство */
    padding: 20px;
    text-align: left;
    height: 80%;
}
</style>
