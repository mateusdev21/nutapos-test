<script setup lang="ts">
import { ref, computed } from "vue";

import { discountService } from "../../../services/discount.service";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../composables/useSnackbar";

interface Props {
  modelValue: boolean;
  existingNames: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [boolean];
  created: [];
}>();

const loading = ref(false);

const form = ref({
  name: "",
  type: "percentage" as "percentage" | "nominal",
  value: null as number | null,
});

const isPercentage = computed(() => form.value.type === "percentage");

const errors = ref({
  name: "",
  value: "",
});

const closeDialog = () => {
  resetForm();
  emit("update:modelValue", false);
};

const resetForm = () => {
  form.value = {
    name: "",
    type: "percentage",
    value: null,
  };
  errors.value = {
    name: "",
    value: "",
  };
};

const validate = () => {
  let isValid = true;

  errors.value.name = "";
  errors.value.value = "";

  const name = form.value.name.trim().toLowerCase();

  if (!name) {
    errors.value.name = "Nama diskon tidak boleh kosong";
    isValid = false;
  }

  const isDuplicate = props.existingNames
    .map((n) => n.toLowerCase())
    .includes(name);

  if (isDuplicate) {
    errors.value.name =
      "Nama diskon sudah digunakan, silahkan gunakan nama lain";
    isValid = false;
  }

  if (form.value.value === null || form.value.value === undefined) {
    errors.value.value = "Diskon tidak boleh kosong";
    isValid = false;
  }

  if (form.value.value !== null && Number(form.value.value) <= 0) {
    errors.value.value = "Nilai harus lebih dari 0";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    loading.value = true;

    await discountService.create({
      name: form.value.name,
      type: form.value.type,
      value: Number(form.value.value),
    });

    showSuccessSnackbar(`${form.value.name} berhasil ditambahkan`);
    closeDialog();
    emit("created");
  } catch (error) {
    console.error(error);
    showErrorSnackbar(`Gagal menambahkan diskon ${form.value.name}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="500"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card rounded="xl" class="px-2 py-2">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h4"> Tambah Diskon </span>

        <v-btn icon variant="text" @click="closeDialog">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="form.name"
          label="Nama Diskon"
          variant="outlined"
          density="compact"
          class="mb-4"
          :error="!!errors.name"
          :error-messages="errors.name"
        />

        <div class="d-flex mb-0">
          <v-text-field
            v-model="form.value"
            label="Diskon"
            type="number"
            variant="outlined"
            density="compact"
            class="mb-4 mr-2"
            :error="!!errors.value"
            :error-messages="errors.value"
          >
            <template v-if="!isPercentage" #prepend-inner>
              <span class="text-medium-emphasis mr-4">Rp</span>
            </template>

            <template v-if="isPercentage" #append-inner>
              <span class="text-medium-emphasis">%</span>
            </template>
          </v-text-field>

          <v-btn-toggle
            v-model="form.type"
            mandatory
            density="compact"
            class="discount-toggle"
          >
            <v-btn value="percentage" variant="flat"> % </v-btn>

            <v-btn value="nominal" variant="flat"> Rp </v-btn>
          </v-btn-toggle>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn
          block
          variant="elevated"
          color="success"
          rounded="pill"
          :loading="loading"
          @click="handleSubmit"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.discount-toggle :deep(.v-btn) {
  text-transform: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.discount-toggle :deep(.v-btn.v-btn--active) {
  background-color: #e8f5e9 !important;
  color: #2e7d32 !important;
  font-weight: 600;
}

.discount-toggle :deep(.v-btn--selected) {
  background-color: #e8f5e9 !important;
  color: #2e7d32 !important;
}
</style>
