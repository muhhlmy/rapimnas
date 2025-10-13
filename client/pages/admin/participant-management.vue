<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">
              Participant Management
            </h1>
            <!-- Search and Export -->
            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Participant..."
                  class="pl-10 pr-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
                <svg
                  class="absolute left-3 top-2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <button
                @click="exportExcel"
                class="px-4 py-2 bg-lime-400 rounded-md hover:bg-lime-600 transition-colors flex-shrink-0 text-sm"
              >
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <!-- Button Active Tab -->
        <div class="flex gap-2 text-sm mt-5">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="[
              'px-6 py-2 rounded-md cursor-pointer transition-colors',
              { 'bg-black text-white': activeTab === tab },
              { 'bg-white text-black hover:bg-gray-100': activeTab !== tab },
            ]"
            @click="changeTab(tab)"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Content Card -->
        <div class="flex flex-col gap-4 rounded-md bg-white p-6">
          <div class="flex gap-2 self-end text-sm">
            <AdminParticipantsDropdown
              v-model="selectedInstansi"
              :options="instansiOptions"
              placeholder="Pilih Instansi"
            />

            <button
              @click="resetFilters"
              class="bg-black text-white font-semibold py-1 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              Reset
            </button>
          </div>

          <!-- KUNCI UTAMA: Tambahkan :key="activeTab" di sini -->
          <!-- Setiap kali 'activeTab' berubah, div ini akan dianggap baru dan animasi akan berjalan lagi -->
          <div :key="activeTab" class="fade-up grid grid-cols-3 gap-4">
            <!-- Card content tetap sama -->
            <div
              v-for="item in filteredData"
              :key="item.id"
              class="flex items-start border border-slate-200 rounded-lg p-4 gap-3 bg-white"
            >
              <div class="w-full">
                <div class="flex items-center justify-between w-full">
                  <h3 class="font-bold text-lg text-gray-800">{{ item.name }}</h3>
                  <div class="flex gap-2 items-center">
                    <button
                      class="bg-amber-100 rounded-lg py-1 px-3 text-xs font-medium text-amber-600 hover:bg-amber-200 cursor-pointer"
                    >
                      Revisi
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg> -->
                    </button>
                    <button
                      class="bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200 cursor-pointer"
                    >
                      <VueIcon name="bx:trash" class="w-5 h-5" />
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg> -->
                    </button>
                  </div>
                </div>
                <div class="text-sm space-y-1 mt-1">
                  <div>
                    <p class="text-gray-500 font-medium">{{ item.company }}</p>
                    <p class="font-medium">{{ item.position }}</p>
                  </div>
                  <p class="text-gray-500 font-medium">{{ item.role }}</p>
                  <p class="text-gray-500">{{ item.email }}</p>
                  <p class="text-gray-500">{{ item.phone }}</p>
                  <div class="flex items-center gap-1.5 text-gray-800">
                    <span>{{ item.id }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                  </div>
                  <p class="text-gray-400">Last seen : -</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
import { ref, computed } from "vue";// Pastikan path ini benar

const allParticipants = ref([
  { id: '8374-9831', name: 'Marley', company: 'Kadin Indonesia', position: 'Ketua Umum', role: 'Peserta', email: 'marley@hotmail.com', phone: '+62 812 3456 7890' },
  { id: '1234-5678', name: 'Alex', company: 'Media Corp', position: 'Wartawan', role: 'Media', email: 'alex@media.com', phone: '+62 812 1111 2222' },
  { id: '9876-5432', name: 'Sarah', company: 'Gov Agency', position: 'Analis', role: 'Peninjau', email: 'sarah@gov.id', phone: '+62 812 3333 4444' },
  { id: '1122-3344', name: 'Budi', company: 'Startup XYZ', position: 'CEO', role: 'Peserta', email: 'budi@xyz.com', phone: '+62 812 5555 6666' },
]);

const searchQuery = ref("");
const activeTab = ref("All");
const tabs = ref(["All", "Peserta", "Peninjau", "Media"]);

const selectedInstansi = ref("");
const instansiOptions = ref([
  { value: "kemdikbud", text: "Kemdikbud Ristek" },
  { value: "kemenkeu", text: "Kementerian Keuangan" },
  { value: "pemprov-dki", text: "Pemprov DKI Jakarta" },
]);


const filteredData = computed(() => {
    if (activeTab.value === 'All') {
        return allParticipants.value;
    }
    return allParticipants.value.filter(p => p.role === activeTab.value);
});

const changeTab = (tab) => {
  activeTab.value = tab;
  // Di sini Anda bisa menambahkan logika fetch data baru dari API jika diperlukan
  console.log(`Tab diubah ke: ${tab}`);
};

const exportExcel = () => {
  console.log("Export Excel");
};

const resetFilters = () => {
  selectedInstansi.value = "";
  console.log("Filter direset!");
};
</script>

<style scoped>
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  /* Menambahkan 'animation-fill-mode' agar tidak kembali ke state awal setelah selesai */
  animation: fadeUp 0.5s ease-out forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

