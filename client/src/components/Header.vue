<template>
    <div id="head">
        <header>
            <div class="title-container">
                <h1>Штиблеты</h1>
            </div>
            <form class="search-form" action="/search" method="GET">
                <input type="text" name="query" placeholder="Поиск..." aria-label="Поиск по каталогу">
                <button type="submit">Найти</button>
            </form>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
/* Общие стили */
#head {
    display: block;
    width: 100%;
}

header {
    position: relative; /* Для позиционирования внутренних элементов */
    width: 100%;
    padding: 10px 0;
    background-color: #4c6e0c;
}

/* Центрирование заголовка */
.title-container {
    text-align: center;
}

h1 {
    margin: 0;
    font-family: 'Segoe Script', cursive;
    color: white;
    font-size: 40px;
    font-weight: bold;
}

/* Стиль формы поиска */
.search-form {
    position: absolute; /* Позиционируем форму */
    top: 10px; /* Расстояние от верхнего края */
    right: 10px; /* Расстояние от правого края */
    display: flex;
    align-items: center;
}

.search-form input[type="text"] {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    outline: none;
    background-color: #fff; /* Устанавливаем белый фон */
    color: #000; /* Текст становится чёрным для контраста */
}
.search-form button {
    padding: 5px 10px;
    border: none;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
}

.search-form input[type="text"]:focus {
    width: 200px;
    transition: width 0.3s ease;
}
</style>
