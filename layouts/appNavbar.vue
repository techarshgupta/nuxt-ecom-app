<script setup>
import { useAppStore } from '~/store';
import { computed, defineComponent, onUnmounted, ref } from 'vue';
const showLogOut = ref(false);
const store = useAppStore();
const cartItems = computed(() => store.cart.length);
const wishItems = computed(() => store.whislist.length);
const user = ref({
  firstName: 'Harsh',
  lastName: 'Gupta',
});
const handleEscape = (e) => {
  if (e.key === 'Esc' || e.key === 'Escape') {
    showLogOut.value = false;
  }
};
</script>


<template>
  <div class="flex justify-between select-none bg-white shadow-md h-16 px-3">
    <NuxtLink class="flex items-center cursor-pointer" to='/'>
      <div class="overflow-hidden p-2">
        <svg fill="#000000" height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300.004 300.004" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M278.891,244.965V105.231c0-4.143-3.357-7.5-7.5-7.5h-42.398V65.597c0-4.143-3.357-7.5-7.5-7.5H189.17V47.555 c0-21.6-17.57-39.173-39.168-39.173s-39.168,17.573-39.168,39.173v10.542H78.512c-4.143,0-7.5,3.357-7.5,7.5v32.134H28.613 c-4.142,0-7.5,3.357-7.5,7.5v139.734C9.438,245.174,0,254.721,0,266.446v3.676c0,11.855,9.645,21.5,21.5,21.5h257.004 c11.855,0,21.5-9.645,21.5-21.5v-3.676C300.004,254.721,290.566,245.174,278.891,244.965z M78.512,216.954h142.98 c4.143,0,7.5-3.357,7.5-7.5v-71.111h11.411v105.075H59.602V138.342h11.41v71.111C71.012,213.596,74.369,216.954,78.512,216.954z M263.891,112.731v130.687h-8.487V130.842c0-4.143-3.357-7.5-7.5-7.5h-18.911v-10.611H263.891z M125.834,47.555 c0-13.329,10.842-24.173,24.168-24.173s24.168,10.844,24.168,24.173v10.542h-48.336V47.555z M86.012,73.097h24.822V85.94 c0,4.143,3.357,7.5,7.5,7.5c4.143,0,7.5-3.357,7.5-7.5V73.097h48.336V85.94c0,4.143,3.357,7.5,7.5,7.5c4.143,0,7.5-3.357,7.5-7.5 V73.097h24.822v128.856H86.012V73.097z M36.113,112.731h34.899v10.611h-18.91c-4.143,0-7.5,3.357-7.5,7.5v112.575h-8.488V112.731z M285.004,270.122c0,3.584-2.916,6.5-6.5,6.5H21.5c-3.584,0-6.5-2.916-6.5-6.5v-3.676c0-3.584,2.916-6.5,6.5-6.5h257.004 c3.584,0,6.5,2.916,6.5,6.5V270.122z"></path> <polygon points="171.885,153.601 123.229,134.089 142.688,182.867 147.432,168.114 167.047,187.771 176.774,178.018 157.164,158.358 "></polygon> </g> </g></svg>
      </div>
      <div class="text-2xl font-bold">My Shopping App</div>
    </NuxtLink>
    <div class="flex justify-around items-center mx-4">
      <NuxtLink to="/wishlist" class="relative">
        <img class=" h-6 cursor-pointer" src="~/assets/wishlist.png" loading="lazy" />
        <div class="absolute -top-3 -right-3 rounded-full bg-indigo-700 text-white h-6 w-6 text-center">
          {{ wishItems }}
        </div>
      </NuxtLink>
      <NuxtLink class="ml-5 cursor-pointer relative" to='/cart'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="22"
          height="22"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <g fill="#222">
            <path
              d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
            />
            <path
              d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607l1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4a2 2 0 0 0 0-4h7a2 2 0 1 0 0 4a2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
            />
          </g>
        </svg>
        <div class="absolute -top-3 -right-3 rounded-full bg-indigo-700 text-white h-6 w-6 text-center">
          {{ cartItems }}
        </div>
      </NuxtLink>
      <div class="flex cursor-pointer items-center relative">
        <div
          v-if="showLogOut"
          @click="showLogOut = false"
          class="fixed inset-0 bg-black opacity-25 h-full w-full cursor-default"
        ></div>
        <span
          class="relative z-10 flex justify-center font-semibold items-center bg-black text-white w-9 h-9 ml-8 rounded-full"
          @click="showLogOut = !showLogOut"
        >
          HG
        </span>
        <button
          v-if="showLogOut"
          class="absolute mt-10 w-32 text-gray-700 flex items-center text-sm px-3 ring-1 ring-black ring-opacity-5 right-0 top-0 py-2 rounded-md shadow-lg bg-white hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

