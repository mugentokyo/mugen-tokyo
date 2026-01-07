<template>
  <div class="flex gap-6">
    <!-- LEFT CONTENT -->
    <div class="flex-1">
      <h2 class="text-xl font-semibold mb-4">📦 Prepare</h2>

      <!-- FILTER KATEGORI -->
      <select v-model="category" class="select mb-6">
        <option value="">Semua Kategori</option>
        <option v-for="c in categories" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <!-- GRID ITEMS -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard
          v-for="item in filteredItems"
          :key="item._id"
          :item="item"
          @add="addToCart"
        />
      </div>
    </div>

    <!-- RIGHT SIDEBAR -->
    <CartSidebarPrepare />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import ItemCard from "@/components/ItemCard.vue";
import CartSidebarPrepare from "@/components/CartSidebarPrepare.vue";
import api from "@/services/api";
import { usePrepareCartStore } from "@/stores/prepareCart";
const cart = usePrepareCartStore();

/**
 * TYPE ITEM DARI DATABASE
 * (_id dari Mongo)
 */
type Item = {
  _id: string;
  name: string;
  category: string;
  stock: number;
  image?: string;
};

const items = ref<Item[]>([]);
const category = ref("");

let interval: number | undefined;

/* ===============================
   FETCH ITEMS (REALTIME)
================================ */
const fetchItems = async () => {
  try {
    const res = await api.get("/items");
    items.value = res.data;
  } catch (err) {
    console.error("Gagal fetch items", err);
  }
};

onMounted(async () => {
  await fetchItems();
  interval = window.setInterval(fetchItems, 3000); // realtime tiap 3 detik
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

/* ===============================
   COMPUTED
================================ */
const categories = computed(() => {
  return [...new Set(items.value.map(i => i.category))];
});

const filteredItems = computed(() => {
  return category.value
    ? items.value.filter(i => i.category === category.value)
    : items.value;
});

/* ===============================
   ADD TO CART
================================ */
const addToCart = (item: Item) => {
  if (item.stock <= 0) return;

  cart.add({
    id: item._id,       // mapping Mongo _id → frontend id
    name: item.name,
    qty: 1,
  });
};
</script>

<style scoped>
.select {
  @apply w-full border rounded-lg px-4 py-2
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
