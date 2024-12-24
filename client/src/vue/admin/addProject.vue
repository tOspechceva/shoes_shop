<template>
  <div class="add-product">
    <h1>Добавить товар</h1>
    <form @submit.prevent="addProduct">
      <!-- Основная информация о товаре -->
      <div>
        <label for="name">Название товара:</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div>
        <label for="price">Цена:</label>
        <input type="number" id="price" v-model="product.price" step="0.01" min="0" required />
      </div>
      <div>
        <label for="description">Описание:</label>
        <textarea id="description" v-model="product.description"></textarea>
      </div>
      <div>
        <label for="rating">Рейтинг (0-5):</label>
        <input type="number" id="rating" v-model="product.rating" step="0.1" min="0" max="5" />
      </div>

      <!-- Сезон, материал и другие связи -->
      <div>
        <label for="id_season">Сезон:</label>
        <select id="id_season" v-model="product.id_season" required>
          <option v-for="season in seasons" :key="season.id" :value="season.id">
            {{ season.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="id_material">Материал:</label>
        <select id="id_material" v-model="product.id_material" required>
          <option v-for="material in materials" :key="material.id" :value="material.id">
            {{ material.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="id_insulation">Утеплитель:</label>
        <select id="id_insulation" v-model="product.id_insulation">
          <option v-for="insulation in insulations" :key="insulation.id" :value="insulation.id">
            {{ insulation.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="id_manufacturer">Производитель:</label>
        <select id="id_manufacturer" v-model="product.id_manufacturer" required>
          <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.id">
            {{ manufacturer.name }}
          </option>
        </select>
      </div>

      <!-- Массивы данных -->
      <div>
        <h3>Размеры</h3>
        <div v-for="(size, index) in product.sizes" :key="index" class="array-item">
          <input type="number" v-model="product.sizes[index]" placeholder="Введите размер" />
          <button type="button" @click="removeItem(product.sizes, index)">Удалить</button>
        </div>
        <button type="button" @click="addItem(product.sizes, '')">Добавить размер</button>
      </div>

      <div>
        <h3>Типы картинок</h3>
        <div v-for="(img, index) in product.img_types" :key="index" class="array-item">
          <input type="url" v-model="product.img_types[index]" placeholder="Введите ссылку на картинку" />
          <button type="button" @click="removeItem(product.img_types, index)">Удалить</button>
        </div>
        <button type="button" @click="addItem(product.img_types, '')">Добавить тип картинки</button>
      </div>

      <div>
        <h3>Цвета</h3>
        <div v-for="(color, index) in product.colors" :key="index" class="array-item">
          <input type="text" v-model="product.colors[index]" placeholder="Введите цвет" />
          <button type="button" @click="removeItem(product.colors, index)">Удалить</button>
        </div>
        <button type="button" @click="addItem(product.colors, '')">Добавить цвет</button>
      </div>

      <div>
        <h3>Застежки</h3>
        <div v-for="(fastener, index) in product.fasteners" :key="index" class="array-item">
          <input type="text" v-model="product.fasteners[index]" placeholder="Введите тип застежки" />
          <button type="button" @click="removeItem(product.fasteners, index)">Удалить</button>
        </div>
        <button type="button" @click="addItem(product.fasteners, '')">Добавить застежку</button>
      </div>

      <!-- Кнопка отправки -->
      <button type="submit">Добавить товар</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
   name: 'AddProduct',
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        rating: null,
        id_season: null,
        id_material: null,
        id_insulation: null,
        id_manufacturer: null,
        sizes: [], // Список размеров
        img_types: [], // Список ссылок на картинки
        colors: [], // Список цветов
        fasteners: [], // Список типов застежек
      },
      seasons: [],
      materials: [],
      insulations: [],
      manufacturers: [],
    };
  },
  methods: {
    async fetchDependencies() {
      try {
        const [seasonsRes, materialsRes, insulationsRes, manufacturersRes] = await Promise.all([
          axios.get("/api/seasons"),
          axios.get("/api/materials"),
          axios.get("/api/insulations"),
          axios.get("/api/manufacturers"),
        ]);
        this.seasons = seasonsRes.data;
        this.materials = materialsRes.data;
        this.insulations = insulationsRes.data;
        this.manufacturers = manufacturersRes.data;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    addItem(array, value) {
      array.push(value);
    },
    removeItem(array, index) {
      array.splice(index, 1);
    },
    async addProduct() {
      try {
        const response = await axios.post("/api/products", this.product);
        alert("Товар успешно добавлен!");
        this.resetForm();
      } catch (error) {
        console.error("Ошибка при добавлении товара:", error);
        alert("Ошибка при добавлении товара. Проверьте введенные данные.");
      }
    },
    resetForm() {
      this.product = {
        name: "",
        price: "",
        description: "",
        rating: null,
        id_season: null,
        id_material: null,
        id_insulation: null,
        id_manufacturer: null,
        sizes: [],
        img_types: [],
        colors: [],
        fasteners: [],
      };
    },
  },
  mounted() {
    this.fetchDependencies();
  },
};
</script>

<style>
.add-product {
  max-width: 600px;
  margin: auto;
  background-color: #fff;
}
.add-product form div {
  margin-bottom: 15px;
}
.add-product label {
  display: block;
  font-weight: bold;
}
.add-product input,
.add-product select,
.add-product textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.array-item {
  display: flex;
  gap: 10px;
  align-items: center;
}
.add-product button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
.add-product button:hover {
  background-color: #0056b3;
}
</style>
