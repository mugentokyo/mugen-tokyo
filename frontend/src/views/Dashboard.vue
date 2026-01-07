<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar @change="activeTab = $event" />

    <main class="flex-1 p-6">
      <component :is="activeTab === 'prepare' ? Prepare : PurchaseOrder" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Prepare from "./Prepare.vue";
import PurchaseOrder from "./PurchaseOrder.vue";

const activeTab = ref<"prepare" | "po">("prepare");
</script>
