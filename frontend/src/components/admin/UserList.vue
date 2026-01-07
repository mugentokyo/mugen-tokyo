<template>
  <div>
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold flex items-center gap-2">
        👥 Daftar User
      </h2>

      <button
        @click="showModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg
               hover:bg-blue-700 transition"
      >
        ➕ Tambah User
      </button>
    </div>

    <!-- TABLE -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="px-4 py-3">Username</th>
            <th class="px-4 py-3">Role</th>
            <th class="px-4 py-3">Tanggal Dibuat</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="u in users"
            :key="u._id"
            class="border-t"
          >
            <td class="px-4 py-3 font-medium">
              {{ u.username }}
            </td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="u.role === 'admin'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'"
              >
                {{ u.role }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-500">
              {{ formatDate(u.createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <AddUserModal
      v-if="showModal"
      @close="showModal = false"
      @success="fetchUsers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";
import AddUserModal from "./AddUserModal.vue";

const users = ref<any[]>([]);
const showModal = ref(false);

const fetchUsers = async () => {
  const res = await api.get("/users");
  users.value = res.data;
  showModal.value = false;
};

onMounted(fetchUsers);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID");
</script>
