<template>
    <Header></Header>
    <Navigation></Navigation>
     <div class="catalog-page">
        
    <Sidebar></Sidebar>
    <main>
    <h2>Каталог Мужской Обуви</h2>

    <!-- Кнопка для открытия фильтров -->
     
    <Filter></Filter>
    

    <!-- Список товаров -->
     <div class="catalog">
    <div class="product" v-for="product in products" :key="product.id">
      <img :src="product.img" :alt="product.name" />
      <router-link :to="`/product/${product.id}`">
        <h2>{{ product.name }}</h2>
      </router-link>
      <p>{{ product.description }}</p>
      <p class="price">Цена: {{ product.price }} руб.</p>
      <a href="#" class="buy-btn">Купить</a>
    </div>
  </div>

    <!-- Навигация по страницам -->
    <div class="pagination">
    <button 
        :disabled="currentPage === 1" 
        @click="handlePageChange(currentPage - 1)">
        Предыдущая
    </button>

    <span v-for="page in totalPages" :key="page" class="page-number">
        <button 
            :class="{ active: page === currentPage }" 
            @click="handlePageChange(page)">
            {{ page }}
        </button>
    </span>

    <button 
        :disabled="currentPage === totalPages" 
        @click="handlePageChange(currentPage + 1)">
        Следующая
    </button>
</div>

    </main>
    </div>
   
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';

import Filter from '../components/Filter.vue';
import Sidebar from '../components/Sidebar.vue'

import AuthenticationService from '@/services/AuthenticationService';

export default {
    name: 'Catalog',//this is the name of the component
    components: {
        Navigation,
        Header,
        Footer,
        Filter,
        Sidebar
    },
    data() {
        return {
            products: [],      // Массив для товаров
            currentPage: 1,    // Текущая страница
            totalPages: 1,     // Общее количество страниц
            itemsPerPage: 15,  // Количество товаров на странице
        };
    },
    methods: {
    async fetchProducts(page = 1) {
        try {
            const response = await AuthenticationService.paginated({
                params: {
                    page: page,
                    limit: this.itemsPerPage,
                },
            });
            const data = response.data; // Axios возвращает данные в `response.data`
            this.products = data.products;
            this.currentPage = data.currentPage;
            this.totalPages = data.totalPages;
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    },
    handlePageChange(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.fetchProducts(page);
        }
        },
   
},
created() {
    this.fetchProducts(); // Загрузка первой страницы при монтировании компонента
},
}
</script>
<style scoped>
.pagination .page-number button.active {
    font-weight: bold;
    background-color: #ddd;
}

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
}

.product:hover img {
    transform: scale(1.2);
}

.price {
    font-weight: bold;      /* Жирный шрифт для цены товара */
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


.pagination {
    display: flex;
    justify-content: center;
    /* Центрирование пагинации по горизонтали */
    margin-top: 20px;
    /* Отступ сверху */
    padding: 10px;
}

.page-number {
    display: inline-block;
    margin: 0 5px;
    /* Отступ между цифрами */
    padding: 8px 12px;
    border: 1px solid #233870;
    border-radius: 5px;
    color: #233870;
    cursor: pointer;
    background-color: #fff;  /* Цвет фона панели – белый */
}

.page-number.active,
/* Активная страница */
.page-number:hover {
    background-color: #233870;
    color: white;
    
}

 main {

     justify-content: center;
     /* Центрирование по горизонтали */
     align-items: center;
     /* Центрирование по вертикали */
     flex: 08;
     /* Этот блок займет все оставшееся пространство */
     padding: 20px;
     text-align: center;
 }


 .catalog-page {
     display: flex;
 }

 
</style>