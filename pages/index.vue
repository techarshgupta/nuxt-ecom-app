<template>
  <div>
    <div
      class="flex flex-col md:flex-row gap-3 items-center justify-between mt-2 pb-2 border-b-2 border-gray-300"
    >
      <div class="text-xl font-semibold">
        <div class="w-[85vw] -ml-10 md:ml-5 md:w-96 flex items-center">
          <div class="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              class="relative m-0 block w-full flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              v-model="search"
            />
            <span
              class="input-group-text flex items-center whitespace-nowrap rounded -mx-8 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div
        class="relative text-left border border-gray-300 rounded-md mr-6"
        @mouseenter="showSort = true"
        @mouseleave="showSort = false"
        style="min-width: 280px"
      >
        <div class="px-4 py-1 hover:shadow-md flex items-center">
          Sort By:&nbsp;
          <span class="text-sm font-semibold flex-1">{{
            selectedSort.title
          }}</span>
          <img
            class="ml-2 h-4 w-4 transform rotate-90"
            src="~/assets/icon/arrow-right.svg"
            loading="lazy"
          />
        </div>
        <div v-if="showSort" class="absolute shadow-md w-full bg-white z-50">
          <template v-for="(so, idx) in sortOptions" :key="idx">
            <div
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
              @click="
                selectedSort = so;
                showSort = false;
              "
            >
              {{ so.title }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="flex">
      <AppProducts
        :products="getProducts"
        class="products"
        @stockEnd="modalVisible = true"
        @addToCart="addToCart = $event"
      />
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
  </div>
</template>

<script setup>
import { computed, defineComponent, nextTick, ref } from "vue";
import { products } from "../data";
import { useAppStore } from "~/store";
import AppProducts from "./AppProducts.vue";

const store = useAppStore();
const modalVisible = ref(false);
const addToCart = ref({ show: false, msg: "Item added to cart successfully." });
const showSort = ref(false);
const search = ref('');
const selectedSort = ref({
  title: "Better Discount",
  value: "discount",
});
const sortOptions = [
  {
    title: "Better Discount",
    value: "discount",
  },
  {
    title: "Customer Rating",
    value: "rating",
  },
  {
    title: "Price High to Low",
    value: "high_price",
  },
  {
    title: "Price low to High",
    value: "low_price",
  },
];
const getProducts = computed(() => {
  let tempProducts = products;
  tempProducts = tempProducts?.filter((o) =>
    o.title.toLowerCase().includes(search.value.toLowerCase())
  );
  if (selectedSort.value.value === "discount") {
    tempProducts = tempProducts.sort(
      (a, b) => b.discountPercentage - a.discountPercentage
    );
    return [...tempProducts];
  }
  if (selectedSort.value.value === "rating") {
    tempProducts = tempProducts.sort((a, b) => b.rating - a.rating);
    return [...tempProducts];
  }
  if (selectedSort.value.value === "high_price") {
    tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    return [...tempProducts];
  }
  if (selectedSort.value.value === "low_price") {
    tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    return [...tempProducts];
  }
  return tempProducts;
});
</script>

<style lang="scss" scoped>
.products,
.filters {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
