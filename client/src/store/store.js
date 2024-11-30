import { createStore } from 'vuex';

export default createStore({
    state: {
        currentRoute: null, // Для хранения текущего маршрута
        //user: JSON.parse(localStorage.getItem('user')) || null, // Инициализация из LocalStorage
        token: localStorage.getItem('token') || null, // Токен из LocalStorage,
        isUserLoggedIn: localStorage.getItem('token') !== null,
    },
    mutations: {
        setCurrentRoute(state, route) {
            state.currentRoute = route; // Устанавливаем текущий маршрут
        },
        setUser(state, user) {
            state.user = user; // Сохраняем пользователя
            localStorage.setItem('user', JSON.stringify(user)); // Сохраняем в LocalStorage
        },
        setToken(state, token) {
            state.token = token; // Сохраняем токен
            localStorage.setItem('token', token); // Сохраняем в LocalStorage
            if (token) {
                state.isUserLoggedIn = true
                localStorage.removeItem('isUserLoggedIn');
            } else {
                state.isUserLoggedIn = false
                localStorage.removeItem('isUserLoggedIn');
            }
        },
        logout(state) {
            state.user = null; // Сбрасываем пользователя
            state.token = null; // Сбрасываем токен
            state.isUserLoggedIn = false
            localStorage.removeItem('user'); // Удаляем из LocalStorage
            localStorage.removeItem('token'); // Удаляем из LocalStorage
            
        },
    },
    actions: {
        login({ commit }, { user, token }) {
            // Устанавливаем пользователя и токен
            commit('setUser', user);
            commit('setToken', token);
        },
        register({ commit }, { user, token }) {
            // Устанавливаем пользователя и токен
            commit('setUser', user);
            commit('setToken', token);
        },
        logout({ commit }) {
            // Выходим из системы
            commit('logout');
        },
    },
});
