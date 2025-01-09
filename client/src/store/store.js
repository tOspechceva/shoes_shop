import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import AuthenticationService from "@/services/AuthenticationService";
export default createStore({
    state: {
        currentRoute: null,                                     // Для хранения текущего маршрута
        user_id: localStorage.getItem('user_id') || null, // Инициализация из LocalStorage
        token: localStorage.getItem('token') || null,           // Токен из LocalStorage,
        isUserLoggedIn: localStorage.getItem('token') !== null,
        sessionKey: Cookies.get('sessionKey') || null,         // Идентификация корзины для неавторизованного пользователя
        cart_id: localStorage.getItem('cart_id') || null
    },
    mutations: {
        setCurrentRoute(state, route) {
            state.currentRoute = route;                         // Устанавливаем текущий маршрут
        },
        setUser(state, user_id) {
            state.user_id = user_id;                                  // Сохраняем пользователя
            localStorage.setItem('user_id', JSON.stringify(user_id)); // Сохраняем в LocalStorage
        },
        setToken(state, token) {
            state.token = token;                                // Сохраняем токен
            localStorage.setItem('token', token);               // Сохраняем в LocalStorage
            if (token) {
                state.isUserLoggedIn = true
                localStorage.removeItem('isUserLoggedIn');
            } else {
                state.isUserLoggedIn = false
                localStorage.removeItem('isUserLoggedIn');
            }
        },
        setCartId(state, cart_id) {
            state.cart_id = cart_id;
            localStorage.setItem('cart_id', JSON.stringify(cart_id))
        },
        logout(state) {
            state.user_id = null;                                 // Сбрасываем пользователя
            state.token = null;                                // Сбрасываем токен
            state.isUserLoggedIn = false;
            state.sessionKey = null;
            state.cart_id = null;
            localStorage.removeItem('user_id');                   // Удаляем из LocalStorage
            localStorage.removeItem('token');                  // Удаляем из LocalStorage
            localStorage.removeItem('sessionKey');            // Удаляем из LocalStorage
            localStorage.removeItem('cart_id');            // Удаляем из LocalStorage
            Cookies.set('sessionKey', null);
        },
        setSessionKey(state, sessionKey) {
            state.sessionKey = sessionKey;
            localStorage.setItem('sessionKey', JSON.stringify(sessionKey));
        },
        
    },
    actions: {
        async initializeCart({ commit, state }) {
            if (!state.sessionKey) {
                // Генерация нового session_key
                const sessionKey = uuidv4();
                commit('setSessionKey', sessionKey); // Устанавливаем sessionKey в state и localStorage

                try {
                    // Создание записи корзины на сервере
                    const response = await AuthenticationService.createCart({ session_key: sessionKey });
                    const data = response.data;
                    console.log(response, data);
                    if (!data.success) {
                        console.error('Ошибка создания корзины:', data.error);
                    } else {
                        commit('setCartId', data.cart_id); // Сохранение ID корзины
                    }
                } catch (error) {
                    console.error('Ошибка при вызове AuthenticationService.createCart:', error);
                }

                // Сохраняем sessionKey в Cookies
                Cookies.set('sessionKey', sessionKey);
            } 
        },

        async login({ commit, dispatch }, { user_id, token }) {
            // Устанавливаем пользователя и токен
            commit('setUser', user_id);
            commit('setToken', token);

            // Проверяем корзину после авторизации
            await dispatch('checkCartAfterLogin');
        },

        async checkCartAfterLogin({ commit, state }) {
            if (state.sessionKey) {
                const response = await AuthenticationService.updateCart({ session_key: state.sessionKey, user_id: state.user_id });
                const data = response.data;
                if (!data.success) {
                    console.error('Ошибка при объединении корзин:', data.error);
                } else {
                    commit('setCartId', data.cart_id); // Сохранение ID корзины
                }
            }
        },

        // Устанавливаем пользователя и токен
        async register({ commit }, { user_id, token }) {    
            commit('setUser', user_id);
            commit('setToken', token);
        },

        // Выходим из системы
        async logout({ commit }) {
            // Очистка данных о пользователе
            commit('logout');
            // Генерация нового session_key
            const sessionKey = uuidv4();
            commit('setSessionKey', sessionKey); // Устанавливаем sessionKey в state и localStorage

            try {
                // Создание записи корзины на сервере
                const response = await AuthenticationService.createCart({ session_key: sessionKey });
                const data = response.data;
                console.log(response, data);
                if (!data.success) {
                    console.error('Ошибка создания корзины:', data.error);
                } else {
                    commit('setCartId', data.cart_id); // Сохранение ID корзины
                }
            } catch (error) {
                console.error('Ошибка при вызове AuthenticationService.createCart:', error);
            }

            // Сохраняем sessionKey в Cookies
            Cookies.set('sessionKey', sessionKey);
        }
    },
});
