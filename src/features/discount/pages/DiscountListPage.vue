<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import type { Discount } from "../types/discount";

import StoreFilter from "../components/StoreFilter.vue";
import SearchDiscount from "../components/SearchDiscount.vue";
import DiscountEmptyState from "../components/DiscountEmptyState.vue";
import DiscountTable from "../components/DiscountTable.vue";
import AddDiscountDialog from "../components/AddDiscountDialog.vue";
import AddDiscountButton from "../components/AddDiscountButton.vue";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../composables/useSnackbar";

import { discountService } from "../../../services/discount.service";

const loading = ref(false);

const isDialogOpen = ref(false);

const searchKeyword = ref("");

const discounts = ref<Discount[]>([]);

const selectedItems = ref<string[]>([]);
const hasSelection = computed(() => selectedItems.value.length > 0);

const clearSelection = () => {
  selectedItems.value = [];
};

const hasData = computed(() => discounts.value.length > 0);

const confirmDialog = ref(false);
const isDeleting = ref(false);

const openConfirmDelete = () => {
  if (!selectedItems.value.length) return;
  confirmDialog.value = true;
};

const confirmDelete = async () => {
  try {
    isDeleting.value = true;

    await Promise.all(
      selectedItems.value.map((id) => discountService.delete(id))
    );

    await loadDiscounts();

    selectedItems.value = [];
    confirmDialog.value = false;

    showSuccessSnackbar("Diskon berhasil dihapus");
  } catch (err) {
    showErrorSnackbar("Gagal menghapus diskon");
  } finally {
    isDeleting.value = false;
  }
};

const filteredDiscounts = computed(() => {
  return discounts.value.filter((discount) =>
    discount.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

const totalDiscounts = computed(() => filteredDiscounts.value.length);

const loadDiscounts = async () => {
  try {
    loading.value = true;
    discounts.value = await discountService.getAll();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadDiscounts);
</script>

<template>
  <v-container fluid class="pa-0">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h2 class="font-weight-semibold mb-0">Daftar Diskon</h2>

        <p class="text-medium-emphasis text-body-2 my-0" v-if="hasData">
          Total jumlah diskon: {{ totalDiscounts }}
        </p>
      </div>

      <div class="d-flex ga-2" v-if="hasData">
        <AddDiscountButton
          v-if="!hasSelection"
          class="my-4"
          @click="isDialogOpen = true"
        />

        <template v-else>
          <v-btn
            color="red"
            variant="outlined"
            :disabled="isDeleting"
            @click="clearSelection"
            rounded="xl"
          >
            Batalkan
          </v-btn>

          <v-btn
            color="red"
            variant="flat"
            :loading="isDeleting"
            @click="openConfirmDelete"
            rounded="xl"
          >
            Hapus ({{ selectedItems.length }})
          </v-btn>
        </template>
      </div>
    </div>

    <div class="d-flex justify-left mb-6">
      <div class="mr-4" style="width: 20vw" v-if="hasData">
        <SearchDiscount v-model="searchKeyword" />
      </div>

      <div style="width: 20vw">
        <StoreFilter />
      </div>
    </div>

    <v-progress-linear v-if="loading" indeterminate />

    <template v-else>
      <DiscountEmptyState v-if="!hasData" @add-discount="isDialogOpen = true" />

      <DiscountTable
        v-if="hasData"
        :items="filteredDiscounts"
        v-model="selectedItems"
      />
    </template>

    <AddDiscountDialog
      v-model="isDialogOpen"
      :existing-names="discounts.map((d) => d.name)"
      @created="loadDiscounts"
    />

    <v-dialog v-model="confirmDialog" max-width="420">
      <v-card class="px-6">
        <h3 class="font-weight-semibold mb-4">Hapus Diskon</h3>

        <div class="text-body-medium mb-2">
          Apakah anda yakin ingin menghapus diskon yang dipilih?
        </div>

        <div class="text-body-medium text-medium-emphasis mb-6">
          Diskon yang dihapus tidak bisa kembali lagi
        </div>

        <div class="d-flex justify-end ga-2 mb-6">
          <v-btn
            color="red"
            variant="outlined"
            :disabled="isDeleting"
            @click="confirmDialog = false"
            rounded="xl"
          >
            Batalkan
          </v-btn>

          <v-btn
            color="red"
            variant="flat"
            :loading="isDeleting"
            @click="confirmDelete"
            rounded="xl"
          >
            Hapus
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>
