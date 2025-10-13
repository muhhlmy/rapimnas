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
              Pendaftaran Eksternal
            </h1>

            <!-- Search and Export -->
            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search VIP..."
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
              <span class="hidden sm:inline">Tambah VIP</span>
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
              <tr
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
                <td class="px-2 py-3 text-gray-700">{{ item.category }}</td>
                <td class="px-2 py-3 text-gray-700 break-words leading-snug">
                  {{ item.position }}
                </td> 
                <td class="px-2 py-3 text-gray-700 break-words">
                  {{ item.email }}
                </td>
                <td class="px-2 py-3 text-gray-700">{{ item.phone }}</td>
                <!-- <td class="px-2 py-3 text-gray-700">{{ item.gender }}</td> -->
                <td class="px-2 py-3 text-gray-700">
                  <button
                    @click="showSeeFilesModal = true"
                    class="px-4 py-2 text-gray-800 hover:bg-gray-300 border border-gray-200 rounded-md cursor-pointer text-sm"
                  >
                    Lihat Dokumen
                  </button>
                </td>
                <td class="px-2 py-3">
                  <div class="flex items-center gap-2 justify-start">
                    <ReusableButton
                      type="edit"
                      title="Edit"
                      @click="handleEdit(item)"
                    />
                    <ReusableButton type="delete" title="Delete" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

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
          :header="'Daftarkan VIP'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminEksternalFormAdd ref="dewanFormRef" />
        </ModalForm>
      </Teleport>

      <Teleport to="body">
        <ModalForm
          v-if="showEditModal"
          :header="'Edit VIP'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminEksternalFormEdit ref="eksternalFormRef" />
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
          <AdminEksternalSeeDetails />
        </ModalForm>
      </Teleport>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
import { ref, computed, watch, onBeforeUnmount } from "vue";
const activeTab = ref("All");
const tabs = ref([
  "All",
  "Pengurus",
  "Kehormatan",
  "Pertimbangan",
  "Usaha",
  "Penasihat ",
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

const data = ref([
  {
    id: 1,
    name: "Adi Sicupto",
    category: "Dewan Pengurus",
    position: "Ketua Dewan Pengurus",
    email: "adi.sicupto@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
  {
    id: 2,
    name: "Budi Santoso",
    category: "Dewan Pengurus",
    position: "Sekretaris Dewan Pengurus",
    email: "budi.santoso@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
  {
    id: 3,
    name: "Citra Lestari",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "citra.lestari@mail.com",
    phone: "081234567890",
    gender: "Perempuan",
  },
  {
    id: 4,
    name: "Dewi Kartika",
    category: "Dewan Pertimbangan",
    position: "Ketua Dewan Pertimbangan",
    email: "dewi.kartika@mail.com",
    phone: "081234567890",
    gender: "Perempuan",
  },
  {
    id: 5,
    name: "Eko Wibowo",
    category: "Dewan Usaha",
    position: "Ketua Dewan Usaha",
    email: "eko.wibowo@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
  {
    id: 6,
    name: "Fitri Handayani",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "fitri.handayani@mail.com",
    phone: "081234567890",
    gender: "Perempuan",
  },
  {
    id: 7,
    name: "Gilang Saputra",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "gilang.saputra@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
  {
    id: 8,
    name: "Hana Oktaviani",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "hana.oktaviani@mail.com",
    phone: "081234567890",
    gender: "Perempuan",
  },
  {
    id: 9,
    name: "Iwan Setiawan",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "iwan.setiawan@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
  {
    id: 10,
    name: "Nurul Huda",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "nurul.huda@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
  {
    id: 11,
    name: "Omar Saputra",
    category: "Dewan Penasihat",
    position: "Bendahara Dewan Penasihat",
    email: "omar.saputra@mail.com",
    phone: "081234567890",
    gender: "Laki-laki",
  },
]);

const changeTab = (tab) => {
  activeTab.value = tab;
};

const exportExcel = () => {
  console.log("Export Excel");
};

const filteredData = computed(() => {
  if (!debouncedSearchQuery.value) return data.value;
  const q = debouncedSearchQuery.value.toLowerCase();
  return data.value.filter((item) => {
    return (
      item.name.toLowerCase().includes(q) ||
      item.position.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q)
    );
  });
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

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

const handleEdit = (item) => {
  showEditModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showSeeFilesModal.value = false;
};


</script>

