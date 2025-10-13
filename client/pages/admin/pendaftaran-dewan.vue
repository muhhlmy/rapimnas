<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">Pendaftaran Dewan</h1>

            <!-- Search and Export -->
            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Dewan..."
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
              <span class="hidden sm:inline">Tambah Dewan</span>
            </button>
          </div>

          <!-- Tabel -->
          <table class="w-full table-fixed">
            <thead class="bg-gray-100">
              <tr class="border-b border-gray-300">
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm w-12"
                >
                  No
                </th>
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Nama
                </th>
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Kategori
                </th>
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Jabatan
                </th>
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Email
                </th>
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  No Telp
                </th>
                <!-- <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Jenis Kelamin
                </th> -->
                <th
                  class="text-center py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Dokumen
                </th>
                <th
                  class="text-left py-3 px-3 font-semibold text-gray-800 text-sm"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Loading state -->
              <tr v-if="loading">
                <td colspan="8" class="px-2 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    <span class="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>

              <!-- No data state -->
              <tr v-else-if="paginatedData.length === 0">
                <td colspan="8" class="px-2 py-8 text-center text-gray-500">
                  Tidak ada data dewan yang ditemukan
                </td>
              </tr>

              <!-- Data rows -->
              <tr
                v-else
                v-for="(item, idx) in paginatedData"
                :key="item.id"
                class="text-sm border-b border-gray-200 align-top hover:bg-gray-50"
              >
                <td class="px-2 py-3 text-gray-700 text-center">
                  {{ (currentPage - 1) * itemsPerPage + idx + 1 }}
                </td>
                <td class="px-2 py-3 text-gray-700 break-words leading-snug flex gap-2 justify-between items-start">
                  {{ item.name }}
                  <span
                    class="text-xs flex items-center"
                    :class="item.gender === 'Laki-laki' ? 'text-blue-300' : 'text-pink-300'"
                  >
                    <VueIcon
                      :name="item.gender === 'Laki-laki' ? 'bx:male-sign' : 'bx:female-sign'"
                      class="w-4 h-4"
                    />
                  </span>
                </td>
                <td class="px-2 py-3 text-gray-700">{{ item.category || '-' }}</td>
                <td class="px-2 py-3 text-gray-700 break-words leading-snug">
                  {{ item.position || '-' }}
                </td>
                <td class="px-2 py-3 text-gray-700 break-words">
                  {{ item.email || '-' }}
                </td>
                <td class="px-2 py-3 text-gray-700">{{ item.phone || '-' }}</td>
                <td class="px-2 py-3 text-gray-700">
                  {{ formatGender(item.gender) }}
                </td>
                <td class="px-2 py-3 text-gray-700">{{ item.phone }}</td>
                <!-- <td class="px-2 py-3 text-gray-700">{{ item.gender }}</td> -->
                <td class="px-2 py-3 text-gray-700"><button @click="showSeeFilesModal = true" class="px-4 py-2 text-gray-800 hover:bg-gray-300 border border-gray-200 rounded-md cursor-pointer text-sm">Lihat Dokumen</button></td>
                <td class="px-2 py-3">
                  <div class="flex items-center gap-2 justify-start">
                    <ReusableButton type="edit" title="Edit" @click="handleEdit(item)" />
                    <ReusableButton type="delete" title="Delete" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div
            class="flex justify-between items-center mt-6 text-sm"
            v-if="!loading && totalCount > 0"
          >
            <!-- Info text -->
            <div class="text-gray-600">
              Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, totalCount) }} of {{ totalCount }} entries
            </div>

            <!-- Pagination buttons -->
            <div class="flex items-center gap-2" v-if="totalPages > 1">
              <button
                @click="currentPage > 1 && (currentPage = currentPage - 1)"
                :disabled="currentPage === 1 || loading"
                class="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div v-for="page in visiblePages" :key="page">
                <button
                  v-if="page !== '...'"
                  @click="currentPage = page"
                  :disabled="loading"
                  :class="[
                    'px-3 py-1 rounded',
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  {{ page }}
                </button>
                <span v-else class="px-3 py-1 text-gray-400">...</span>
              </div>

              <button
                @click="currentPage < totalPages && (currentPage = currentPage + 1)"
                :disabled="currentPage === totalPages || loading"
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
          v-if="showAddModal"
          :header="'Daftarkan Dewan'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminDewanFormAdd ref="dewanFormRef" />
        </ModalForm>
      </Teleport>

      <Teleport to="body">
        <ModalForm
          v-if="showEditModal"
          :header="'Edit Dewan'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminDewanFormEdit ref="dewanFormRef" />
        </ModalForm>
      </Teleport>

      <Teleport to="body">
        <ModalForm
          v-if="showSeeFilesModal"
          :header="'Lihat Dokumen'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminDewanSeeDetails />
        </ModalForm>
      </Teleport>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const config = useRuntimeConfig();
const router = useRouter();

// Categories mapping for Dewan
// KI WKUK, KI WKU, KI KOMTAP, KI WAKOMTAP → Dewan Pengurus
// Dewan Usaha → DU
// Dewan Penasihat → DP
// Dewan Kehormatan → DK
const ALLOWED_CATEGORIES = ["KI WKUK", "KI WKU", "KI KOMTAP", "KI WAKOMTAP", "DU", "DP", "DK"];

const activeTab = ref("All");
const tabs = ref([
  "All",
  "Dewan Pengurus",
  "Dewan Usaha",
  "Dewan Penasihat",
  "Dewan Kehormatan",
]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showSeeFilesModal = ref(false);
const dewanFormRef = ref(null);

// Debounce untuk pencarian agar tidak memicu filter di setiap ketikan
const debouncedSearchQuery = ref("");
let debounceTimer = null;

// Data from API
const data = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const lastPage = ref(0);

// Fetch participants from API
const fetchParticipants = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();

    // Add pagination
    params.append('page', JSON.stringify({
      number: currentPage.value,
      size: itemsPerPage.value
    }));

    // Add search if exists
    if (debouncedSearchQuery.value) {
      params.append('search', debouncedSearchQuery.value);
    }

    // Add filter for category based on active tab
    if (activeTab.value === 'Dewan Pengurus') {
      // Dewan Pengurus includes: KI WKUK, KI WKU, KI KOMTAP, KI WAKOMTAP
      params.append('filter', JSON.stringify({
        category: ["KI WKUK", "KI WKU", "KI KOMTAP", "KI WAKOMTAP"]
      }));
    } else if (activeTab.value === 'Dewan Usaha') {
      params.append('filter', JSON.stringify({
        category: 'DU'
      }));
    } else if (activeTab.value === 'Dewan Penasihat') {
      params.append('filter', JSON.stringify({
        category: 'DP'
      }));
    } else if (activeTab.value === 'Dewan Kehormatan') {
      params.append('filter', JSON.stringify({
        category: 'DK'
      }));
    }
    // When "All" is selected, don't add category filter to show all participants

    const response = await $fetch(`${config.public.BaseUrl}/participants?${params.toString()}`);

    data.value = response.rows || [];
    totalCount.value = response.count || 0;
    lastPage.value = response.lastPage || 0;

  } catch (error) {
    console.error('Error fetching participants:', error);
    data.value = [];
    totalCount.value = 0;
    lastPage.value = 0;
  } finally {
    loading.value = false;
  }
};

const changeTab = (tab) => {
  activeTab.value = tab;
  currentPage.value = 1; // Reset to first page when changing tabs
  fetchParticipants();
};

const exportExcel = () => {
  console.log("Export Excel");
};

// Use data directly from API response (no client-side filtering needed)
const filteredData = computed(() => {
  return data.value;
});

const totalPages = computed(() => {
  return lastPage.value;
});

const paginatedData = computed(() => {
  return data.value; // API already returns paginated data
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

// Kembali ke halaman 1 saat keyword pencarian (yang sudah di-debounce) berubah dan fetch data
watch(debouncedSearchQuery, () => {
  currentPage.value = 1;
  fetchParticipants();
});

// Watch for page changes
watch(currentPage, () => {
  fetchParticipants();
});

// Initial data fetch
onMounted(() => {
  fetchParticipants();
});

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

// Helper function to format gender display
const formatGender = (gender) => {
  if (gender === 'male') return 'Laki-laki';
  if (gender === 'female') return 'Perempuan';
  return '-';
};

const handleEdit = (item) => {
  showEditModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showSeeFilesModal.value = false;
};

const handleSave = () => {
  // Implement save logic here
  console.log("Save logic to be implemented");
  closeModal();
  fetchParticipants();
};
</script>
