<template>
  <div
    class="fixed bottom-4 left-0 right-0 w-[90%] mx-auto rounded-xl bg-blue-900 px-4 py-2 grid grid-cols-3 items-start justify-center gap-2 text-center"
  >
    <NuxtLink
      to="/staff/home"
      class="flex flex-col items-center justify-center"
    >
      <VueIcon name="bx:home" class="w-5 h-5 text-white" />
      <p class="text-white text-xs font-light">Home</p>
    </NuxtLink>
    <NuxtLink
      to="/staff/agenda"
      class="flex flex-col items-center justify-center"
    >
      <VueIcon name="bx:calendar" class="w-5 h-5 text-white" />
      <p class="text-white text-xs font-light">Agenda</p>
    </NuxtLink>
    <NuxtLink
      to="/staff/check-participant"
      class="flex flex-col items-center justify-center"
    >
      <VueIcon name="bx:pin" class="w-5 h-5 text-white" />
      <p class="text-white text-xs font-light">Cek Peserta</p>
    </NuxtLink>
  </div>
</template>
