<template>
    <Header></Header>
    <Navigation></Navigation>
    <div class="login_main">
        <form @submit.prevent="login">
            <div class="login_container">
                <h2>Авторизация</h2>
                <label for="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    v-model="email"
                    placeholder="email"
                />

                <label for="password">Пароль:</label>
                <input
                    type="password"
                    name="password"
                    v-model="password"
                    placeholder="password"
                />
                <br />
                <div class="error" v-if="error">{{ error }}</div>
                <br />
                <button type="submit">Войти</button>
                <p>
                    Ещё нет аккаунта?
                    <router-link :to="{ name: 'register' }"> Зарегистрируйтесь </router-link>
                </p>
            </div>
        </form>
    </div>
    <Footer></Footer>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';

export default {
    name: 'Login',
    components: { Navigation, Header, Footer },
    data() {
        return {
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password,
                });
                const data = response.data;
            
                this.$store.dispatch('login', {
                    user_id: data.user.id,
                    token: response.data.token,
                });

                this.$router.push('/profile');
            } catch (error) {
                this.error = error.response?.data?.error || 'Ошибка авторизации';
            }
        },
    },
};
</script>

<style scoped>
.login_container {
    
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    
}
h2 {
    text-align: center;
}
input[type="email"], input[type="password"] {
    width: 93%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color:#2d4485;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}
button[type="submit"]:hover {
    background-color:#2d4485;
}
  
.login_main {
    display: flex;
    justify-content: center;  /* Центрирование по горизонтали */
    align-items: center;      /* Центрирование по вертикали */
    flex: 1;                  /* Этот блок займет все оставшееся пространство */
    padding: 20px;
    text-align: center;
 }

</style>