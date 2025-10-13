<template>
  <!-- Loading State -->
  <Loader v-if="isLoading" />
  
  <!-- Desktop Content -->
  <div v-else-if="isDesktop" class="h-screen">
    <slot />
  </div>
  
  <!-- Error Message -->
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
      <!-- Icon -->
      <div class="mb-6">
        <svg
          class="w-20 h-20 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      
      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        Akses Terbatas
      </h1>
      
      <!-- Message -->
      <p class="text-gray-600 mb-6 leading-relaxed">
        Mohon akses web admin di desktop Anda. 
        <br />
        Halaman ini hanya dapat diakses melalui perangkat desktop/laptop dengan resolusi layar yang memadai.
      </p>
      
      <!-- Resolution Info -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-500 mb-2">Resolusi layar saat ini:</p>
        <p class="text-lg font-mono text-gray-700">
          {{ screenWidth }} × {{ screenHeight }}px
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Minimum yang diperlukan: 1024 × 720px
        </p>
      </div>
      
      <!-- Action Button -->
      <!-- <button
        @click="goBack"
        class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Kembali
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDesktop = ref(false)
const screenWidth = ref(0)
const screenHeight = ref(0)
const isLoading = ref(true)

// Minimum resolution untuk desktop (1024x720)
const MIN_DESKTOP_WIDTH = 1024
const MIN_DESKTOP_HEIGHT = 720

const checkScreenSize = () => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
  
  isDesktop.value = 
    screenWidth.value >= MIN_DESKTOP_WIDTH 
}

const goBack = () => {
  // Coba kembali ke halaman sebelumnya, atau redirect ke home
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

onMounted(() => {
  checkScreenSize()
  isLoading.value = false
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
