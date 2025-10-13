<!-- components/ToastNotification.vue -->
<template>
    <div
      :class="[
        'fixed bottom-5 right-5 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transition-opacity duration-300 ease-out',
        toast.show ? 'opacity-100' : 'opacity-0',
      ]"
      role="alert"
    >
      <div :class="toast.iconClass">
        <i :class="toast.icon"></i>
      </div>
      <div class="ml-3 text-sm font-normal">{{ toast.message }}</div>
      <button
        @click="$emit('hide')"
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <i class="fas fa-times"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ToastNotification",
    props: {
      toast: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  