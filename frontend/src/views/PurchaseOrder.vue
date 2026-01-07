<template>
  <div class="flex gap-6">
    <!-- KONTEN UTAMA -->
    <div class="flex-1">
      <h2 class="text-2xl font-semibold mb-4">📄 Purchase Order</h2>

      <!-- FILTER KATEGORI -->
      <select v-model="category" class="select mb-6">
        <option value="">Semua Kategori</option>
        <option v-for="c in categories" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <!-- GRID ITEM -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard
          v-for="item in filteredItems"
          :key="item._id"
          :item="item"
          @add="addToCart"
        />
      </div>
    </div>

    <!-- CART SIDEBAR -->
    <CartSidebarPO />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ItemCard from "@/components/ItemCard.vue";
import CartSidebarPO from "@/components/CartSidebarPO.vue";
import { usePOCart } from "@/stores/poCart";
import api from "@/services/api";

type Item = {
  _id: string;
  name: string;
  category: string;
  stock: number;
  image?: string;
};

const cart = usePOCart();

const items = ref<Item[]>([]);
const category = ref("");

/** ambil data dari backend */
onMounted(async () => {
  const res = await api.get("/items");
  items.value = res.data;
});

/** kategori unik */
const categories = computed(() => {
  return [...new Set(items.value.map(i => i.category))];
});

/** filter item */
const filteredItems = computed(() => {
  return category.value
    ? items.value.filter(i => i.category === category.value)
    : items.value;
});

/** add ke cart PO */
const addToCart = (item: Item) => {
  cart.add(item);
};
</script>

<style scoped>
.select {
  @apply w-full border rounded-lg px-4 py-2
    focus:outline-none focus:ring-2 focus:ring-yellow-500;
}
</style>
