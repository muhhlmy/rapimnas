<template>
    <div class="flex flex-col gap-4 w-full">
      <h2 class="font-semibold text-lg text-left">Registered Users</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="user in users"
          :key="user.type"
          class="flex flex-col gap-1 bg-gray-100 p-4 rounded-lg md:min-h-32 md:min-w-44 items-center justify-center"
        >
          <h3 class="font-semibold text-md">{{ user.type }}</h3>
          <p class="text-xl text-gray-500">
            <span>{{ animatedCounts[user.type] || 0 }}</span>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const users = ref([
    {
      type: "Peserta",
      count: 800,
    },
    {
      type: "Peninjau",
      count: 1000,
    },
    {
      type: "ALB",
      count: 200,
    },
    {
      type: "Dewan",
      count: 300,
    },
    {
      type: "Media",
      count: 50,
    },
    {
      type: "VIP",
      count: 60,
    },
  ]);
  
  const animatedCounts = ref({})
  
  const animateCounter = (type, endValue, duration = 2000) => {
    const start = 0
    const startTime = performance.now()
    
    const update = () => {
      const currentTime = performance.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      animatedCounts.value[type] = Math.floor(start + (endValue - start) * progress)
      
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    
    requestAnimationFrame(update)
  }
  
  onMounted(() => {
    users.value.forEach(user => {
      animateCounter(user.type, user.count)
    })
  })
  </script>