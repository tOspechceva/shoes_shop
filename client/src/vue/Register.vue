<template>
 
  <Navigation></Navigation>
  <div class="register_main">
    <form @submit.prevent="register">
      <div class="register_container">

        <h2>Регистрация</h2>

        <label for="name">Имя:</label>
        <input
          type="text"
          name="name"
          v-model="name"
          placeholder="Введите ваше имя"
        />

      <label for="gender">Пол:</label>
          <div class="gender-options">
            <label>
              <input type="radio" v-model="gender" value="male" /> Мужской
            </label>
            <label>
              <input type="radio" v-model="gender" value="female" /> Женский
            </label>
        </div>


      <div>
      <label for="birth_date">Дата рождения:</label>
         <div class="birthdate">
            <!-- День -->

            <select v-model="selectedDay" required>
              <option value="" disabled>День</option>
              <option v-for="day in days" :key="day" :value="day">{{ day }}</ option>
            </select>

          <!-- Месяц -->
          <select v-model="selectedMonth" required>
            <option value="" disabled>Месяц</option>
            <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
          </select>

          <!-- Год -->
          <select v-model="selectedYear" required>
            <option value="" disabled>Год</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}  </option>
          </select>
        </div>
      </div>
        
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Введите адрес вашей почты"
        />
         <label for="phone">Телефон:</label>
            <input
              type="text"
              name="phone"
              v-model="phone"
              placeholder="Введите ваш телефон"
              pattern="[8\+][0-9]{1,3}[-\s]?[0-9]{1,3}[-\s]?[0-9]{4}[-\s]?[0-9]{4}"
              required
            />

        <label for="one_password">Пароль:</label>
        <input
          type="password"
          name="password"
          v-model="one_password"
          autocomplete="new-password"
          placeholder="Введите пароль"
        />

        <label for="two_password">Повторно введите пароль:</label>
        <input
          type="password"
          name="confirm_password"
          v-model="two_password"
          autocomplete="new-password"
          placeholder="Введите пароль"
        />

        <br />
        <div class="error" v-if="error" v-html="error"></div>
        <br />
        <button type="submit">Регистрация</button>
      </div>
    </form>
  </div>

</template>

<script>
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AuthenticationService from "@/services/AuthenticationService";


export default {
  name: "Register",
  components: { Navigation, Header, Footer },
  data() {
    return {
      name:"",
      email: "",
      phone: "",
      gender: "",
      one_password: "",
      two_password: "",

      dselectedDay: '',
      selectedMonth: '',
      selectedYear: '',
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      years: this.generateYears(),
      days: Array.from({ length: 31 }, (_, i) => i + 1), // Дни от 1 до 31
    
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        if (this.one_password !== this.two_password) {
          this.error = "Пароли не совпадают";
          return ;
        }
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.one_password,
          name:this.name,
          phone: this.phone,
          birth_date: this.getBirthDate(),
          gender: this.gender,
        });
       
        // Вызываем register через Vuex
        await this.$store.dispatch("register", {
          user: response.data.user.id,
          token: response.data.token,
        });
        this.error = "Вы зарегестрированы!!!"
        // Перенаправляем на логин
        this.$router.push("/login");
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        this.error = error.response?.data?.error || "Ошибка регистрации";
      }
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 100 }, (_, i) => currentYear - i); // Генерация лет за последние 100 лет
    },
    getBirthDate() {
      return `${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-${String(this.selectedDay).padStart(2, '0')}`;
    }
  },
};
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
input[type="gender"] {
    width: 93%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.birthdate select {
  margin-right: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  
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

 /* Стили для меток */
label {
  display: block;      /* Размещение на новой строке */
  font-size: 16px;     /* Размер шрифта */
  font-weight: bold;   /* Полужирный шрифт */
  margin-bottom: 5px;  /* Отступ снизу */
  color: #333;         /* Цвет текста */
}

 /* Стили для выпадающих списков */
.custom-select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.custom-select:focus {
  border-color: #2d4485;
  background-color: #fff;
  outline: none;
  box-shadow: 0 0 5px rgba(45, 68, 133, 0.5);
}

.custom-select option {
  padding: 10px;
  font-size: 14px;
}


</style>