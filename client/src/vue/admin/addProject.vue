<template>
    <Nav/>
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

      <!-- Размеры с количеством -->
      <div>
        <h3>Размеры</h3>
        <div v-for="(size, index) in product.sizes" :key="index" class="array-item">
          <input type="number" v-model="size.value" placeholder="Размер" required />
          <input type="number" v-model="size.quantity" placeholder="Количество" min="0" required />
          <button type="button" @click="removeItem(product.sizes, index)">Удалить</button>
        </div>
        <button type="button" @click="addItem(product.sizes, { value: '', quantity: 0 })">Добавить размер</button>
      </div>

      <!-- Загрузка изображений -->
      <div>
        <h3>Изображения</h3>
        <div v-for="(img, index) in product.img" :key="index" class="array-item">
          <input type="file" @change="onFileChange($event, index)" />
          <span v-if="img.name">{{ img.name }}</span>
          <button type="button" @click="removeItem(product.img, index)">Удалить</button>
        </div>
        <button type="button" @click="addItem(product.img, null)">Добавить изображение</button>
      </div>

      <!-- Кнопка отправки -->
      <button type="submit">Добавить товар</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "./description/Nav.vue";
export default {
  name: "AddProduct",
  components: { Nav },
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
        sizes: [], // Список размеров с количеством
        img: [], // Список загруженных изображений
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
    onFileChange(event, index) {
      const file = event.target.files[0];
      if (file) {
        this.$set(this.product.img, index, file);
      }
    },
    async addProduct() {
      try {
        const formData = new FormData();

        // Добавляем основные данные товара
        Object.entries(this.product).forEach(([key, value]) => {
          if (key === "img") {
            value.forEach((file, index) => {
              if (file) {
                formData.append(`img[${index}]`, file);
              }
            });
          } else if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });

        const response = await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
        img: [],
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
