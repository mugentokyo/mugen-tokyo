<template>
  <button
    class="w-full flex items-center gap-3
           px-4 py-2 rounded-lg
           text-sm text-gray-200
           hover:bg-yellow-500/10
           hover:text-yellow-400
           transition"
  >
    <span class="text-lg">{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
}>();
</script>
