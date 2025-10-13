<template>
  <MobileOnlyWrapper>
    <div
      class="min-h-screen flex flex-col overflow-y-auto p-10 flex flex-col gap-4 justify-center items-center"
    >
      <div class="min-h-44 min-w-44 w-full h-100 bg-black rounded-lg relative">
        <video
              ref="videoElement"
              v-show="cameraActive"
              class="w-full h-full object-cover camera-video"
              autoplay
              muted
              playsinline
              style="background: black;"
            >
        </video>
        <div v-if="!cameraActive" class="absolute inset-0 flex items-center justify-center">
          <button 
            @click="startScanner" 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Start Scanner
          </button>
        </div>
        <div v-if="participantData" class="absolute bottom-0 left-0 right-0 bg-green-500 text-white p-3 text-center">
          <p class="font-bold">{{ participantData.name }}</p>
          <p class="text-sm">{{ participantData.position }}</p>
        </div>
      </div>

      <div class="bg-blue-900 rounded-lg w-full p-2">
        <p class="text-white font-bold text-center">Hi, {{ staffName }}</p>
      </div>

      <div class="w-full grid grid-cols-2 gap-4 text-center text-sm">
        <button
          @click="router.push('/staff/register')"
          class="bg-slate-100 border border-blue-100 shadow-sm rounded-lg p-2 min-h-28 flex flex-col items-center justify-center gap-1"
        >
          <VueIcon
            name="bx:user-plus"
            class="w-10 h-10 bg-green-500 text-white rounded-full p-2"
          />
          <p class="text-black font-semibold text-center">Register</p>
        </button>
        <button
          @click="router.push('/staff/checkpoint')"
          class="bg-slate-100 border border-blue-100 shadow-sm rounded-lg p-2 min-h-28 flex flex-col items-center justify-center gap-1"
        >
          <VueIcon
            name="bx:current-location"
            class="w-10 h-10 bg-orange-500 text-white rounded-full p-2"
          />
          <p class="text-black font-semibold text-center">Checkpoint</p>
        </button>
        <button
          @click="router.push('/staff/agenda')"
          class="bg-slate-100 border border-blue-100 shadow-sm rounded-lg p-2 min-h-28 flex flex-col items-center justify-center gap-1"
        >
          <VueIcon
            name="bx:calendar"
            class="w-10 h-10 bg-blue-500 text-white rounded-full p-2"
          />
          <p class="text-black font-semibold text-center">Agenda</p>
        </button>
        <button
          @click="router.push('/staff/check-participant')"
          class="bg-slate-100 border border-blue-100 shadow-sm rounded-lg p-2 min-h-28 flex flex-col items-center justify-center gap-1"
        >
          <VueIcon
            name="bx:pin"
            class="w-10 h-10 bg-blue-900 text-white rounded-full p-2"
          />
          <p class="text-black font-semibold text-center">Cek Peserta</p>
        </button>
      </div>
    </div>
  </MobileOnlyWrapper>
</template>

<script setup>
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
import QrScanner from 'qr-scanner';

const staffName = "Agiel Bagaskara";
const router = useRouter();
const config = useRuntimeConfig();
const videoElement = ref(null);
const cameraActive = ref(false);
const scannedData = ref(null);
const participantData = ref(null);
let qrScanner = null;

const fetchParticipantData = async (id) => {
  try {
    console.log('Fetching participant data for ID:', id);
    const userId = JSON.parse(id).userId;
    console.log(userId, "ini userId");
    
    const response = await $fetch(`${config.public.BaseUrl}/badges/${userId}`);
    console.log(response, "ini response dari fetchParticipantData");
    
    participantData.value = response;
  } catch (error) {
    console.error('Error fetching participant data:', error);
    alert('Peserta tidak ditemukan');
    participantData.value = null;
  }
};

const startScanner = async () => {
  try {
    if (videoElement.value) {
      cameraActive.value = true;
      
      qrScanner = new QrScanner(
        videoElement.value,
        (result) => {
          console.log('QR Code detected:', result.data);
          scannedData.value = result.data;
          fetchParticipantData(result.data);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      
      await qrScanner.start();
    }
  } catch (error) {
    console.error('Error starting QR scanner:', error);
    alert('Error starting camera: ' + error.message);
  }
};

const stopScanner = () => {
  if (qrScanner) {
    qrScanner.stop();
    qrScanner.destroy();
    qrScanner = null;
  }
  cameraActive.value = false;
};

onMounted(() => {
  startScanner();
});

onUnmounted(() => {
  stopScanner();
});

</script>
