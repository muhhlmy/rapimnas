<template>
    <div>
      <div class="">
        <p class="text-sm text-gray-500">Nama Ruangan</p>
        <h2 class="text-lg font-bold">{{ roomSchedule.name }}</h2>
      </div>
  
      <div class="mt-5 text-sm">
        <div class="border-b border-gray-200">
          <nav
            class="-mb-px flex items-center space-x-3 overflow-x-auto"
            aria-label="Tabs"
          >
            <button
              v-for="(day, index) in days"
              :key="day.label"
              @click="activeTab = index"
              :class="[
                'whitespace-nowrap py-4 min-w-32 px-1 border-b-2 font-medium',
                activeTab === index
                  ? 'border-gray-900 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ day.label }}
            </button>
  
            <button
              class="ml-auto flex-shrink-0 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
  
        <div class="mt-4 max-h-80 overflow-y-auto pr-2">
          <div v-if="days.length > 0 && days[activeTab].events.length > 0">
            <div
              v-for="(event, eventIndex) in days[activeTab].events"
              :key="eventIndex"
              class="flex justify-between items-center py-4"
              :class="{
                'border-b border-gray-200':
                  eventIndex < days[activeTab].events.length - 1,
              }"
            >
              <p class="text-gray-800 font-medium">{{ event.title }}</p>
              <p class="text-gray-500">{{ event.time }}</p>
            </div>
          </div>
          <div v-else class="py-8 text-center text-gray-500">
            <p>Tidak ada jadwal untuk hari ini.</p>
          </div>
        </div>
      </div>
      <ModalNotif
        :modal="modal"
        @hide="hideModal"
        @confirm="confirmModal"
        @cancel="cancelModal"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
 
 // State dan handler ModalNotif (mengikuti pola formAdd ALB)
 const modal = ref({
   show: false,
   title: "",
   message: "",
   type: "info",
   showCancel: false,
   confirmText: "OK",
   cancelText: "Batal",
   onConfirm: null,
   onCancel: null,
 });
 
 const showModal = (options) => {
   modal.value = {
     show: true,
     title: options.title || "Informasi",
     message: options.message || "",
     type: options.type || "info",
     showCancel: options.showCancel || false,
     confirmText: options.confirmText || "OK",
     cancelText: options.cancelText || "Batal",
     onConfirm: options.onConfirm || null,
     onCancel: options.onCancel || null,
   };
 };
 
 const hideModal = () => {
   modal.value.show = false;
 };
 
 const confirmModal = () => {
   if (modal.value.onConfirm) {
     modal.value.onConfirm();
   }
   hideModal();
 };
 
 const cancelModal = () => {
   if (modal.value.onCancel) {
     modal.value.onCancel();
   }
   hideModal();
 };
 
 const showAlert = (message, type = "info") => {
   showModal({
     title:
       type === "success"
         ? "Berhasil"
         : type === "error"
         ? "Error"
         : type === "warning"
         ? "Peringatan"
         : "Informasi",
     message,
     type,
   });
 };
  
  const activeTab = ref(0);
  const props = defineProps({
    roomId: {
      type: String,
    },
  });
  
  const roomSchedule = ref({ name: 'Memuat...', Events: [] });
  
  const fetchRoom = async (roomId) => {
    try {
      const response = {
          name: 'Ruang Kresna',
          Events: [
              { '2025-10-09': [
                  { name: "Presentasi Klien Agency XYZ", startTime: "15:00", endTime: "16:00" },
                  { name: "Langkah Awal Sukses Menuju Masa Depan", startTime: "09:00", endTime: "14:00" },
              ]},
              { '2025-10-10': [
                  { name: "Sesi Brainstorming Proyek Alpha", startTime: "14:30", endTime: "15:30" },
                  { name: "Pelatihan Penggunaan Software Baru", startTime: "09:30", endTime: "11:30" },
              ]},
              { '2025-10-11': [
                  { name: "Rapat Koordinasi Tim Marketing", startTime: "16:00", endTime: "17:00" },
                  { name: "Workshop Desain Interaktif", startTime: "09:00", endTime: "12:00" },
              ]},
              { '2025-10-12': [
                  { name: "Review Kinerja Bulanan", startTime: "15:00", endTime: "16:30" },
                  { name: "Diskusi Panel: Inovasi Digital", startTime: "13:30", endTime: "15:00" },
              ]},
          ]
      };
      roomSchedule.value = response;
    } catch (error) {
      console.error("Gagal mengambil data ruangan:", error);
      showAlert("Gagal mengambil data ruangan. Silakan coba lagi.", "error");
    }
  };
  
  onMounted(() => {
    fetchRoom(props.roomId);
  });
  
  const days = computed(() => {
    if (!roomSchedule.value.Events || roomSchedule.value.Events.length === 0) {
      const emptyDays = [];
      const todayForLabels = new Date();
      for (let i = 0; i < 4; i++) {
          const currentDate = new Date();
          currentDate.setDate(todayForLabels.getDate() + i);
          let label = "";
          if (i === 0) label = "Hari Ini";
          else if (i === 1) label = "Besok";
          else {
              label = currentDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              });
          }
          emptyDays.push({ label, events: [] });
      }
      return emptyDays;
    }
  
    const eventsByDate = new Map();
    roomSchedule.value.Events.forEach(dayObject => {
      const dateKey = Object.keys(dayObject)[0];
      eventsByDate.set(dateKey, dayObject[dateKey]);
    });
  
    const result = [];
    const today = new Date();
  
    for (let i = 0; i < 4; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      const dateStringToCompare = currentDate.toISOString().split('T')[0];
  
      let label = "";
      if (i === 0) label = "Hari Ini";
      else if (i === 1) label = "Besok";
      else {
        label = currentDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        });
      }
  
      const eventsForThisDay = eventsByDate.get(dateStringToCompare) || [];
  
      const mappedAndSortedEvents = eventsForThisDay
        .map(event => ({
          title: event.name,
          time: `${event.startTime} - ${event.endTime}`,
          startTime: event.startTime 
        }))
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
  
      result.push({
        label: label,
        date: currentDate,
        events: mappedAndSortedEvents,
      });
    }
    return result;
  });
 </script>