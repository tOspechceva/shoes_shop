<template>
<Header></Header>
<Navigation></Navigation>
<main>
    <h2 class="header">Корзина</h2>
    <div class="basket">
        <div class="product" v-for="product in items" :key="product.id">
            <input type="checkbox" v-model="product.selected" class="select-checkbox" @change="updateSelected(product)">

            <img :src="product.product.img" :alt="product.product.name" class="product-image" />
            <router-link :to="`/product/${product.product.id}`" class="product-link">
                <h2 class="product-name">
                    {{ product.product.name }}
                </h2>
            </router-link>
            <p class="price">Цена: {{ product.product.price }} руб.</p>
            <div class="size-select">
                <label for="size">Размер:</label>
                <select v-model="product.product.size" :name="`size-${product.id}`" :id="`size-${product.id}`" disabled>
                    <option :value="product.product.size">{{ product.product.size }}</option>
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
</template>

<script>
import Navigation from './components/Navigation.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AuthenticationService from '@/services/AuthenticationService.js';

export default {
    name: 'Basket',
    components: {
        Navigation,
        Header,
        Footer,
    },
    data() {
        return {
            items: [],
        };
    },
    computed: {
        totalPrice() {
            return this.items
                .filter((product) => product.selected)
                .reduce((sum, product) => sum + product.product.price * product.quantity, 0);
        },
    },
    methods: {
        async fetchBasket() {
            try {
                const cartId = localStorage.getItem('cart_id');
                console.log(cartId)

                if (!cartId) {
                    console.error('cart_id не найден');
                    return;
                }

                const params = {
                    cart_id: cartId,
                    user_id: localStorage.getItem('user_id')
                };
                const response = await AuthenticationService.getBasket({
                    params
                });
                this.items = response.data.items;
                console.log(response)
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        },
        async increaseQuantity(product) {
            try {
                product.quantity++;

                await AuthenticationService.updateSelectedState({
                    user_id: localStorage.getItem('user_id'),
                    product_id: product.id,
                    size: product.product.size,
                    selected: product.selected,
                    quantity: product.quantity
                });
            } catch (error) {
                console.error('Ошибка при обновлении колличества:', error);
            }
        },
        async decreaseQuantity(product) {
            try {
                if (product.quantity > 1) {
                    product.quantity--;
       
                    await AuthenticationService.updateSelectedState({
                        user_id: localStorage.getItem('user_id'),
                        product_id: product.id,
                        size: product.product.size,
                        selected: product.selected,
                        quantity: product.quantity
                    });
                }
            } catch (error) {
                console.error('Ошибка при обновлении колличества:', error);
            }
        },
        async removeProduct(product) {
            try {
                
                await AuthenticationService.deleteCartItem({
                    user_id: localStorage.getItem('user_id'),
                    product_id: product.id,
                    size: product.product.size,

                });

                this.items = this.items.filter((p) => p.id !== product.id);

            } catch (error) {
                console.error('Ошибка при удалении товара из корзины:', error);
            }
        },

        proceedToCheckout() {
            const selectedProducts = this.items.filter((product) => product.selected);
            if (selectedProducts.length > 0) {
                localStorage.setItem('selectedItems', JSON.stringify(selectedProducts));
                this.$router.push('/checkout');
            } else {
                alert('Выберите хотя бы один товар для оформления заказа.');
            }
        },
        async updateSelected(product) {
            try {
                await AuthenticationService.updateSelectedState({
                    user_id: localStorage.getItem('user_id'),
                    product_id: product.id,
                    size: product.product.size,
                    selected: product.selected,
                    quantity: product.quantity
                });
            } catch (error) {
                console.error('Ошибка при обновлении выбора:', error);
            }
        }

    },
    created() {
        this.fetchBasket();
    },
};
</script>

<style scoped>
.header {
    background-color: #233870;
    /* Задаём тёмно-синий фон для заголовка */
    color: #ffffff;
    /* Цвет текста белый */
    font-size: 2rem;
    /* Размер шрифта для заголовка h1 */
    font-family: 'Segoe Script', cursive;
    /* Шрифт для заголовка (рукописный стиль) */
    margin-bottom: 20px;
    /* Убираем нижний отступ, чтобы не было лишнего пространства после заголовка */
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
}

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
    background-color: #f0f0f0;
    justify-content: space-between;
    /* Равномерное распределение */
    margin-left: 10px;
    margin-right: 10px;
}

/* Ограничение длины имени товара */
.product-name {
    max-width: 150px;
    /* Ограничение ширины */
    overflow: hidden;
    /* Скрываем излишек */
    text-overflow: ellipsis;
    /* Добавляем многоточие */
    text-decoration: none;
    /* Убирает подчеркивание */
    color: inherit;
    /* Убирает цвет ссылки, делает его как у обычного текста */
}

.product-link {
    text-decoration: none;
    /* Убирает подчеркивание */
    color: inherit;
    /* Сохраняет цвет текста */
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

/* Кнопка удаления */
.delete-btn {
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 20px;
}

.delete-btn:hover {
    background-color: #d9363e;
}

.select-checkbox {
    transform: scale(1.5);
    margin-left: 20px;
    cursor: pointer;
}

.basket-footer {
    display: flex;
    justify-content: space-between;

    margin-top: 20px;
    flex-direction: column;
    /* Размещаем элементы в колонку */
    align-items: flex-end;
    /* Выравниваем элементы по правому краю */
    margin-bottom: 30px;
    margin-right: 10px;
}

.total {
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #f0f0f0;
    margin-top: 10px;
    margin-bottom: 10px;
}

.checkout-btn {
    background-color: #4c6e0c;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.checkout-btn:hover {
    background-color: #44630b;
}

@media (max-width: 768px) {
    .basket {
        gap: 10px;
    }

    .product {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .product img {
        width: 100%;
        height: auto;
        max-width: 200px;
        align-self: center;
    }

    .product-name {
        max-width: 100%;
        font-size: 1rem;
        text-align: center;
    }

    .product h2 {
        font-size: 1.1rem;
        text-align: center;
    }

    .price,
    .size-select,
    .quantity-controls,
    .delete-btn {
        width: 100%;
        text-align: center;
    }

    .size-select {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .quantity-controls {
        justify-content: center;
    }

    .delete-btn {
        width: 100%;
        margin-right: 0;
    }

    .select-checkbox {
        margin-left: 0;
        align-self: center;
    }

    .basket-footer {
        align-items: center;
    }

    .total {
        font-size: 1rem;
        text-align: center;
    }

    .checkout-btn {
        width: 100%;
        padding: 10px;
    }

    .header {
        font-size: 1.5rem;
        margin: 10px;
    }
}
</style>
