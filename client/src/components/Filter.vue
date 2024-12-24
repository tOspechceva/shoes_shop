<template> 
<div>
    <button class="filter-button" @click="toggleFilter">
         <img src="@\\img\\filter.png" alt="Filter Icon" style="width: 40px; height: 40px;"> 
    </button>
</div>

<!-- Боковая панель с фильтрами -->
<div :class="['filter-sidebar', { open: isFilterVisible }]">
    <h3 class = "text-filter">Фильтры</h3>
    <form>
        <label for="category">Категория:</label>
        <select id="category" name="category">
            <option value="all">Все</option>
            <option value="boots">Ботинки</option>
            <option value="sneakers">Кроссовки</option>
            <option value="loafers">Лоферы</option>
        </select>

        <label for="size">Размер:</label>
        <input type="number" id="size" name="size" min="36" max="46">

        <label for="color">Цвет:</label>
        <input type="text" id="color" name="color">

        <button type="submit">Применить</button>
    </form>
</div>
</template>


<script>
export default {
    name: 'Filter',
    data() {
        return {
            isFilterVisible: false, // Отвечает за видимость фильтра
            query: '',
            seasons: [
                { name: 'Зима', types: ['Сапоги', 'Ботинки', 'Классическая обувь', 'Уги'] },
                { name: 'Демисезон', types: ['Классическая обувь', 'Спорт', 'Кеды'] },
                { name: 'Весна - Осень', types: ['Классические туфли', 'Спортивная обувь', 'Лоферы'] },
                { name: 'Лето', types: ['Сандали', 'Шлепанцы', 'Кеды', 'Лоферы'] },
            ]
        };
    },
    methods: {
        toggleFilter() {
            this.isFilterVisible = !this.isFilterVisible;
        },
        search() {
            console.log(`Searching for: ${this.query}`);
        }
    }
}
</script>

<style scoped>
.text-filter{
    color: #fff;
    text-align: center; 
    font-size: 20px;                        
    font-family: 'Segoe Script', cursive;  
}

.filter-sidebar.open {
     right: 0; /* Показываем панель, смещая ее влево */
}

.filter-button:hover {
    background-color:#3c570a;;
}

/* Круглая кнопка фильтра */
.filter-button {
    position: fixed    ;               /* Фиксированное позиционирование для закрепления кнопки на экране */
    top: 90px;                     /* Отступ сверху от края окна */
    right: 50px;                    /* Отступ слева от края окна */
    width: 70px;                   /* Ширина кнопки */
    height: 70px;                  /* Высота кнопки */
    border-radius: 50%;            /* Округление границ для создания круглой кнопки */
    background-color: #4c6e0c;   /* Заливка кнопки темно-синим цветом */
    color: #fff;                 /* Цвет текста на кнопке – белый */
    font-size: 16px;               /* Размер шрифта для текста кнопки */
    border: none;                  /* Убираем рамку кнопки */
    cursor: pointer;               /* Изменение курсора на указатель при наведении */
    z-index: 0;                 /* Устанавливаем приоритет отображения над другими элементами */
}

/* Боковая панель фильтров */
.filter-sidebar {
    position: fixed;            /* Фиксированное позиционирование для закрепления панели на экране */
    top: 0;                     /* Положение панели по верхнему краю окна */
    right: -300px;              /* Положение панели за пределами экрана по горизонтали (справа) */
    width: 250px;               /* Ширина боковой панели */
    height: 100%;               /* Высота панели на всю высоту экрана */
    background-color: #233870;   /* Цвет фона панели – белый */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5); /* Тень справа от панели для визуального эффекта */
    padding: 20px;              /* Внутренний отступ для размещения контента */
    overflow-y: auto;           /* Скроллинг по вертикали, если содержимого больше высоты панели */
    transition: right 0.3s ease;/* Плавное появление и скрытие панели */
    z-index: 999;               /* Приоритет отображения чуть ниже, чем у кнопки */
}

/* Заголовок боковой панели */
.filter-sidebar h3 {
    margin-top: 0;          /* Убираем отступ сверху у заголовка */
}

/* Стили для меток (label) в боковой панели */
.filter-sidebar label {
    display: block;         /* Вывод метки на отдельной строке */
    margin: 10px 0 5px;     /* Отступы вокруг метки */
    color: #ffffff;
}

/* Стили для полей ввода, выбора и кнопки внутри боковой панели */
.filter-sidebar input,
.filter-sidebar select,
.filter-sidebar button {
    width: 90%;            /* Ширина элементов на всю ширину боковой панели */
    padding: 8px;           /* Внутренний отступ для элементов */
    margin-bottom: 10px;    /* Отступ снизу между элементами */
}

/* Стиль для активной панели фильтров */
.filter-sidebar.active {
    right: 0;              /* Когда добавлен класс active, панель появляется на экране */
}

</style>
