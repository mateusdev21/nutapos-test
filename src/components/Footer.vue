<template>
  <v-footer app class="border-t py-0">
    <v-container fluid class="d-flex align-center">
      <span class="text-label-medium text-medium-emphasis">
         {{ currentYear }} © 
         <span class="text-black">PT Nusantara Berkah Digital</span>
      </span>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
