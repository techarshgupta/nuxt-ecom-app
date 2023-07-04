<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="w-full md:w-10/12 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded shadow-xl"
          :src="activeImage"
          loading="lazy"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest capitalize">
            {{activeProduct.brand}} | {{activeProduct.category}}
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{activeProduct.title}}
          </h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <template v-for="r in Math.floor(activeProduct?.rating)||0" :key="r">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
              </template>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <span class="text-gray-600 ml-3">{{activeProduct.rating}}</span>
            </span>
          </div>
          <p class="leading-relaxed">
            {{activeProduct.description}}
          </p>
          <div class="flex flex-wrap gap-4 my-6">
            <div v-for="im in activeProduct.images" :key="im" class="overflow-hidden h-28 w-28 border shadow-lg cursor-pointer transition-all" @click="activeImage=im">
              <img :src="im" alt="thumbnail" class="object-cover object-center rounded" loading="lazy">
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">
              Rs.{{activeProduct.price}}
            </span>
            <button
              class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              @click="onClickAdd"
            >
              Add To Cart
            </button>
            <button
              title="Add to wishlist"
              class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:text-gray-100 hover:bg-gray-500"
              @click="onClickWish"
            >
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
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
        <div class="ml-3 text-xl">{{addToCart.msg}}</div>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from '@/store';
import { products } from "../data";
const route = useRoute();
const id = computed(() => +route.query.id);
const activeProduct = ref({});
const addToCart = ref({show:false, msg: 'Item added to cart successfully.'});
const activeImage = ref('');
const store = useAppStore();
const emit = defineEmits(['addToCart'])
onMounted(() => {
  if (id.value) {
    activeProduct.value = products.filter((pd) => pd.id === id.value)[0];
    activeImage.value = activeProduct.value.thumbnail;
  }
});
const cart = computed(() => store.cart);
const whislist = computed(() => store.whislist);
const onClickAdd = () => {
  const item = cart.value?.filter((item) => item.id == activeProduct.value.id);
  if (!item.length) {
    store.addToCart(activeProduct.value);
    addToCart.value = { show: true, msg: 'Item added to cart successfully.'};
  } else {
    addToCart.value = {show: true, msg: 'Item already present in cart.'};
  }
  setTimeout(() => {
    addToCart.value ={show:false};
  }, 2000);
};
const onClickWish = () => {
  const item = whislist.value?.filter((item) => item.id == activeProduct.value.id);
  if (!item.length) {
    store.addToWish(activeProduct.value);
    addToCart.value = { show: true, msg: 'Item added to wishlist successfully.'};
  } else {
    addToCart.value = {show: true, msg: 'Item already present in wishlist.'};
  }
  setTimeout(() => {
    addToCart.value ={show:false};
  }, 2000);
};
</script>
