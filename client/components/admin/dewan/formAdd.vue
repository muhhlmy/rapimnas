<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="space-y-2 text-sm text-gray-700"
    >
      <div>
        <label class="block text-sm font-medium mb-1">Pas Foto</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileUpload($event, 'photo')"
          ref="photoInput"
          class="hidden"
        />
        <button
          type="button"
          @click="photoInput?.click()"
          class="cursor-pointer w-full px-4 py-6 text-slate-600 border border-dashed border-gray-300 rounded-lg hover:bg-slate-50 focus:outline-none transition-colors"
        >
          <div class="flex items-center justify-center space-x-2">
            <VueIcon name="bx:user-circle" class="w-5 h-5 flex-shrink-0" />
            <span>
              {{
                formData.photo
                  ? `${formData.photo.name} (${(
                      formData.photo.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB)`
                  : "Upload Pas Foto (Max 3MB)"
              }}
            </span>
          </div>
        </button>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Kategori</label>
        <select
          v-model="formData.category"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
        >
          <option value="">Pilih Kategori</option>
          <option value="Pengurus">Dewan Pengurus</option>
          <option value="Kehormatan">Dewan Kehormatan</option>
          <option value="Pertimbangan">Dewan Pertimbangan</option>
          <option value="Usaha">Dewan Usaha</option>
          <option value="Penasihat">Dewan Penasihat</option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            v-model="formData.name"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">No KTA</label>
          <input
            type="text"
            v-model="formData.kta"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Masukkan nomor kta"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Jabatan</label>
          <input
            type="text"
            v-model="formData.position"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Masukkan jabatan"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Jenis Kelamin</label>
        <select
          v-model="formData.gender"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            v-model="formData.email"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Masukkan email"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">No Telepon</label>
          <input
            type="text"
            v-model="formData.phone"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Masukkan nomor telepon"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">File KTA</label>
        <input
          type="file"
          accept="image/*, .pdf"
          @change="handleFileUpload($event, 'kta')"
          ref="ktaInput"
          class="hidden"
        />
        <button
          type="button"
          @click="ktaInput?.click()"
          class="cursor-pointer w-full px-4 py-6 text-slate-600 border border-dashed border-gray-300 rounded-lg hover:bg-slate-50 focus:outline-none transition-colors"
        >
          <div class="flex items-center justify-center space-x-2">
            <VueIcon name="bx:cloud-upload" class="w-5 h-5 flex-shrink-0" />
            <span>
              {{
                formData.fileKta
                  ? `${formData.fileKta.name} (${(
                      formData.fileKta.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB)`
                  : "Upload File KTA (Max 3MB)"
              }}
            </span>
          </div>
        </button>
      </div>
    </form>

    <ModalNotif
      :modal="modal"
      @hide="hideModal"
      @confirm="confirmModal"
      @cancel="cancelModal"
    />
  </div>
</template>

<script setup>
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
// PERUBAHAN DI SINI: Menambahkan onBeforeUpdate
import { reactive, watch, ref, onBeforeUpdate } from "vue";

const formData = reactive({
  name: "",
  category: "",
  photo: null,
  kta: "",
  phone: "",
  email: "",
  gender: "",
  position: "",
  fileKta: null,
});

// Refs untuk input file non-dinamis (sudah benar)
const fileInput = ref(null);
const photoInput = ref(null);
const ktaInput = ref(null);

// PERUBAHAN DI SINI: Array ref untuk input dinamis di dalam v-for
const peninjauPhotoInputs = ref([]);
const peninjauKtaInputs = ref([]);

// PERUBAHAN DI SINI: Hook untuk membersihkan array ref sebelum update
onBeforeUpdate(() => {
  peninjauPhotoInputs.value = [];
  peninjauKtaInputs.value = [];
});

// PERUBAHAN DI SINI: Method untuk trigger klik input dinamis
const triggerPeninjauPhotoInput = (index) => {
  peninjauPhotoInputs.value[index]?.click();
};

const triggerPeninjauKtaInput = (index) => {
  peninjauKtaInputs.value[index]?.click();
};

// Modal notification (tidak ada perubahan)
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

// Show modal function (tidak ada perubahan)
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

// Hide modal function (tidak ada perubahan)
const hideModal = () => {
  modal.value.show = false;
};

// Confirm modal (tidak ada perubahan)
const confirmModal = () => {
  if (modal.value.onConfirm) {
    modal.value.onConfirm();
  }
  hideModal();
};

// Cancel modal (tidak ada perubahan)
const cancelModal = () => {
  if (modal.value.onCancel) {
    modal.value.onCancel();
  }
  hideModal();
};

// Helper functions for different modal types (tidak ada perubahan)
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

// Watch countPeninjau untuk mengatur array peninjau (tidak ada perubahan)
watch(
  () => formData.countPeninjau,
  (newCount) => {
    // Jika count bertambah, tambahkan objek kosong
    if (newCount > formData.peninjau.length) {
      for (let i = formData.peninjau.length; i < newCount; i++) {
        formData.peninjau.push({
          name: "",
          kta: "",
          phone: "",
          email: "",
          photo: null,
          fileKta: null,
        });
      }
    }
    // Jika count berkurang, hapus objek terakhir
    else if (newCount < formData.peninjau.length) {
      formData.peninjau.splice(newCount);
    }
  }
);

// Universal handler untuk semua jenis file upload (tidak ada perubahan)
const handleFileUpload = (event, type, index = null) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi ukuran file - semua file maksimal 3MB
  const fileSizeMB = file.size / (1024 * 1024);
  const maxSizeMB = 3;
  let fileTypeName = "";

  switch (type) {
    case "mandat":
      fileTypeName = "File Mandat";
      break;
    case "peserta-photo":
      fileTypeName = "Pas Foto";
      break;
    case "peserta-kta":
      fileTypeName = "File KTA";
      break;
    case "peninjau-photo":
      fileTypeName = "Pas Foto Peninjau";
      break;
    case "peninjau-kta":
      fileTypeName = "File KTA Peninjau";
      break;
  }

  // Cek ukuran file
  if (fileSizeMB > maxSizeMB) {
    showAlert(
      `${fileTypeName} terlalu besar! Maksimal ${maxSizeMB}MB. File Anda: ${fileSizeMB.toFixed(
        2
      )}MB`,
      "warning"
    );
    event.target.value = ""; // Reset input file
    return;
  }

  // Jika validasi berhasil, simpan file
  switch (type) {
    case "mandat":
      formData.fileMandat = file;
      break;
    case "peserta-photo":
      formData.peserta.photo = file;
      break;
    case "peserta-kta":
      formData.peserta.fileKta = file;
      break;
    case "peninjau-photo":
      if (index !== null) {
        formData.peninjau[index].photo = file;
      }
      break;
    case "peninjau-kta":
      if (index !== null) {
        formData.peninjau[index].fileKta = file;
      }
      break;
  }
};

// Handler untuk submit form (tidak ada perubahan)
const handleSubmit = () => {
  console.log("Form data:", formData);
  // Implementasi submit form di sini
};

defineExpose({
  submitForm: handleSubmit,
});
</script>

<style scoped>
/* From Uiverse.io by Galahhad */
.switch {
  /* switch */
  --switch-width: 46px;
  --switch-height: 24px;
  --switch-bg: rgb(131, 131, 131);
  --switch-checked-bg: rgb(0, 218, 80);
  --switch-offset: calc((var(--switch-height) - var(--circle-diameter)) / 2);
  --switch-transition: all 0.2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  /* circle */
  --circle-diameter: 18px;
  --circle-bg: #fff;
  --circle-shadow: 1px 1px 2px rgba(146, 146, 146, 0.45);
  --circle-checked-shadow: -1px 1px 2px rgba(163, 163, 163, 0.45);
  --circle-transition: var(--switch-transition);
  /* icon */
  --icon-transition: all 0.2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  --icon-cross-color: var(--switch-bg);
  --icon-cross-size: 6px;
  --icon-checkmark-color: var(--switch-checked-bg);
  --icon-checkmark-size: 10px;
  /* effect line */
  --effect-width: calc(var(--circle-diameter) / 2);
  --effect-height: calc(var(--effect-width) / 2 - 1px);
  --effect-bg: var(--circle-bg);
  --effect-border-radius: 1px;
  --effect-transition: all 0.2s ease-in-out;
}

.switch input {
  display: none;
}

.switch {
  display: inline-block;
}

.switch svg {
  -webkit-transition: var(--icon-transition);
  -o-transition: var(--icon-transition);
  transition: var(--icon-transition);
  position: absolute;
  height: auto;
}

.switch .checkmark {
  width: var(--icon-checkmark-size);
  color: var(--icon-checkmark-color);
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.switch .cross {
  width: var(--icon-cross-size);
  color: var(--icon-cross-color);
}

.slider {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  border-radius: 999px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  -webkit-transition: var(--switch-transition);
  -o-transition: var(--switch-transition);
  transition: var(--switch-transition);
  cursor: pointer;
}

.circle {
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  background: var(--circle-bg);
  border-radius: inherit;
  -webkit-box-shadow: var(--circle-shadow);
  box-shadow: var(--circle-shadow);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  transition: var(--circle-transition);
  z-index: 1;
  position: absolute;
  left: var(--switch-offset);
}

.slider::before {
  content: "";
  position: absolute;
  width: var(--effect-width);
  height: var(--effect-height);
  left: calc(var(--switch-offset) + (var(--effect-width) / 2));
  background: var(--effect-bg);
  border-radius: var(--effect-border-radius);
  -webkit-transition: var(--effect-transition);
  -o-transition: var(--effect-transition);
  transition: var(--effect-transition);
}

/* actions */

.switch input:checked + .slider {
  background: var(--switch-checked-bg);
}

.switch input:checked + .slider .checkmark {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}

.switch input:checked + .slider .cross {
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.switch input:checked + .slider::before {
  left: calc(
    100% - var(--effect-width) - (var(--effect-width) / 2) -
      var(--switch-offset)
  );
}

.switch input:checked + .slider .circle {
  left: calc(100% - var(--circle-diameter) - var(--switch-offset));
  -webkit-box-shadow: var(--circle-checked-shadow);
  box-shadow: var(--circle-checked-shadow);
}
</style>
