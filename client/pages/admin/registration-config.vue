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
              Pengaturan Registrasi
            </h1>

            <!-- Search and Export -->
          </div>
        </div>

        <!-- Content Card -->
        <div class="flex flex-col gap-4 rounded-md bg-white p-6 text-sm">
          <form @submit.prevent="submitForm">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="name" class="text-sm font-medium text-gray-700"
                  >Batas Waktu Pendaftaran</label
                >
                <FlatPickr
                  :config="configDate"
                  placeholder="dd-mm-yyyy"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  ref="datePicker"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="name" class="text-sm font-medium text-gray-700"
                  >Batas Tanggal Kadaluwarsa KTA</label
                >
                <FlatPickr
                  :config="configDate"
                  placeholder="dd-mm-yyyy"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  ref="datePickerExpiry"
                />
              </div>
              <button type="submit" class="mt-4 px-4 py-2 bg-black text-white rounded-md min-w-xs max-w-sm self-center cursor-pointer">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import { ref } from "vue";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

const searchQuery = ref("");

const configDate = {
  dateFormat: 'd-m-Y',
  allowInput: true,
  defaultDate: null,
  enableTime: false,
  enableSeconds: false,
  // Tambahkan config untuk mencegah error
  clickOpens: true,
  closeOnSelect: true,
};
</script>
