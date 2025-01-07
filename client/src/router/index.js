// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../vue/Home.vue'
import Contact from '../vue/Contact.vue'
import Catalog from '../vue/Catalog.vue'
import Login from '../vue/Login.vue'
import Register from '../vue/Register.vue'
import Basket from '../vue/Basket.vue'
import Profile from '../vue/Profile.vue'
import ProductDetails from '../vue/ProductDetails.vue'
import AddProduct from '@/vue/admin/addProject.vue'

const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/contact', // Динамический маршрут "/contact"
  name: 'contact',
  component: Contact, // Компонент страницы контактов
  },
  {
    path: '/catalog/:seasonId',  // Параметр seasonId в URL
    name: 'catalogWithSeason',
    component: Catalog,
    props: true,  // Параметры маршрута передаются как пропсы
  },
  {
    path: '/catalog/:seasonId/:typeId',  // Два параметра в URL
    name: 'catalogWithSeasonType',
    component: Catalog,
    props: true,  // Параметры маршрута передаются как пропсы
  },
  {
  path: '/catalog',
  name: 'catalog',
  component: Catalog,
}, {
  path: '/register',
  name: 'register',
  component: Register,
}, {
  path: '/basket',
  name: 'basket',
  component: Basket,
}, {
  path: '/profile',
  name: 'profile',
  component: Profile,
}, {
  path: '/login',
  name: 'login',
  component: Login,
  },
  {path: '/product/:id',
  name: 'ProductDetails',
  component: ProductDetails,
  props: true, // Пропускаем `id` как пропс в компонент
  }, {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  },
 
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router



