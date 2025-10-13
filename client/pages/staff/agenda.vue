<template>
  <NuxtLayout name="staff">
    <div class="">
      <div class="flex flex-col gap-4 mb-8">
        <h1 class="text-xl font-bold text-neutral-800">Ongoing</h1>
        <div class="max-h-72 overflow-y-auto space-y-2">
          <div v-for="item in 5" :key="item">
            <StaffAgendaCard />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 mb-8">
        <h1 class="text-xl font-bold text-neutral-800">Upcoming</h1>
        <div class="max-h-72 overflow-y-auto space-y-2">
          <div v-for="item in 5" :key="item">
            <StaffAgendaCard />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
