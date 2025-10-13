<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <h1 class="font-bold text-2xl text-right md:text-left">
          Welcome, Admin
        </h1>
        <div class="flex flex-col gap-4 rounded-lg bg-white p-6">
          <AdminDashboardCardUsers />

          <div class="flex flex-col gap-4 w-full">
            <h2 class="font-semibold text-lg text-left">Registered Events</h2>
            <div class="grid md:grid-cols-3 gap-4">
              <div v-for="item in 5" :key="item">
                <EventCard
                  :event="{
                    id: '1',
                    month: 'Jan',
                    date: '15',
                    location: 'Ruang Rapat Utama',
                    title: 'Rapat Koordinasi',
                    time: '09:00 - 11:00'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>
