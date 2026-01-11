<template>
  <router-view />
  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import Toast from "@/components/Toast.vue";

const toast = ref<any>(null);

provide("toast", {
  success: (msg: string) => toast.value.show(msg, "success"),
  error: (msg: string) => toast.value.show(msg, "error"),
  info: (msg: string) => toast.value.show(msg, "info"),
});
</script>
