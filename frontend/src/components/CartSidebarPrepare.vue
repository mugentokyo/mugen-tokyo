<template>
  <div class="w-72 bg-white rounded-lg shadow p-4">
    <h3 class="font-semibold mb-4">🧺 Prepare Cart</h3>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      Cart kosong
    </div>

    <div
      v-for="item in cart.items"
      :key="item.id"
      class="mb-4 pb-3 border-b"
    >
      <!-- NAMA -->
      <div class="flex justify-between items-center">
        <p class="font-medium">{{ item.name }}</p>
        <button
          @click="cart.remove(item.id)"
          class="text-red-500 hover:text-red-700"
          title="Hapus item"
        >
          ✕
        </button>
      </div>

      <!-- QTY CONTROL -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center gap-2">
          <button
            @click="cart.decrease(item.id)"
            class="w-7 h-7 border rounded hover:bg-gray-100"
          >
            −
          </button>

          <span class="w-6 text-center">{{ item.qty }}</span>

          <button
            @click="cart.increase(item.id)"
            class="w-7 h-7 border rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <span class="text-sm">
          {{ formatUSD(item.qty * item.price) }}
        </span>
      </div>
    </div>

    <!-- TOTAL -->
    <div class="flex justify-between font-semibold mt-4">
      <span>Total</span>
      <span>{{ formatUSD(cart.totalPrice) }}</span>
    </div>

    <button
      class="mt-4 w-full bg-green-600 text-white py-2 rounded-lg
            hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="cart.items.length === 0 || loading"
      @click="handleCheckout"
    >
      {{ loading ? "Processing..." : "Checkout" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref, inject} from "vue"
import api from "@/services/api";
import { usePrepareCartStore } from "@/stores/prepareCart";
import { useAuthStore } from "@/stores/auth";
const cart = usePrepareCartStore();
const toast = inject<any>("toast");

const loading = ref(false);
const auth = useAuthStore();
const handleCheckout = async () => {
  if (cart.items.length === 0) {
    toast.error("Keranjang masih kosong");
    return;
  }
  if (!auth.user?._id) {
    toast.error("Silakan login terlebih dahulu");
    return;
  }
  try {
    await api.post("/purchases", {
      user: {
        id: auth.user._id, 
      },
      items: cart.items.map(i => ({
        id: i.id,         
        name: i.name,     
        qty: i.qty,
      })),
    });

    toast.success("Checkout berhasil");
    cart.clear();
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Checkout gagal");
  } finally {
    loading.value = false;
  }
};

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
</script>

<style scoped>
.btn {
  @apply w-8 h-8 border rounded flex items-center justify-center
    hover:bg-gray-100;
}
</style>