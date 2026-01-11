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
            <th class="px-4 py-3 text-center">Action</th>
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
            <td class="px-4 py-3 text-center">
              <button
                @click="openDeleteModal(u)"
                class="w-9 h-9 border border-red-500 rounded-lg
                      text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                🗑️
              </button>
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
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h3 class="text-lg font-semibold mb-3">
          🗑️ Hapus User
        </h3>

        <p class="text-gray-600 mb-6">
          Apakah kamu yakin ingin menghapus
          <strong>{{ userToDelete?.username }}</strong>?
          <br />Tindakan ini tidak bisa dibatalkan.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 rounded-lg border"
          >
            Batal
          </button>

          <button
            @click="confirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
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

const showDeleteModal = ref(false);
const userToDelete = ref<any>(null);

const openDeleteModal = (user: any) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const confirmDelete = async () => {
  if (!userToDelete.value) return;

  try {
    await api.delete(`/users/${userToDelete.value._id}`);
    users.value = users.value.filter(
      u => u._id !== userToDelete.value._id
    );
    closeDeleteModal();
  } catch (err) {
    alert("Gagal menghapus user");
  }
};

onMounted(fetchUsers);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID");
</script>
