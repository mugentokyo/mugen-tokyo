import { defineStore } from "pinia";
import api from "@/services/api";
import { useAuthStore } from "./auth";

export type CartItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

export const usePrepareCartStore = defineStore("prepareCart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalPrice: (state) => {
      return state.items.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
    },
  },

  actions: {
    add(item: CartItem) {
      const existing = this.items.find(i => i.id === item.id);
      if (existing) {
        existing.qty += item.qty;
      } else {
        this.items.push({ ...item });
      }
    },

    increase(id: string) {
      const item = this.items.find(i => i.id === id);
      if (item) item.qty++;
    },

    decrease(id: string) {
      const item = this.items.find(i => i.id === id);
      if (!item) return;

      if (item.qty > 1) {
        item.qty--;
      } else {
        this.remove(id);
      }
    },

    remove(id: string) {
      this.items = this.items.filter(i => i.id !== id);
    },

    clear() {
      this.items = [];
    },

    async checkout() {
      const auth = useAuthStore();

      await api.post("/purchases", {
        user: auth.user,
        items: this.items,
      });

      this.clear();
    },
  },
});
