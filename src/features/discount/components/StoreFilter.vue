<script setup lang="ts">
import { ref } from "vue";
import { apiConfig } from "../../../config/api.config";

const menu = ref(false);
const endpoint = ref(apiConfig.baseURL.value);

const apply = () => {
  apiConfig.baseURL.value = endpoint.value;

  localStorage.setItem("API_BASE_URL", endpoint.value);

  menu.value = false;

  window.location.reload();
};
</script>

<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template #activator="{ props }">
      <div v-bind="props" class="select-like">
        <v-img src="store.png" max-width="16" height="16" class="mr-4" />

        <span class="text-body-2"> Kopi Anak Bangsa </span>

        <v-icon size="18" class="ml-auto"> mdi-chevron-down </v-icon>
      </div>
    </template>

    <v-card class="pa-3" min-width="320">
      <v-text-field
        v-model="endpoint"
        label="API URL crudcrud.com"
        placeholder="https://crudcrud.com/api/xxx/discount"
        variant="outlined"
        density="compact"
        hide-details
      >
      </v-text-field>

      <div class="d-flex justify-end mt-3 ga-2">
        <v-btn color="success" @click="apply">Terapkan</v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<style scoped>
.select-like {
  display: flex;
  align-items: center;

  padding: 8px 12px;
  min-width: 280px;

  border: 1px solid #d0d0d0;
  border-radius: 12px;

  cursor: pointer;
  background: white;
  transition: 0.2s;
}

.select-like:hover {
  background: #f5f5f5;
}
</style>
