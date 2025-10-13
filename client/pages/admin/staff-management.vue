<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">Staff Management</h1>

            <!-- Search and Export -->
            <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Staff..."
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
              { 'bg-black text-white': tabDefault === tab.key },
              {
                'bg-white text-black hover:bg-gray-100': tabDefault !== tab.key,
              },
            ]"
            @click="changeTab(tab.key)"
          >
            {{ tab.nama }}
          </button>
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
              <span class="hidden sm:inline">Tambah Staff</span>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
            ></div>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="dataTampil.length === 0"
            class="flex flex-col items-center justify-center py-12"
          >
            <div class="text-gray-400 mb-4">
              <svg
                class="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              Tidak ada data staff
            </h3>
            <p class="text-gray-500 text-center">
              Belum ada staff dengan role
              {{ tabDefault === "all" ? "apapun" : tabDefault }}.
            </p>
          </div>

          <!-- Data Grid -->
          <div v-else class="grid grid-cols-3 gap-5 mt-4">
            <div
              v-for="i in dataTampil"
              :key="i.name"
              class="flex items-start border border-slate-200 rounded-lg p-4 gap-3 bg-white"
            >
              <div class="w-full">
                <div class="flex items-center justify-between w-full">
                  <h3 class="font-bold text-lg text-gray-800">{{ i.name }}</h3>
                  <div class="flex gap-2 items-center">
                    <button
                      class="bg-blue-100 rounded-full p-1 text-blue-600 hover:bg-blue-200 cursor-pointer"
                      @click="openModal('edit', i.email)"
                    >
                      <VueIcon name="bx:pencil" class="w-5 h-5" />
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg> -->
                    </button>
                    <button
                      class="bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200 cursor-pointer"
                      @click="openModal('erase', i.email)"
                    >
                      <VueIcon name="bx:trash" class="w-5 h-5" />
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg> -->
                    </button>
                  </div>
                </div>

                <div class="text-sm space-y-1 mt-1">
                  <p class="font-medium">{{ i.position }}</p>
                  <p class="text-gray-500 font-medium">{{ i.role }}</p>
                  <p class="text-gray-500">{{ i.email }}</p>
                  <p class="text-gray-500">{{ i.phone }}</p>
                  <p class="text-gray-400">Last seen : {{ i.last_seen }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <Teleport to="body">
        <ModalForm
          v-if="showModal.add"
          :header="'Tambah Staff'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminStaffFormAdd ref="staffFormRef" />
        </ModalForm>
      </Teleport>

      <Teleport to="body">
        <ModalForm
          v-if="showModal.edit"
          :header="'Edit Staff'"
          :saveButton="true"
          :cancelButton="true"
          @close="closeModal"
          @save="handleSave"
        >
          <AdminStaffFormAdd ref="staffFormRef" />
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
import { ref, computed, onMounted, watch } from "vue";
const data = [
  {
    name: "Budi Santoso",
    role: "superadmin",
    email: "budi.santoso@example.com",
    phone: "0812-1111-2222",
    last_seen: "Online",
    position: "Chief Executive Officer",
  },
  {
    name: "Citra Wijaya",
    role: "admin",
    email: "citra.wijaya@example.com",
    phone: "0813-2222-3333",
    last_seen: "5 menit yang lalu",
    position: "Head of Operations",
  },
  {
    name: "Agus Setiawan",
    role: "admin",
    email: "agus.setiawan@example.com",
    phone: "0857-4444-5555",
    last_seen: "1 jam yang lalu",
    position: "System Administrator",
  },
  {
    name: "Dewi Lestari",
    role: "staff",
    email: "dewi.lestari@example.com",
    phone: "0878-5555-6666",
    last_seen: "Online",
    position: "Database Manager",
  },
  {
    name: "Eko Prasetyo",
    role: "staff",
    email: "eko.prasetyo@example.com",
    phone: "0896-6666-7777",
    last_seen: "Kemarin, 20:30",
    position: "HR Administrator",
  },
  {
    name: "Rina Hartati",
    role: "staff",
    email: "rina.hartati@example.com",
    phone: "0812-7777-8888",
    last_seen: "15 menit yang lalu",
    position: "Frontend Developer",
  },
  {
    name: "Joko Susilo",
    role: "staff",
    email: "joko.susilo@example.com",
    phone: "0813-8888-9999",
    last_seen: "Online",
    position: "Backend Developer",
  },
  {
    name: "Siti Aminah",
    role: "staff",
    email: "siti.aminah@example.com",
    phone: "0857-9999-1111",
    last_seen: "5 jam yang lalu",
    position: "UI/UX Designer",
  },
  {
    name: "Hendra Gunawan",
    role: "staff",
    email: "hendra.gunawan@example.com",
    phone: "0878-1111-2222",
    last_seen: "01/10/2025, 10:15",
    position: "Marketing Staff",
  },
  {
    name: "Maya Sari",
    role: "staff",
    email: "maya.sari@example.com",
    phone: "0896-2222-3333",
    last_seen: "2 jam yang lalu",
    position: "Customer Support",
  },
];
//ketiga siapin data nama tabnya
const tabs = [
  {
    nama: "All",
    key: "all",
  },
  {
    nama: "Super Admin",
    key: "superadmin",
  },
  {
    nama: "Admin",
    key: "admin",
  },
  {
    nama: "Staff",
    key: "staff",
  },
];

const tabDefault = ref("all");

// Data state
const dataTampil = ref([]);
const loading = ref(false);

// Search functionality
const searchQuery = ref("");
const debouncedSearchQuery = ref("");

// Modal state
const showModal = ref({
  add: false,
  edit: false,
  erase: false,
});

const selectedStaffId = ref(null);
const staffFormRef = ref(null);

const openModal = (type, id = null) => {
  if (!showModal.value[type] === undefined) return;
  for (const key in showModal.value) showModal.value[key] = false;
  showModal.value[type] = true;
  selectedStaffId.value = id;
};

const closeModal = () => {
  for (const key in showModal.value) showModal.value[key] = false;
  selectedStaffId.value = null;
};

const handleSave = () => {
  // contoh: staffFormRef.value?.submitForm?.();
  closeModal();
};

const handleErase = () => {
  if (!selectedStaffId.value) return;
  // TODO: panggil API hapus staff berdasarkan selectedStaffId
  closeModal();
};

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Fetch data from API based on role and search query
const fetchStaffData = async (role = "all", search = "") => {
  loading.value = true;
  try {
    // TODO: Replace with actual API endpoint
    // const response = await $fetch(`/api/staff?role=${role}&search=${search}`);

    // Filter data based on role and search query
    let filteredData = data;

    // Filter by role
    if (role !== "all") {
      filteredData = filteredData.filter((item) => item.role === role);
    }

    // Filter by search query
    if (search) {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.position.toLowerCase().includes(search.toLowerCase())
      );
    }

    dataTampil.value = filteredData;
  } catch (error) {
    console.error("Error fetching staff data:", error);
    // Fallback to static data for now
    dataTampil.value = data.filter(
      (item) => role === "all" || item.role === role
    );
  } finally {
    loading.value = false;
  }
};

// Debounced search function
const debouncedSearch = debounce(async (searchValue) => {
  debouncedSearchQuery.value = searchValue;
  await fetchStaffData(tabDefault.value, searchValue);
}, 500);

// Change tab function
const changeTab = async (tabKey) => {
  tabDefault.value = tabKey;
  await fetchStaffData(tabKey, debouncedSearchQuery.value);
};

// Export function
const exportExcel = () => {
  // TODO: Implement export functionality
  console.log("Export Excel clicked");
};

// Watch search query changes
watch(searchQuery, (newValue) => {
  debouncedSearch(newValue);
});

// Initialize data on component mount
onMounted(() => {
  fetchStaffData("all");
});
</script>
