<template>
  <div class="bg-white shadow-md rounded-xl lg:w-68 p-4 self-stretch pb-6 relative">
    <div class="w-56 h-56">
      <img
        class="rounded-2xl shadow-md object-cover w-full h-full"
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
      />
    </div>

    <NuxtLink :to="{path: '/product', query: { id: product.id }}" class="text-left mt-4 w-56 cursor-pointer">
      <div class="font-semibold flex items-center w-56">
        {{ product.brand }}
        <span class="px-1">|</span>
        <div class="flex items-center">
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
      <div class="overflow-ellipsis overflow-hidden whitespace-pre w-56">{{ product.title }}</div>
      <div class="font-semibold">
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
        class="mt-2 text-xs font-semibold text-red-600"
        v-if="product.stock && product.stock < 50"
      >
        Only Few Left!
      </div>
      <div v-else>&nbsp;</div>
    </NuxtLink>
    <button
      class="w-full text-center mt-2 py-1 border border-indigo-700 focus:outline-none rounded-3xl hover:bg-indigo-700 hover:text-white"
      @click="onClickAdd"
    >
      Add To Cart
    </button>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store';
const store = useAppStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isWish: {
    type: Boolean,
    required: false,
    default: false,
  }
});
const emit = defineEmits(['addToCart'])

const products = computed(() => store.cart);

const onClickAdd = () => {
  const item = products.value?.filter((item) => item.id == props.product.id);
  if (!item.length) {
    store.addToCart(props.product);
    emit('addToCart', { show: true, msg: 'Item added to cart successfully.'});
  } else {
    emit('addToCart', {show: true, msg: 'Item already present in cart.'});
  }
  if (props.isWish) {
    store.removeWishItem(props.product.id);
  }
  setTimeout(() => {
    emit('addToCart', {show:false});
  }, 2000);
};
</script>
