<template>
   <aside class="sidebar">
            <h2>Сезоны</h2>
            <ul class="season-list1">
    <li class="season-item1" v-for="season in seasons" :key="season.name">
    {{ season.name }}
        <ul class="type-list1">
            <li  v-for="type in season.types" :key="type.name"
                 @click="filterProducts(season.name, type.name)"
                style="cursor: pointer">
                <a>{{ type.name }}</a>
            </li>
        </ul>
     </li>
    </ul>
        </aside>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
         return {
           seasons: [
             {
               name: 'Зима',
               types: [
                { name: 'Сапоги' },
                { name: 'Ботинки' },
                { name: 'Классическая обувь' },
                { name: 'Уги' },
                { name: 'Берцы' },
                { name: 'Дутики' },
                { name: 'Спорт' },
                { name: 'Кеды' },
                { name: 'Комфорт обувь' },
                { name: 'Резиновая обувь' },
                { name: 'Туфли' },
                { name: 'Большие размеры 45 - 49 размер' },
                { name: 'Подростковая 35 - 41 размер' },
               ],
             },
             {
               name: 'Лето',
               types: [
                    { name: 'Классические туфли' },
                    { name: 'Комфорт обувь' },
                    { name: 'Сандали' },
                    { name: 'Шлепанцы' },
                    { name: 'Кеды' },
                    { name: 'Спорт' },
                    { name: 'Резиновая обувь' },
                    { name: 'Сабо' },
                    { name: 'Лоферы' },
                    { name: 'Большие размеры 45 - 49 размер' },
                    { name: 'Подростковая 35 - 41 размер' },
               ],
            },
            {
                name: ' Весна - Осень',
                types: [
                         { name: 'Туфли' },
                         { name: 'Спортивная' },
                         { name: 'Лоферы' },
                         { name: 'Макасины' },
                         { name: 'Комфорт обувь' },
                         { name: 'Кеды' },
                         { name: 'Резиновая обувь' },
                         { name: 'Берцы' },
                         { name: 'Казаки' },
                         { name: 'Броги' },
                         { name: 'Большие размеры 45 - 49 размер' },
                         { name: 'Подростковая 35 - 41 размер' },
               ],
             },
            {
                name: 'Демисезон',
                types: [
                    { name: 'Классическая обувь' },
                    { name: 'Спорт' },
                    { name: 'Кеды' },
                    { name: 'Берцы' },
                    { name: 'Большие размеры 45 - 49 размер' },
                    { name: 'Подростковая 35 - 41 размер' },
               ],
             },
           ],
         };
}
}
</script>

<style scoped>
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