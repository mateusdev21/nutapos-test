<script setup lang="ts">
import AddDiscountButton from "./AddDiscountButton.vue";
const emit = defineEmits<{
  addDiscount: [];
}>();
</script>

<template>
  <v-card
    class="d-flex align-center justify-center"
    rounded="xl"
    variant="outlined"
    min-height="500"
  >
    <div class="text-center">
      <v-img src="empty.png" width="260" class="mx-auto" />

      <div class="text-h5 font-weight-bold mt-4">Belum Ada Diskon</div>

      <p
        class="text-body-1 text-medium-emphasis mt-2 mb-6"
        style="max-width: 420px"
      >
        Silahkan tambah diskon untuk menarik pelanggan dan meningkatkan
        penjualan.
      </p>

      <AddDiscountButton @click="emit('addDiscount')" />
    </div>
  </v-card>
</template>

<style scoped>
.v-card--variant-outlined {
  border-color: #e0e0e0 !important;
}
</style>
