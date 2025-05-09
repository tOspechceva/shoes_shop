<template>
  <<div :class="['sidebar', { mobile: isMobile }]">
    <!-- Кнопка закрытия для мобильной версии -->
    <button v-if="isMobile" class="close-btn" @click="$emit('close')">✕</button>
    <h2>Фильтры</h2>

    <!-- Сезоны -->
    <h3 @click="toggleSection('seasons')" style="cursor: pointer">Сезоны</h3>
    <ul v-show="visibleSections.seasons" class="filter-list scrollable-list">
      <li 
        v-for="season in seasons" 
        :key="season.season_id" 
        @click="toggleSeason(season.season_id)"
        :class="{ selected: selectedSeasons.includes(season.season_id) }"
      >
        <a>{{ season.season_name }}</a>
      </li>
    </ul>

    <!-- Типы -->
    <h3 @click="toggleSection('types')" style="cursor: pointer">Типы</h3>
    <ul v-show="visibleSections.types" class="filter-list scrollable-list">
      <li 
        v-for="type in types" 
        :key="type.id" 
        @click="toggleType(type.id)"
        :class="{ selected: selectedTypes.includes(type.id) }"
      >
        <a>{{ type.name }}</a>
      </li>
    </ul>

    <!-- Материалы -->
    <h3 @click="toggleSection('materials')" style="cursor: pointer">Материалы</h3>
    <ul v-show="visibleSections.materials" class="filter-list scrollable-list">
      <li 
        v-for="material in materials" 
        :key="material.id" 
        @click="toggleMaterial(material.id)"
        :class="{ selected: selectedMaterials.includes(material.id) }"
      >
        {{ material.name }}
      </li>
    </ul>

    <!-- Утеплители -->
    <h3 @click="toggleSection('insulations')" style="cursor: pointer">Утеплители</h3>
    <ul v-show="visibleSections.insulations" class="filter-list scrollable-list">
      <li 
        v-for="insulation in insulations" 
        :key="insulation.id" 
        @click="toggleInsulation(insulation.id)"
        :class="{ selected: selectedInsulations.includes(insulation.id) }"
      >
        {{ insulation.name }}
      </li>
    </ul>

    <!-- Производители -->
    <h3 @click="toggleSection('manufacturers')" style="cursor: pointer">Производители</h3>
    <ul v-show="visibleSections.manufacturers" class="filter-list scrollable-list">
      <li 
        v-for="manufacturer in manufacturers" 
        :key="manufacturer.id" 
        @click="toggleManufacturer(manufacturer.id)"
        :class="{ selected: selectedManufacturers.includes(manufacturer.id) }"
      >
        {{ manufacturer.name }}
      </li>
    </ul>

    <!-- Цвета -->
    <h3 @click="toggleSection('colors')" style="cursor: pointer">Цвета</h3>
    <ul v-show="visibleSections.colors" class="filter-list scrollable-list">
      <li 
        v-for="color in colors" 
        :key="color.id" 
        @click="toggleColor(color.id)"
        :class="{ selected: selectedColors.includes(color.id) }"
      >
        {{ color.name }}
      </li>
    </ul>

    <!-- Застёжки -->
    <h3 @click="toggleSection('claps')" style="cursor: pointer">Застёжки</h3>
    <ul v-show="visibleSections.claps" class="filter-list scrollable-list">
      <li 
        v-for="clap in claps" 
        :key="clap.id" 
        @click="toggleClap(clap.id)"
        :class="{ selected: selectedClaps.includes(clap.id) }"
      >
        {{ clap.name }}
      </li>
    </ul>

    <!-- Сброс -->
    <button @click="showAllProducts" class="show-all-button">Показать всё</button>
   </div>
</template>





<script scoped>
import CatalogService from '@/services/CatalogService.js';
import AdminService from '@/services/AdminService';

export default {
  name: 'Sidebar',
  data() {
    return {
      // выбранные
      selectedSeasons: [],
      selectedTypes: [],
      selectedMaterials: [],
      selectedInsulations: [],
      selectedManufacturers: [],
      selectedColors: [],
      selectedClaps: [],

      // данные
      seasons: null,
      materials: [],
      insulations: [],
      manufacturers: [],
      colors: [],
      claps: [],
      types: [],

      // управление отображением списков
      visibleSections: {
        materials: false,
        insulations: false,
        manufacturers: false,
        colors: false,
        claps: false,
        types: false,
        seasons: true, // по умолчанию открыт

        isMobile: false
      }
    };
  },
   mounted() {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
     handleResize() {
      this.isMobile = window.innerWidth < 768;
    },
    toggleSection(section) {
    this.visibleSections[section] = !this.visibleSections[section];
    },
    async getSeason() {
      try {
        const response = await CatalogService.getSeasonsWithTypes();
        this.seasons = response.data.seasons;
      } catch (error) {
        console.error('Ошибка при загрузке сезонов:', error);
      }
    },
    async getType() {
      try {
        
        const response = await AdminService.getType();
        console.log("Все типы", );
        this.types = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке сезонов:', error);
      }
    },
    async getMaterials() {
      try {
        const res = await AdminService.getMaterial();
        this.materials = res.data;
      } catch (error) {
        console.error('Ошибка при загрузке материалов:', error);
      }
    },
    async getInsulations() {
      try {
        const res = await AdminService.getInsulation();
        this.insulations = res.data;
      } catch (error) {
        console.error('Ошибка при загрузке утеплителей:', error);
      }
    },
    async getManufacturers() {
      try {
        const res = await AdminService.getManufacture();
        this.manufacturers = res.data;
      } catch (error) {
        console.error('Ошибка при загрузке производителей:', error);
      }
    },
    async getColors() {
      try {
        const res = await AdminService.getColore();
        this.colors = res.data;
      } catch (error) {
        console.error('Ошибка при загрузке цветов:', error);
      }
    },
    async getClaps() {
      try {
        const res = await AdminService.getClaps();
        this.claps = res.data;
      } catch (error) {
        console.error('Ошибка при загрузке застёжек:', error);
      }
    },

    toggleItem(array, id) {
      const index = array.indexOf(id);
      if (index === -1) {
        array.push(id);
      } else {
        array.splice(index, 1);
      }
    },

    toggleSeason(seasonId) {
      this.toggleItem(this.selectedSeasons, seasonId);
      this.$emit('season-selected', { seasonIds: this.selectedSeasons });
    },
    toggleType(typeId) {
      this.toggleItem(this.selectedTypes, typeId);
      this.$emit('type-selected', { typeIds: this.selectedTypes });
    },
    toggleMaterial(materialId) {
      this.toggleItem(this.selectedMaterials, materialId);
      this.$emit('material-selected', { materialIds: this.selectedMaterials });
    },
    toggleInsulation(insulationId) {
      this.toggleItem(this.selectedInsulations, insulationId);
      this.$emit('insulation-selected', { insulationIds: this.selectedInsulations });
    },
    toggleManufacturer(manufacturerId) {
      this.toggleItem(this.selectedManufacturers, manufacturerId);
      this.$emit('manufacturer-selected', { manufacturerIds: this.selectedManufacturers });
    },
    toggleColor(colorId) {
      this.toggleItem(this.selectedColors, colorId);
      this.$emit('color-selected', { colorIds: this.selectedColors });
    },
    toggleClap(clapsId) {
      this.toggleItem(this.selectedClaps, clapsId);
      this.$emit('claps-selected', { clapsIds: this.selectedClaps });
    },

    showAllProducts() {
      // Сброс всех фильтров
      this.selectedSeasons = [];
      this.selectedTypes = [];
      this.selectedMaterials = [];
      this.selectedInsulations = [];
      this.selectedManufacturers = [];
      this.selectedColors = [];
      this.selectedClaps = [];

      this.$emit('reset-filters');
      this.$router.push({ name: 'catalog' });
    }
  },

  created() {
    this.getSeason();
    this.getType();
    this.getMaterials();
    this.getInsulations();
    this.getManufacturers();
    this.getColors();
    this.getClaps();
  },
};
</script>



<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;           /* Растянуть сайдбар на всю высоту экрана */
  overflow-y: auto;        /* Вертикальная прокрутка, если контента больше */
  width: 240px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Уменьшим отступы у списков, чтобы поместилось больше фильтров */
.filter-list {
  list-style: none;
  padding: 0;
  margin-bottom: 16px; /* чуть меньше, чем было */
}

.filter-list li {
  padding: 6px 10px;  /* чуть меньше, чтобы влезало больше пунктов */
  margin-bottom: 3px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

/* Можно прижать заголовки поближе к спискам */
.sidebar h2,
.sidebar h3 {
  margin: 8px 0;
  color: #333;
}

.filter-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.filter-list li {
  padding: 8px 12px;
  margin-bottom: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.filter-list li:hover {
  background-color: #e6f2ed;
}

.filter-list li.selected {
  background-color: #a5c7ac;
  color: #fff;
  font-weight: bold;
}

.show-all-button {
  background: none;
  border: none;
  color: #006400;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 12px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.show-all-button:hover {
  background-color: #e0f0e9;
  color: #004d30;
}

.season-item a,
.type-dropdown a {
  text-decoration: none;
  color: inherit;
}

.season-item.selected {
  background-color: #c8e6c9;
}

.type-dropdown {
  list-style: none;
  padding: 8px 12px;
  background-color: #f0f0f0;
  margin-top: 4px;
  margin-bottom: 8px;
  border-left: 2px solid #a5c7ac;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
}

.type-dropdown li {
  padding: 6px;
  border-radius: 4px;
}

.type-dropdown li:hover {
  background-color: #d7f0e2;
}

.type-dropdown li.selected {
  background-color: #a5c7ac;
  color: #fff;
  font-weight: bold;
}

.type-dropdown::-webkit-scrollbar {
  width: 6px;
}

.type-dropdown::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 3px;
}

.type-dropdown::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
.scrollable-list {
  max-height: 160px; /* около 5 пунктов по 30px + отступы */
  overflow-y: auto;
  padding-right: 4px; /* для скролла */
}
.scrollable-list::-webkit-scrollbar {
  width: 6px;
}
.scrollable-list::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 3px;
}

.sidebar.mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.filter-group {
  margin-bottom: 20px;
}
</style>
