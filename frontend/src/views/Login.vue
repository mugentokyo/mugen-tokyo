<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div
      class="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
    >
      <!-- LEFT PANEL -->
      <div
        class="hidden md:flex flex-col justify-between p-10 relative
              bg-black text-white
              border-r border-yellow-500/40
              shadow-[inset_-1px_0_0_rgba(234,179,8,0.3)]"
      >
        <!-- Background Image -->
        <div
          class="absolute inset-0 bg-center bg-no-repeat bg-contain"
          :style="{ backgroundImage: `url(${mugenBg})` }"
        ></div>

        <!-- Overlay gelap -->
        <div class="absolute inset-0 bg-black/30"></div>

        <!-- CONTENT -->
        <div class="relative z-10">
          <p class="text-sm tracking-widest text-white/80">
            WELCOME
          </p>

          <h1 class="text-3xl font-bold text-white mt-2">
            Mugen System
          </h1>
        </div>

        <div class="relative z-10 flex items-center gap-2 text-sm text-white/70">
          <span>🔒</span>
          <span>Mugen Forever Forever Mugen</span>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="p-10 flex flex-col justify-center">
        <p class="text-sm text-orange-500 font-semibold">MASUK</p>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Login</h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Username -->
          <div>
            <label class="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="input"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="text-sm font-medium text-gray-700">
              Password
            </label>

            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                class="input pr-10"
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

          <button
            type="button"
            class="btn-primary"
            @click="handleSubmit"
          >
            Login
          </button>
        </form>

        <p class="text-center text-xs text-gray-500 mt-6">
          Hubungi Secretary jika belum mempunyai user.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import api from "@/services/api";
import mugenBg from "@/assets/mugen-1.png";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
</script>

const handleSubmit = async () => {
  console.log("LOGIN BUTTON CLICKED");

  try {
    const res = await api.post("/auth/login", {
      username: username.value,
      password: password.value,
    });

    console.log("LOGIN RESPONSE:", res.data);

    auth.login(res.data.user);

    if (res.data.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    alert("Login gagal");
    console.error(err);
  }
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
         focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.btn-primary {
  @apply w-full bg-blue-600 hover:bg-blue-700 text-white
         font-semibold py-2 rounded-lg transition shadow-md;
}
</style>
