<template>
  <aside class="w-64 bg-slate-900 text-white min-h-screen p-4">
    <h1 class="text-xl font-bold mb-6">Mugen System</h1>
        <div class="px-3 pb-4">
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
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
defineEmits<{
  (e: "change", value: "prepare" | "po"): void;
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
