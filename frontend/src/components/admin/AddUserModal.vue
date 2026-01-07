<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-full max-w-md p-6">
      <h3 class="text-lg font-semibold mb-4">➕ Tambah User</h3>

      <form @submit.prevent="submit" class="space-y-4">
        <input
          v-model="username"
          placeholder="Username"
          class="input"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input"
          required
        />

        <select v-model="role" class="input">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded border"
          >
            Batal
          </button>

          <button
            class="bg-blue-600 text-white px-4 py-2 rounded
                   hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";

const emit = defineEmits(["close", "success"]);

const username = ref("");
const password = ref("");
const role = ref("user");

const submit = async () => {
  await api.post("/users", {
    username: username.value,
    password: password.value,
    role: role.value,
  });

  emit("success");
};
</script>

<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
