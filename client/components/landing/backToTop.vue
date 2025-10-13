<template>
    <button
      @click="scrollToTop"
      :class="[
        'fixed bottom-6 right-6 bg-[#E11D48] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300',
        showButton ? 'opacity-100 visible' : 'opacity-0 invisible',
      ]"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const showButton = ref(false);
  
  const handleScroll = () => {
    showButton.value = window.pageYOffset > 300;
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  </script>
  