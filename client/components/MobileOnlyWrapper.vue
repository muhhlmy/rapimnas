<template>
    <!-- Loading State -->
    <Loader v-if="isLoading" />
    
    <!-- Mobile Content -->
    <div v-else-if="isMobile" class="h-screen">
      <slot />
    </div>
    
    <!-- Error Message -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <!-- Icon -->
        <div class="mb-6">
          <VueIcon name="bx:mobile" class="w-20 h-20 mx-auto text-gray-400" />
        </div>
        
        <!-- Title -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          Akses Terbatas
        </h1>
        
        <!-- Message -->
        <p class="text-gray-600 mb-6 leading-relaxed">
          Mohon akses web staff di mobile Anda. 
          <br />
          Halaman ini hanya dapat diakses melalui perangkat mobile dengan resolusi layar yang memadai.
        </p>
        
        <!-- Resolution Info -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-500 mb-2">Resolusi layar saat ini:</p>
          <p class="text-lg font-mono text-gray-700">
            {{ screenWidth }} × {{ screenHeight }}px
          </p>
          <p class="text-xs text-gray-400 mt-1">
            Maximum yang diperbolehkan: 1024 × 720px
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
  import VueIcon from '@kalimahapps/vue-icons/VueIcon'
import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const isMobile = ref(false)
  const screenWidth = ref(0)
  const screenHeight = ref(0)
  const isLoading = ref(true)
  
  // MAXimum resolution untuk desktop (1024x720)
  const MAX_DESKTOP_WIDTH = 1024
  const MAX_DESKTOP_HEIGHT = 720
  
  const checkScreenSize = () => {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
    
    isMobile.value = 
      screenWidth.value <= MAX_DESKTOP_WIDTH 
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
  