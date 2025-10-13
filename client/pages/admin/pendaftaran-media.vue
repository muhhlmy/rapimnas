<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">Pendaftaran Media</h1>

            <!-- Search and Export -->
            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Media..."
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
              <span class="hidden sm:inline">Tambah Media</span>
            </button>
          </div>

          <!-- Table -->
          <div class="text-sm">
            <table class="w-full">
              <thead class="bg-gray-100">
                <tr class="border-b border-gray-300">
                  <th
                    class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/5"
                  >
                    Nama Media / Anggota
                  </th>
                  <th
                    class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/5"
                  >
                    Jabatan
                  </th>
                  <th
                    class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/5"
                  >
                    No Telp
                  </th>
                  <th
                    class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/5"
                  >
                    Email
                  </th>
                  <th
                    class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/5"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in tableRows"
                  :key="row.key"
                  @click="row.type === 'main' ? toggleRow(row.item.id) : null"
                  class="border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                  :class="{ 
                    'cursor-pointer bg-gray-50': row.type === 'main' && expandedRows.has(row.item.id),
                    'cursor-pointer': row.type === 'main',
                    'bg-white': row.type === 'sub'
                  }"
                >
                  <td class="py-3 px-3 text-gray-800 font-semibold" v-if="row.type === 'main'">
                    <div class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                        :class="{ 'rotate-90': expandedRows.has(row.item.id) }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                      <span class="truncate"
                        >{{ row.item.nama }} ({{ row.item.media.length }})</span
                      >
                    </div>
                  </td>
                  <td class="py-2 pr-3 pl-10 text-gray-700" v-else>
                    <div class="flex items-center gap-3">
                      <img
                        :src="row.item.foto"
                        :alt="row.item.nama"
                        class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                      />
                      <span class="font-medium">{{ row.item.nama }}</span>
                    </div>
                  </td>

                  <!-- Kolom Jabatan -->
                  <td class="py-2 px-3 text-gray-600" v-if="row.type === 'sub'">
                    {{ row.item.jabatan }}
                  </td>
                  <td v-else></td>

                  <!-- Kolom No Telp -->
                  <td class="py-2 px-3 text-gray-600" v-if="row.type === 'sub'">
                    {{ row.item.noTelp }}
                  </td>
                  <td v-else></td>

                  <!-- Kolom Email -->
                  <td class="py-2 px-3 text-gray-600" v-if="row.type === 'sub'">
                    {{ row.item.email }}
                  </td>
                  <td v-else></td>

                  <!-- Kolom Actions -->
                  <td class="py-3 px-3" v-if="row.type === 'main'" @click.stop>
                    <div class="flex gap-1">
                      <ReusableButton
                        type="edit"
                        title="Edit"
                        @edit="editItem(row.item)"
                      />
                      <ReusableButton
                        type="delete"
                        title="Delete"
                        @delete="deleteItem(row.item)"
                      />
                    </div>
                  </td>
                  <td v-else></td>
                </tr>

                <tr v-if="paginatedData.length === 0">
                  <td colspan="4" class="text-center py-8 text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
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

      <Teleport to="body">
      <ModalForm
        v-if="showModal.add"
        :header="'Daftarkan Media'"
        :saveButton="true"
        :cancelButton="true"
        @close="closeModal"
        @save="handleSave"
      >
        <AdminMediaFormAdd ref="MediaFormRef" />
      </ModalForm>
    </Teleport>

    <Teleport to="body">
      <ModalForm
        v-if="showModal.edit"
        :header="'Edit Media'"
        :saveButton="true"
        :cancelButton="true"
        @close="closeModal"
        @save="handleSave"
      >
        <AdminMediaFormEdit ref="MediaFormRef" />
      </ModalForm>
    </Teleport>

    <Teleport to="body">
        <ModalErase
          v-if="showModal.erase"
          @close="closeModal"
          @erase="handleErase"
        />
      </Teleport>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

// Data
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showModal = ref({
  add: false,
  edit: false,
  erase: false,
})
const selectedItemId = ref(null)
const editingItem = ref(null);
const expandedRows = ref(new Set());
const MediaFormRef = ref(null);

// Debounce untuk pencarian agar tidak memicu filter di setiap ketikan
const debouncedSearchQuery = ref("");
let debounceTimer = null;

// Sample data - replace with actual API call
const data = ref([
  {
    id: 1,
    nama: "TV One",
    media: [
      {
        id: 1,
        nama: "Muhammad Helmy",
        foto: "/assets/placehold.png",
        noTelp: "08123456789",
        email: "helmy@example.com",
        jabatan: "Ketua",
      },
      {
        id: 2,
        nama: "Ahmad Rizki",
        foto: "/assets/placehold.png",
        noTelp: "08123456790",
        email: "rizki@example.com",
        jabatan: "Sekretaris",
      },
    ],
  },
  {
    id: 2,
    nama: "TV Seven",
    fileMandat: "mandat-jakarta.pdf",
    media: [
      {
        id: 3,
        nama: "Budi Santoso",
        foto: "/assets/placehold.png",
        noTelp: "08123456792",
        email: "budi@example.com",
        jabatan: "Ketua",
      },
      {
        id: 4,
        nama: "Dewi Sartika",
        foto: "/assets/placehold.png",
        noTelp: "08123456793",
        email: "dewi@example.com",
        jabatan: "Bendahara",
      },
    ],
  },
  {
    id: 3,
    nama: "ANTV",
    media: [
      {
        id: 5,
        nama: "Rina Marlina",
        foto: "/assets/placehold.png",
        noTelp: "08123456795",
        email: "rina@example.com",
        jabatan: "Ketua",
      },
    ],
  },
]);

// Computed properties
const filteredData = computed(() => {
  if (!debouncedSearchQuery.value) return data.value;
  return data.value.filter((item) =>
    item.nama.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
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

const tableRows = computed(() => {
  const rows = [];
  paginatedData.value.forEach(item => {
    // Add main row
    rows.push({
      key: `main-${item.id}`,
      type: 'main',
      item: item
    });
    
    // Add sub rows if expanded
    if (expandedRows.value.has(item.id)) {
      item.media.forEach(anggota => {
        rows.push({
          key: `anggota-${anggota.id}`,
          type: 'sub',
          item: anggota
        });
      });
    }
  });
  return rows;
});

// Methods
const toggleRow = (itemId) => {
  if (expandedRows.value.has(itemId)) {
    expandedRows.value.delete(itemId);
  } else {
    expandedRows.value.add(itemId);
  }
};

const exportExcel = () => {
  // For now, export as CSV (can be enhanced to actual Excel format later)
  const csvContent = [
    ["Nama Media", "File Mandat", "Total Anggota Media"],
    ...filteredData.value.map((item) => [
      item.nama ?? "",
      item.fileMandat ?? "",
      Array.isArray(item.media) ? item.media.length : 0,
    ]),
  ];

  const csvString = csvContent.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pendaftaran-media.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

const editItem = (item) => {
  openModal('edit', item);
};

const deleteItem = (item) => {
  openModal('erase', item);
};

const handleErase = () => {
  if (!selectedItemId.value) return;
  // TODO: panggil API hapus berdasarkan selectedItemId
  // contoh: await deleteMedia(selectedItemId.value.id)
  closeModal();
};

const saveItem = () => {
  //   if (editingItem.value) {
  //     // Update existing item
  //     const index = data.value.findIndex((d) => d.id === editingItem.value.id);
  //     if (index > -1) {
  //       data.value[index] = {
  //         ...data.value[index],
  //         nama: formData.value.nama,
  //         fileMandat: formData.value.fileMandat,
  //       };
  //     }
  //   } else {
  //     // Add new item
  //     const newId = Math.max(...data.value.map((d) => d.id)) + 1;
  //     data.value.push({
  //       id: newId,
  //       nama: formData.value.nama,
  //       fileMandat: formData.value.fileMandat,
  //       peserta: [],
  //       peninjau: [],
  //     });
  //   }

  closeModal();
};

const openModal = (type, id = null) => {
  if (!showModal.value[type] === undefined) return;
  for (const key in showModal.value) showModal.value[key] = false;
  showModal.value[type] = true;
  selectedItemId.value = id;
  editingItem.value = id;
};

const closeModal = () => {
  for (const key in showModal.value) showModal.value[key] = false;
  selectedItemId.value = null;
  editingItem.value = null;
};

const handleSave = () => {
  MediaFormRef.value?.submitForm?.();
};

// Debounce perubahan keyword pencarian
watch(
  searchQuery,
  (newVal) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debouncedSearchQuery.value = newVal;
    }, 300);
  },
  { immediate: true }
);

// Kembali ke halaman 1 saat keyword pencarian (yang sudah di-debounce) berubah
watch(debouncedSearchQuery, () => {
  currentPage.value = 1;
});

onMounted(() => {
  // Load data from API here
});

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>
