<template>
    <Header></Header>
    <Navigation></Navigation>
    <div class="login_main">
    <div class="catalog">
 <div class="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.img" :alt="product.name" />
    <p>{{ product.description }}</p>
    <p>Сезон: {{ product.Season?.name || 'Не указан' }}</p>
    <p>Материал: {{ product.Material?.name || 'Не указан' }}</p>
    <p v-if="product.Insulation">Утеплитель: {{ product.Insulation.name }}</p>
    <p>Производитель: {{ product.Manufacturer?.name || 'Не указан' }}</p>
    <p>Страна производителя: {{ product.Manufacturer?.country || 'Не указан' }}</p>
    <p class="price"><b>Цена:</b> {{ product.price }} руб.</p>
    <a href="#" class="buy-btn">Купить</a>
  </div>
  </div>
  </div>
 
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';
import CatalogService from '@/services/CatalogService';

export default {
    name: 'ProductDetails',
    components: {
        Navigation,
        Header,
        Footer,
    },
     props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: {}, // Детали товара
    };
  },
  async created() {
    try {
      const response = await CatalogService.getProductById(this.id);
        this.product = response.data;
        console.log(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке товара:', error);
    }
  },
}
</script>

<style scoped>
h2 {
    background-color: #233870;            /* Задаём тёмно-синий фон для заголовка */
    color: #ffffff;                       /* Цвет текста белый */
    font-size: 2rem;                        /* Размер шрифта для заголовка h1 */
    font-family: 'Segoe Script', cursive;   /* Шрифт для заголовка (рукописный стиль) */
    margin-bottom: 20px;                     /* Убираем нижний отступ, чтобы не было лишнего пространства после заголовка */
    
}



#category-select {
    padding: 8px;       /* Внутренний отступ для выпадающего списка */
    font-size: 16px;    /* Размер шрифта для выпадающего списка */
    margin-left: 10px;  /* Отступ слева, чтобы элементы не прилипали друг к другу */
}

.catalog {
    display: flex;                  /* Используем flexbox для организации элементов */
    justify-content: space-between; /* Равномерное распределение элементов по горизонтали */
    flex-wrap: wrap;                /* Элементы будут переноситься на новую строку, если не помещаются */
}

.product {
    width: 20%;                 /* Ширина каждого товара — 30% от ширины родительского контейнера */
    margin-bottom: 20px;        /* Отступ снизу между товарами */
    text-align: center;         /* Выравнивание содержимого по центру */
    border: 1px solid #ccc;   /* Светло-серая рамка вокруг товара */
    border-radius: 5px;         /* Скругление углов рамки */
    padding: 15px;              /* Внутренние отступы для блока товара */
    background-color: #fff;   /* Белый фон для каждого товара */
      
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    
}
.product img {
    width: 200px;           /* Фиксированная ширина для изображений товаров */
    height: 200px;          /* Фиксированная высота для изображений товаров */
    object-fit: contain;    /* Изображение будет масштабироваться с сохранением пропорций */
    margin: auto;           /* Центрирование изображения внутри контейнера */
}

.product h2 {
    font-size: 22px;        /* Размер шрифта для заголовка товара */
    margin: 10px 0;         /* Отступы сверху и снизу для заголовка товара */
}

.product p {
    font-size: 16px;       /* Размер шрифта для описания товара */
    margin-bottom: 10px;   /* Отступ снизу для описания товара */
     text-align: left; 
}

.product:hover img {
    transform: scale(1.5);
}

.buy-btn {
    display: inline-block;        /* Кнопка будет вести себя как блок, но на одной линии с другими элементами */
    padding: 10px 20px;           /* Внутренний отступ для кнопки */
    background-color: #007bff;  /* Синий фон для кнопки */
    color: white;               /* Белый цвет текста на кнопке */
    text-decoration: none;        /* Убираем подчеркивание текста в кнопке */
    border-radius: 5px;           /* Скругление углов кнопки */
    font-size: 16px;              /* Размер шрифта для текста кнопки */
}

.buy-btn:hover {
    background-color: #0056b3;  /* При наведении фон кнопки становится темнее */
}

.login_main {
    display: flex;
    justify-content: center;  /* Центрирование по горизонтали */
    align-items: center;      /* Центрирование по вертикали */
    flex: 1;                  /* Этот блок займет все оставшееся пространство */
    padding: 20px;
    text-align: center;
 }
</style>