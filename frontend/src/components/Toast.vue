<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Popup -->
      <div
        :class="[
          'relative z-10 px-6 py-4 rounded-xl shadow-xl text-white min-w-[280px] text-center',
          type === 'success' && 'bg-green-600',
          type === 'error' && 'bg-red-600',
          type === 'info' && 'bg-blue-600'
        ]"
      >
        <div class="text-lg font-semibold mb-1">
          {{ title }}
        </div>
        <div class="text-sm opacity-90">
          {{ message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const message = ref("");
const title = ref("");
const type = ref<"success" | "error" | "info">("info");

const show = (
  msg: string,
  toastType: "success" | "error" | "info" = "info",
  toastTitle = "Informasi",
  duration = 2500
) => {
  message.value = msg;
  type.value = toastType;

  title.value =
    toastType === "success"
      ? "Success"
      : toastType === "error"
      ? "Gagal"
      : toastTitle;

  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, duration);
};

defineExpose({ show });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
