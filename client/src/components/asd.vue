<template>
    <div>
   <aside class="sidebar">
        <div >
          <ul class="season-list1">
            <!-- Перебираем сезоны -->
            <li  class="season-item1"
              v-for="season in seasons" 
              :key="season.id" 
              @click="selectSeason(season.id)"
            >
              <span>{{ season.name }}</span>

              <!-- Перебираем типы, связанные с сезоном -->
              <ul class="type-list1 ">
                <li 
                  v-for="type in season.types" 
                  :key="type.id" 
                  @click="selectType(season.id, type.id)"
                >
                   <span>{{ type.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
   </aside>
   </div>
</template>

<script>
import CatalogService from '@/services/CatalogService';

export default {
    name:'Sidebar',
    data: {
        season: null,
    },
    methods: {
        selectSeason(seasonId) {
            // Передаём id выбранного сезона через событие
            this.$emit('season-selected', seasonId);
        },
        selectType(season, type) {
            // Передаем как выбранный тип, так и сезон через событие
            this.$emit('type-selected', { season, type });
        },
        async getSeason() {
            try {
                const response = await CatalogService.getSeasonsWithTypes({ params: {}, });
                
                const data = response.data;
                this.season = data.season;
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }

        }
    },
    created() {
        this.getSeason();
    },
};
</script>

<style scoped>
.sidebar {
     width: 200px;
     /* Ширина боковой панели */
     padding: 20px;
     /* Внутренний отступ */
     background-color: #f4f4f4;
     /* Цвет фона для боковой панели */
     box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
 }

 .sidebar h2 {
     font-size: 20px;
     
 }

 .season-list1 {
     list-style: none;
     /* Убираем маркеры списка */
     padding: 0;
     margin: 0;
 }

 .season-item1 {
     font-weight: bold;
     color: #000000;
     margin-bottom: 10px;
 }

 .type-list1 {
     list-style: none;
     /* Убираем маркеры вложенного списка */
     padding-left: 20px;
     /* Отступ для вложенного списка типов */
 }

 .type-list1 li a {
     color: #000000;
     text-decoration: none;
     font-weight: normal;
 }

 .type-list1 li a:hover {
     color: #9daa83;
     /* Цвет при наведении на ссылки типов */
 }

</style>