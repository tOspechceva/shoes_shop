<template>
<aside class="sidebar">
    <h2>Фильтры</h2>

    <!-- Сезоны -->
    <h3>Сезоны</h3>
    <ul class="filter-list">
      <li>
        <button @click="showAllProducts" class="show-all-button">Все</button>
      </li>
      <li 
        v-for="season in seasons" 
        :key="season.season_id" 
        @click="selectSeason(season.season_id)"
        :class="{ selected: selectedSeason === season.season_id }"
        style="cursor: pointer"
      >
        <a>{{ season.season_name }}</a>
        <ul v-if="selectedSeason === season.season_id" class="type-dropdown">
          <li 
            v-for="type in season.types" 
            :key="type.type_id" 
            @click.stop="selectType(season.season_id, type.type_id)"
            :class="{ selected: selectedType === type.type_id }"
          >
            <a>{{ type.type_name }}</a>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Материалы -->
    <h3>Материалы</h3>
    <ul class="filter-list">
      <li 
        v-for="material in materials" 
        :key="material.id" 
        @click="selectMaterial(material.id)"
        :class="{ selected: selectedMaterial === material.id }"
        style="cursor: pointer"
      >
        {{ material.name }}
      </li>
    </ul>

    <!-- Утеплители -->
    <h3>Утеплители</h3>
    <ul class="filter-list">
      <li 
        v-for="insulation in insulations" 
        :key="insulation.id" 
        @click="selectInsulation(insulation.id)"
        :class="{ selected: selectedInsulation === insulation.id }"
        style="cursor: pointer"
      >
        {{ insulation.name }}
      </li>
    </ul>

    <!-- Производители -->
    <h3>Производители</h3>
    <ul class="filter-list">
      <li 
        v-for="manufacturer in manufacturers" 
        :key="manufacturer.id" 
        @click="selectManufacturer(manufacturer.id)"
        :class="{ selected: selectedManufacturer === manufacturer.id }"
        style="cursor: pointer"
      >
        {{ manufacturer.name }}
      </li>
    </ul>

    <!-- Цвета -->
    <h3>Цвета</h3>
    <ul class="filter-list">
      <li 
        v-for="color in colors" 
        :key="color.id" 
        @click="selectColor(color.id)"
        :class="{ selected: selectedColor === color.id }"
        style="cursor: pointer"
      >
        {{ color.name }}
      </li>
    </ul>

    <!-- Застёжки -->
    <h3>Застёжки</h3>
    <ul class="filter-list">
      <li 
        v-for="clap in claps" 
        :key="clap.id" 
        @click="selectClap(clap.id)"
        :class="{ selected: selectedClap === clap.id }"
        style="cursor: pointer"
      >
        {{ clap.name }}
      </li>
    </ul>
  </aside>
</template>



<script scoped>
import CatalogService from '@/services/CatalogService.js';
import AdminService from '@/services/AdminService';

export default {
  name: 'Sidebar',
   data() {
    return {
      selectedSeason: null,
      selectedType: null,
      selectedMaterial: null,
      selectedInsulation: null,
      selectedManufacturer: null,
      selectedColor: null,
      selectedClap: null,

      seasons: null,
      materials: [],
      insulations: [],
      manufacturers: [],
      colors: [],
      claps: [],
    };
  },
  methods: {
    async getSeason() {
      try {
        const response = await CatalogService.getSeasonsWithTypes();
        this.seasons = response.data.seasons;
      } catch (error) {
        console.error('Ошибка при загрузке сезонов:', error);
      }
    },
    async getMaterials() {
      try {
        const res = await AdminService.getMaterial();
        this.materials = res.data;
        console.log(res);
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
     selectSeason(seasonId) {
    
        // Выбираем сезон, передаем его id на страницу каталога
        this.selectedSeason = this.selectedSeason === seasonId ? null: seasonId;
        // Отправляем событие с выбранным сезоном
        this.$emit('season-selected', { seasonId });
    },
    selectType(seasonId, typeId) {
       
        this.selectedSeason = this.selectedSeason === seasonId ? null :   seasonId;
        this.selectedType = this.selectedType === typeId ? null : typeId;
        // Передаем id сезона и id типа на страницу каталога
        this.$emit('type-selected', { seasonId, typeId });
    },
    selectMaterial(materialId) {
      this.selectedMaterial = materialId;
      this.$emit('material-selected', { materialId });
    },
    selectInsulation(insulationId) {
      this.selectedInsulation = insulationId;
      this.$emit('insulation-selected', { insulationId });
    },
    selectManufacturer(manufacturerId) {
      this.selectedManufacturer = manufacturerId;
      this.$emit('manufacturer-selected', { manufacturerId });
    },
    selectColor(colorId) {
      this.selectedColor = colorId;
      this.$emit('color-selected', { colorId });
    },
    selectClap(clapsId) {
      this.selectedClap = clapsId; // измените с selectedClaps на selectedClap
      this.$emit('claps-selected', { clapsId });
    },
    showAllProducts() {
      this.$router.push({ name: 'catalog' });
    }
  },
  created() {
    this.getSeason();
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

  max-height: 200px; /* Примерно высота для 5 элементов по 40px */
  overflow-y: auto;  /* Добавление вертикальной прокрутки */
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

.type-dropdown::-webkit-scrollbar {
  width: 6px;
}

.type-dropdown::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.type-dropdown::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
</style>