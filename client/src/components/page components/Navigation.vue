<template>
    <div>
        <nav class="main-nav">
        <ul>
        <li><router-link :to="{ name: 'home' }"> Главная </router-link></li>
            <li class="catalog-menu">
                <router-link :to="{ name: 'catalog' }"> Каталог </router-link>
                <ul class="season-dropdown">
                    <li class="season-item">
                        <a href="#">Зима</a>
                        <ul class="type-dropdown">
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
                    <li class="season-item">
                        <a href="#">Демисезон</a>
                        <ul class="type-dropdown">
                            <li><a href="#">Классическая обувь</a></li>
                            <li><a href="#">Спорт</a></li>
                            <li><a href="#">Кеды</a></li>
                            <li><a href="#">Берцы</a></li>
                            <li><a href="#">Большие размеры 45 - 49 размер</a></li>
                            <li><a href="#">Подростковая 35 - 41 размер</a></li>
                            
                        </ul>
                    </li>
                    <li class="season-item">
                        <a href="#">Весна - Осень</a>
                        <ul class="type-dropdown">
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
                    <li class="season-item">
                        <a href="#">Лето</a>
                        <ul class="type-dropdown">
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
                </ul>
            </li>
            <li> <router-link :to="{ name:'contact'}">Контакты</router-link></li>
            <li> <router-link :to="{ name: 'basket' }"> Корзина </router-link></li>
            <li v-show="!$store.state.isUserLoggedIn"> <router-link :to="{ name:'login'}"  > Войти </router-link></li>
            <li v-show="$store.state.isUserLoggedIn"> <router-link :to="{ name:'profile'}"> ЛК </router-link></li>
        </ul>

        
    </nav>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            query: '',
            seasons: [
                { name: 'Зима', types: ['Сапоги', 'Ботинки', 'Классическая обувь', 'Уги'] },
                { name: 'Демисезон', types: ['Классическая обувь', 'Спорт', 'Кеды'] },
                { name: 'Весна - Осень', types: ['Классические туфли', 'Спортивная обувь', 'Лоферы'] },
                { name: 'Лето', types: ['Сандали', 'Шлепанцы', 'Кеды', 'Лоферы'] },
            ]
        }
    },
    methods: {
        search() {
            // Здесь будет логика поиска по каталогу
            console.log(`Searching for: ${this.query}`);
        }
    }
}
</script>

<style >






h1 {
    text-align: center;                     /* Центрирование заголовка h1 */
    font-family: 'Segoe Script', cursive;   /* Шрифт заголовка h1 */
    color: white;                         /* Цвет текста заголовка */
    background-color: #4c6e0c;            /* Цвет фона заголовка */
    font-size: 60px;                        /* Размер текста заголовка */
    font-weight: bold;                       /* Жирность текста заголовка */
}

nav {
    display: flex;
    justify-content: space-around;  /* Элементы внутри навигации равномерно распределены */
    background-color: #233870;    /* Цвет фона навигационного меню */
    padding: 10px;                  /* Внутренние отступы блока навигации */
    text-align: center;             /* Центрирование текста в элементах навигации */
}

nav a:hover {
    background-color: #4c6e0c;       /* Изменение цвета фона ссылок при наведении */
}

.main-nav ul {
    list-style: none;               /* Убираем маркеры у списка */
    padding: 10px;                  /* Внутренний отступ для списка навигации */
    margin: 0;                      /* Убираем внешние отступы */
}

.main-nav>ul>li {
    display: inline-block;          /* Элементы располагаются в одну строку */
    position: relative;             /* Положение элемента будет относительным для вложенных списков */
    margin-right: 200px;            /* Пространство между элементами навигации */
}

.main-nav>ul>li:last-child {
    margin-right: 0;                /* Убираем отступ у последнего элемента списка */
}

.main-nav a {
    font-family: 'Segoe Script', cursive;   /* Шрифт для ссылок навигации */
    font-size: 18px;                        /* Размер текста ссылок */
    color: #fff;                          /* Цвет текста ссылок */
    text-decoration: none;                  /* Убираем подчеркивание у ссылок */
    padding: 10px;                          /* Внутренний отступ у ссылок */
    display: block;                         /* Устанавливает элемент как блочный, то есть он занимает всю ширину родителя и переносится на новую строку */
                    
}

.type-dropdown {
    display: none;
    /* Скрываем вложенные выпадающие меню по умолчанию */
    position: absolute;
    /* Абсолютное позиционирование относительно родителя */
    top: 100%;
    /* Выпадающее меню появляется под родительским элементом */
    left: 0;
    /* Позиция по горизонтали — слева */
    background-color: #4c6e0c;
    /* Цвет фона для выпадающего меню */
    padding: 10px;
    /* Внутренний отступ для выпадающего меню */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* Тень для выпадающего меню */
}

.season-dropdown{
    display: none;               /* Скрываем вложенные выпадающие меню по умолчанию */
    position: absolute;          /* Абсолютное позиционирование относительно родителя */
    top: 100%;                   /* Выпадающее меню появляется под родительским элементом */
    left: 0;                     /* Позиция по горизонтали — слева */
    background-color:#233870;/* Цвет фона для выпадающего меню */
    padding: 10px;              /* Внутренний отступ для выпадающего меню */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);/* Тень для выпадающего меню */
}

.catalog-menu:hover .season-dropdown,
.season-dropdown:hover {
    display: block;     /* Отображаем меню сезонов при наведении на Каталог */
}

.season-item:hover .type-dropdown,
.type-dropdown:hover {
    display: block;     /* Показываем типы обуви при наведении на сезон */
    left: 100%;         /* Меню типов обуви располагается справа от выбранного сезона */
    top: 0;             /* Совмещение по вертикали с сезоном */
}

.season-dropdown li,
.type-dropdown li {
    white-space: nowrap;    /* Отключаем перенос текста внутри элементов выпадающего меню */
}

/* Основной стиль для элементов сезона */
.season-item {
    background-color: #233870;
    color: #fff;
    padding: 8px;
    cursor: pointer;
}
.type-dropdown :hover{
    background-color: #233870;
}
/* Подсветка сезона при наведении и при переходе на подменю */
.season-item:hover,
.season-item:hover .type-dropdown {
    background-color: #4c6e0c;
    /* Новый цвет фона для выделения сезона */
}

/* Стиль для подменю типов обуви */
.type-dropdown {
    display: none;
    position: absolute;
    left: 100%;
    /* Позиционирование подменю справа от сезона */
    top: 0;
    background-color: #233870;
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Показываем подменю при наведении на сезон */
.season-item:hover .type-dropdown {
    display: block;
   
}





</style>
