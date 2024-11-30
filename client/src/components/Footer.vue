<template>
    <div id = "footer">
        <footer>
            <p>&copy; 2024 Штиблеты - Все права защищены.</p>
        </footer>
    </div>
</template>

<script>

export default {
    name: 'Footer',
}
</script>

<style>
footer {
    background-color: #464343;  /* Цвет фона для футера */
    color: white;               /* Цвет текста в футере */
    padding: 10px;                /* Внутренний отступ в футере */
    text-align: center;           /* Центрирование текста в футере */
    height: auto;                 /* Автоматическая высота футера */
    position: absolute;
	bottom: 0;
	width: 100%;
}
</style>