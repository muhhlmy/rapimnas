<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">Room Management</h1>

            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Room..."
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
              <span class="hidden sm:inline">Tambah Room</span>
            </button>
          </div>

          <div class="flex flex-col gap-8 mb-5">
            <!-- Room Card -->
            <div class="grid grid-cols-3 gap-5 w-full">
              <div v-for="item in filteredData" :key="item.id">
                <!-- Card -->
                <AdminRoomCard
                  :room="item"
                  @edit="(id) => openModal('edit', id)"
                  @erase="(id) => openModal('erase', id)"
                  @detail="(id) => openModal('detail', id)"
                />
              </div>
            </div>

            <!-- Pagination -->
            <!-- <div class="w-full">
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
            </div> -->
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
        </div>
      </div>

      <Teleport to="body">
        <ModalForm
          v-if="showModal.add"
          :header="'Daftarkan Ruangan'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminRoomFormAdd ref="roomFormRef" />
        </ModalForm>
      </Teleport>

      <Teleport to="body">
        <ModalForm
          v-if="showModal.edit"
          :header="'Edit Ruangan'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminRoomFormEdit ref="roomFormRef" />
        </ModalForm>
      </Teleport>

      <Teleport to="body">
        <ModalErase v-if="showModal.erase" @close="closeModal" @erase="handleErase" />
      </Teleport>

      <Teleport to="body">
        <ModalForm
          v-if="showModal.detail"
          :header="'Detail Ruangan'"
          :closeButton="true"
          @close="closeModal"
        >
          <AdminRoomDetailEvent />
        </ModalForm>
      </Teleport>

    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
const item = [1, 2, 3, 4];
const data = ref([
  {
    id: 1,
    name: "Ruang Kresna",
  },
  {
    id: 2,
    name: "Ruang SBS Kadin Indonesia",
  },
  {
    id: 3,
    name: "Ruang Kasuari 3",
  },
  {
    id: 4,
    name: "Ruang Kasuari 4",
  },
  {
    id: 5,
    name: "Ruang Kasuari 5",
  },
]);
const currentPage = ref(1);
const itemsPerPage = ref(9);
const searchQuery = ref("");
const showModal = ref({
  add: false,
  edit: false,
  erase: false,
  detail: false,
})

const selectedRoomId = ref(null)

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value;
  return data.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value?.length / itemsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

const openModal = (type, id = null) => {
  if (!showModal.value[type] === undefined) return;
  // Tutup semua modal terlebih dahulu, lalu buka yang diminta
  for (const key in showModal.value) showModal.value[key] = false;
  showModal.value[type] = true;
  selectedRoomId.value = id;
};

const closeModal = () => {
  for (const key in showModal.value) showModal.value[key] = false;
  selectedRoomId.value = null;
};

const handleSave = () => {
  roomFormRef.value?.submitForm?.();
};

const handleErase = () => {
  if (!selectedRoomId.value) return;
  // TODO: panggil API hapus berdasarkan selectedRoomId
  // contoh: await deleteRoom(selectedRoomId.value)
  closeModal();
};
</script>
