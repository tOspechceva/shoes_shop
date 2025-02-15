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
import addClaps from '@/vue/admin/description/addClaps.vue'
import addColore from '@/vue/admin/description/addColore.vue'
import addManufacturer from '@/vue/admin/description/addManufacturer.vue'
import addMaterial from '@/vue/admin/description/addMaterial.vue'
import addSeason from '@/vue/admin/description/addSeason.vue'
import addSize from '@/vue/admin/description/addSize.vue'
import addType from '@/vue/admin/description/addType.vue'
import addInsulation from '@/vue/admin/description/addInsulation.vue'
const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/contact', 
  name: 'contact',
  component: Contact, 
}, {
    path: '/catalog/:seasonId',  // Параметр seasonId в URL
    name: 'catalogWithSeason',
    component: Catalog,
    props: true,  
}, {
    path: '/catalog/:seasonId/:typeId',  // Два параметра в URL
    name: 'catalogWithSeasonType',
    component: Catalog,
    props: true,  
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
    path: '/profile',
    name: 'profile',
    component: Profile,
}, {
    path: '/login',
    name: 'login',
    component: Login,
}, {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true, // Пропускаем `id` как пропс в компонент
  },
  //---------------Admin Panel-----------------------
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  },{
    path: '/add-claps',
    name: 'addClaps',
    component: addClaps,
  }, {
    path: '/add-colore',
    name: 'addColore',
    component: addColore,
  }, {
    path: '/add-insulation',
    name: 'addInsulation',
    component: addInsulation,
  }, {
    path: '/add-manufacturer',
    name: 'addManufacturer',
    component: addManufacturer,
  },{
    path: '/add-material',
    name: 'addMaterial',
    component: addMaterial,
  }, {
    path: '/add-season',
    name: 'addSeason',
    component: addSeason,
  }, {
    path: '/add-size',
    name: 'addSize',
    component: addSize,
  }, {
    path: '/add-type',
    name: 'addType',
    component: addType,
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router



