<template>
  <div class="flex">
    <AppProducts
      v-if="getProducts && getProducts.length"
      :isWish="true"
      :products="getProducts"
      class="products"
      @addToCart="addToCart = $event"
    />
    <div
      v-else
      class="text-2xl font-semibold text-center h-20 flex flex-col items-center mt-28 w-full justify-center"
    >
      <div>No Items in Wishlist</div>
      <NuxtLink
        class="text-center my-4 py-3 border border-indigo-700 focus:outline-none rounded-md bg-indigo-700 text-white text-xl shadow-md m-auto px-10"
        to="/"
      >
        Shop Now
      </NuxtLink>
    </div>
  </div>
  <div v-if="addToCart.show" class="absolute right-6 z-50 top-20">
    <div
      id="toast-success"
      class="flex items-center w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="ml-3 text-xl">{{ addToCart.msg }}</div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        @click="addToCart = false"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import AppProducts from "./AppProducts.vue";
import { computed } from "vue";
import { useAppStore } from "~/store";
const addToCart = ref({ show: false, msg: "Item added to cart successfully." });
const store = useAppStore();

const getProducts = computed(() => store.whislist);
</script>
