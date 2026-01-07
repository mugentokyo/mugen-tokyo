<template>
  <div class="flex">
    <AdminSidebar @change="onChangeTab" />

    <main class="flex-1 p-6 bg-gray-100 min-h-screen">
      <StokGudang v-if="activeTab === 'stok'" />
      <UserList v-if="activeTab === 'user'" />
      <ListPembelian v-else-if="activeTab === 'pembelian'" />
      <ListPO v-else-if="activeTab === 'po'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import StokGudang from "@/components/admin/StokGudang.vue";
import UserList from "@/components/admin/UserList.vue";
import ListPembelian from "@/components/admin/ListPembelian.vue";
import ListPO from "@/components/admin/ListPO.vue";

const activeTab = ref<"stok" | "user" | "pembelian" | "po">("stok");

const onChangeTab = (tab: any) => {
  console.log("Active Tab:", tab);
  activeTab.value = tab;
};
</script>
