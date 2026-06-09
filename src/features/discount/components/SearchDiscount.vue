<script setup lang="ts">
interface Props {
  modelValue: string;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [string];
}>();
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    prepend-inner-icon="mdi-magnify"
    density="compact"
    label="Cari diskon"
    variant="outlined"
    rounded="xl"
    hide-details
    single-line
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
