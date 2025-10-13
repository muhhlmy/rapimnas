<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="space-y-2 text-sm text-gray-700"
    >
      <div>
        <label class="block text-sm font-medium mb-1">Nama Ruangan</label>
        <input
          type="text"
          v-model="formData.name"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Masukkan nama ruangan"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Kapasitas</label>
        <input
          type="number"
          v-model="formData.capacity"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Masukkan kapasitas ruangan"
        />
      </div>

      <!-- Multiple Searchable Select for Event Assignment -->
      <div>
        <label class="block text-sm font-medium mb-1">Assign to Events</label>
        <div class="relative">
          <div
            @click="isEventOpen = !isEventOpen"
            class="px-4 py-2 text-sm rounded-lg bg-white border border-gray-200 w-full focus:outline-none focus:border-[#1E3A8A] cursor-pointer flex justify-between items-center min-h-[42px]"
          >
            <div class="flex flex-wrap items-center gap-2 flex-1">
              <div v-if="selectedEvents.length === 0" class="text-gray-500">
                Pilih Event
              </div>
              <div
                v-for="event in selectedEvents"
                :key="event.id"
                class="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
              >
                <span>{{ event.name }}</span>
                <span
                  v-if="event.isNew"
                  class="bg-blue-200 text-blue-700 px-1 rounded text-xs"
                >
                  Baru
                </span>
                <button
                  @click.stop="removeEvent(event.id)"
                  class="text-blue-600 hover:text-blue-800 ml-1"
                  title="Hapus event"
                >
                  <VueIcon name="bx:plus" class="rotate-45" />
                </button>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-2">
              <button
                v-if="selectedEvents.length > 0"
                @click.stop="clearAllEvents"
                class="flex items-center gap-1 border border-red-500 text-red-500 hover:text-red-700 hover:bg-red-200 px-2 py-1 rounded-md text-xs cursor-pointer"
                title="Hapus semua pilihan"
              >
                <VueIcon name="bx:plus" class="w-4 h-4 rotate-45" />
                Hapus Semua
              </button>
              <span class="text-gray-400">
                <VueIcon
                  :name="isEventOpen ? 'bx:chevron-up' : 'bx:chevron-down'"
                  class="w-4 h-4"
                />
              </span>
            </div>
          </div>
          <div
            v-if="isEventOpen"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            <input
              type="text"
              v-model="searchTerm"
              @input="searchEvent"
              placeholder="Cari event..."
              class="px-4 py-2 w-full border-b rounded-t-lg border-gray-200 text-sm focus:outline-none"
              @click.stop
            />
            <div
              v-for="option in filteredEventOptions"
              :key="option.id"
              @click="toggleEvent(option)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <p class="font-semibold">
                  {{ option.name }}
                  <span class="text-gray-500 font-normal"
                    >| {{ option.date }} | {{ option.startTime }} -
                    {{ option.endTime }}
                  </span>
                </p>
                <!-- <span
                  v-if="option.isNew"
                  class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                >
                  Baru
                </span> -->
              </div>
              <div v-if="isEventSelected(option.id)" class="text-blue-600">
                <VueIcon name="bx:check" class="w-4 h-4" />
              </div>
            </div>
            <!-- <div
              v-if="filteredEventOptions.length > 0 && searchTerm"
              @click="createNewEvent"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-blue-600 border-t border-gray-200"
            >
              + Tambah "{{ searchTerm }}" sebagai event baru
            </div>
            <div
              v-else-if="filteredEventOptions.length === 0 && searchTerm"
              @click="createNewEvent"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-blue-600 border-t border-gray-200"
            >
              + Tambah "{{ searchTerm }}" sebagai event baru
            </div> -->
            <div
              v-if="filteredEventOptions.length === 0 && !searchTerm"
              class="px-4 py-2 text-gray-500 text-sm"
            >
              Tidak ada hasil yang sesuai
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const formData = reactive({
  name: "",
  capacity: "",
  eventIds: [],
});

// Event selection state
const isEventOpen = ref(false);
const selectedEvents = ref([]);
const searchTerm = ref("");
const debouncedSearchTerm = ref("");
let searchDebounceTimeout = null;
const eventOptions = ref([
  {
    id: 1,
    name: "Rapat Koordinasi Nasional 2024",
    date: "2024-01-01",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: 2,
    name: "Seminar Digital Transformation",
    date: "2024-01-01",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: 3,
    name: "Workshop Leadership",
    date: "2024-01-01",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: 4,
    name: "Konferensi Teknologi",
    date: "2024-01-01",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: 5,
    name: "Pelatihan Manajemen",
    date: "2024-01-01",
    startTime: "10:00",
    endTime: "12:00",
  },
]);

const filteredEventOptions = computed(() => {
  if (!debouncedSearchTerm.value) return eventOptions.value;
  const keyword = debouncedSearchTerm.value.toLowerCase();
  return eventOptions.value.filter((option) =>
    option.name.toLowerCase().includes(keyword)
  );
});

const toggleEvent = (option) => {
  const existingIndex = selectedEvents.value.findIndex(
    (event) => event.id === option.id
  );

  if (existingIndex > -1) {
    // Remove if already selected
    selectedEvents.value.splice(existingIndex, 1);
  } else {
    // Add if not selected
    selectedEvents.value.push(option);
  }

  // Update form data
  formData.eventIds = selectedEvents.value.map((event) => event.id);
};

const isEventSelected = (eventId) => {
  return selectedEvents.value.some((event) => event.id === eventId);
};

const removeEvent = (eventId) => {
  const index = selectedEvents.value.findIndex((event) => event.id === eventId);
  if (index > -1) {
    selectedEvents.value.splice(index, 1);
    formData.eventIds = selectedEvents.value.map((event) => event.id);
  }
};

const clearAllEvents = () => {
  selectedEvents.value = [];
  formData.eventIds = [];
};

const searchEvent = () => {
  // Search functionality is handled by computed property
};


// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      isEventOpen.value = false;
    }
  });
});

// Debounce search input
watch(searchTerm, (newVal) => {
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    debouncedSearchTerm.value = newVal;
  }, 300);
});

const handleSubmit = () => {
  console.log(formData);
};
</script>
