<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
      <!-- HEADER -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">➕ Tambah Stok</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          ✖
        </button>
      </div>

      <!-- FORM -->
      <form @submit.prevent="submit">
        <!-- KATEGORI -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            Kategori
          </label>
          <select
            v-model="selectedCategory"
            class="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="" disabled>-- Pilih Kategori --</option>
            <option
              v-for="cat in categories"
              :key="cat"
              :value="cat"
            >
              {{ cat }}
            </option>
          </select>
        </div>

        <!-- ITEM -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            Item
          </label>
          <select
            v-model="selectedItemId"
            class="w-full border rounded-lg px-3 py-2"
            :disabled="!selectedCategory"
            required
          >
            <option value="" disabled>
              -- Pilih Item --
            </option>
            <option
              v-for="item in filteredItems"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }} (stok: {{ item.stock }})
            </option>
          </select>
        </div>

        <!-- QTY -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            Tambah Stok
          </label>
          <input
            v-model.number="qty"
            type="number"
            min="1"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan jumlah"
            required
          />
        </div>

        <!-- ACTION -->
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded-lg border"
          >
            Batal
          </button>
          <button
            @click="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

type Item = {
  _id: string;
  name: string;
  category: string;
  stock: number;
};

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

const items = ref<Item[]>([]);
const categories = ref<string[]>([]);
const selectedCategory = ref("");
const selectedItemId = ref("");
const qty = ref<number>(1);

// ambil item
const fetchItems = async () => {
  const res = await api.get<Item[]>("/items");
  items.value = res.data;
  categories.value = [...new Set(res.data.map(i => i.category))];
};

onMounted(fetchItems);

// filter item
const filteredItems = computed(() =>
  items.value.filter(i => i.category === selectedCategory.value)
);

// submit tambah stok
const submit = async () => {
  if (!selectedItemId.value || qty.value <= 0) {
    alert("Lengkapi data");
    return;
  }

  try {
    await api.put(`/items/${selectedItemId.value}/add-stock`, {
      qty: qty.value,
    });

    emit("success");
    emit("close");
  } catch (err) {
    alert("❌ Gagal menyimpan stok");
    console.error(err);
  }
};
</script>
