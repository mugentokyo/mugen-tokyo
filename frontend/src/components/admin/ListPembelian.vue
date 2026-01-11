<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">📄 List Pembelian</h2>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="px-4 py-3">Tanggal</th>
            <th class="px-4 py-3">User</th>
            <th class="px-4 py-3">Item</th>
            <th class="px-4 py-3 text-center">Total Item</th>
            <th class="px-4 py-3 text-center">Total Price</th>
            <th class="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in purchases"
            :key="p._id"
            class="border-t"
          >
            <td class="px-4 py-3">
              {{ formatDate(p.createdAt) }}
            </td>

            <td class="px-4 py-3 font-medium">
              {{ p.user.username }}
            </td>

            <!-- LIST ITEM -->
            <td class="px-4 py-3">
              <ul class="space-y-1">
                <li
                  v-for="(item, i) in p.items"
                  :key="i"
                  class="flex justify-between gap-2"
                >
                  <span>{{ item.name }}</span>
                  <span class="text-gray-500">x{{ item.qty }}</span>
                </li>
              </ul>
            </td>

            <td class="px-4 py-3 text-center font-semibold">
              {{ p.totalItems }}
            </td>
            <td class="px-4 py-3 text-center font-semibold">
              ${{ p.totalPrice }}
            </td>

            <!-- STATUS -->
            <td class="p-3 text-center">
              <select
                v-model="p.status"
                @change="updateStatus(p)"
                class="border rounded px-2 py-1 text-sm"
                :class="statusClass(p.status)"
              >
                <option value="Belum Bayar">Belum Bayar</option>
                <option value="Selesai">Selesai</option>
                <option value="Rejected">Rejected</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import api from "@/services/api";
const toast = inject<any>("toast");

const purchases = ref<any[]>([]);

onMounted(async () => {
  const res = await api.get("/purchases");
  purchases.value = res.data;
});

const statusClass = (status: string) => {
  const map: Record<string, string> = {
    "Belum Bayar": "bg-yellow-50 border-yellow-400",
    "Selesai": "bg-green-50 border-green-500",
    "Rejected": "bg-red-50 border-red-500",
  };

  return map[status] || "bg-gray-50 border-gray-300";
};


const updateStatus = async (po: any) => {
  try {
    await api.patch(`/purchases/${po._id}/status`, {
      status: po.status,
    });
    toast.success("Update Status Pembelian Berhasil");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Update Status Pembelian Gagal");
  }
};
const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-GB");
</script>