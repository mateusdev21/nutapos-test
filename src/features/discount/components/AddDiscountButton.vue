<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<template>
  <v-btn
    color="#3DAE2F"
    rounded="pill"
    size="normal"
    class="px-4 py-1" 
    prepend-icon="mdi-plus"
    @click="$emit('click')"
  >
    Tambah Diskon
  </v-btn>
</template>
