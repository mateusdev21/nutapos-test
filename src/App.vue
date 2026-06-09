<script setup lang="ts">
import Footer from "./components/Footer.vue";
import {
  snackbar,
  snackbarText,
  snackbarColor,
} from "./composables/useSnackbar";
</script>

<template>
  <v-app>
    <router-view />
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="top center"
      timeout="3000"
    >
      {{ snackbarText }}
    </v-snackbar>
    <Footer />
  </v-app>
</template>
