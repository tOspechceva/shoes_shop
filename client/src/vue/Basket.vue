<template>
  <Header></Header>
  <Navigation></Navigation>
  <main>
    <h2>Корзина</h2>
    <div class="basket">
      <div class="product" v-for="product in products" :key="product.id">
        <input 
          type="checkbox" 
          v-model="product.selected" 
          class="select-checkbox" 
        />
        <img :src="product.img" :alt="product.name" />
        <router-link :to="`/product/${product.id}`">
          <h2>{{ product.name }}</h2>
        </router-link>
        <p class="price">Цена: {{ product.price }} руб.</p>
        <div class="size-select">
          <label for="size">Размер:</label>
          <select 
            v-model="product.size" 
            :name="`size-${product.id}`" 
            :id="`size-${product.id}`"
          >
            <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
        <div class="quantity-controls">
          <button @click="decreaseQuantity(product)">-</button>
          <span class="quantity">{{ product.quantity }}</span>
          <button @click="increaseQuantity(product)">+</button>
        </div>
        <button class="delete-btn" @click="removeProduct(product)">Удалить</button>
      </div>
    </div>
    <div class="basket-footer">
      <p class="total">Итоговая сумма: {{ totalPrice }} руб.</p>
      <button class="checkout-btn" @click="proceedToCheckout">Перейти к оформлению заказа</button>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Basket',
  components: {
    Navigation,
    Header,
    Footer,
  },
  data() {
    return {
      sizes: Array.from({ length: 16 }, (_, i) => i + 35), // Размеры от 35 до 50
      products: [
        { id: 1, name: 'Кроссовки', price: 5000, quantity: 1, img: 'path-to-image-1.jpg', selected: false, size: 38 },
        { id: 2, name: 'Сапоги', price: 7000, quantity: 2, img: 'path-to-image-2.jpg', selected: false, size: 40 },
        { id: 3, name: 'Мокасины', price: 4500, quantity: 1, img: 'path-to-image-3.jpg', selected: false, size: 42 },
      ],
    };
  },
  computed: {
    totalPrice() {
      return this.products
        .filter((product) => product.selected)
        .reduce((sum, product) => sum + product.price * product.quantity, 0);
    },
  },
  methods: {
    increaseQuantity(product) {
      product.quantity++;
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
      }
    },
    removeProduct(product) {
      this.products = this.products.filter((p) => p.id !== product.id);
    },
    proceedToCheckout() {
      const selectedProducts = this.products.filter((product) => product.selected);
      if (selectedProducts.length > 0) {
        console.log('Переход к оформлению заказа', selectedProducts);
        this.$router.push('/checkout');
      } else {
        alert('Выберите хотя бы один товар для оформления заказа.');
      }
    },
  },
};
</script>

<style scoped>
.basket {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  justify-content: space-around;  /* Элементы внутри навигации равномерно распределены */
    background-color: #f0f0f0;
}

.product img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.product h2 {
  font-size: 1.2rem;
  margin: 0;
}

.price {
  margin: 0 10px;
  font-weight: bold;
}

.size-select label {
  margin-right: 10px;
  font-weight: bold;
}

.size-select select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-controls button:hover {
  background-color: #e0e0e0;
}

.quantity {
  font-size: 1rem;
  font-weight: bold;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #d9363e;
}

.select-checkbox {
  transform: scale(1.5);
  margin-right: 10px;
  cursor: pointer;
}

.basket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
}

.checkout-btn {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #218838;
}
</style>


