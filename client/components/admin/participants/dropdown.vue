<template>
    <div ref="dropdown" class="relative w-full md:w-56">
      <button
        @click="toggleDropdown"
        type="button"
        class="flex items-center justify-between w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
      >
        <span class="truncate">{{ selectedOptionText }}</span>
        <VueIcon
          name="bx:chevron-down"
          class="h-5 w-5 text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>
  
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200"
        >
          <div class="p-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari instansi..."
              class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
  
          <ul class="max-h-60 overflow-y-auto text-sm">
            <li
              v-if="filteredOptions.length === 0"
              class="px-4 py-2 text-gray-500"
            >
              Tidak ada data
            </li>
            <li
              v-for="option in filteredOptions"
              :key="option.value"
              @click="selectOption(option)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              :class="{ 'bg-blue-500 text-white': modelValue === option.value }"
            >
              {{ option.text }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import VueIcon from '@kalimahapps/vue-icons/VueIcon';

// --- Props ---
// Dibuat lebih reusable dengan menerima 'options' dan 'placeholder' dari parent
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
    // Pastikan formatnya: [{ value: 'id', text: 'Display Name' }]
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Pilih salah satu',
  },
});

// --- Emits ---
const emit = defineEmits(['update:modelValue']);

// --- State Internal Komponen ---
const isOpen = ref(false);
const searchQuery = ref('');
const dropdown = ref(null); // untuk deteksi klik di luar komponen

// --- Computed Properties ---
// Mencari teks dari opsi yang terpilih untuk ditampilkan di tombol
const selectedOptionText = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.text : props.placeholder;
});

// Logika utama untuk filtering/pencarian
const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options;
  }
  return props.options.filter(option =>
    option.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// --- Methods ---
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option.value); // Kirim value ke parent via v-model
  isOpen.value = false; // Tutup dropdown
  searchQuery.value = ''; // Reset query pencarian
};

// --- Click Away Handler ---
// Fungsi untuk menutup dropdown jika user klik di luar area komponen
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Tambahkan event listener saat komponen dimuat
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Hapus event listener saat komponen dihancurkan untuk mencegah memory leak
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>