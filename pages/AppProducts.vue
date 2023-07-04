<template>
  <div class="flex flex-wrap py-6 justify-around gap-y-8">
    <product
      v-for="(product, idx) in products"
      :key="idx"
      :product="product"
      :isWish="isWish"
      @stockEnd="$emit('stockEnd')"
      @addToCart="$emit('addToCart', $event)"
    ></product>
  </div>
</template>

<script setup>
import Product from '~/components/product.vue';

defineProps({
  products: {
    type: Array,
    required: true,
  },
  isWish: {
    type: Boolean,
    required: false,
    default: false,
  }
});
</script>
