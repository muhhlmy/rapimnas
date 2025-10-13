<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">Event Management</h1>

            <!-- Search and Export -->
            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Event..."
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

        <!-- Content Card -->
        <div class="flex flex-col gap-4 rounded-md bg-white p-6">
          <!-- Add Button -->
          <div class="flex justify-end">
            <button
              @click="openModal('add')"
              class="cursor-pointer px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-neutral-800 hover:scale-105 transition-all flex items-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <span class="hidden sm:inline">Tambah Event</span>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div v-for="item in filteredEvents" :key="item.id">
              <EventCard
                :event="item"
                @edit="(id) => openModal('edit', id)"
                @delete="(id) => openModal('erase', id)"
              />
            </div>
          </div>

          <div
            class="flex justify-center items-center gap-2 mt-6 text-sm"
            v-if="totalPages > 1"
          >
            <button
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 rounded',
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-3 py-1 text-gray-400">...</span>
            </div>

            <button
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        <Teleport to="body">
          <ModalForm
            v-if="showModal.add"
            :header="'Daftarkan Event'"
            :saveButton="true"
            :cancelButton="true"
            @close="closeModal"
            @save="handleSave"
          >
            <AdminEventFormAdd ref="eventFormRef" />
          </ModalForm>
        </Teleport>

        <Teleport to="body">
          <ModalForm
            v-if="showModal.edit"
            :header="'Edit Event'"
            :saveButton="true"
            :cancelButton="true"
            @close="closeModal"
            @save="handleSave"
          >
            <AdminEventFormEdit ref="eventFormRef" />
          </ModalForm>
        </Teleport>

        <Teleport to="body">
        <ModalErase v-if="showModal.erase" @close="closeModal" @erase="handleErase" />
      </Teleport>
      </div>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from "vue";

const searchQuery = ref("");
const showModal = ref({
  add: false,
  edit: false,
  erase: false
})

const selectedEventId = ref(null)
const eventFormRef = ref(null);
const dataEvent = [
  {
    id: 'evt-1',
    month: "Jan",
    date: "15",
    location: "Ruang Rapat Utama",
    title: "Rapat Koordinasi",
    time: "09:00 - 11:00",
  },
  {
    id: 'evt-2',
    month: "Feb",
    date: "03",
    location: "Auditorium Lantai 2",
    title: "Pelatihan Keahlian Digital",
    time: "13:30 - 16:30",
  },
  {
    id: 'evt-3',
    month: "Mar",
    date: "28",
    location: "Online (Zoom)",
    title: "Diskusi Proyek Akhir Kuartal",
    time: "10:00 - 12:00",
  },
  {
    id: 'evt-4',
    month: "Apr",
    date: "10",
    location: "Ruang Serbaguna",
    title: "Acara Pemberian Penghargaan Karyawan",
    time: "18:00 - 20:00",
  },
  {
    id: 'evt-5',
    month: "Mei",
    date: "05",
    location: "Kantor Cabang Barat",
    title: "Kunjungan Lapangan dan Evaluasi",
    time: "08:00 - 12:00",
  },
  {
    id: 'evt-6',
    month: "Jun",
    date: "17",
    location: "Ruang Rapat Kecil A",
    title: "Sesi Brainstorming Produk Baru",
    time: "14:00 - 15:30",
  },
];


const currentPage = ref(1);
const itemsPerPage = ref(10);

// Debounce search
const debouncedQuery = ref("");
let debounceTimer = null;
watch(searchQuery, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = val?.toLowerCase?.() || "";
    currentPage.value = 1;
  }, 300);
});
onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

// Filtered events using debounced query
const filteredEvents = computed(() => {
  if (!debouncedQuery.value) return dataEvent;
  return dataEvent.filter((e) => {
    const haystack = `${e.title} ${e.location} ${e.month} ${e.date} ${e.time}`.toLowerCase();
    return haystack.includes(debouncedQuery.value);
  });
});

const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage.value));
const visiblePages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});

const openModal = (type, id = null) => {
  if (!showModal.value[type] === undefined) return;
  for (const key in showModal.value) showModal.value[key] = false;
  showModal.value[type] = true;
  selectedEventId.value = id;
};

const closeModal = () => {
  for (const key in showModal.value) showModal.value[key] = false;
  selectedEventId.value = null;
};

const handleSave = () => {
  eventFormRef.value?.submitForm?.();
};

const exportExcel = () => {
  console.log("exportExcel");
};
</script>
