<template>
  <div class="array-item">
    <label :for="'id_size_' + uid">Размер:</label>
    <select :id="'id_size_' + uid" v-model="localValue" @change="emitUpdate" required>
      <option disabled value="">Выберите размер</option>
      <option v-for="option in sizes" :key="option.id" :value="option.name">
        {{ option.name }}
      </option>
    </select>

    <label :for="'id_quantity_' + uid">Количество:</label>
    <input
      type="number"
      :id="'id_quantity_' + uid"
      v-model="localQuantity"
      @input="emitUpdate"
      placeholder="Количество"
      min="0"
      required
    />

    <button type="button" @click="$emit('remove')">Удалить</button>
  </div>
</template>

<script>
export default {
  name: 'SizeItem',
  props: {
    size: { type: Object, required: true },
    sizes: { type: Array, required: true }
  },
  data() {
    return {
      localValue: this.size.value,
      localQuantity: this.size.quantity,
      uid: this.size.uid || (Date.now() + '_' + Math.random())
    };
  },
  methods: {
    emitUpdate() {
      this.$emit('update', { value: this.localValue, quantity: this.localQuantity, uid: this.uid });
    }
  }
};
</script>
