<script setup lang="ts">
import { computed } from "vue";
import type { Discount } from "../types/discount";

const props = defineProps<{
  items: Discount[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const selected = computed<string[]>({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const headers = [
  {
    title: "",
    key: "select",
    sortable: false,
    width: 50,
  },
  {
    title: "Nama Diskon",
    key: "name",
  },
  {
    title: "Nilai Diskon",
    key: "value",
  },
  {
    title: "",
    key: "action",
    sortable: false,
    width: 50,
  },
];

const isNewDiscount = (_item: Discount, index: number) => {
  return index === props.items.length - 1;
};
</script>

<template>
  <template v-if="items.length > 0">
    <v-data-table
      :headers="headers"
      :items="items"
      v-model="selected"
      item-value="_id"
      show-select
      class="table-bordered"
    >
      <template #item.name="{ item, index }">
        <div class="d-flex align-center ga-2">
          <span>{{ item.name }}</span>

          <v-chip
            v-if="isNewDiscount(item, index)"
            size="x-small"
            color="primary"
            variant="outlined"
          >
            baru
          </v-chip>
        </div>
      </template>

      <template #item.value="{ item }">
        {{
          item.type === "percentage"
            ? `${item.value}%`
            : `Rp ${item.value.toLocaleString()}`
        }}
      </template>

      <template #item.action="{ item }">
        <v-btn icon variant="text" size="small">
          <v-icon color="grey">mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </template>

  <div v-else class="pa-8 text-center">
    <v-icon size="48" color="grey" class="mb-2"> mdi-magnify </v-icon>

    <div class="text-h6">Tidak ada hasil pencarian</div>

    <div class="text-body-2 text-medium-emphasis">
      Coba gunakan kata kunci lain
    </div>
  </div>
</template>

<style scoped>
.table-bordered :deep(table) {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
