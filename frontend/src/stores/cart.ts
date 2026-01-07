import { defineStore } from "pinia";
import api from "@/services/api";
import { useAuthStore } from "./auth";

export type CartItem = {
  id: string;
  name: string;
  qty: number;
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  actions: {
    add(item: CartItem) {
      const existing = this.items.find(i => i.id === item.id);

      if (existing) {
        existing.qty += item.qty;
      } else {
        this.items.push({ ...item });
      }
    },

    async checkout() {
      const auth = useAuthStore();

      await api.post("/purchases", {
        user: auth.user,
        items: this.items,
      });

      this.items = [];
    },

    async createPO() {
      const auth = useAuthStore();

      await api.post("/po", {
        user: auth.user,
        items: this.items,
      });

      this.items = [];
    },

    remove(id: string) {
      this.items = this.items.filter(i => i.id !== id);
    },

    clear() {
      this.items = [];
    },
  },
});
