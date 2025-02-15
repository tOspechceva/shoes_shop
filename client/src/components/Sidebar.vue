<template>
  <aside class="sidebar">
    <h2>Сезоны</h2>
    <ul class="season-list">
      <li 
        class="season-item" 
        v-for="(season) in seasons" 
        :key="season.season_id"
        @click="selectSeason(season.season_id)"
        :class="{ selected: selectedSeason === season.season_id }" 
        style="cursor: pointer"
      >
        <a>{{ season.season_name }}</a>
        
        <!-- Перебираем типы, связанные с сезоном, показываем только для выбранного сезона -->
        <ul v-if="selectedSeason === season.season_id" class="type-dropdown">
          <li  
            v-for="type in season.types" 
            :key="type.type_id"
            @click="selectType(season.season_id, type.type_id)"
            style="cursor: pointer"
          >
            <a>{{ type.type_name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>


<script scoped>
import CatalogService from '@/services/CatalogService.js';
export default {
  name: 'Sidebar',
  data() {
    return {
      selectedSeason: null, // Инициализация выбранного сезона
      selectedType: null,
      seasons: null
    };
  },
  methods: {
    selectSeason(seasonId) {
      // Переход на страницу каталога с выбранным seasonId
        this.$router.push({ name: 'catalogWithSeason', params: {  seasonId } });
        // Выбираем сезон, передаем его id на страницу каталога
        this.selectedSeason = this.selectedSeason === seasonId ? null: seasonId;
        // Отправляем событие с выбранным сезоном
        this.$emit('season-selected', { seasonId });
    },
    selectType(seasonId, typeId) {
      this.$router.push({ name: 'catalogWithSeasonType', params: {  seasonId, typeId } });
        this.selectedSeason = this.selectedSeason === seasonId ? null :   seasonId;
        this.selectedType = this.selectedType === typeId ? null : typeId;
        // Передаем id сезона и id типа на страницу каталога
        this.$emit('type-selected', { seasonId, typeId });
    },
    async getSeason() {
        try {
          const response = await CatalogService.getSeasonsWithTypes();
          const data = response.data;
            console.log(data);
            this.seasons = data.seasons;
          console.log('Сезоны:', this.seasons);
        } catch (error) {
          console.error('Ошибка при загрузке товаров:', error);
        }
    }
  },
  created() {
     this.getSeason();  // Загружаем сезоны при создании компонента
  },
};
</script>


<style scoped>
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 20px;
}

.season-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.season-item {
  background-color: #f4f4f4;
  color: #000;
  padding: 8px;
  cursor: pointer;
  position: relative;
}

.season-item a {
  text-decoration: none;
  color: inherit;
}

.season-item.selected {
  background-color: #e0e0e0; /* Цвет фона выбранного сезона */
}

.type-dropdown {
  list-style: none;
  padding: 10px;
  background-color: #f0f0f0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.type-dropdown li {
  padding: 5px 0;
  cursor: pointer;
}
.type-dropdown :hover{
    background-color: #a5c7ac;
}
.type-dropdown li:hover {
  background-color: #f0f0f0; /* При наведении на тип */
}
</style>