<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-sm rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">🔐 Verifikasi OTP</h3>

      <input
        v-model="otp"
        type="text"
        maxlength="6"
        class="input text-center tracking-widest text-lg"
        placeholder="••••••"
      />

      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded-lg border"
        >
          Batal
        </button>

        <button
          @click="submit"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Verifikasi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";

const props = defineProps<{
  userId: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

const otp = ref("");

const submit = async () => {
  try {
    await api.post("/auth/verify-otp", {
      userId: props.userId,
      otp: otp.value,
    });

    alert("✅ Verifikasi berhasil, silakan login");
    emit("success");
  } catch (err) {
    alert("❌ OTP salah / expired");
  }
};
</script>

<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
