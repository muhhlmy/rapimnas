<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="space-y-2 text-sm text-gray-700"
    >
      <div>
        <label class="block text-sm font-medium mb-1">Nama Acara</label>
        <input
          type="text"
          v-model="formData.eventName"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Masukkan nama acara"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Deskripsi Acara</label>
        <input
          type="text"
          v-model="formData.eventDescription"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Masukkan deskripsi acara"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-700"
          >Eligible Role</label
        >

        <div class="grid grid-cols-2 gap-x-6 px-2 gap-y-2">
          <div
            v-for="role in eligibleOptions"
            :key="role"
            class="flex items-center"
          >
            <input
              :id="role"
              type="checkbox"
              :value="role"
              v-model="formData.eventAllowedCategory"
              class="h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
            <label :for="role" class="ml-2 block text-sm text-gray-900">{{
              role
            }}</label>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Ruangan Acara</label>
        <div ref="dropdown" class="relative w-full">
          <button
            @click="toggleDropdown"
            type="button"
            class="w-full px-4 py-2 flex justify-between items-center text-left border border-gray-200 rounded-lg focus:outline-none"
          >
            <span>{{ formData.eventRoom }}</span>
            <svg
              class="w-5 h-5 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div
            v-if="isOpen"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg"
          >
            <div class="p-2">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Cari ruangan..."
                class="w-full px-3 py-2 text-sm rounded-md focus:outline-none"
              />
            </div>
            <ul class="max-h-60 overflow-y-auto pb-2">
              <li
                @click="selectOption('Pilih Ruangan Acara')"
                class="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                :class="{
                  'bg-blue-50 text-blue-600 font-semibold':
                    selectedOption === 'Pilih Ruangan Acara',
                }"
              >
                Pilih Ruangan Acara
                <svg
                  v-if="selectedOption === 'Pilih Ruangan Acara'"
                  class="w-5 h-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li
                v-for="option in filteredOptions"
                :key="option"
                @click="selectOption(option)"
                class="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                :class="{
                  'bg-blue-50 text-blue-600 font-semibold':
                    option === selectedOption,
                }"
              >
                {{ option }}
                <svg
                  v-if="option === selectedOption"
                  class="w-5 h-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li
                v-if="filteredOptions.length === 0"
                class="px-4 py-2 text-sm text-gray-500 text-center"
              >
                Ruangan tidak ditemukan.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Tanggal Acara</label>
        <FlatPickr
          v-model="formData.eventDate"
          :config="configDate"
          placeholder="dd-mm-yyyy"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          ref="dateEvent"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Waktu Acara</label>
        <div class="flex gap-2 items-center">
        <FlatPickr
          v-model="formData.eventTimeStart"
          :config="configTime"
          placeholder="hh:mm"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          ref="startTimeEvent"
        />
        <p>sampai</p>
        <FlatPickr
          v-model="formData.eventTimeEnd"
          :config="configTime"
          placeholder="hh:mm"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          ref="endTimeEvent"
        />
        </div>

      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Poster Acara</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          @change="handleFileUpload($event, 'poster')"
          ref="fileInput"
          class="hidden"
        />
        <button
          type="button"
          @click="fileInput?.click()"
          class="cursor-pointer w-full px-4 py-6 text-slate-600 border border-dashed border-gray-300 rounded-lg hover:bg-slate-50 focus:outline-none transition-colors"
        >
          <div class="flex items-center justify-center space-x-2">
            <VueIcon name="bx:cloud-upload" class="w-5 h-5 flex-shrink-0" />
            <span>
              {{
                formData.poster
                  ? `${formData.poster.name} (${(
                      formData.poster.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB)`
                  : "Upload Image File (Max 3MB)"
              }}
            </span>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import VueIcon from "@kalimahapps/vue-icons/VueIcon";

const formData = reactive({
  eventName: "",
  eventDescription: "",
  eventTimeStart: "",
  eventTimeEnd: "",
  eventDate: "",
  eventRoom: "Pilih Ruangan Acara",
  eventAllowedCategory: [], 
  poster: null,
});

// Daftar semua role yang bisa dipilih
// Saya gabungkan opsinya agar lebih bervariasi
const eligibleOptions = [
  "Peserta",
  "Dewan Ketua Umum",
  "Peninjau",
  "Dewan Pertimbangan",
  "Media",
  "Dewan Pengurus",
];

// State untuk menyimpan role yang dicentang
const selectedRoles = ref(["Peserta", "Peninjau", "Media"]); // Contoh data awal sesuai gambar

const dropdown = ref(null);
const fileInput = ref(null);
const isOpen = ref(false);
const searchTerm = ref("");
const selectedOption = ref("Pilih Ruangan Acara");

const options = [
  "Aula Utama",
  "Function Hall A",
  "Function Hall B",
  "Ruang Rapat Merapi",
  "Ruang Rapat Merbabu",
  "Auditorium",
  "Ballroom",
  "VIP Lounge",
];

const filteredOptions = computed(() =>
  searchTerm.value === ""
    ? options
    : options.filter((option) =>
        option.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
  searchTerm.value = "";
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  if (typeof document !== 'undefined') {
    configDate.appendTo = document.body;
    configTime.appendTo = document.body;
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const configDate = {
  dateFormat: "d-m-Y",
  allowInput: true,
  defaultDate: null,
  enableTime: false,
  enableSeconds: false,
  // Tambahkan config untuk mencegah error
  clickOpens: true,
  closeOnSelect: true,
};

const configTime = {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
  allowInput: true,
  defaultDate: null,
  enableSeconds: false,
  minuteIncrement: 1,
  // Tambahkan config untuk mencegah error
  clickOpens: true,
  closeOnSelect: true,
};

const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  formData[type] = file;
};
</script>
