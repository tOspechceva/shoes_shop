import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'vuetify/styles'; // Подключение стилей Vuetify
import { createVuetify } from 'vuetify'; // Создание экземпляра Vuetify
import * as components from 'vuetify/components'; // Импорт компонентов Vuetify
import * as directives from 'vuetify/directives'; // Импорт директив Vuetify

// Создаем экземпляр Vuetify
const vuetify = createVuetify({
    components,
    directives,
});

// Создаем приложение Vue
const app = createApp(App);

// Добавляем роутер и Vuetify
app.use(router);
app.use(vuetify);

// Монтируем приложение
app.mount('#app');