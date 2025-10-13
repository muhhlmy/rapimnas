<!-- components/RegistrationSection.vue -->
<template>
  <div class="w-[1748px] h-[2480px] bg-white flex flex-col relative overflow-hidden">
    <!-- User Photo Background (stretched to fill entire card) -->
    <div v-if="photoUrl" class="absolute inset-0 w-full h-full z-0">
      <img 
        :src="photoUrl" 
        alt="User Photo" 
        class="w-full h-full object-cover"
      >
    </div>
    
    <!-- Logo layer -->
    <div class="flex-1 relative z-10">
      <img :src="kadinLogo" alt="Logo KADIN" class="w-[177px] h-[173px] ml-[104px] mt-[74px]">
      <!-- konten utama -->
    </div>
    
    <!-- Background image layer -->
    <div class="w-[1748px] h-[819px] relative z-10">
      <img :src="bgImage" alt="Background" class="w-full h-full object-cover">
      
      <!-- Teks di atas image -->
      <!-- <div class="absolute inset-0 flex-col gap-6">
        <h1 class="text-white text-6xl font-bold">Teks Anda Di Sini</h1>
        <h1 class="text-white text-6xl font-bold">Teks Anda Di Sini</h1>
        <h1 class="text-white text-6xl font-bold">Teks Anda Di Sini</h1>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const config = useRuntimeConfig();
import bgImage from '../../assets/Vector-1.png'
import kadinLogo from '../../assets/logo.png'

// Accept photo URL as a prop
const props = defineProps({
  photoUrl: {
    type: String,
    default: null
  }
});

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}
</script>

