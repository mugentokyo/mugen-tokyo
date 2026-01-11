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
      <form @submit.prevent="register" class="space-y-5">
        <!-- USERNAME -->
        <div>
          <label class="text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="input"
            required
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label class="text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="input pr-10"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 hover:text-gray-700 transition"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁</span>
            </button>
          </div>
        </div>

        <!-- BUTTON KIRIM OTP -->
        <button
          type="button"
          @click="sendOtp"
          :disabled="otpSent || !username || !password"
          class="
            w-full py-2.5 rounded-lg font-semibold
            border border-blue-600 text-blue-600
            hover:bg-blue-50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition
          "
        >
          {{ otpSent ? "OTP Terkirim ✔" : "Kirim OTP" }}
        </button>

        <!-- OTP INPUT -->
        <div v-if="otpSent">
          <label class="text-sm font-medium text-gray-700">Kode OTP</label>
          <input
            v-model="otp"
            type="text"
            maxlength="6"
            placeholder="••••••"
            class="input text-center tracking-widest text-lg"
            required
          />
        </div>

        <!-- REGISTER BUTTON -->
        <button
          type="submit"
          :disabled="!otp || loading"
          class="
            w-full py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition shadow-md
          "
        >
          {{ loading ? "Memproses..." : "Register" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import api from "@/services/api";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void; 
  (e: "otp", userId: string): void;
}>();

const toast = inject<any>("toast");
const username = ref("");
const password = ref("");
const showPassword = ref(false);
const otp = ref("");
const otpSent = ref(false);
const loading = ref(false);

const sendOtp = async () => {
  try {
    await api.post("/auth/request-otp", {
      username: username.value,
    });
    otpSent.value = true;
    toast.success("OTP dikirim ke Discord");
  } catch (err) {
    toast.error("Gagal kirim OTP");
  }
};

const register = async () => {
  try {
    loading.value = true;

    await api.post("/auth/register", {
      username: username.value,
      password: password.value,
      otp: otp.value,
    });

    toast.success("✅ Register berhasil");

    emit("success");   
    emit("close");     
  } catch (err) {
    toast.error("❌ Register gagal (OTP salah / expired)");
  } finally {
    loading.value = false;
  }
};

const submit = async () => {
  try {
    const res = await api.post("/auth/register", {
      username: username.value,
      password: password.value,
    });

    emit("otp", res.data.userId);
  } catch (err) {
    toast.error("❌ Register gagal");
  }
};

</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
         focus:outline-none focus:ring-2 focus:ring-blue-500
         transition;
}
</style>
