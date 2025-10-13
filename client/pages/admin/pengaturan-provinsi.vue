<template>
    <DesktopOnlyWrapper>
      <NuxtLayout>
        <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8">
          <div class="flex flex-col gap-4">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <h1 class="font-bold text-2xl text-gray-800">
                Pengaturan Provinsi
              </h1>
  
              <div class="flex gap-2 w-full sm:w-auto">
                <div class="relative flex-1 sm:flex-none text-sm">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Provinsi..."
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
  
          <div class="flex flex-col gap-4 rounded-md bg-white p-6">
            <div
              class="flex items-center self-end border px-4 py-2 rounded-md gap-2 mb-2"
            >
              <input
                type="checkbox"
                id="globalDE"
                v-model="allDEChecked"
                class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label for="globalDE" class="text-sm font-medium text-gray-700"
                >Pilih Semua Slot DE</label
              >
            </div>
  
            <div class="text-sm">
              <table class="w-full table-fixed">
                <thead class="bg-gray-100">
                  <tr class="border-b border-gray-300">
                    <th
                      class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-[25%]"
                    >
                      Nama Provinsi
                    </th>
                    <th
                      class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-[30%]"
                    >
                      Info Ketua
                    </th>
                    <th
                      class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-[18%]"
                    >
                      File Mandat
                    </th>
                    <th
                      class="text-center py-2 px-3 font-semibold text-gray-800 text-sm w-20"
                    >
                      Slot DE
                    </th>
                    <th
                      class="text-center py-2 px-3 font-semibold text-gray-800 text-sm w-28"
                    >
                      Slot Peninjau
                    </th>
                    <th
                      class="text-left py-2 px-3 font-semibold text-gray-800 text-sm w-20"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="item in paginatedData" :key="`main-${item.id}`">
                    <tr
                      class="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm"
                      :class="{ 'bg-gray-50': expandedRows.has(item.id) }"
                    >
                      <td
                        @click="toggleRow(item.id)"
                        class="py-3 px-3 text-gray-800 font-semibold cursor-pointer"
                      >
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
  
                      <td class="py-3 px-3">
                        <div class="flex items-center gap-3">
                          <img
                            :src="item.peserta?.foto || '/assets/placehold.png'"
                            :alt="item.peserta?.nama || 'No Photo'"
                            class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                          />
                          <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-800 truncate">
                              {{ item.peserta?.nama || "-" }}
                            </p>
                            <p
                              class="text-xs text-blue-800 font-medium flex-shrink-0"
                            >
                              {{ item.peserta?.kta || "-" }}
                            </p>
                          </div>
                        </div>
                      </td>
  
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
  
                      <td class="py-3 px-3 text-center" @click.stop>
                        <input
                          type="checkbox"
                          v-model="item.slotDE"
                          class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                        />
                      </td>
  
                      <td
                        class="py-3 px-3 text-center font-medium"
                        @click.stop
                      >
                        <div
                          v-if="editingPeninjauSlotId !== item.id"
                          @click="editPeninjauSlot(item)"
                          class="cursor-text hover:bg-gray-200 rounded py-1"
                        >
                          {{ item.slotPeninjau }}
                        </div>
                        <input
                          v-else
                          :ref="(el) => (peninjauInputRefs[item.id] = el)"
                          type="number"
                          v-model.number="item.slotPeninjau"
                          @blur="savePeninjauSlot()"
                          @keyup.enter="savePeninjauSlot()"
                          class="cursor-text w-16 text-center border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </td>
  
                      <td class="py-3 px-3" @click.stop>
                        <div class="flex gap-1">
                          <ReusableButton
                            type="delete"
                            title="Delete"
                            @delete="deleteItem(item)"
                          />
                        </div>
                      </td>
                    </tr>
  
                    <tr
                      :key="`expanded-${item.id}`"
                      v-if="expandedRows.has(item.id)"
                      class="bg-white"
                    >
                      <td colspan="6" class="p-0">
                        <div class="px-4 py-2">
                          <h4 class="font-semibold text-gray-800 text-sm mb-2">
                            Daftar Peninjau ({{ item.peninjau.length }})
                          </h4>
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
                                      class="text-left py-2 px-3 text-gray-700 font-bold min-w-[120px]"
                                    >
                                      Nama
                                    </th>
                                    <th
                                      class="text-left py-2 px-3 text-gray-700 font-bold w-24"
                                    >
                                      KTA
                                    </th>
                                    <th
                                      class="text-left py-2 px-3 text-gray-700 font-bold w-28"
                                    >
                                      No Telp
                                    </th>
                                    <th
                                      class="text-left py-2 px-3 text-gray-700 font-bold min-w-[150px]"
                                    >
                                      Email
                                    </th>
                                    <th
                                      class="text-left py-2 px-3 text-gray-700 font-bold w-32"
                                    >
                                      Jabatan
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
                                    <td
                                      class="py-2 px-3 font-medium text-gray-800"
                                    >
                                      {{ peninjau.nama }}
                                    </td>
                                    <td class="py-2 px-3">
                                      <span
                                        class="text-xs text-gray-800 font-medium"
                                      >
                                        {{ peninjau.kta }}
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
                                    <td class="py-2 px-3">
                                      <span
                                        class="text-xs text-gray-600 font-medium"
                                      >
                                        {{ peninjau.jabatan }}
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
                    <td colspan="6" class="text-center py-8 text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>
              </table>
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
        </div>
      </NuxtLayout>
    </DesktopOnlyWrapper>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted, nextTick } from "vue";
  
  // Data
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const expandedRows = ref(new Set());
  const editingPeninjauSlotId = ref(null);
  const peninjauInputRefs = ref({});
  
  // Sample data - updated with correct structure
  const data = ref([
    {
      id: 1,
      nama: "KADIN Jawa Barat",
      fileMandat: "mandat-jabar.pdf",
      slotDE: false,
      slotPeninjau: 5,
      peserta: {
        id: 1,
        nama: "Muhammad Helmy",
        kta: "KTA001",
        foto: "/assets/placehold.png",
      },
      peninjau: [
        {
          id: 1,
          nama: "Dr. Siti Nurhaliza",
          kta: "KTA003",
          foto: "/assets/placehold.png",
          noTelp: "08123456791",
          email: "siti.nurhaliza@example.com",
          jabatan: "Peninjau Senior",
        },
        {
          id: 2,
          nama: "Akbar Maulana",
          kta: "KTA004",
          foto: "/assets/placehold.png",
          noTelp: "08123456792",
          email: "akbar.maulana@example.com",
          jabatan: "Peninjau Senior",
        },
      ],
    },
    {
      id: 2,
      nama: "KADIN DKI Jakarta",
      fileMandat: "mandat-jakarta.pdf",
      slotDE: true,
      slotPeninjau: 10,
      peserta: {
        id: 3,
        nama: "Budi Santoso",
        kta: "KTA004",
        foto: "/assets/placehold.png",
      },
      peninjau: [
        {
          id: 2,
          nama: "Prof. Andi Wijaya",
          kta: "KTA006",
          foto: "/assets/placehold.png",
          noTelp: "08123456794",
          email: "andi.wijaya.prof@example.com",
          jabatan: "Peninjau Ahli",
        },
      ],
    },
    {
      id: 3,
      nama: "KADIN Jawa Timur",
      fileMandat: "mandat-jatim.pdf",
      slotDE: false,
      slotPeninjau: 3,
      peserta: {
        id: 5,
        nama: "Rina Marlina",
        kta: "KTA007",
        foto: "/assets/placehold.png",
      },
      peninjau: [
        {
          id: 3,
          nama: "Dr. Fajar Nugraha",
          kta: "KTA008",
          foto: "/assets/placehold.png",
          noTelp: "08123456796",
          email: "fajar.nugraha@example.com",
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
  
  // Computed property for the global "Select All" checkbox
  const allDEChecked = computed({
    // Getter: checks if all items on the current page are checked
    get() {
      return (
        paginatedData.value.length > 0 &&
        paginatedData.value.every((item) => item.slotDE)
      );
    },
    // Setter: sets the checked state for all items on the current page
    set(value) {
      paginatedData.value.forEach((item) => {
        item.slotDE = value;
      });
    },
  });
  
  const visiblePages = computed(() => {
    const pages = [];
    const total = totalPages.value;
    const current = currentPage.value;
  
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
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
    // Now includes new columns
    const csvContent = [
      ["Nama Provinsi", "File Mandat", "Slot DE", "Slot Peninjau"],
      ...filteredData.value.map((item) => [
        item.nama,
        item.fileMandat,
        item.slotDE ? "Ya" : "Tidak",
        item.slotPeninjau,
      ]),
    ];
  
    const csvString = csvContent.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pengaturan-provinsi.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  const editPeninjauSlot = async (item) => {
    editingPeninjauSlotId.value = item.id;
    // Wait for the DOM to update, then focus the input
    await nextTick();
    if (peninjauInputRefs.value[item.id]) {
      peninjauInputRefs.value[item.id].focus();
    }
  };
  
  const savePeninjauSlot = () => {
    // Here you would typically make an API call to save the new value
    // For now, we just exit the editing mode
    if (editingPeninjauSlotId.value) {
      console.log(
        "Saving new value for ID:",
        editingPeninjauSlotId.value,
        "New value:",
        data.value.find((i) => i.id === editingPeninjauSlotId.value)
          ?.slotPeninjau
      );
    }
    editingPeninjauSlotId.value = null;
  };
  
  const deleteItem = (item) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${item.nama}?`)) {
      const index = data.value.findIndex((d) => d.id === item.id);
      if (index > -1) {
        data.value.splice(index, 1);
      }
    }
  };
  
  // Watch for search changes to reset pagination
  watch(searchQuery, () => {
    currentPage.value = 1;
  });
  
  onMounted(() => {
    // Load data from API here
  });
  </script>