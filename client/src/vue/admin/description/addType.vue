<<template> 
  
  <Nav/>
        
  <div class="main">
    <div class="container">
      <h1>ДОБАВЛЕНИЕ</h1>
      <label for="description">Тип:</label>
      <input
        type="text"
        name="description"
        v-model="description"
        placeholder="Введите название типа"
      />
      <div class="error" v-if="error" v-html="error"></div>
      <br />
      <button type="submit" @click="add">Добавить</button>
    </div>

     <div class="container">
      <h1>УДАЛЕНИЕ</h1>
      <label for="description">Тип:</label>
      <input
        type="text"
        name="description"
        v-model="delete_v"
        placeholder="Введите id для удаления"
      />
      <div class="error" v-if="error" v-html="error"></div>
      <br />
      <button type="submit" @click="delete_">Удалить</button>
    </div>


    <div class="container">
      <h1>ИЗМЕНЕНИЕ</h1>
      <label for="description">Тип:</label>
      <input
        type="text"
        name="description"
        v-model="put_v"
        placeholder="Введите id для изменения"
      />
       <input
        type="text"
        name="name"
        v-model="name"
        placeholder="Введите новое название"
      />
      <div class="error" v-if="error" v-html="error"></div>
      <br />
      <button type="submit" @click="update">Изменить</button>
    </div>

    <button class="show-button" @click="getAll">Показать все застежки</button>

    <div class="catalog">
      <div class="clasp-card" v-for="product in products" :key="product.id">
        <h2> id : {{ product.id }} </h2>
       <h2> {{ product.name }}</h2>
      </div>
    </div>
  </div>

</template>

<script>
import AdminService from '@/services/AdminService';
import Nav from './Nav.vue';

export default {
    name: 'addType',
    components: { Nav },
    data() {
    return {
      description: "",
      delete_v: "",
      put_v: "",
      products: [],   
      error: null,
      name:null
    };
  },
    methods: {
    async add() {
        try {
            await AdminService.addType({ name: this.description });
            this.error = "Тип добавлен";
            this.getAll(); // Обновляем список после добавления
        } catch (error) {
            this.error = error.response?.data?.error || "Ошибка при добавлении типа";
        }
    },
    async getAll() {
        try {
            const response = await AdminService.getType();
            this.products = response.data; // Исправлено, убран лишний `if`
        } catch (error) {
            this.error = error.response?.data?.error || "Ошибка при получении типа";
        }
    },
    async update() {
        try {
            const id = this.put_v; // Ожидаем ввод ID
            const name = this.name       // Ожидаем ввод имени
            if (!name) return;

            await AdminService.updateType(id, { name });
            this.error = "Тип обновлен";
            this.getAll(); // Обновляем список после изменения
        } catch (error) {
            this.error = error.response?.data?.error || "Ошибка при обновлении типа";
        }
    },
    async delete_() {
        try {
            const id = this.delete_v; // Ожидаем ввод ID
            await AdminService.deleteType(id);
            this.error = "Тип удален";
            this.getAll(); // Обновляем список после удаления
        } catch (error) {
            this.error = error.response?.data?.error || "Ошибка при удалении типа";
        }
    }
    }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}

.container {
  
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
}

input[type="text"] {
  width: 93%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2d4485;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #920e0e;
}

.show-button {
  margin-bottom: 20px;
}

.main {
  display: flex;
  gap: 20px; /* Отступ между контейнерами */
  justify-content: center; /* Центрирование по горизонтали */
  flex-wrap: wrap; /* Позволяет перенос на новую строку, если экран узкий */
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.clasp-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

</style>
