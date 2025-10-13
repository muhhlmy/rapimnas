<template>
  <MobileOnlyWrapper>
    <div class="w-full min-h-screen flex flex-col">
      <main class="fade-up flex-1 overflow-y-auto pb-24 p-6">
        <slot />
      </main>

      <StaffBottomNav />
    </div>
  </MobileOnlyWrapper>
</template>

<script setup></script>

<style scoped>
/* Animasi dari contoh layout admin Anda, diterapkan di sini */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease-in-out forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
