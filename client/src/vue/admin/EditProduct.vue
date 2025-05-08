<template>
    <Nav />
    <div class="add-product">
        <h1>Изменить товар</h1>
        <form @submit.prevent="updateProduct">
            <div>
                <label for="name">Название товара:</label>
                <input type="text" id="name" v-model="product.name" required />
            </div>
            <div>
                <label for="price">Цена:</label>
                <input type="number" id="price" v-model="product.price" step="100.00" min="0" required />
            </div>
            <div>
                <label for="description">Описание:</label>
                <textarea id="description" v-model="product.description"></textarea>
            </div>
            <div>
                <label for="rating">Рейтинг (0-100, чем выше число тем популярнее товар ):</label>
                <input type="number" id="rating" v-model="product.rating" step="1.0" min="0" max="100" />
            </div>

            <!-- Сезон, материал и другие связи -->
            <div>
                <label for="id_season">Сезон:</label>
                <select id="id_season" v-model="product.id_season" required>
                    <option v-for="season in seasons" :key="season.id" :value="season.id">{{ season.name }}</option>
                </select>
            </div>
            <div>
                <label for="id_material">Материал:</label>
                <select id="id_material" v-model="product.id_material" required>
                    <option v-for="material in materials" :key="material.id" :value="material.id">{{ material.name }}</option>
                </select>
            </div>
            <div>
                <label for="id_insulation">Утеплитель:</label>
                <select id="id_insulation" v-model="product.id_insulation" required>
                    <option v-for="insulation in insulations" :key="insulation.id" :value="insulation.id">{{ insulation.name }}</option>
                </select>
            </div>
            <div>
                <label for="id_manufacturer">Производитель:</label>
                <select id="id_manufacturer" v-model="product.id_manufacturer" required>
                    <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.id">{{ manufacturer.name }} | {{ manufacturer.country }}</option>
                </select>
            </div>

            <!-- Цвета и застежки -->
            <div>
                <h3>Выберите цвета:</h3>
                <div v-for="color in colors" :key="color.id" class="option">
                    <input type="checkbox" :value="color.id" v-model="product.colors">
                    <span class="checkbox-text">{{ color.name }}</span>
                </div>
            </div>

            <h3>Выберите застежки:</h3>
            <div v-for="clasp in clasps" :key="clasp.id" class="option">
                <input type="checkbox" :value="clasp.id" v-model="product.clasps">
                <span class="checkbox-text">{{ clasp.name }}</span>
            </div>

            <h3>Выберите типы:</h3>
            <div v-for="type in types" :key="type.id" class="option">
                <input type="checkbox" :value="type.id" v-model="product.types">
                <span class="checkbox-text">{{ type.name }}</span>
            </div>

            <!-- Размеры -->
            <h3>Выберите размеры и укажите их кол-во:</h3>
            <div v-for="(size, index) in product.sizes" :key="size.id || index" class="array-item">
                <label :for="'id_size_' + size.id">Размер:</label>
                <select :id="'id_size_' + size.id" v-model="size.value" required>
                    <option disabled value="">Выберите размер</option>
                    <option v-for="option in sizes" :key="option.id" :value="option.name">
                        {{ option.name }}
                    </option>
                </select>
              
                <label :for="'id_quantity_' + size.id">Количество:</label>
                <input
                  type="number"
                  :id="'id_quantity_' + size.id"
                  v-model="size.quantity"
                  placeholder="Количество"
                  min="0"
                  required
                />
                <button type="button" @click="removeItem(product.sizes, index)">Удалить</button>
            </div>
            <button type="button" @click="addItem(product.sizes, { value: '', quantity: 0 })">
                Добавить размер
            </button>

            <!-- Главное фото -->
            <div>
              <label for="mainImage">Главное фото (ссылка):</label>
              <input type="text" id="mainImage" v-model="product.mainImage" @input="updateMainImagePreview" />
              <div v-if="product.mainImage" class="image-preview">
                <img :src="product.mainImage" alt="Главное фото" />
              </div>
            </div>

            <!-- Массив ссылок на дополнительные фото -->
            <div>
              <h3>Дополнительные изображения</h3>
              <div v-for="(link, index) in product.additionalImages" :key="index" class="array-item">
                <input 
                  type="text" 
                  v-model="product.additionalImages[index]" 
                  @input="updateImagePreview(index)" 
                  placeholder="Вставьте ссылку на изображение" 
                />
                <button type="button" @click="removeItem(product.additionalImages, index)">Удалить</button>
                <div v-if="product.additionalImages[index]" class="image-preview">
                  <img :src="product.additionalImages[index]" alt="Дополнительное изображение" />
                </div>
              </div>
              <button type="button" @click="addItem(product.additionalImages, '')">Добавить изображение</button>
            </div>
            
            <button type="submit" class="add-to-cart">Сохранить изменения</button>
        </form>
    </div>
</template>

<script>
import AdminService from '@/services/AdminService';
import Nav from './description/Nav.vue';

export default {
    name: "EditProduct",
    components: { Nav },
    data() {
        return {
            product: {
                id: null,
                name: "",
                price: "",
                description: "",
                rating: null,
                id_season: null,
                id_material: null,
                id_insulation: null,
                id_manufacturer: null,
                colors: [],
                clasps: [],
                types: [],
                sizes: [],
                mainImage: "",
                additionalImages: [],
            },
            seasons: [],
            materials: [],
            insulations: [],
            manufacturers: [],
            colors: [],
            clasps: [],
            types: [],
            sizes: [],
        };
    },
    methods: {
        async fetchProduct() {
            const productId = await AdminService.getProduct(this.product.id);  // Используем ID из маршрута
            try {
                const response = await AdminService.getProduct(productId);
                this.product = response.data;
            } catch (error) {
                console.error("Ошибка при загрузке товара:", error);
            }
        },
        async fetchDependencies() {
            try {
                const seasonsRes = await AdminService.getSeason();
                const materialsRes = await AdminService.getMaterial();
                const insulationsRes = await AdminService.getInsulation();
                const manufacturersRes = await AdminService.getManufacture();
                const colorsRes = await AdminService.getColore();
                const claspsRes = await AdminService.getClaps();
                const typesRes = await AdminService.getType();
                const sizesRes = await AdminService.getSize();
                this.seasons = seasonsRes.data;
                this.materials = materialsRes.data;
                this.insulations = insulationsRes.data;
                this.manufacturers = manufacturersRes.data;
                this.colors = colorsRes.data;
                this.clasps = claspsRes.data;
                this.types = typesRes.data;
                this.sizes = sizesRes.data;
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        },
        updateProduct() {
            try {
                const productData = {
                    id: this.product.id,
                    name: this.product.name,
                    price: this.product.price,
                    description: this.product.description,
                    rating: this.product.rating,
                    id_season: this.product.id_season,
                    id_material: this.product.id_material,
                    id_insulation: this.product.id_insulation,
                    id_manufacturer: this.product.id_manufacturer,
                    typeIds: this.product.types,
                    clapsIds: this.product.clasps,
                    sizes: this.product.sizes,
                    coloreIds: this.product.colors,
                    img: this.product.mainImage,
                    imageUrls: this.product.additionalImages,
                };
                AdminService.updateProduct(productData);
                alert("Товар успешно обновлен!");
            } catch (error) {
                console.error("Ошибка при обновлении товара:", error);
                alert("Ошибка при обновлении товара.");
            }
        },
        addItem(array, value) {
            array.push(value);
        },
        removeItem(array, index) {
            array.splice(index, 1);
        },
    },
    mounted() {
        this.fetchDependencies();
        this.fetchProduct();
    },
};
</script>
