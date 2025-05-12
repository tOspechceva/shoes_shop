<template>
<Header />
<Navigation />
<main class="checkout">
    <h2>Оформление заказа</h2>

    <section v-if="selectedItems.length">
        <div v-for="item in selectedItems" :key="item.id" class="checkout-item">
            <p><strong>{{ item.product.name }}</strong> (размер: {{ item.product.size }})</p>
            <p>Цена: {{ item.product.price }} × {{ item.quantity }} = {{ item.product.price * item.quantity }} руб.</p>
        </div>

        <p class="total">Итого: {{ totalPrice }} руб.</p>
        <div class="delivery-method">
            <label>
                <input type="radio" value="pickup" v-model="form.deliveryMethod" />
                Самовывоз
            </label>
            <label>
                <input type="radio" value="post" v-model="form.deliveryMethod" />
                Доставка почтой
            </label>
        </div>

        <form class="checkout-form" @submit.prevent="submitOrder">
            <!-- Всегда отображаем номер телефона -->
            <div class="form-field">
                <label for="phone">Телефон:</label>
                <input type="tel" id="phone" v-model="form.phone" required placeholder="+7 (___) ___-__-__" />
            </div>
            <div class="form-field">
                    <label for="fullName">ФИО:</label>
                    <input type="text" id="fullName" v-model="form.fullName" required placeholder="Иванов Иван Иванович" />
            </div>
            <!-- Отображаем остальные поля только если выбрана доставка почтой -->
            <div v-if="form.deliveryMethod === 'post'">
            
                <div class="form-field">
                    <label for="postalCode">Почтовый индекс:</label>
                    <input type="text" id="postalCode" v-model="form.postalCode" pattern="[0-9]{5,6}" maxlength="6" required placeholder="308004" />
                </div>

                <div class="form-field">
                    <label for="city">Область и город:</label>
                    <input type="text" id="city" v-model="form.city" required placeholder="Белгород" />
                </div>

                <div class="form-field">
                    <label for="street">Улица и дом:</label>
                    <input type="text" id="street" v-model="form.street" required placeholder="ул. Победы, д. 10" />
                </div>

                <div class="form-field">
                    <label for="apartment">Квартира:</label>
                    <input type="text" id="apartment" v-model="form.apartment" placeholder="12" />
                </div>
            </div>

            <button type="submit">Оформить заказ</button>
        </form>
    </section>

    <p v-else>Нет выбранных товаров.</p>
</main>
</template>

<script>
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';
import AuthenticationService from '@/services/AuthenticationService';
export default {
    name: 'Checkout',
    components: {
        Header,
        Navigation
    },
    data() {
        return {
            tems: [],
            form: {
                deliveryMethod: 'pickup', // или 'post'
                phone: '',
                fullName: '',
                postalCode: '',
                city: '',
                street: '',
                apartment: '',
            },
            deliveryMethod: ''
        };
    },
    computed: {
        selectedItems() {
            return this.items.filter(item => item.selected);
        },
        totalPrice() {
            return this.selectedItems.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
        },
    },
    created() {
        const rawItems = JSON.parse(localStorage.getItem('selectedItems'));
        if (rawItems) this.items = rawItems;
    },
    methods: {
        async submitOrder() {
            try {

                const userId = localStorage.getItem('user_id');
                console.log('id', userId)
                // Проверка метода доставки
                if (!this.form.deliveryMethod) {
                    alert('Выберите способ доставки');
                    return;
                }

                // Подготовка данных для отправки на сервер
                let deliveryData = {
                    user_id: userId,
                    deliveryMethod: this.form.deliveryMethod,
                    address: `${this.form.city}, ${this.form.street}${this.form.apartment ? ', кв. ' + this.form.apartment : ''}`,
                    fullName: this.form.fullName,
                    phone: this.form.phone,
                    postalCode: this.form.postalCode,
                };

                // Если доставка почтой — добавить адрес и индекс
                if (this.form.deliveryMethod === 'Почта') {
                    if (!this.form.fullName || !this.form.phone || !this.form.address || !this.form.postalCode) {
                        alert('Пожалуйста, заполните все поля формы.');
                        return;
                    }
                    deliveryData.address = this.address;
                } else {
                    if (!this.form.phone || !this.form.fullName) {
                        alert('Пожалуйста, укажите номер телефон и имя.');
                        return;
                    }
                    deliveryData.address = 'Самовывоз';
                }

                // 1. Создаём заказ, отправив данные на сервер
                const response = await AuthenticationService.placeOrder(deliveryData); // передаем sessionKey
                // Обработка ответа
                if (response.status === 200) {
                    alert('Заказ успешно оформлен!');
                    this.$router.push('/');
                } else {
                    alert('Произошла ошибка при оформлении заказа. Попробуйте снова.');
                }
            } catch (err) {
                console.error('Ошибка при оформлении заказа:', err);
                alert('Произошла ошибка. Попробуйте снова.');
            }
        }

    },
};
</script>

<style scoped>
.checkout {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.checkout h2 {
    text-align: center;
    color: #233870;
    font-size: 2rem;
    margin-bottom: 30px;
}

.checkout-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    padding: 15px;
    margin-bottom: 20px;
}

.checkout-item p {
    margin: 5px 0;
}

.total {
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #f0f0f0;
    padding: 10px;
    margin: 20px 0;
    text-align: right;
}

/* Общий стиль формы */
form,
.checkout-form {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Общая группа полей */
.form-group,
.form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-group label,
.form-field label,
label {
    font-weight: bold;
    margin-bottom: 5px;
}

input,
textarea,
select {
    padding: 10px;
    border: 1px solid #999;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #fff;
    transition: border-color 0.3s;
}

input:focus,
textarea:focus {
    border-color: #233870;
    outline: none;
}

input::placeholder {
    color: #999;
}

textarea {
    resize: vertical;
    min-height: 60px;
}

/* Кнопка оформления */
button[type="submit"],
.submit-btn {
    background-color: #4c6e0c;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

button[type="submit"]:hover,
.submit-btn:hover {
    background-color: #3e5b0a;
}

/* Блок выбора доставки */
.delivery-method {
    margin: 20px 10px;
    font-weight: bold;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.delivery-method label {
    cursor: pointer;
}

/* Адаптивность */
@media (max-width: 768px) {
    .checkout {
        padding: 10px;
    }

    .checkout h2 {
        font-size: 1.5rem;
    }

    .total {
        text-align: center;
        font-size: 1rem;
    }

    textarea,
    select,
    button[type="submit"],
    .submit-btn {
        width: 100%;
    }

    .form-field {
        margin: 10px 0;
    }

    .delivery-method {
        flex-direction: column;
        gap: 10px;
    }
}
</style>
