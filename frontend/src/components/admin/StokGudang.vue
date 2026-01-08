<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold">📦 Stok Gudang</h2>

      <div class="flex items-center gap-3">
        <!-- FILTER KATEGORI -->
        <select
          v-model="selectedCategory"
          class="border rounded-lg px-3 py-2"
        >
          <option value="">Semua Kategori</option>
          <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>

        <!-- TAMBAH ITEM -->
        <button
          @click="showModalItem = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg
                hover:bg-blue-700 transition"
        >
          ➕ Tambah Item
        </button>
      </div>
    </div>

    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="border-b">
          <th class="p-3 text-left">Nama Item</th>
          <th class="p-3 text-center">Kategori</th>
          <th class="p-3 text-center">Stok</th>
          <th class="p-3 text-center">Edit Stok</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredItems" :key="item._id" class="border-b">
          <td class="p-3">{{ item.name }}</td>
          <td class="p-3 text-center">{{ item.category }}</td>
          <td class="p-3 text-center">{{ item.stock }}</td>
          <td class="p-3">
            <div class="flex justify-center items-center">
              <button
                @click="openEditStock(item)"
                title="Edit Stok"
                class="
                  w-9 h-9
                  flex items-center justify-center
                  border border-blue-600
                  rounded-lg
                  text-blue-600
                  hover:bg-blue-600 hover:text-white
                  transition
                "
              >
                🔧
              </button>
            </div>
          </td>
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
      v-if="showEditModal"
      mode="edit"
      :item="selectedItem"
      @close="showEditModal = false"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";
import AddItemModal from "@/components/admin/AddItemModal.vue";
import AddStockModal from "@/components/admin/AddStockModal.vue";

type Item = {
  _id: string;
  name: string;
  category: string;
  stock: number;
};

const items = ref<any[]>([]);
const showModalItem = ref(false);
const showEditModal = ref(false);
const selectedItem = ref<any>(null);
const selectedCategory = ref("");
const categories = ref<string[]>([]);

const fetchItems = async () => {
  const res = await api.get<Item[]>("/items");
  items.value = res.data;

  categories.value = [
    ...new Set(res.data.map(item => item.category))
  ];
};

const filteredItems = computed(() => {
  if (!selectedCategory.value) return items.value;
  return items.value.filter(
    item => item.category === selectedCategory.value
  );
});

const openEditStock = (item: any) => {
  selectedItem.value = item;
  showEditModal.value = true;
};

const handleSuccess = async () => {
  showEditModal.value = false;
  await fetchItems();
  alert("✅ Stok berhasil diperbarui");
};

const handleSuccessItem = async () => {
  showModalItem.value = false;
  await fetchItems();
  alert("✅ Item berhasil disimpan");
};

onMounted(fetchItems);
</script>
