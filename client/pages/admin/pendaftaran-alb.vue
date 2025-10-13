<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
      <!-- Header -->
      <div class="flex flex-col gap-4">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <h1 class="font-bold text-2xl text-gray-800">Pendaftaran ALB</h1>

          <!-- Search and Export -->
          <div class="flex gap-2 w-full sm:w-auto">
            <div class="relative flex-1 sm:flex-none text-sm">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search ALB..."
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
            @click="showAddModal = true"
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
            <span class="hidden sm:inline">Tambah ALB</span>
          </button>
        </div>

        <!-- Table -->
        <div class="text-sm">
          <table class="w-full table-fixed">
            <thead class="bg-gray-100">
              <tr class="border-b border-gray-300">
                <th
                  class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/4"
                >
                  Nama ALB
                </th>
                <th
                  class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/3"
                >
                  Info Ketua
                </th>
                <th
                  class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-1/4"
                >
                  File Mandat
                </th>
                <th
                  class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-20"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- eslint-disable-next-line vue/no-v-for-template-key -->
              <template v-for="item in paginatedData" :key="`main-${item.id}`">
                <!-- Main Row (Clickable) -->
                <tr
                  @click="toggleRow(item.id)"
                  class="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                  :class="{ 'bg-gray-50': expandedRows.has(item.id) }"
                >
                  <!-- Nama ALB -->
                  <td class="py-3 px-3 text-gray-800 font-semibold">
                    <div class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                        :class="{ 'rotate-90': expandedRows.has(item.id) }"
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
                      <span class="truncate">{{ item.nama }}</span>
                    </div>
                  </td>

                  <!-- Info Ketua (Combined) -->
                  <td class="py-3 px-3">
                    <div class="flex items-center gap-3">
                      <img
                        :src="item.peserta[0]?.foto || '/assets/placehold.png'"
                        :alt="item.peserta[0]?.nama || 'No Photo'"
                        class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-800 truncate">
                          {{ item.peserta[0]?.nama || "-" }}
                        </p>
                        <p
                          class="text-xs text-blue-800 font-medium flex-shrink-0"
                        >
                          {{ item.peserta[0]?.kta || "-" }}
                        </p>
                        <div class="text-xs text-gray-500 space-y-0.5">
                          <div class="truncate" :title="item.peserta[0]?.email">
                            📧 {{ item.peserta[0]?.email || "-" }}
                          </div>
                          <div class="truncate">
                            📱 {{ item.peserta[0]?.noTelp || "-" }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- File Mandat -->
                  <td class="py-3 px-3 text-gray-600">
                    <div class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <span class="truncate" :title="item.fileMandat">{{
                        item.fileMandat
                      }}</span>
                    </div>
                  </td>

                  <!-- Actions -->
                  <td class="py-3 px-3" @click.stop>
                    <div class="flex gap-1">
                      <ReusableButton
                        type="edit"
                        title="Edit"
                        @edit="editItem(item)"
                      />
                      <ReusableButton
                        type="delete"
                        title="Delete"
                        @delete="deleteItem(item)"
                      />
                    </div>
                  </td>
                </tr>

                <!-- Expanded Row (Dropdown Table) -->
                <tr
                  :key="`expanded-${item.id}`"
                  v-if="expandedRows.has(item.id)"
                  class="bg-white"
                >
                  <td colspan="4" class="p-0">
                    <div class="px-4 py-2">
                      <div class="mb-2">
                        <h4 class="font-semibold text-gray-800 text-sm">
                          Daftar Peninjau ({{ item.peninjau.length }})
                        </h4>
                      </div>

                      <!-- Peninjau Table -->
                      <div
                        class="bg-white rounded-md border border-gray-100 overflow-hidden"
                      >
                        <div class="overflow-x-auto">
                          <table class="w-full text-sm min-w-max">
                            <thead class="bg-gray-200">
                              <tr>
                                <th
                                  class="text-left py-2 px-3 text-gray-700 font-bold w-16"
                                >
                                  Foto
                                </th>
                                <th
                                  class="text-left py-2 px-3 text-gray-700 font-bold min-w-32"
                                >
                                  Nama
                                </th>
                                <th
                                  class="text-left py-2 px-3 text-gray-700 font-bold w-20"
                                >
                                  KTA
                                </th>
                                <th
                                  class="text-left py-2 px-3 text-gray-700 font-bold w-24"
                                >
                                  Jabatan
                                </th>
                                <th
                                  class="text-left py-2 px-3 text-gray-700 font-bold w-28"
                                >
                                  No Telp
                                </th>
                                <th
                                  class="text-left py-2 px-3 text-gray-700 font-bold min-w-40"
                                >
                                  Email
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="peninjau in item.peninjau"
                                :key="'peninjau-' + peninjau.id"
                                class="border-b border-gray-100 hover:bg-gray-25 last:border-b-0"
                              >
                                <td class="py-2 px-3">
                                  <img
                                    :src="peninjau.foto"
                                    :alt="peninjau.nama"
                                    class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                                  />
                                </td>
                                <td class="py-2 px-3 font-medium text-gray-800">
                                  {{ peninjau.nama }}
                                </td>
                                <td class="py-2 px-3">
                                  <span
                                    class="text-xs text-gray-800 font-medium"
                                  >
                                    {{ peninjau.kta }}
                                  </span>
                                </td>
                                <td class="py-2 px-3">
                                  <span
                                    class="text-xs text-gray-600 font-medium"
                                  >
                                    {{ peninjau.jabatan }}
                                  </span>
                                </td>
                                <td class="py-2 px-3 text-gray-600 text-xs">
                                  {{ peninjau.noTelp }}
                                </td>
                                <td class="py-2 px-3 text-gray-600 text-xs">
                                  <span
                                    class="truncate block"
                                    :title="peninjau.email"
                                  >
                                    {{ peninjau.email }}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>

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
        v-if="showAddModal"
        :header="'Daftarkan ALB'"
        :saveButton="true"
        :cancelButton="true"
        @close="closeModal"
        @save="handleSave"
      >
        <AdminAlbFormAdd ref="albFormRef" />
      </ModalForm>
    </Teleport>

    <Teleport to="body">
      <ModalForm
        v-if="showEditModal"
        :header="'Edit ALB'"
        :saveButton="true"
        :cancelButton="true"
        @close="closeModal"
        @save="handleSave"
      >
        <AdminAlbFormEdit ref="albFormRef" />
      </ModalForm>
    </Teleport>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

// Data
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingItem = ref(null);
const expandedRows = ref(new Set());
const albFormRef = ref(null);


// Sample data - replace with actual API call
const data = ref([
  {
    id: 1,
    nama: "KADIN Jawa Barat",
    fileMandat: "mandat-jabar.pdf",
    peserta: [
      {
        id: 1,
        nama: "Muhammad Helmy",
        kta: "KTA001",
        foto: "/assets/placehold.png",
        noTelp: "08123456789",
        email: "helmy@example.com",
        jabatan: "Ketua",
      },
      {
        id: 2,
        nama: "Ahmad Rizki",
        kta: "KTA002",
        foto: "/assets/placehold.png",
        noTelp: "08123456790",
        email: "rizki@example.com",
        jabatan: "Sekretaris",
      },
    ],
    peninjau: [
      {
        id: 1,
        nama: "Dr. Siti Nurhaliza",
        kta: "KTA003",
        foto: "/assets/placehold.png",
        noTelp: "08123456791",
        email: "siti@example.com",
        jabatan: "Peninjau Senior",
      },
      {
        id: 2,
        nama: "Akbar Maulana",
        kta: "KTA004",
        foto: "/assets/placehold.png",
        noTelp: "08123456791",
        email: "akbar@example.com",
        jabatan: "Peninjau Senior",
      },
    ],
  },
  {
    id: 2,
    nama: "KADIN DKI Jakarta",
    fileMandat: "mandat-jakarta.pdf",
    peserta: [
      {
        id: 3,
        nama: "Budi Santoso",
        kta: "KTA004",
        foto: "/assets/placehold.png",
        noTelp: "08123456792",
        email: "budi@example.com",
        jabatan: "Ketua",
      },
      {
        id: 4,
        nama: "Dewi Sartika",
        kta: "KTA005",
        foto: "/assets/placehold.png",
        noTelp: "08123456793",
        email: "dewi@example.com",
        jabatan: "Bendahara",
      },
    ],
    peninjau: [
      {
        id: 2,
        nama: "Prof. Andi Wijaya",
        kta: "KTA006",
        foto: "/assets/placehold.png",
        noTelp: "08123456794",
        email: "andi@example.com",
        jabatan: "Peninjau Ahli",
      },
    ],
  },
  {
    id: 3,
    nama: "KADIN Jawa Timur",
    fileMandat: "mandat-jatim.pdf",
    peserta: [
      {
        id: 5,
        nama: "Rina Marlina",
        kta: "KTA007",
        foto: "/assets/placehold.png",
        noTelp: "08123456795",
        email: "rina@example.com",
        jabatan: "Ketua",
      },
    ],
    peninjau: [
      {
        id: 3,
        nama: "Dr. Fajar Nugraha",
        kta: "KTA008",
        foto: "/assets/placehold.png",
        noTelp: "08123456796",
        email: "fajar@example.com",
        jabatan: "Peninjau Senior",
      },
    ],
  },
]);

// Computed properties
const filteredData = computed(() => {
  if (!searchQuery.value) return data.value;
  return data.value.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
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
    ["Nama ALB", "File Mandat", "Total Peserta", "Total Peninjau"],
    ...filteredData.value.map((item) => [
      item.nama,
      item.fileMandat,
      item.peserta.length,
      item.peninjau.length,
    ]),
  ];

  const csvString = csvContent.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pendaftaran-alb.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

const editItem = (item) => {
  showEditModal.value = true;
  editingItem.value = item;
};

const deleteItem = (item) => {
//   if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
//     const index = data.value.findIndex((d) => d.id === item.id);
//     if (index > -1) {
//       data.value.splice(index, 1);
//     }
//   }
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

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  editingItem.value = null;
};

const handleSave = () => {
  albFormRef.value?.submitForm?.();
};

// Watch for search changes to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
});

onMounted(() => {
  // Load data from API here
});
</script>
