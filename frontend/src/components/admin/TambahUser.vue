<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">👤 Tambah User</h2>

    <form @submit.prevent="submit" class="space-y-4 max-w-sm">
      <input v-model="username" placeholder="Username" class="input" />
      <input v-model="password" placeholder="Password" class="input" />

      <button class="btn">Tambah User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";

const username = ref("");
const password = ref("");

const submit = async () => {
  await api.post("/auth/register", {
    username: username.value,
    password: password.value,
    adminSecret: "superadmin123", // sementara
  });

  alert("User berhasil ditambahkan");
  username.value = "";
  password.value = "";
};
</script>

<style scoped>
.input {
  @apply w-full border rounded px-3 py-2;
}
.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>
