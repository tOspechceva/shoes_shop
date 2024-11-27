// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Contact from '../components/Contact.vue'
import Catalog from '../components/Catalog.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Basket from '../components/Basket.vue'
import Private_office from '../components/Private_office.vue'

const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/contact', // Динамический маршрут "/contact"
  name: 'contact',
  component: Contact, // Компонент страницы контактов
}, {
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
  path: '/private_office',
  name: 'private_office',
  component: Private_office,
}, {
  path: '/login',
  name: 'login',
  component: Login,
},
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router



