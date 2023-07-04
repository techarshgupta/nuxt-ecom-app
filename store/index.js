// store/filters.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'appStore',
  state: () => {
    return {
      app: {},
      cart: [],
      whislist: [],
    }
  },
  actions: {
    addToCart(val) {
      this.cart.push(val);
    },
    addToWish(val) {
      this.whislist.push(val);
    },
    removeCartItem(id) {
      this.cart = this.cart.filter((item) => item.id != id);
    },
    removeWishItem(id) {
      this.whislist = this.whislist.filter((item) => item.id != id);
    },
  },
  persist: true,
});
