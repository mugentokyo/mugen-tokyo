<template>
  <div>
    <!-- HEADER -->
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

    <!-- TABLE -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="border-b">
          <th class="p-3 text-left">Nama Item</th>
          <th class="p-3 text-center">Kategori</th>
          <th class="p-3 text-center">Stok</th>
          <th class="p-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredItems" :key="item._id" class="border-b">
          <td class="p-3">{{ item.name }}</td>
          <td class="p-3 text-center">{{ item.category }}</td>
          <td class="p-3 text-center">{{ item.stock }}</td>

          <!-- EDIT -->
          <td class="p-3 text-center">
            <div class="flex justify-center gap-2">
              <!-- EDIT -->
              <button
                @click="openEditStock(item)"
                class="w-9 h-9 border border-blue-600 rounded-lg
                      text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                🔧
              </button>

              <!-- DELETE -->
              <button
                @click="openDeleteModal(item)"
                class="w-9 h-9 border border-red-500 rounded-lg
                      text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                🗑️
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ADD ITEM MODAL -->
    <AddItemModal
      v-if="showModalItem"
      @close="showModalItem = false"
      @success="handleSuccessItem"
    />

    <!-- EDIT STOCK MODAL -->
    <AddStockModal
      v-if="showEditModal"
      mode="edit"
      :item="selectedItem"
      @close="showEditModal = false"
      @success="handleSuccess"
    />

    <!-- DELETE CONFIRM MODAL -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h3 class="text-lg font-semibold mb-3">
          🗑️ Hapus Item
        </h3>

        <p class="text-gray-600 mb-6">
          Apakah kamu yakin ingin menghapus
          <strong>{{ itemToDelete?.name }}</strong>?  
          Tindakan ini tidak bisa dibatalkan.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 rounded-lg border"
          >
            Batal
          </button>

          <button
            @click="confirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from "vue";
import api from "@/services/api";
import AddItemModal from "@/components/admin/AddItemModal.vue";
import AddStockModal from "@/components/admin/AddStockModal.vue";

type Item = {
  _id: string;
  name: string;
  category: string;
  stock: number;
};

const toast = inject<any>("toast");
const items = ref<any[]>([]);
const showModalItem = ref(false);
const showEditModal = ref(false);
const selectedItem = ref<any>(null);
const selectedCategory = ref("");
const categories = ref<string[]>([]);

// DELETE MODAL
const showDeleteModal = ref(false);
const itemToDelete = ref<Item | null>(null);

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

// DELETE
const openDeleteModal = (item: Item) => {
  itemToDelete.value = item;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return;

  try {
    await api.delete(`/items/${itemToDelete.value._id}`);
    await fetchItems();
    toast.success("🗑️ Item berhasil dihapus");
    closeDeleteModal();
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Gagal menghapus item");
  }
};

const openEditStock = (item: any) => {
  selectedItem.value = item;
  showEditModal.value = true;
};

const handleSuccess = async () => {
  showEditModal.value = false;
  await fetchItems();
  toast.success("✅ Stok berhasil diperbarui");
};

const handleSuccessItem = async () => {
  showModalItem.value = false;
  await fetchItems();
  toast.success("✅ Item berhasil disimpan");
};

onMounted(fetchItems);
</script>
