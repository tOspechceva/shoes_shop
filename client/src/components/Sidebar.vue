<template>
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
                        <li><a href="#">Туфли</a></li>
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
    
</template>

<script>
export default {
    name: 'Sidebar',
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