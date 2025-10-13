<template>
    <div class="gradient-background">
        <LandingNavbar />
        
        <LandingHero />

        <!-- Registration Section -->
        <LandingRegistration @loading="handleLoading" />

        <!-- Contact Section -->
        <LandingContact />

        <!-- Footer -->
        <LandingFooter />

        <!-- Back to top button -->
        <LandingBackToTop />

        <Teleport to="body">
        <Loader v-if="isLoading" />
        </Teleport>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const handleLoading = (value) => {
    isLoading.value = value
}
</script>

<style scoped>
.gradient-background {
    background: linear-gradient(360deg, #FFFFFF 0%, #193CB8 100%);
    min-height: 100vh;
}
</style>