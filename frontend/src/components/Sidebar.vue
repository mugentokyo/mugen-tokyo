<template>
  <aside class="w-64 bg-slate-900 text-white min-h-screen p-4">
    <!-- HEADER + LOGO -->
    <div class="flex items-center gap-3 mb-6">
      <img
        src="/public/mugen-1.png"
        alt="Mugen Logo"
        class="w-7 h-7 object-contain"
      />
      <h1 class="text-xl font-bold">
        Mugen System
      </h1>
    </div>

    <!-- LOGOUT -->
    <div class="px-3 pb-4 mt-auto">
      <button
        @click="logout"
        class="w-full flex items-center gap-3
              px-4 py-2 rounded-lg
              text-red-400 hover:bg-red-500/10
              transition"
      >
        🚪 Logout
      </button>
    </div>

    <!-- MENU -->
    <nav class="space-y-2">
      <button
        class="menu"
        @click="$emit('change', 'prepare')"
      >
        📦 Prepare Item
      </button>

      <button
        class="menu"
        @click="$emit('change', 'po')"
      >
        📄 Purchase Order
      </button>

      <button class="menu" @click="$emit('change', 'history')">
        📜 History
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
defineEmits<{
  (e: "change", value: "prepare" | "po" | "history"): void;
}>();
const logout = () => {
  auth.logout();
  router.push("/");
};
</script>

<style scoped>
.menu {
  @apply w-full text-left px-4 py-2 rounded
    hover:bg-slate-800 transition;
}
</style>
