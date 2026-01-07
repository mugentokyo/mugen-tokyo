import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Login from "@/views/Login.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import Dashboard from "@/views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/dashboard", component: Dashboard },
    {
      path: "/admin",
      component: AdminDashboard,
      meta: { requiresAdmin: true },
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  // belum login
  if (!auth.user && to.path !== "/") {
    return "/";
  }

  // admin guard
  if (to.meta.requiresAdmin && auth.user?.role !== "admin") {
    return "/dashboard";
  }
});

export default router;
