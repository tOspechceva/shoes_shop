<template>
    <div id = "head">
        <header>
            <h1> Штиблеты</h1>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>
<style>
#head{
    display:block;   
    width: 100%;
    
}
header {
    margin: 0;
    padding: 0;
}
h1{
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    text-align: center;
    /* Центрирование заголовка h1 */
    font-family: 'Segoe Script', cursive;
    /* Шрифт заголовка h1 */
    color: white;
    /* Цвет текста заголовка */
    background-color: #4c6e0c;
    /* Цвет фона заголовка */
    font-size: 40px;
    /* Размер текста заголовка */
    font-weight: bold;
    /* Жирность текста заголовка */
}
</style>