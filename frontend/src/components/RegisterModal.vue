<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">📝 Register</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          ✕
        </button>
      </div>

      <!-- FORM -->
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="text-sm font-medium">Username</label>
          <input
            v-model="username"
            type="text"
            class="input"
            placeholder="Username"
            required
          />
        </div>

        <div>
          <label class="text-sm font-medium">Password</label>

          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="input pr-10"
              placeholder="Password"
              required
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 hover:text-gray-700"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁</span>
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded-lg border"
          >
            Batal
          </button>

          <button
            type="submit"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Daftar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const username = ref("");
const password = ref("");
const showPassword = ref(false);

const submit = async () => {
  try {
    await api.post("/auth/register", {
      username: username.value,
      password: password.value,
    });

    alert("✅ Register berhasil, silakan login");
    emit("close");
  } catch (err) {
    alert("❌ Register gagal");
    console.error(err);
  }
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
