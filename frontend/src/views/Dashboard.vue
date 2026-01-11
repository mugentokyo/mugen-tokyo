<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar @change="activeTab = $event" />

    <main class="flex-1 p-6">
      <component
        :is="
          activeTab === 'prepare'
            ? Prepare
            : activeTab === 'po'
            ? PurchaseOrder
            : History
        "
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Prepare from "./Prepare.vue";
import PurchaseOrder from "./PurchaseOrder.vue";
import History from "./History.vue";

const activeTab = ref<"prepare" | "po" | "history">("prepare");
</script>
