<template>
    <Header></Header>
    <Navigation 
      @season-selected="handleSeasonSelect"
      @type-selected="handleTypeSelect" 
    />

         <div class="catalog-page">
  <!-- Кнопка только для мобильных -->
<button class="filter-toggle" @click="showSidebar = true">Фильтры</button>

<Sidebar  
  v-if="showSidebar || isDesktop"
  :class="{ mobile: !isDesktop }"
  @close="showSidebar = false"
  :seasonId="selectedSeasonId"
  :typeId="selectedTypeId"
  :colorId="selectedColorId"
  :materialId="selectedMaterialId"
  :insulationId="selectedInsulationId"
  :clapsId="selectedClapsId"
  :manufacturerId="selectedManufacturerId"
  :sizeId="selectedSizeId"

  @season-selected="handleSeasonSelect"
  @type-selected="handleTypeSelect"
  @color-selected="selectedColorIds = $event.colorIds; fetchProducts()"
  @material-selected="selectedMaterialIds = $event.materialIds; fetchProducts()"
  @insulation-selected="selectedInsulationIds = $event.insulationIds; fetchProducts()"
  @claps-selected="selectedClapsIds = $event.clapsIds; fetchProducts()"
  @manufacturer-selected="selectedManufacturerIds = $event.manufacturerIds; fetchProducts()"
  @size-selected="selectedSizeIds = $event.sizeIds; fetchProducts()"
  @reset-filters="resetFilters"
/>

        <main>
        
        
       
         <h2 class="name_catalog">Каталог Мужской Обуви</h2>
        
        <!-- Список товаров -->
    <div class="catalog">
       
          <div class="product" v-for="product in products" :key="product.id">
            <img :src="product.img" :alt="product.name" />
            <router-link :to="`/product/${product.id}`">
              <h2>{{ truncate(product.name, 30) }}</h2>
            </router-link>
            <p>{{  truncate(product.description, 30) }}</p>
            <p class="price">Цена: {{ product.price }} руб.</p>

            <!-- Блок отображения размеров -->
            <div class="sizes">
              <p>Доступные размеры:</p>
              <ul>
                <li v-for="size in product.sizes" :key="size.id" 
                    :class="{ selected: selectedSizes[product.id] && selectedSizes[product.id] === size.id }"
                    @click="selectSize(product.id, size.id)">
                         {{ size.name }} 
                </li>
              </ul>
            </div>
        
            <a href="#" class="buy-btn" @click.prevent="addToCart(product)">
                Добавить в корзину
            </a>
          </div>
     </div>
  
        <!-- Навигация по страницам -->
        <div class="pagination">
        <button class="page-number"
            :disabled="currentPage === 1" 
            @click="handlePageChange(currentPage - 1)">
            Предыдущая
        </button>

        <span 
          v-for="page in visiblePages" 
          :key="page" 
          class="page-number"
          :class="{ active: page === currentPage }"
          @click="handlePageChange(page)">
          {{ page }}
        </span>
    
        <button class="page-number"
            :disabled="currentPage === totalPages" 
            @click="handlePageChange(currentPage + 1)">
            Следующая
        </button>
    </div>
    
        </main>
        </div>
   
</template>

<script>
import Navigation from './components/Navigation.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

import Filter from './components/Filter.vue';
import Sidebar from './components/Sidebar.vue'
import AuthenticationService from '@/services/AuthenticationService.js';
import CatalogService from '@/services/CatalogService.js';
export default {
    name: 'Catalog',
    props: ['seasonId', 'typeId'], // Получаем seasonId как пропс
    components: {
        Navigation,
        Header,
        Footer,
        Filter,
        Sidebar
    },
    data() {
        return {
            products: [],
            currentPage: 1,
            totalPages: 1,
            itemsPerPage: 10,
            selectedSizes: {},  
            selectedSeasonIds: [],
            selectedTypeIds: [],
            selectedColorIds: [],
            selectedMaterialIds: [],
            selectedInsulationIds: [],
            selectedClapsIds: [],
            selectedManufacturerIds: [],
            selectedSizeIds: [],
            showSidebar: false,
            isDesktop: window.innerWidth >= 768
        };
    },
    methods: {
        
        async fetchProducts(page = 1) {
            try {
                const params = {
                page,
                limit: this.itemsPerPage,
                seasonIds: this.selectedSeasonIds,
                typeIds: this.selectedTypeIds,
                colorIds: this.selectedColorIds,
                materialIds: this.selectedMaterialIds,
                insulationIds: this.selectedInsulationIds,
                clapsIds: this.selectedClapsIds,
                manufacturerIds: this.selectedManufacturerIds,
                sizeIds: this.selectedSizeIds
                };

                const response = await CatalogService.paginated({ params });
                const data = response.data;
                console.log('Полученные товары:', data.products);
                console.log('Всего товаров:', data.total);
                console.log('Текущая страница:', data.currentPage);
                this.products = data.products;
                this.currentPage = data.currentPage;
                this.totalPages = data.totalPages;
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        },
        handlePageChange(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.fetchProducts(page);
            }
        },
        handleSeasonSelect({ seasonIds }) {
         console.log('Полученные сезоны:', seasonIds);
         this.selectedSeasonIds = seasonIds;
         this.fetchProducts(); // Загружаем товары с обновлёнными фильтрами
        },
        handleTypeSelect({ typeIds }) {
            this.selectedTypeIds = typeIds;
            this.fetchProducts(); // Загрузка товаров с новым typeId и seasonId
        },
        handleColorSelect({ colorIds }) {
            // Обновляем выбранные id сезона и типа
            this.selectedColorIds= colorIds;
            this.fetchProducts(); // Загрузка товаров с новым typeId и seasonId
        },

        resetFilters() {
            this.selectedSeasonIds = [];
            this.selectedTypeIds = [];
            this.selectedColorIds = [];
            this.selectedMaterialIds = [];
            this.selectedInsulationIds = [];
            this.selectedClapsIds = [];
            this.selectedManufacturerIds = [];
            this.selectedSizeIds = [];

            this.fetchProducts(); // Загрузка товаров с новым typeId и seasonId
        },
        // Метод для выбора размера
        selectSize(productId, sizeId) {
            this.selectedSizes = { ...this.selectedSizes, [productId]: sizeId };
        },


        // Метод для добавления товара в корзину
        addToCart(product) {
            const selectedSize = this.selectedSizes[product.id];

            if (!selectedSize) {
                alert("Пожалуйста, выберите размер перед добавлением в корзину!");
                return;
            }
            AuthenticationService.addCartItem({
                productId: product.id,
                cartId: localStorage.getItem('cart_id'),
                sizeId: selectedSize,
                quantity: 1
            });

            alert("Товар успешно добавлен в корзину!");
        },
        truncate(value, length) {
             if (!value) return '';
             return value.length > length ? value.substring(0, length) + '...' : value;
        },
         handleResize() {
           this.isDesktop = window.innerWidth >= 768;
           if (this.isDesktop) this.showSidebar = false;
        },
        async setItemsPerPage() {
          const width = window.innerWidth;

          if (width <= 480) {
            this.itemsPerPage = 8;
          } else if (width <= 768) {
            this.itemsPerPage = 12;
          } else if (width <= 1024) {
            this.itemsPerPage = 12;
          } else {
            this.itemsPerPage = 15;
          }

          this.currentPage = 1; // сбрасываем на первую страницу
        }
    },
    mounted() {
         window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    computed: {
    visiblePages() {
        const pages = [];

        if (this.currentPage > 1) {
          pages.push(this.currentPage - 1);
        }

        pages.push(this.currentPage);

        if (this.currentPage < this.totalPages) {
          pages.push(this.currentPage + 1);
        }

        return pages;
      }
    },

    created() {
        if (this.seasonId) {
            this.selectedSeasonId = parseInt(this.seasonId); // Устанавливаем выбранный сезон из маршрута
        }
        if (this.typeId) {
            this.selectedTypeId = parseInt(this.typeId); // Устанавливаем выбранный тип из маршрута
        }
        this.setItemsPerPage();
        this.fetchProducts(); // Загрузка товаров
    },
    watch: {
        $route(to) {
            // Обновляем состояние при изменении маршрута
            this.selectedSeasonId = parseInt(to.params.seasonId) || null;
            this.selectedTypeId = parseInt(to.params.typeId) || null;
            this.fetchProducts(); // Загружаем товары для нового маршрута
        },
    },
}
</script>
<style scoped>
.pagination .page-number button.active {
    font-weight: bold;
    background-color: #ddd;
}

h2 {
    background-color: #233870;            /* Задаём тёмно-синий фон для заголовка */
    color: #ffffff;                       /* Цвет текста белый */
    font-size: 2rem;                        /* Размер шрифта для заголовка h1 */
    font-family: 'Segoe Script', cursive;   /* Шрифт для заголовка (рукописный стиль) */
    margin-bottom: 20px;                     /* Убираем нижний отступ, чтобы не было лишнего пространства после заголовка */
    
}



#category-select {
    padding: 8px;       /* Внутренний отступ для выпадающего списка */
    font-size: 16px;    /* Размер шрифта для выпадающего списка */
    margin-left: 10px;  /* Отступ слева, чтобы элементы не прилипали друг к другу */
}

.catalog {
    display: flex;                  /* Используем flexbox для организации элементов */
    justify-content: space-between; /* Равномерное распределение элементов по горизонтали */
    flex-wrap: wrap;                /* Элементы будут переноситься на новую строку, если не помещаются */
}

.product {
    width: 20%;                 /* Ширина каждого товара — 30% от ширины родительского контейнера */
    margin-bottom: 20px;        /* Отступ снизу между товарами */
    text-align: center;         /* Выравнивание содержимого по центру */
    border: 1px solid #ccc;   /* Светло-серая рамка вокруг товара */
    border-radius: 5px;         /* Скругление углов рамки */
    padding: 15px;              /* Внутренние отступы для блока товара */
    background-color: #fff;   /* Белый фон для каждого товара */
    
}

.product img {
    width: 200px;           /* Фиксированная ширина для изображений товаров */
    height: 200px;          /* Фиксированная высота для изображений товаров */
    object-fit: contain;    /* Изображение будет масштабироваться с сохранением пропорций */
    margin: auto;           /* Центрирование изображения внутри контейнера */
}

.product h2 {
    font-size: 22px;        /* Размер шрифта для заголовка товара */
    margin: 10px 0;         /* Отступы сверху и снизу для заголовка товара */
}

.product p {
    font-size: 16px;       /* Размер шрифта для описания товара */
    margin-bottom: 10px;   /* Отступ снизу для описания товара */
}

.product:hover img {
    transform: scale(1.2);
}

.price {
    font-weight: bold;      /* Жирный шрифт для цены товара */
}

.buy-btn {
    display: inline-block;        /* Кнопка будет вести себя как блок, но на одной линии с другими элементами */
    padding: 10px 20px;           /* Внутренний отступ для кнопки */
    background-color: #007bff;  /* Синий фон для кнопки */
    color: white;               /* Белый цвет текста на кнопке */
    text-decoration: none;        /* Убираем подчеркивание текста в кнопке */
    border-radius: 5px;           /* Скругление углов кнопки */
    font-size: 16px;              /* Размер шрифта для текста кнопки */
    margin-top: 10px;
}

.buy-btn:hover {
    background-color: #0056b3;  /* При наведении фон кнопки становится темнее */
}


.pagination {
    display: flex;
    justify-content: center;
    /* Центрирование пагинации по горизонтали */
    margin-top: 20px;
    /* Отступ сверху */
    padding: 10px;
}

.page-number {
    display: inline-flex; /* Flex для выравнивания текста по центру */
    justify-content: center; /* Центрируем текст */
    align-items: center; /* Центрируем по вертикали */
    margin: 0 5px; /* Отступы между кнопками */
    padding: 10px 15px; /* Увеличиваем область клика */
    border: 1px solid #233870; /* Граница */
    border-radius: 5px; /* Скругленные углы */
    color: #233870; /* Цвет текста */
    cursor: pointer; /* Указатель при наведении */
    background-color: #fff; /* Белый фон */
    transition: background-color 0.3s ease; /* Анимация при наведении */
}

.page-number.active,
.page-number:hover {
    background-color: #233870; /* Цвет активной страницы */
    color: white; /* Цвет текста */
}

 main {

     justify-content: center;
     /* Центрирование по горизонтали */
     align-items: center;
     /* Центрирование по вертикали */
     flex: 08;
     /* Этот блок займет все оставшееся пространство */
     padding: 20px;
     text-align: center;
 }


 .catalog-page {
     display: flex;
 }

.sizes {
  margin-top: 10px;
  font-size: 14px;
  
}

.sizes ul {
  display: flex; /* Используем Flexbox */
  flex-wrap: wrap; /* Позволяет переносить размеры на новую строку при недостатке места */
  gap: 10px; /* Расстояние между размерами */
  list-style-type: none; /* Убираем маркеры списка */
  padding: 0; /* Убираем отступы */
  margin: 0; /* Убираем внешние отступы */
}

.sizes li {
  display: inline-block;
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sizes li:hover {
  background-color: #ddd;
}

.sizes li.selected {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.filter-toggle {
  display: none;
  margin: 10px;
  padding: 10px 15px;
  background-color: #233870;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .filter-toggle {
    display: block;
  }
}
/* По умолчанию — 5 товаров */
.product {
  width: 20%;
}

/* <= 1024px — 3 товара */
@media (max-width: 1430px) {
  .product {
    width: 30%;
  }
  .product img {
    width: 150px;
    height: 150px;
  }
}

/* <= 768px — 2 товара */
@media (max-width: 1000px) {
  main{
    padding: 0;
    width: 100%;
}
.catalog{
    padding: 5px;
    width: 99%;
}
.product h2 {
  font-size: 16px; /* размер заголовка */
}
.name_catalog {
    display: none;
}

.product p {
  font-size: 14px; /* размер обычного текста */
}

.price {
  font-size: 14px; /* размер цены */
}
  .product {
    width: 32%;
  }
  .product img {
    width: 120px;
    height: 120px;
  }
  .product h2,
    .product p {
      word-wrap: break-word;     /* Разбивает длинные слова */
      overflow: hidden;          /* Скрывает всё, что выходит за границы */
      text-overflow: ellipsis;   /* Добавляет "..." при обрезке */
      white-space: normal;       /* Разрешает перенос строк */
      max-width: 100%;           /* Ограничивает ширину текстом карточки */
    }
.sizes,
  .buy-btn {
    display: none;
  }
  .filter-toggle {
    height: 40px; /* Меньше высоты на телефоне */
    font-size: 14px; /* Уменьшенный размер шрифта */
  }
  .page-number{
    font-size: 12px;
  }
}



/* <= 480px — 1 товар */
@media (max-width: 480px) {
main{
    padding: 0;
    width: 100%;
}
.catalog{
    padding: 5px;
    width: 99%;
}
.product h2 {
  font-size: 16px; /* размер заголовка */
}
.name_catalog {
    display: none;
}

.product p {
  font-size: 14px; /* размер обычного текста */
}

.price {
  font-size: 14px; /* размер цены */
}
  .product {
    width: 45%;
  }
  .product img {
    width: 120px;
    height: 120px;
  }
  .product h2,
    .product p {
      word-wrap: break-word;     /* Разбивает длинные слова */
      overflow: hidden;          /* Скрывает всё, что выходит за границы */
      text-overflow: ellipsis;   /* Добавляет "..." при обрезке */
      white-space: normal;       /* Разрешает перенос строк */
      max-width: 100%;           /* Ограничивает ширину текстом карточки */
    }
.sizes,
  .buy-btn {
    display: none;
  }
  .filter-toggle {
    height: 40px; /* Меньше высоты на телефоне */
    font-size: 14px; /* Уменьшенный размер шрифта */
  }
  .page-number{
    font-size: 10px;
  }
}
.filter-toggle {
  position: absolute;        /* Абсолютное позиционирование */
  top: 0;                    /* Располагаем её в верхней части */
  left: 0;                   /* Привязываем её к левому краю контейнера */
  width: 50%;               /* Ширина кнопки равна ширине товаров */
  height: 50px;              /* Высота кнопки */
  padding: 10px 20px;        /* Внутренние отступы */
  background-color: #7e7e7e; /* Цвет фона */
  color: white;              /* Цвет текста */
  font-size: 16px;           /* Размер шрифта */
  text-align: center;        /* Центрируем текст */
  border-radius: 5px;        /* Скругляем углы */
  cursor: pointer;          /* Указатель при наведении */
  z-index: 10;               /* Обеспечим, чтобы кнопка была сверху */
}

.catalog-page {
  position: relative;        /* Относительное позиционирование для родителя */
  padding-top: 60px;         /* Отступ сверху для товаров, чтобы кнопка не перекрывала их */
}
</style>