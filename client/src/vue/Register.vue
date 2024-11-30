<template>
  <Header></Header>
  <Navigation></Navigation>
    <div class="register_main">
    <form @submit.prevent="register">
        <div class="register_container">
            <h2>Регистрация</h2>

                <label for="email">Email:</label>
                <input type="email" 
                       name="email" 
                       v-model="email"
                       placeholder="email"/>

                <label for="password">Пароль:</label>
                <input type="password" 
                name="password" 

                v-model="password"
                autocomplete="new-password"
                placeholder="password"/>
                <br>
                <div class ="error" v-html="error" />
                <br>
                <button type="submit" @click="register">
                Регистрация</button>
          
      </div>
       </form>
   
      
    </div>
       <Footer></Footer>
</template>

<script>
import AuthenticationService from'@/services/AuthenticationService'
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';
export default {
  name: 'Register',
  components: {
        Navigation,
        Footer,
        Header
    },
  data () {
    return {
      email: '',
      password: '',
      error: null,
      colore: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
          // Вызываем login через Vuex с данными пользователя и токеном
        this.$store.dispatch('register', {
            user: response.data.user,
            token: response.data.token,
        });
        this.$router.push('/login');
      } catch (error) {
          this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
}

.register_container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin-bottom: 20px; /* Добавляем отступ снизу */
}
h2 {
    text-align: center;
}
input[type="text"], input[type="password"], input[type="email"], input[type="telephone"],
input[type="gender"],input[type="birthdate"] {
    width: 93%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.birthdate {
    display: block;
    margin-top: 20px;       /* Отступ сверху */
    margin-bottom: 20px;    /* Отступ снизу */
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

.register_main {
    display: flex;
    justify-content: center;  /* Центрирование по горизонтали */
    align-items: center;      /* Центрирование по вертикали */
    flex: 1;                  /* Этот блок займет все оставшееся пространство */
    padding: 20px;
    text-align: left;
 }

</style>