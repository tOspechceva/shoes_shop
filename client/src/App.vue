<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created() {
  try {
    await this.$store.dispatch("initializeCart");
    console.log("Корзина инициализирована");
  } catch (error) {
    console.error("Ошибка инициализации корзины:", error);
  }
}
};
</script>

<style>
    body {
      background-image: url('./img/pexels-rahulp9800-3286578.jpg');   /* Путь к изображению, которое будет   использоваться как фон */
      background-size: cover;                                         /* Изображение фона будет   масштабироваться, чтобы покрыть весь экран */
      background-repeat: no-repeat;                                   /* Отключаем повтор фона, изображение   будет показано один раз */
      background-position: center center;                             /* Центрируем фон по горизонтали и  вертикали */
      /*background-color: rgb(255, 255, 255);*/
      display: flex;
      flex-direction: column;             /* Элементы внутри body будут расположены в колонку */
      min-height: 100vh;               /* Устанавливаем минимальную высоту body, равную высоте экрана */
      margin: 0;
      /* Убираем отступы вокруг body */
    }
</style>
