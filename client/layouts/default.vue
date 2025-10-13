<template>
  <div class="w-full min-h-screen flex bg-slate-100">
    <AdminSidebar />
    <div class="fade-up flex-1">
      <slot />
    </div>
  </div>
</template>

<style scoped>
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
