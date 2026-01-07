<template>
  <aside class="w-72 bg-white shadow p-4">
    <h3 class="font-semibold mb-4">📄 PO Cart</h3>

    <div
      v-for="i in cart.items"
      :key="i._id"
      class="flex justify-between items-center mb-3"
    >
      <span class="flex-1">{{ i.name }}</span>

      <div class="flex items-center gap-2">
        <button class="btn" @click="cart.decrease(i._id)">−</button>
        <span class="w-6 text-center">{{ i.qty }}</span>
        <button class="btn" @click="cart.increase(i._id)">+</button>
      </div>
    </div>

    <button
      class="w-full bg-yellow-600 text-white py-2 rounded mt-4"
      :disabled="cart.items.length === 0"
      @click="cart.createPO"
    >
      Buat PO
    </button>
  </aside>
</template>

<script setup lang="ts">
import { usePOCart } from "@/stores/poCart";
const cart = usePOCart();
</script>

<style scoped>
.btn {
  @apply w-8 h-8 border rounded flex items-center justify-center
    hover:bg-gray-100;
}
</style>
