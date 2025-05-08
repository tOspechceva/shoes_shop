<template>
     <nav class="main-nav">
        <ul>
        <li><router-link :to="{ name: 'AddProduct' }"> Добавление обуви </router-link></li>

         <li><router-link :to="{ name: 'EditProduct' }"> Обновление обуви </router-link></li>
         
        <li><router-link :to="{ name: 'addClaps' }"> Застежка </router-link></li>

        <li><router-link :to="{ name: 'addColore' }"> Цвет </  router-link></li>

        <li><router-link :to="{ name: 'addInsulation' }"> Утеплитель </router-link></li> 

        <li><router-link :to="{ name: 'addManufacturer' }"> Производитель </router-link></li> 

        <li><router-link :to="{ name: 'addMaterial' }"> Материал </router-link></li> 

        <li><router-link :to="{ name: 'addSeason' }"> Сезон </router-link></li> 

        <li><router-link :to="{ name: 'addSize' }"> Размер </router-link></li> 

        <li><router-link :to="{ name: 'addType' }"> Тип </router-link></li>

       
        </ul>

    </nav>
</template>

<script>
export default {
    name: 'Nav'
};
</script>

<style scoped>

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
</style>