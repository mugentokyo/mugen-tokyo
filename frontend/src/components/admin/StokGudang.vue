<template>
    <div>
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold mb-4">📦 Stok Gudang</h2>
        <div class="flex gap-2">
          <button
              @click="showModalItem = true"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg
                  hover:bg-blue-700 transition"
          >
              ➕ Tambah Item
          </button>
          <button
              @click="showModal = true"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg
                  hover:bg-blue-700 transition"
          >
              ➕ Tambah Stok
          </button>
        </div>
    </div>

    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="border-b">
          <th class="p-3 text-left">Nama Item</th>
          <th class="p-3">Kategori</th>
          <th class="p-3">Stok</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item._id" class="border-b">
          <td class="p-3">{{ item.name }}</td>
          <td class="p-3 text-center">{{ item.category }}</td>
          <td class="p-3 text-center">{{ item.stock }}</td>
        </tr>
      </tbody>
    </table>
    <!-- MODAL -->
     <AddItemModal
      v-if="showModalItem"
      @close="showModalItem = false"
      @success="handleSuccessItem"
    />
    <AddStockModal
      v-if="showModal"
      @close="showModal = false"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";
import AddItemModal from "@/components/admin/AddItemModal.vue";
import AddStockModal from "@/components/admin/AddStockModal.vue";

const items = ref<any[]>([]);
const showModal = ref(false);
const showModalItem = ref(false);

const fetchItems = async () => {
  const res = await api.get("/items");
  items.value = res.data;
};

const handleSuccess = async () => {
  showModal.value = false;
  await fetchItems();
  alert("✅ Stok berhasil disimpan");
};

const handleSuccessItem = async () => {
  showModalItem.value = false;
  await fetchItems();
  alert("✅ Item berhasil disimpan");
};

onMounted(fetchItems);
</script>
