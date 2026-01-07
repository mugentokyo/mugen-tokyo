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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";

const purchases = ref<any[]>([]);

onMounted(async () => {
  const res = await api.get("/purchases");
  purchases.value = res.data;
});

const formatDate = (date: string) =>
  new Date(date).toLocaleString("id-ID");
</script>