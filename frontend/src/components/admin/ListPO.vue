<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">📄 List PO</h2>

    <table class="w-full bg-white rounded shadow text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left">Tanggal</th>
          <th class="p-3 text-left">User</th>
          <th class="p-3 text-left">Item</th>
          <th class="p-3 text-center">Total Item</th>
          <th class="p-3 text-center">Total Price</th>
          <th class="p-3 text-center">Status</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="po in pos"
          :key="po._id"
          class="border-t align-top"
        >
          <!-- TANGGAL -->
          <td class="p-3 whitespace-nowrap">
            {{ formatDate(po.createdAt) }}
          </td>

          <!-- USER -->
          <td class="p-3 font-medium">
            {{ po.user.username }}
          </td>

          <!-- ITEM LIST -->
          <td class="p-3">
            <div
              v-for="(item, idx) in po.items"
              :key="idx"
              class="flex justify-between gap-4"
            >
              <span>{{ item.name }}</span>
              <span class="text-gray-500">x{{ item.qty }}</span>
            </div>
          </td>

          <!-- TOTAL ITEM -->
          <td class="p-3 text-center font-semibold">
            {{ po.totalItems }}
          </td>
          <td class="p-3 text-center font-semibold">
              ${{ po.totalPrice }}
          </td>

          <!-- STATUS -->
          <td class="p-3 text-center">
            <select
              v-model="po.status"
              @change="updateStatus(po)"
              class="border rounded px-2 py-1 text-sm"
              :class="statusClass(po.status)"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import api from "@/services/api";

const toast = inject<any>("toast");
const pos = ref<any[]>([]);

onMounted(async () => {
  const res = await api.get("/po");
  pos.value = res.data;
});


const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const statusClass = (status: string) => {
  return {
    pending: "bg-yellow-50 border-yellow-400",
    approved: "bg-green-50 border-green-500",
    rejected: "bg-red-50 border-red-500",
  }[status];
};


const updateStatus = async (po: any) => {
  try {
    await api.patch(`/po/${po._id}/status`, {
      status: po.status,
    });
    toast.success("Update Status PO Berhasil");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Update Status PO Gagal");
  }
};
</script>
