import { defineStore } from "pinia";

export type User = {
  _id: string;
  username: string;
  role: "admin" | "user";
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    login(user: User) {
      this.user = user;
      localStorage.setItem("auth_user", JSON.stringify(user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem("auth_user");
    },

    restore() {
      const saved = localStorage.getItem("auth_user");
      if (saved) {
        this.user = JSON.parse(saved);
      }
    },
  },
});
