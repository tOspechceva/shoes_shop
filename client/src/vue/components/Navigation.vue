<template>
    <div>
        <nav class="main-nav">
        <ul>
        <li><router-link :to="{ name: 'home' }"> Главная </router-link></li>
            <li class="catalog-menu">
                <router-link :to="{ name: 'catalog' }"> Каталог </router-link>
            <ul class="season-dropdown">
                  <li 
                    class="season-item" 
                    v-for="(season) in seasons" 
                    :key="season.season_id"
                    @click="selectSeason(season.season_id)" 
                  >
                    <a>{{ season.season_name }}</a>

                    <!-- Перебираем типы, связанные с сезоном,показываем только для выбранного сезона -->
                    <ul v-if="selectedSeason === season.season_id" class="type-dropdown">
                      <li  
                        v-for="type in season.types" 
                        :key="type.type_id"
                        @click="selectType(season.season_id, type.type_id)"
                        style="cursor: pointer"
                      >
                        <a>{{ type.type_name }}</a>
                      </li>
                    </ul>
                  </li>
                </ul>    
                    
            </li>
            <li> <router-link :to="{ name:'contact'}">Контакты</router-link></li>
            <li> <router-link :to="{ name: 'basket' }"> Корзина </router-link></li>
            <li v-show="!$store.state.isUserLoggedIn"> <router-link :to="{ name:'login'}"  > Войти </router-link></li>
            <li v-show="$store.state.isUserLoggedIn"> <router-link :to="{ name:'profile'}"> Личный кабинет </router-link></li>
        </ul>

        
    </nav>
    </div>
</template>

<script scoped>
import CatalogService from '@/services/CatalogService.js';
export default {
    name: 'Navigation',
    data() {
    return {
      selectedSeason: null, // Инициализация выбранного сезона
      selectedType: null,
      seasons: null
    };
  },
    methods: {
    selectSeason(seasonId) {
        // Переход на страницу каталога с выбранным seasonId
        this.$router.push({ name: 'catalogWithSeason', params: {  seasonId } });
        // Выбираем сезон, передаем его id на страницу каталога
        this.selectedSeason = this.selectedSeason === seasonId ? null: seasonId;
        // Отправляем событие с выбранным сезоном
        this.$emit('season-selected', { seasonId });
        
    },
    selectType(seasonId, typeId) {
        this.$router.push({ name: 'catalogWithSeasonType', params: {  seasonId, typeId } });
        this.selectedSeason = this.selectedSeason === seasonId ? null :   seasonId;
        this.selectedType = this.selectedType === typeId ? null : typeId;
        // Передаем id сезона и id типа на страницу каталога
        this.$emit('type-selected', { seasonId, typeId });
    },
    async getSeason() {
        try {
          const response = await CatalogService.getSeasonsWithTypes();
          const data = response.data;
            console.log(data);
            this.seasons = data.seasons;
          console.log('Сезоны:', this.seasons);
        } catch (error) {
          console.error('Ошибка при загрузке товаров:', error);
        }
    }
  },
  created() {
     this.getSeason();  // Загружаем сезоны при создании компонента
  },
};
</script>

<style scoped>


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
    margin-bottom: 10px;
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
    display: none; /* Скрываем подменю типов по умолчанию */
    position: absolute;
    left: 100%; /* Меню типов отображается справа от сезона */
    top: 0;
    background-color: #233870; /* Цвет фона для типов */
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Тень для подменю */
}

.season-dropdown {
    display: none; /* Скрываем подменю сезонов по умолчанию */
    position: absolute;
    top: 100%; /* Меню сезонов появляется под элементом "Каталог" */
    left: 0;
    background-color: #233870; /* Цвет фона для сезонов */
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Тень для подменю */
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
    position: relative; /* Нужно для корректного позиционирования вложенных элементов */
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
.season-item:hover .type-dropdown {
    display: block;
}
.season-item::after {
    content: "";
    position: absolute;
    top: -10px; /* Увеличивает зону сверху */
    left: -10px; /* Увеличивает зону слева */
    right: -10px; /* Увеличивает зону справа */
    bottom: -10px; /* Увеличивает зону снизу */
    z-index: -1;
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

@media (max-width: 1024px) {
    .main-nav ul {
        flex-direction: column;
        align-items: center;
    }

    .main-nav>ul>li {
        margin: 5px 0;
    }
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
        padding: 5px;
    }

    .main-nav ul {
        flex-direction: column;
        padding: 0;
    }

    .main-nav>ul>li {
        width: 100%;
        text-align: center;
    }

    .main-nav a {
        font-size: 16px;
        padding: 8px;
    }
}
</style>
