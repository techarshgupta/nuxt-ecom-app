<template>
  <div v-if="getCart && getCart.length > 0" class="flex">
    <div class="w-full mr-10 products">
      <div class="border border-gray-500 text-left rounded-xl p-6 my-3 ml-5">
        <div class="text-3xl text-indigo-700 font-semibold">Free Shipping For Members.</div>
        <p class="text-lg">Become a member for free and fast shipping.</p>
      </div>
      <div
        v-for="(product, idx) in getCart"
        :key="idx"
        class="bg-white shadow-md rounded-2xl w-full p-6 pb-4 flex my-3"
      >
        <img
          class="rounded-2xl w-56 h-56 shadow-md object-cover"
          :src="product.thumbnail"
          :alt="product.title"
          loading="lazy"
        />

        <div class="text-left flex flex-col p-6 pt-0">
          <div class="flex items-center gap-2">
            <div class="font-semibold text-2xl">
            {{ product.brand }}
          </div>
          <div class="flex items-center border-l-2 border-gray-300 pl-1">
            <svg
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <p class="pl-0.5 text-gray-900">{{ product.rating }}</p>
          </div>
          </div>

          <div class="text-xl">{{ product.title }}</div>
          <div class="text-xl">{{ product.description }}</div>
          <div class="text-3xl font-semibold">
            <span> Rs. </span>
            {{ product.price }}
            <span
              v-if="product.discountPercentage && product.discountPercentage !== ''"
              class="text-red-400 font-light"
            >
              ({{ product.discountPercentage }}%) OFF
            </span>
          </div>
          <div
            class="mt-2 text-base font-semibold text-red-600"
            v-if="product.stock && product.stock < 50"
          >
            Only Few Left!
          </div>
          <div class="flex items-center gap-1 mt-5">
            <button class="text-xs bg-transparent text-red-400 font-semibold" @click="removeItem(product.id)"
            >
              Remove
            </button>
            <button class="border-l-2 border-gray-400 text-xs bg-transparent text-indigo-700 font-semibold pl-1"
              @click="onClickWish(product)"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-left mx-6 p-6 shadow-md" style="min-width: 450px">
      <div class="font-bold text-3xl my-3">Summary</div>
      <div class="font-semibold my-3">Do you have a Promo Code ?</div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Subtotal</div>
        <div>Rs.{{ getTotal }}.00</div>
      </div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Discount</div>
        <div>Rs.100.00</div>
      </div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Estimated Shipping & Handling</div>
        <div>Rs.500.00</div>
      </div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Estimated Tax</div>
        <div>Rs.500.00</div>
      </div>
      <div class="border-t border-gray-400 my-3"></div>

      <div class="my-3 flex justify-between font-semibold">
        <div>Total Amount</div>
        <div>Rs.{{ getTotal + 900 }}.00</div>
      </div>
      <button
        class="w-full text-center mt-2 py-3 border border-indigo-700 focus:outline-none rounded-3xl bg-indigo-700 text-white text-xl shadow-md"
      >
        Checkout
      </button>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col text-left items-center border border-gray-300 p-6 m-6 rounded-xl shadow-md"
  >
    <div class="font-semibold text-2xl self-start">My Cart</div>
    <img class="w-96 h-full" src="~/assets/cart.webp" loading="lazy" />
    <div class="text-3xl font-semibold">Your cart is empty!</div>
    <div class="text-xl font-normal">Add items to it now.</div>
    <NuxtLink
      class="text-center my-4 py-3 border border-indigo-700 focus:outline-none rounded-md bg-indigo-700 text-white text-xl shadow-md m-auto px-10"
      to='/'
    >
      Shop Now
    </NuxtLink>
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
import { useAppStore } from '~/store';
import { computed } from 'vue';
const addToCart = ref({show:false, msg: 'Item added to cart successfully.'});
const store = useAppStore();
const getCart = computed(() => store.cart);
const getTotal = computed(() => {
  const prices = getCart.value.map((product) => product.price);
  return prices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
});
const removeItem = (id) => {
  store.removeCartItem(id);
};
const whislist = computed(() => store.whislist);
const onClickWish = (product) => {
  const item = whislist.value?.filter((item) => item.id == product.id);
  if (!item.length) {
    store.addToWish(product);
    addToCart.value = { show: true, msg: 'Item added to wishlist successfully.'};
    store.removeCartItem(product.id);
  } else {
    addToCart.value = {show: true, msg: 'Item already present in wishlist.'};
    store.removeCartItem(product.id);
  }
  setTimeout(() => {
    addToCart.value ={show:false};
  }, 2000);
};
</script>

<style lang="scss" scoped>
.products {
  height: calc(100vh - 100px);
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
