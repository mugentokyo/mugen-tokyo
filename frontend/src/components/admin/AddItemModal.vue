<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">➕ Tambah Item</h3>
        <button @click="emit('close')" class="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <!-- Kategori -->
        <div>
          <label class="block text-sm font-medium mb-1">Kategori</label>
          <select v-model="category" class="input">
            <option disabled value="">Pilih Kategori</option>
            <option v-for="c in categories" :key="c" :value="c">
              {{ c }}
            </option>
          </select>
        </div>

        <!-- Nama Item -->
        <div>
          <label class="block text-sm font-medium mb-1">Nama Item</label>
          <input
            v-model="name"
            type="text"
            placeholder="Contoh: AK-47"
            class="input"
          />
        </div>

        <!-- Stok -->
        <div>
          <label class="block text-sm font-medium mb-1">Stok Awal</label>
          <input
            v-model.number="stock"
            type="number"
            min="0"
            class="input"
          />
        </div>
      </div>

      <!-- Action -->
      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="emit('close')"
          class="px-4 py-2 rounded-lg border"
        >
          Batal
        </button>

        <button
          @click="submit"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

const categories = ["senjata", "ammo", "obat", "vest"];

const category = ref("");
const name = ref("");
const stock = ref<number>(0);

const submit = async () => {
  if (!category.value || !name.value) {
    alert("Lengkapi data item");
    return;
  }

  try {
    await api.post("/items", {
      name: name.value,
      category: category.value,
      stock: stock.value,
    });

    emit("success");
    emit("close");
  } catch (err) {
    alert("❌ Gagal menambahkan item");
    console.error(err);
  }
};
</script>

<style scoped>
.input {
  @apply w-full border rounded-lg px-3 py-2
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
