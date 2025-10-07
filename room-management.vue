<template>
  <NuxtLayout>
    <!-- Header -->
    <div class="flex justify-between p-10 items-center">
      <h1 class="font-bold text-4xl text-gray-800">Room Management</h1>
      <button class="bg-black text-white px-6 py-2 rounded-xl">
        <a href="">+ Add Room</a>
      </button>
    </div>
    <!-- Main Content -->
    <div class="flex flex-col p-10 gap-8">
      <!-- Search & Filter -->
      <div class="flex gap-4">
        <input
          type="text"
          placeholder="Search"
          class="px-5 py-2 w-full bg-white rounded-xl border border-slate-200"
        />
        <button class="bg-black text-white px-6 py-2 rounded-xl">
          <a href="">Filter</a>
        </button>
      </div>
      <!-- Room Card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        <template v-for="i in 9">
          <!-- Card -->
          <div
            class="h-fit w-full bg-white px-6 py-8 rounded-2xl space-y-6 border border-slate-200"
          >
            <div class="flex w-full justify-between">
              <div>
                <h1 class="font-bold text-xl">Ruang Kresna</h1>
                <p class="mt-1">Lorem ipsum dolor...</p>
              </div>
              <div class="flex h-fit flex-col gap-2">
                <button
                  class="p-2 text-xs rounded flex items-center border border-slate-200 gap-1"
                >
                  <VueIcon name="an:outlined-edit" class="w-5 h-5" />
                </button>

                <button
                  class="p-2 text-xs rounded flex items-center border border-slate-200 gap-1"
                >
                  <VueIcon name="ak:trash-can" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <span class="p-2 text-xs bg-green-100 text-green-400 rounded"
              >Available</span
            >
          </div>
        </template>
      </div>

      <!-- Pagination -->
      <!-- Pagination -->
      <div class="w-full">
        <div
          class="flex justify-center sm:justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2"
        >
          <button class="px-3 py-2 rounded-lg border border-slate-200">
            &lt;
          </button>
          <template v-for="i in 10" :key="'page-' + i">
            <button
              class="px-3 py-2 rounded-lg border border-slate-200 min-w-10"
            >
              {{ i }}
            </button>
          </template>
          <button class="px-3 py-2 rounded-lg border border-slate-200">
            &gt;
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const item = [1, 2, 3, 4];
</script>
