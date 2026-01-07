import { defineStore } from "pinia";
import api from "@/services/api";
import { useAuthStore } from "./auth";

export const usePOCart = defineStore("poCart", {
  state: () => ({
    items: [] as { _id: string; name: string; qty: number }[],
  }),

  actions: {
    add(item: { _id: string; name: string }) {
      const found = this.items.find(i => i._id === item._id);
      if (found) found.qty++;
      else this.items.push({ _id: item._id, name: item.name, qty: 1 });
    },

    increase(id: string) {
      const item = this.items.find(i => i._id === id);
      if (item) item.qty++;
    },

    decrease(id: string) {
      const item = this.items.find(i => i._id === id);
      if (!item) return;

      item.qty--;
      if (item.qty <= 0) {
        this.items = this.items.filter(i => i._id !== id);
      }
    },

    async createPO() {
      const auth = useAuthStore();

      await api.post("/po", {
        user: auth.user,
        items: this.items,
      });

      this.items = [];
    },
  },
});
