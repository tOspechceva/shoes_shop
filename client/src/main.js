import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'vuetify/styles'; // Подключение стилей Vuetify
import { createVuetify } from 'vuetify'; // Создание экземпляра Vuetify
import * as components from 'vuetify/components'; // Импорт компонентов Vuetify
import * as directives from 'vuetify/directives'; // Импорт директив Vuetify

import store from '@/store/store';

// Создаем экземпляр Vuetify
const vuetify = createVuetify({
    components,
    directives,
});

// Синхронизация маршрутов с Vuex
router.afterEach((to) => {
    store.commit('setCurrentRoute', to.path); // Сохраняем текущий маршрут
});

// Создаем приложение Vue
const app = createApp(App);

// Добавляем роутер, Vuetify и Vuex
app.use(router);
app.use(vuetify);
app.use(store);

// Монтируем приложение
app.mount('#app');