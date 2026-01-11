<template>
  <aside
    class="w-64 min-h-screen bg-black text-white
           flex flex-col justify-between
           border-r border-yellow-500/30"
  >
    <!-- TOP -->
    <div>
      <!-- HEADER -->
      <div class="px-6 py-5 border-b border-yellow-500/20">
        <div class="flex items-center gap-3 mb-6">
          <img
            src="/public/mugen-1.png"
            alt="Mugen Logo"
            class="w-7 h-7 object-contain"
          />

          <div class="flex flex-col leading-tight">
            <h1 class="text-lg font-bold">Mugen System</h1>
            <p class="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
        <!-- LOGOUT (BOTTOM LEFT) -->
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
      </div>

      <!-- MENU -->
      <nav class="mt-4 px-3 space-y-1">
        <AdminSidebarItem
          icon="📦"
          label="Stok Gudang"
          @click="$emit('change', 'stok')"
        />
        <AdminSidebarItem
          icon="👤"
          label="Daftar User"
          @click="$emit('change', 'user')"
        />
        <AdminSidebarItem
          icon="🧾"
          label="List Pembelian"
          @click="$emit('change', 'pembelian')"
        />
        <AdminSidebarItem
          icon="📄"
          label="List PO"
          @click="$emit('change', 'po')"
        />
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminSidebarItem from "./AdminSidebarItem.vue";

const router = useRouter();
const auth = useAuthStore();
const emit = defineEmits<{
  (e: "change", value: "stok" | "user" | "pembelian" | "po"): void;
}>();
const logout = () => {
  auth.logout();
  router.push("/");
};
</script>
