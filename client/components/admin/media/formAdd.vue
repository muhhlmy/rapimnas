<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="space-y-2 text-sm text-gray-700"
    >
      <div>
        <label class="block text-sm font-medium mb-1">Nama Media</label>
        <input
          type="text"
          v-model="formData.MediaName"
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Masukkan nama Media"
        />
      </div>

      <div class="flex gap-5 items-center mt-5">
        <p class="text-sm font-medium">Jumlah Perwakilan</p>
        <div class="flex gap-4 items-center">
          <button
            @click="
              formData.countPerwakilan > 0 ? formData.countPerwakilan-- : null
            "
            type="button"
            class="text-sm"
            :disabled="formData.countPerwakilan <= 0"
          >
            <VueIcon name="fe:minus-circle" class="w-5 h-5" />
          </button>
          <p class="text-sm">
            {{ formData.countPerwakilan }}
          </p>
          <button
            @click="formData.countPerwakilan++"
            type="button"
            class="text-sm"
          >
            <VueIcon name="fe:plus-circle" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div v-if="formData.countPerwakilan > 0">
        <div
          v-for="i in formData.countPerwakilan"
          :key="i"
          class="space-y-4 mt-5"
        >
          <div>
            <p
              v-if="formData.countPerwakilan > 0"
              class="font-bold tracking-wide pl-4 py-2 border-l-4 border-gray-700 bg-gray-100"
            >
              Profile Perwakilan Media
              {{ formData.MediaName ? formData.MediaName : "" }}
              {{ i }}
            </p>
            <label class="block text-sm font-medium mb-1 mt-4">Pas Foto</label>
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload($event, 'perwakilan-photo', i - 1)"
              :ref="
                (el) => {
                  if (el) perwakilanPhotoInputs[i - 1] = el;
                }
              "
              class="hidden"
            />
            <button
              type="button"
              @click="triggerFileInput(i - 1)"
              class="w-full px-4 py-6 text-slate-600 border border-dashed border-gray-300 rounded-lg hover:bg-slate-50 focus:outline-none transition-colors"
            >
              <div class="flex items-center justify-center space-x-2">
                <VueIcon name="bx:cloud-upload" class="w-5 h-5 flex-shrink-0" />
                <span>
                  {{
                    formData.perwakilan[i - 1]?.photo
                      ? `${formData.perwakilan[i - 1].photo.name} (${(
                          formData.perwakilan[i - 1].photo.size /
                          1024 /
                          1024
                        ).toFixed(2)}
                            MB)`
                      : "Upload Pas Foto (Max 3MB)"
                  }}
                </span>
              </div>
            </button>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              v-model="formData.perwakilan[i - 1].name"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                v-model="formData.perwakilan[i - 1].email"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">No Telepon</label>
              <input
                type="text"
                v-model="formData.perwakilan[i - 1].phone"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                placeholder="Masukkan nomor telepon"
              />
            </div>
          </div>
        </div>
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
// PERUBAHAN DI SINI: Menambahkan ref dan onBeforeUpdate
import { reactive, watch, ref, onBeforeUpdate } from "vue";

const formData = reactive({
  MediaName: "",
  countPerwakilan: 0,
  perwakilan: [],
});

// PERUBAHAN DI SINI: Array untuk menampung referensi input
const perwakilanPhotoInputs = ref([]);

// PERUBAHAN DI SINI: Hook untuk membersihkan array ref sebelum update
onBeforeUpdate(() => {
  perwakilanPhotoInputs.value = [];
});

// PERUBAHAN DI SINI: Method untuk memicu klik pada input file
const triggerFileInput = (index) => {
  if (perwakilanPhotoInputs.value[index]) {
    perwakilanPhotoInputs.value[index].click();
  }
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

// Watch countPerwakilan untuk mengatur array perwakilan (tidak ada perubahan)
watch(
  () => formData.countPerwakilan,
  (newCount) => {
    if (newCount > formData.perwakilan.length) {
      for (let i = formData.perwakilan.length; i < newCount; i++) {
        formData.perwakilan.push({
          name: "",
          phone: "",
          email: "",
          photo: null,
        });
      }
    } else if (newCount < formData.perwakilan.length) {
      formData.perwakilan.splice(newCount);
    }
  }
);

// Universal handler untuk semua jenis file upload (tidak ada perubahan)
const handleFileUpload = (event, type, index = null) => {
  const file = event.target.files[0];
  if (!file) return;

  const fileSizeMB = file.size / (1024 * 1024);
  const maxSizeMB = 3;
  let fileTypeName = "";

  switch (type) {
    case "perwakilan-photo":
      fileTypeName = "Pas Foto Perwakilan";
      break;
  }

  if (fileSizeMB > maxSizeMB) {
    showAlert(
      `${fileTypeName} terlalu besar! Maksimal ${maxSizeMB}MB. File Anda: ${fileSizeMB.toFixed(
        2
      )}MB`,
      "warning"
    );
    event.target.value = "";
    return;
  }

  switch (type) {
    case "perwakilan-photo":
      if (index !== null) {
        formData.perwakilan[index].photo = file;
      }
      break;
  }
};

// Handler untuk submit form (tidak ada perubahan)
const handleSubmit = () => {
  console.log("Form data:", formData);
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