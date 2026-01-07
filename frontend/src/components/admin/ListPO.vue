<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">📄 List PO</h2>

    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th class="p-3">No PO</th>
          <th class="p-3">Tanggal</th>
          <th class="p-3">User</th>
          <th class="p-3">Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="po in pos" :key="po._id">
          <td class="p-3">{{ po.poNumber }}</td>
          <td class="p-3">
            {{ new Date(po.createdAt).toLocaleString() }}
          </td>
          <td class="p-3 text-center">
            {{ po.user.username }}
          </td>
          <td class="p-3 text-center">
            <select
              v-model="po.status"
              @change="updateStatus(po)"
              class="border rounded px-2 py-1"
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
import { ref, onMounted } from "vue";
import api from "@/services/api";

const pos = ref<any[]>([]);

onMounted(async () => {
  const res = await api.get("/po");
  pos.value = res.data;
});

const updateStatus = async (po: any) => {
  await api.patch(`/po/${po._id}/status`, {
    status: po.status,
  });
};
</script>
