<template>
  <div
    class="bg-white rounded-xl border shadow-sm hover:shadow-md transition
           flex flex-col relative"
  >
    <!-- IMAGE -->
    <img
      :src="item.image"
      class="h-40 w-full object-contain p-4"
      alt=""
    />

    <!-- CONTENT -->
    <div class="px-4 pb-4 flex-1">
      <h3 class="font-medium text-gray-800 line-clamp-2">
        {{ item.name }}
      </h3>

      <p class="text-sm text-gray-500 mt-1">
        Stok:
        <span
          :class="item.stock > 0 ? 'text-green-600' : 'text-red-500'"
        >
          {{ item.stock }}
        </span>
      </p>

      <p class="font-semibold text-blue-600 mt-1">
        $ {{ item.price.toLocaleString("id-ID") }}
      </p>
    </div>

    <!-- ADD BUTTON -->
    <button
      class="absolute bottom-3 right-3 w-9 h-9 rounded-full
             bg-blue-600 text-white text-xl
             hover:bg-blue-700
             disabled:bg-gray-300"
      :disabled="item.stock === 0"
      @click="$emit('add', item)"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    _id: string;
    name: string;
    stock: number;
    price: number;
    image?: string;
  };
}>();

defineEmits<{
  (e: "add", item: any): void;
}>();
</script>
