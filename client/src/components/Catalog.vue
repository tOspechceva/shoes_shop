<template>
    <Header></Header>
    <Navigation></Navigation>
     <div class="catalog-page">
        <aside class="sidebar">
            <h2>Сезоны</h2>
            <ul class="season-list1">
                <li class="season-item1">
                    Зима
                    <ul class="type-list1">
                        <li><a href="#">Сапоги</a></li>
                        <li><a href="#">Ботинки</a></li>
                        <li><a href="#">Классическая обувь</a></li>
                        <li><a href="#">Уги</a></li>
                        <li><a href="#">Берцы</a></li>
                        <li><a href="#">Дутики</a></li>
                        <li><a href="#">Спорт</a></li>
                        <li><a href="#">Кеды</a></li>
                        <li><a href="#">Комфорт обувь</a></li>
                        <li><a href="#">Резиновая обувь</a></li>
                        <li><a href="#">Туфли</a></li>
                        <li><a href="#">Большие размеры 45 - 49 размер</a></li>
                        <li><a href="#">Подростковая 35 - 41 размер</a></li>
                    </ul>
                </li>
                <li class="season-item1">
                    Демисезон
                    <ul class="type-list1">
                        <li><a href="#">Классическая обувь</a></li>
                        <li><a href="#">Спорт</a></li>
                        <li><a href="#">Кеды</a></li>
                        <li><a href="#">Берцы</a></li>
                        <li><a href="#">Большие размеры 45 - 49 размер</a></li>
                        <li><a href="#">Подростковая 35 - 41 размер</a></li>
                
                    </ul>
                </li>
                <li class="season-item1">
                    Весна - Осень
                    <ul class="type-list1">
                        <li><a href="#">Классические туфли</a></li>
                        <li><a href="#">Спортивная</a></li>
                        <li><a href="#">Лоферы</a></li>
                        <li><a href="#">Макасины</a></li>
                        <li><a href="#">Комфорт обувь</a></li>
                        <li><a href="#">Кеды</a></li>
                        <li><a href="#">Резиновая обувь</a></li>
                        <li><a href="#">Берцы</a></li>
                        <li><a href="#">Казаки</a></li>
                        <li><a href="#">Броги</a></li>
                        <li><a href="#">Большие размеры 45 - 49 размер</a></li>
                        <li><a href="#">Подростковая 35 - 41 размер</a></li>
                    </ul>
                </li>
                <li class="season-item1">
                    Лето
                    <ul class="type-list1">
                        <li><a href="#">Классические туфли</a></li>
                        <li><a href="#">Комфорт обувь</a></li>
                        <li><a href="#">Сандали</a></li>
                        <li><a href="#">Шлепанцы</a></li>
                        <li><a href="#">Кеды</a></li>
                        <li><a href="#">Спорт</a></li>
                        <li><a href="#">Резиновая обувь</a></li>
                        <li><a href="#">Сабо</a></li>
                        <li><a href="#">Лоферы</a></li>
                        <li><a href="#">Большие размеры 45 - 49 размер</a></li>
                        <li><a href="#">Подростковая 35 - 41 размер</a></li>
                    </ul>
                </li>
                <!-- Добавьте другие сезоны по аналогии -->
            </ul>
        </aside>
    
    
   


    <main>
    <h2>Каталог Мужской Обуви</h2>

    <!-- Кнопка для открытия фильтров -->
     
    <Filter></Filter>
    

    <!-- Список товаров -->
    <div class="catalog">
        <div class="product">
            <img src="../img/pexels-rahulp9800-3286578.jpg" alt="Кроссовки">
            <h2>Кроссовки</h2>
            <p>Легкие и удобные кроссовки для активного отдыха.</p>
            <p class="price">Цена: 5000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>

        <div class="product">
            <img src="../img/bg-image.jpg" alt="Ботинки">
            <h2>Ботинки</h2>
            <p>Теплые ботинки для холодной погоды с водонепроницаемым покрытием.</p>
            <p class="price">Цена: 7500 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>

        <div class="product">
            <img src="../img/зима.jpg" alt="Туфли">
            <h2>Туфли</h2>
            <p>Элегантные кожаные туфли для деловых встреч и мероприятий.</p>
            <p class="price">Цена: 8000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>

        <div class="product">
            <img src="../img/зима.jpg" alt="Туфли">
            <h2>Туфли</h2>
            <p>Элегантные кожаные туфли для деловых встреч и мероприятий.</p>
            <p class="price">Цена: 8000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>

        <div class="product">
            <img src="../img/демисезонные.webp" alt="Кроссовки">
            <h2>Кроссовки</h2>
            <p>Легкие и удобные кроссовки для активного отдыха.</p>
            <p class="price">Цена: 5000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>
        
        <div class="product">
            <img src="../img/bg-image.jpg" alt="Ботинки">
            <h2>Ботинки</h2>
            <p>Теплые ботинки для холодной погоды с водонепроницаемым покрытием.</p>
            <p class="price">Цена: 7500 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>
        
        <div class="product">
            <img src="../img/зима.jpg" alt="Туфли">
            <h2>Туфли</h2>
            <p>Элегантные кожаные туфли для деловых встреч и мероприятий.</p>
            <p class="price">Цена: 8000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>
        
         <div class="product">
            <img src="../img/bg-image.jpg" alt="Ботинки">
            <h2>Ботинки</h2>
            <p>Теплые ботинки для холодной погоды с водонепроницаемым покрытием.</p>
            <p class="price">Цена: 7500 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>
        
        <div class="product">
            <img src="../img/зима.jpg" alt="Туфли">
            <h2>Туфли</h2>
            <p>Элегантные кожаные туфли для деловых встреч и мероприятий.</p>
            <p class="price">Цена: 8000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>
        
        <div class="product">
            <img src="../img/зима.jpg" alt="Туфли">
            <h2>Туфли</h2>
            <p>Элегантные кожаные туфли для деловых встреч и мероприятий.</p>
            <p class="price">Цена: 8000 руб.</p>
            <a href="#" class="buy-btn">Купить</a>
        </div>
    </div>

    <!-- Навигация по страницам -->
    <div class="pagination">
        <span class="page-number">1</span>
        <span class="page-number">2</span>
        <span class="page-number">3</span>
        <!-- Добавьте больше номеров страниц по мере необходимости -->
    </div>

    </main>
    </div>
   
    <Footer></Footer>
</template>

<script>
import Navigation from './page components/Navigation.vue'
import Header from './page components/Header.vue'
import Footer from './page components/Footer.vue';
import Filter from './page components/Filter.vue';
export default {
    name: 'Catalog',//this is the name of the component
    components: {
        Navigation,
        Header,
        Footer,
        Filter,
  },
}
</script>
<style>
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
    transform: scale(1.5);
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

 .sidebar {
     width: 200px;
     /* Ширина боковой панели */
     padding: 20px;
     /* Внутренний отступ */
     background-color: #f4f4f4;
     /* Цвет фона для боковой панели */
     box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
 }

 .sidebar h2 {
     font-size: 20px;
     
 }

 .season-list1 {
     list-style: none;
     /* Убираем маркеры списка */
     padding: 0;
     margin: 0;
 }

 .season-item1 {
     font-weight: bold;
     color: #000000;
     margin-bottom: 10px;
 }

 .type-list1 {
     list-style: none;
     /* Убираем маркеры вложенного списка */
     padding-left: 20px;
     /* Отступ для вложенного списка типов */
 }

 .type-list1 li a {
     color: #000000;
     text-decoration: none;
     font-weight: normal;
 }

 .type-list1 li a:hover {
     color: #9daa83;
     /* Цвет при наведении на ссылки типов */
 }

</style>