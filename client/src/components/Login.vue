<template>
    <Header></Header>
    <Navigation></Navigation>
    <div class = 'login_main'>
        <div class="login_container">
            <h2>Авторизация</h2>
          
                <label for="email">Email:</label>
                <input type="email" 
                       name="email" 
                       v-model="email"
                       placeholder="email"/>

                <label for="password">Пароль:</label>
                <input type="password" 
                name="password" 

                v-model="password"

                placeholder="password"/>
                <br>
                <div class ="error" v-html="error" />
                <br>
                <button type="submit" @click="login"> Войти</button>
           
            <!-- Добавляем ссылку на страницу регистрации -->
        <p>Ещё нет аккаунта? <router-link :to="{ name:'register'}"> Зарегистрируйтесь </router-link></p>
        </div>

    </div>
    <Footer></Footer>
</template>

<script>
import AuthenticationService from'@/services/AuthenticationService'
import Navigation from './page components/Navigation.vue'
import Header from './page components/Header.vue'
import Footer from './page components/Footer.vue';


export default {
    name: 'Login',
    components: {
        Navigation,
        Header,
        Footer,
    },
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        // Метод для обработки формы
        async login() {
        try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.error = 'Регистрация прошла успешно!!!'
      } catch (error) {
          this.error = error.response.data.error
      }
    }
    }
}

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