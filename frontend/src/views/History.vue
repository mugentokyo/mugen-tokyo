<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">📜 History</h2>

    <!-- Tabs -->
    <div class="flex gap-3 mb-4">
      <button
        @click="tab = 'purchase'"
        :class="tab === 'purchase' ? activeTab : tabClass"
      >
        🛒 Pembelian
      </button>

      <button
        @click="tab = 'po'"
        :class="tab === 'po' ? activeTab : tabClass"
      >
        📄 Purchase Order
      </button>
    </div>

    <!-- PURCHASE HISTORY -->
    <div v-if="tab === 'purchase'" class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3">Tanggal</th>
            <th class="p-3">Item</th>
            <th class="p-3 text-center">Total</th>
            <th class="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in purchases"
            :key="p._id"
            class="border-t"
          >
            <td class="p-3">
              {{ formatDate(p.createdAt) }}
            </td>

            <td class="p-3">
              <div
                v-for="(i, idx) in p.items"
                :key="idx"
                class="flex justify-between"
              >
                <span>{{ i.name }}</span>
                <span class="text-gray-500">x{{ i.qty }}</span>
              </div>
            </td>

            <td class="p-3 text-center font-semibold">
              ${{ p.totalPrice.toLocaleString() }}
            </td>

            <td class="p-3 text-center">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="statusClass(p.status)"
              >
                {{ p.status }}
              </span>
            </td>
          </tr>

          <tr v-if="!purchases.length">
            <td colspan="4" class="p-6 text-center text-gray-400">
              Belum ada transaksi
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PO HISTORY -->
    <div v-if="tab === 'po'" class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3">Tanggal</th>
            <th class="p-3">No PO</th>
            <th class="p-3 text-center">Total Item</th>
            <th class="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in pos"
            :key="p._id"
            class="border-t"
          >
            <td class="p-3">
              {{ formatDate(p.createdAt) }}
            </td>

            <td class="p-3 font-mono">
              {{ p.poNumber }}
            </td>

            <td class="p-3 text-center font-semibold">
              {{ p.totalItems }}
            </td>

            <td class="p-3 text-center">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="statusClassPO(p.status)"
              >
                {{ p.status }}
              </span>
            </td>
          </tr>

          <tr v-if="!pos.length">
            <td colspan="4" class="p-6 text-center text-gray-400">
              Belum ada PO
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";

const tab = ref<"purchase" | "po">("purchase");
const purchases = ref<any[]>([]);
const pos = ref<any[]>([]);

const fetchData = async () => {
  try {
    purchases.value = (await api.get("/purchases/me")).data;
    pos.value = (await api.get("/po/me")).data;
  } catch (err) {
    console.error("HISTORY ERROR", err);
  }
};

onMounted(fetchData);

const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-GB");

const statusClass = (s: string) => {
  const map: any = {
    "Belum Bayar": "bg-yellow-100 text-yellow-700",
    "Selesai": "bg-green-100 text-green-700",
    "Rejected": "bg-red-100 text-red-700",
  };
  return map[s] || "bg-gray-100 text-gray-600";
};

const statusClassPO = (s: string) => {
  const map: any = {
    "pending": "bg-yellow-100 text-yellow-700",
    "approved": "bg-green-100 text-green-700",
    "rejected": "bg-red-100 text-red-700",
  };
  return map[s] || "bg-gray-100 text-gray-600";
};

const activeTab =
  "bg-blue-600 text-white px-4 py-2 rounded-lg";

const tabClass =
  "bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200";
</script>
