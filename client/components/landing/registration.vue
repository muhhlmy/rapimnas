<!-- components/RegistrationSection.vue -->
<template>
  <div>
  <section id="daftar" class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white">Daftar Sekarang</h2>
        <div class="w-24 h-1 bg-[#FBBF24] mx-auto mt-4"></div>
        <p class="mt-4 text-gray-200 max-w-3xl mx-auto">
          Jangan lewatkan kesempatan untuk berpartisipasi dalam Rapat Pimpinan
          Nasional Kadin Indonesia
        </p>
      </div>

      <!-- Registration Type Tabs -->
      <div class="bg-white bg-opacity-20 rounded-t-xl overflow-hidden mb-0">
        <div class="flex">
          <button
            class="w-full bg-[#1E3A8A] py-4 px-6 font-extrabold uppercase text-center transition-colors duration-300 text-white"
          >
            Registrasi
          </button>
        </div>
      </div>

      <div class="bg-white rounded-b-xl shadow-lg overflow-hidden">
        <!-- Registration Form -->
        <div class="p-6 md:p-8">
          <form class="space-y-8" @submit.prevent="submitForm">
            
            <!-- PESERTA Section -->
            <div>
              <div class="flex items-center mb-6">
                <div class="w-1 h-8 bg-[#1E3A8A] mr-4"></div>
                <h3 class="text-xl font-semibold text-gray-800">PESERTA</h3>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <!-- Form Fields -->
                <div class="space-y-4 text-sm">
                  <!-- Nomor KTA -->
                  <div class="">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor KTA</label>
                    <div class="flex gap-2 text-sm">
                      <input
                        type="text"
                        v-model="formData.peserta.kta"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                        placeholder="Masukkan nomor KTA Anda"
                      />
                      <button
                        type="button"
                        @click="checkKta('peserta')"
                        class="cursor-pointer px-4 py-1 bg-[#1E3A8A] text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Cek KTA
                      </button>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">
                      Masukkan nomor Kartu Tanda Anggota (KTA) Kadin yang berstatus Aktif
                    </p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      v-model="formData.peserta.email"
                      :disabled="formData.peserta.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Alamat Email"
                    />
                  </div>

                  <!-- Nama Lengkap -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      v-model="formData.peserta.namaLengkap"
                      :disabled="formData.peserta.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Nama Lengkap"
                    />
                  </div>

                  <!-- Jabatan -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                      type="text"
                      v-model="formData.peserta.jabatan"
                      :disabled="formData.peserta.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Jabatan"
                    />
                  </div>

                  <!-- Nomor Telepon -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                    <input
                      type="tel"
                      v-model="formData.peserta.nomorTelepon"
                      :disabled="formData.peserta.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Nomor Telepon"
                    />
                  </div>
                </div>

                <!-- Pas Photo Upload -->
                <div class="flex justify-center">
                  <div v-if="!formData.peserta.pasPhoto.file" class="w-full max-w-sm">
                    <div class="border border-gray-200 rounded-lg p-4 text-center">
                      <div class="w-32 h-40 bg-gray-100 border border-gray-300 mb-4 mx-auto flex items-center justify-center overflow-hidden">
                        <div class="scale-[0.065]">
                          <LandingIdCard :photoUrl="formData.peserta.pasPhoto.preview" />
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="$refs.pesertaPhoto.click()"
                        class="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                      >
                        UPLOAD PHOTO
                      </button>
                      <input
                        ref="pesertaPhoto"
                        type="file"
                        accept="image/jpeg,image/png"
                        class="sr-only"
                        @change="handlePhotoUpload($event, 'peserta')"
                      />
                      <!-- <p class="mt-2 text-xs text-gray-500">
                        {{ formData.peserta.pasPhoto.fileName || 'Belum diunggah' }}
                      </p> -->
                    </div>
                    
                    <div class="mt-4 text-left border border-gray-200 rounded-lg p-4 bg-slate-50">
                      <h4 class="font-medium text-gray-900 mb-2">Ketentuan Pas Photo:</h4>
                      <ul class="text-xs text-gray-600 space-y-1">
                        <li>• Format 4x6 dengan latar belakang berwarna</li>
                        <li>• Foto formal/resmi dengan pakaian rapi dan sopan</li>
                        <li>• Wajah terlihat jelas dan tidak menggunakan kacamata hitam</li>
                        <li>• Format file JPG atau PNG dengan ukuran maksimal 2MB</li>
                        <li>• Foto terbaru (diambil dalam 6 bulan terakhir)</li>
                      </ul>
                      <div v-if="showPhotoValidation && !formData.peserta.pasPhoto.file" class="mt-2 flex items-center text-sm text-red-600">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        <span>Pas foto belum diunggah</span>
                      </div>
                    </div>
                  </div>

                  <div v-else class="w-full h-full max-w-sm">
                    <div class="border border-gray-200 rounded-lg p-4 text-center">
                      <div class="w-32 h-40 bg-gray-100 border border-gray-300 mb-4 mx-auto flex items-center justify-center overflow-hidden">
                        <div class="scale-[0.065]">
                          <LandingIdCard :photoUrl="formData.peserta.pasPhoto.preview" />
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="$refs.pesertaPhoto.click()"
                        class="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                      >
                        UPLOAD PHOTO
                      </button>
                      <input
                        ref="pesertaPhoto"
                        type="file"
                        accept="image/jpeg,image/png"
                        class="sr-only"
                        @change="handlePhotoUpload($event, 'peserta')"
                      />
                      <!-- <p class="mt-2 text-xs text-gray-500">
                        {{ formData.peserta.pasPhoto.fileName || 'Belum diunggah' }}
                      </p> -->
                    </div>

                    <div class="mt-4 text-left border border-gray-200 rounded-lg p-4 bg-slate-50">
                      <h4 class="font-medium text-gray-900 mb-2">Ketentuan Pas Photo:</h4>
                      <ul class="text-xs text-gray-600 space-y-1">
                        <li>• Format 4x6 dengan latar belakang berwarna</li>
                        <li>• Foto formal/resmi dengan pakaian rapi dan sopan</li>
                        <li>• Wajah terlihat jelas dan tidak menggunakan kacamata hitam</li>
                        <li>• Format file JPG atau PNG dengan ukuran maksimal 2MB</li>
                        <li>• Foto terbaru (diambil dalam 6 bulan terakhir)</li>
                      </ul>
                      <div v-if="showPhotoValidation && !formData.peserta.pasPhoto.file" class="mt-2 flex items-center text-sm text-red-600">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        <span>Pas foto belum diunggah</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Direktur Eksekutif Section (index 0, tanpa KTA) -->
            <div v-if="formData.peninjau[0] && formData.peninjau[0].direkturEksekutif">
              <div class="flex items-center mb-6">
                <div class="w-1 h-8 bg-[#1E3A8A] mr-4"></div>
                <h3 class="text-lg font-semibold text-gray-800">PENINJAU (Direktur Eksekutif)</h3>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Form Fields -->
                <div class="space-y-4 text-sm">
                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      v-model="formData.peninjau[0].email"
                      :disabled="formData.peninjau[0].locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Alamat Email"
                    />
                  </div>

                  <!-- Nama Lengkap -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      v-model="formData.peninjau[0].namaLengkap"
                      :disabled="formData.peninjau[0].locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Nama Lengkap"
                    />
                  </div>

                  <!-- Nomor Telepon -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                    <input
                      type="tel"
                      v-model="formData.peninjau[0].nomorTelepon"
                      :disabled="formData.peninjau[0].locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Nomor Telepon"
                    />
                  </div>
                </div>

                <!-- Pas Photo Upload -->
                <div class="flex justify-center">
                  <div v-if="!formData.peninjau[0].pasPhoto.file" class="w-full max-w-sm">
                    <div class="border border-gray-200 rounded-lg p-4 text-center">
                      <div class="w-32 h-40 bg-gray-100 border border-gray-300 mb-4 mx-auto flex items-center justify-center overflow-hidden">
                        <div class="scale-[0.073]">
                          <LandingIdCard :photoUrl="formData.peninjau[0].pasPhoto.preview" />
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="$refs.peninjau0Photo.click()"
                        class="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        UPLOAD PHOTO
                      </button>
                      <input
                        ref="peninjau0Photo"
                        type="file"
                        accept="image/jpeg,image/png"
                        class="sr-only"
                        @change="handlePhotoUpload($event, 'peninjau', 0)"
                      />
                      <p class="mt-2 text-xs text-gray-500">
                        {{ formData.peninjau[0].pasPhoto.fileName || 'Belum diunggah' }}
                      </p>
                    </div>
                    
                    <div class="mt-4 text-left">
                      <h4 class="font-medium text-gray-900 mb-2">Ketentuan Pas Photo:</h4>
                      <ul class="text-xs text-gray-600 space-y-1">
                        <li>• Format 4x6 dengan latar belakang berwarna</li>
                        <li>• Foto formal/resmi dengan pakaian rapi dan sopan</li>
                        <li>• Wajah terlihat jelas dan tidak menggunakan kacamata hitam</li>
                        <li>• Format file JPG atau PNG dengan ukuran maksimal 2MB</li>
                        <li>• Foto terbaru (diambil dalam 6 bulan terakhir)</li>
                      </ul>
                    </div>
                  </div>

                  <div v-else class="w-full max-w-sm flex flex-col items-center justify-center gap-2">
                    <div class="w-full aspect-[707/1000] overflow-hidden border border-gray-300 rounded">
                      <div class="scale-[0.29] origin-top-left">
                        <LandingIdCard :photoUrl="formData.peninjau[0].pasPhoto.preview" />
                      </div>
                    </div>
                    <button
                        type="button"
                        @click="$refs.peninjau0Photo.click()"
                        class="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        UPLOAD PHOTO
                      </button>
                      <input
                        ref="peninjau0Photo"
                        type="file"
                        accept="image/jpeg,image/png"
                        class="sr-only"
                        @change="handlePhotoUpload($event, 'peninjau', 0)"
                      />
                  </div>
                </div>
              </div>
            </div>

            <!-- Dynamic PENINJAU Sections (mulai index 1) -->
            <div v-for="(peninjau, index) in formData.peninjau.slice(1)" :key="index">
              <div class="flex items-center mb-6">
                <div class="w-1 h-8 bg-[#1E3A8A] mr-4"></div>
                <h3 class="text-lg font-semibold text-gray-800">PENINJAU {{ index + 1 }}</h3>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Form Fields -->
                <div class="space-y-4 text-sm">
                  <!-- Nomor KTA -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor KTA</label>
                    <div class="flex gap-2">
                      <input
                        type="text"
                        v-model="peninjau.kta"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                        placeholder="Masukkan nomor KTA Anda"
                      />
                      <button
                        type="button"
                        @click="checkKta('peninjau', index)"
                        class="px-4 py-1 bg-[#1E3A8A] text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Cek KTA
                      </button>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">
                      Masukkan nomor Kartu Tanda Anggota (KTA) Kadin yang berstatus Aktif
                    </p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      v-model="peninjau.email"
                      :disabled="peninjau.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Alamat Email"
                    />
                  </div>

                  <!-- Nama Lengkap -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      v-model="peninjau.namaLengkap"
                      :disabled="peninjau.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Nama Lengkap"
                    />
                  </div>

                  <!-- Jabatan -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input
                      type="text"
                      v-model="peninjau.jabatan"
                      :disabled="peninjau.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Jabatan"
                    />
                  </div>

                  <!-- Nomor Telepon -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                    <input
                      type="tel"
                      v-model="peninjau.nomorTelepon"
                      :disabled="peninjau.locked"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Masukan Nomor Telepon"
                    />
                  </div>
                </div>

                <!-- Pas Photo Upload -->
                <div class="flex justify-center">
                  <div v-if="!peninjau.pasPhoto.file" class="w-full max-w-sm">
                    <div class="border border-gray-200 rounded-lg p-4 text-center">
                      <div class="w-32 h-40 bg-gray-100 border border-gray-300 mb-4 mx-auto flex items-center justify-center overflow-hidden">
                        <div class="scale-[0.073]">
                          <LandingIdCard :photoUrl="peninjau.pasPhoto.preview" />
                        </div>
                      </div>
                      <button
                        type="button"
                        @click="$refs[`peninjau${index}Photo`][0].click()"
                        class="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        UPLOAD PHOTO
                      </button>
                      <input
                        :ref="`peninjau${index + 1}Photo`"
                        type="file"
                        accept="image/jpeg,image/png"
                        class="sr-only"
                        @change="handlePhotoUpload($event, 'peninjau', index + 1)"
                      />
                      <p class="mt-2 text-xs text-gray-500">
                        {{ peninjau.pasPhoto.fileName || 'Belum diunggah' }}
                      </p>
                    </div>
                    
                    <div class="mt-4 text-left">
                      <h4 class="font-medium text-gray-900 mb-2">Ketentuan Pas Photo:</h4>
                      <ul class="text-xs text-gray-600 space-y-1">
                        <li>• Format 4x6 dengan latar belakang berwarna</li>
                        <li>• Foto formal/resmi dengan pakaian rapi dan sopan</li>
                        <li>• Wajah terlihat jelas dan tidak menggunakan kacamata hitam</li>
                        <li>• Format file JPG atau PNG dengan ukuran maksimal 2MB</li>
                        <li>• Foto terbaru (diambil dalam 6 bulan terakhir)</li>
                      </ul>
                      <div v-if="showPhotoValidation && !peninjau.pasPhoto.file" class="mt-2 flex items-center text-sm text-red-600">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        <span>Pas foto belum diunggah</span>
                      </div>
                    </div>
                  </div>

                  <div v-else class="w-full max-w-sm flex flex-col items-center justify-center gap-2">
                    <div class="w-full aspect-[707/1000] overflow-hidden border border-gray-300 rounded">
                      <div class="scale-[0.29] origin-top-left">
                        <LandingIdCard :photoUrl="peninjau.pasPhoto.preview" />
                      </div>
                    </div>
                    <button
                        type="button"
                        @click="$refs[`peninjau${index}Photo`][0].click()"
                        class="px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        UPLOAD PHOTO
                      </button>
                      <input
                        :ref="`peninjau${index}Photo`"
                        type="file"
                        accept="image/jpeg,image/png"
                        class="sr-only"
                        @change="handlePhotoUpload($event, 'peninjau', index)"
                      />

                  </div>
                </div>
              </div>
            </div>

            <!-- Surat Mandat Section -->
            <div v-show="formData.peserta.category.split(' ')[0] !== 'KI' && formData.peserta.category">
              <div class="flex items-center mb-6">
                <div class="w-1 h-8 bg-[#1E3A8A] mr-4"></div>
                <h3 class="text-lg font-semibold text-gray-800">Surat Mandat</h3>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500">
                    {{ formData.suratMandat.fileName || 'Tidak ada file yang dipilih' }}
                  </div>
                  <button
                    type="button"
                    @click="$refs.suratMandat.click()"
                    class="ml-3 px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Browse
                  </button>
                  <input
                    ref="suratMandat"
                    type="file"
                    accept=".pdf"
                    class="sr-only"
                    @change="handleSuratMandatUpload"
                  />
                </div>
                <p class="text-sm text-gray-600">
                    Unggah surat mandat yang ditandatangani oleh Ketua {{'Kadin Provinsi'}} Anda. Format file PDF dengan ukuran maksimal 5MB.
                </p>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <!-- <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="formData.terms"
                  type="checkbox"
                  class="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A] border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="text-gray-600">
                  Saya menyetujui syarat dan ketentuan yang berlaku
                </label>
              </div>
            </div> -->

            <!-- Submit Button -->
            <div class="text-center">
              <button
                type="submit"
                class="cursor-pointer px-8 py-3 bg-[#E11D48] text-white font-medium rounded-lg shadow-lg hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!formData.peserta.category"
              >
                Daftar Sekarang
              </button>
              <p v-if="!formData.peserta.category" class="mt-2 text-sm text-red-600">
                Mohon cek kta terlebih dahulu sebelum melanjutkan proses pendaftaran
              </p>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

    <!-- Modal Notification -->
    <ModalNotif 
      :modal="modal" 
      @hide="hideModal" 
      @confirm="confirmModal" 
      @cancel="cancelModal" 
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const config = useRuntimeConfig();
const emit = defineEmits(['loading']);


// Form data structure
const formData = reactive({
  peserta: {
    kta: '',
    email: '',
    namaLengkap: '',
    jabatan: '',
    nomorTelepon: '',
    category: '',
    locked: false,
    pasPhoto: {
      fileName: '',
      preview: null,
      file: null
    }
  },
  peninjau: [], // Dynamic array based on backend response
  suratMandat: {
    fileName: '',
    file: null
  },
});

// Available peninjau slots from backend
const availableSlots = ref(0);

// Flag to show photo validation errors
const showPhotoValidation = ref(false);

// Modal notification
const modal = ref({
  show: false,
  title: '',
  message: '',
  type: 'info',
  showCancel: false,
  confirmText: 'OK',
  cancelText: 'Batal',
  onConfirm: null,
  onCancel: null
});

// Show modal function
const showModal = (options) => {
  modal.value = {
    show: true,
    title: options.title || 'Informasi',
    message: options.message || '',
    type: options.type || 'info',
    showCancel: options.showCancel || false,
    confirmText: options.confirmText || 'OK',
    cancelText: options.cancelText || 'Batal',
    onConfirm: options.onConfirm || null,
    onCancel: options.onCancel || null
  };
};

// Hide modal function
const hideModal = () => {
  modal.value.show = false;
};

// Confirm modal
const confirmModal = () => {
  if (modal.value.onConfirm) {
    modal.value.onConfirm();
  }
  hideModal();
};

// Cancel modal
const cancelModal = () => {
  if (modal.value.onCancel) {
    modal.value.onCancel();
  }
  hideModal();
};

// Helper functions for different modal types
const showAlert = (message, type = 'info') => {
  showModal({
    title: type === 'success' ? 'Berhasil' : type === 'error' ? 'Error' : type === 'warning' ? 'Peringatan' : 'Informasi',
    message,
    type
  });
};

const showConfirm = (message, onConfirm, onCancel = null) => {
  showModal({
    title: 'Konfirmasi',
    message,
    type: 'warning',
    showCancel: true,
    onConfirm,
    onCancel
  });
};


// Check KTA function
const checkKta = async (section, index = null) => {
  emit('loading', true);
  let ktaNumber;
  let targetData;
  
  if (section === 'peserta') {
    ktaNumber = formData.peserta.kta;
    targetData = formData.peserta;
  } else if (section === 'peninjau' && index !== null) {
    ktaNumber = formData.peninjau[index].kta;
    targetData = formData.peninjau[index];
  } else {
    showAlert('Section tidak valid.', 'error');
    emit('loading', false);
    return;
  }
  
  if (!ktaNumber || ktaNumber.trim() === '') {
    showAlert('Silakan masukkan nomor KTA terlebih dahulu.', 'warning');
    emit('loading', false);
    return;
  }

  try {
    console.log('Checking KTA:', ktaNumber, 'for section:', section);
    
    const requestBody = {};
    if (section === 'peserta') {
      requestBody.peserta = { kta: ktaNumber };
    } else if (section === 'peninjau') {
      requestBody.peserta = { kta: formData.peserta.kta };
      requestBody.peninjau = [{ kta: ktaNumber, idx: index + 1 }];
    }
    
    const response = await $fetch(config.public.BaseUrl + '/kta', {
      method: 'POST',
      body: requestBody,
    });
    
    console.log('beneran API Response:', response);
    
    if (section === 'peserta') {
      Object.assign(targetData, {
        email: response.email || '',
        namaLengkap: response.namaLengkap || '',
        jabatan: response.jabatan || '',
        nomorTelepon: response.nomorTelepon || '',
        category: response.category || ''
      });
      // lock peserta fields after verified
      targetData.locked = true;
      
      const delegate = response.delegate || 0;
      availableSlots.value = delegate;
      initializePeninjauSlots(delegate);
      emit('loading', false);
      showAlert(`KTA ${ktaNumber} berhasil diverifikasi! Data telah diisi otomatis. Anda memiliki ${delegate} slot peninjau.`, 'success');
    } else if (section === 'peninjau') {
      const peninjauData = response.peninjau?.find(p => p.nomor_urut === index + 1);
      
      if (peninjauData && peninjauData.status === 'terverifikasi') {
        Object.assign(targetData, {
          email: peninjauData.email || '',
          namaLengkap: peninjauData.namaLengkap || '',
          jabatan: peninjauData.jabatan || '',
          nomorTelepon: peninjauData.nomorTelepon || '',
          category: peninjauData.category || ''
        });
        // lock peninjau fields after verified
        targetData.locked = true;
        emit('loading', false);
        showAlert(`KTA ${ktaNumber} berhasil diverifikasi! Data telah diisi otomatis.`, 'success');
      } else {
        emit('loading', false);
        showAlert(peninjauData?.status || 'KTA tidak terverifikasi', 'error');
      }
    }
  } catch (error) {
    emit('loading', false);
    console.log('Error checking KTA:', error);
    showAlert(error.data?.message || 'KTA tidak ditemukan atau terjadi kesalahan.', 'error');
  }
};

// Initialize peninjau slots based on available slots
const initializePeninjauSlots = (slots, includeDirekturEksekutif = true) => {
  formData.peninjau = [];
  for (let i = 0; i < slots; i++) {
    formData.peninjau.push({
      kta: '',
      email: '',
      namaLengkap: '',
      jabatan: '',
      nomorTelepon: '',
      category: '',
      direkturEksekutif: false,
      locked: false,
      pasPhoto: {
        fileName: '',
        preview: null,
        file: null
      }
    });
  }
  if (includeDirekturEksekutif && formData.peninjau.length > 0) {
    formData.peninjau[0].direkturEksekutif = true;
  }
};

// Handle photo upload
const handlePhotoUpload = (event, section, index = null) => {
  const file = event.target.files[0];
  if (file) {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      showAlert('Silakan pilih file gambar (JPG atau PNG)', 'warning');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showAlert('Ukuran file terlalu besar. Maksimal 2MB.', 'warning');
      return;
    }

    let targetData;
    if (section === 'peserta') {
      targetData = formData.peserta;
    } else if (section === 'peninjau' && index !== null) {
      targetData = formData.peninjau[index];
    } else {
      showAlert('Section tidak valid.', 'error');
      return;
    }

    // Cleanup preview URL sebelumnya (jika ada)
    if (targetData.pasPhoto.preview && targetData.pasPhoto.preview.startsWith('blob:')) {
      try { 
        URL.revokeObjectURL(targetData.pasPhoto.preview); 
      } catch (_) {}
    }

    // Set file info
    targetData.pasPhoto.fileName = file.name;
    targetData.pasPhoto.file = file;

    // Create local preview using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      
      // Update preview - this will trigger Vue reactivity
      if (section === 'peserta') {
        formData.peserta.pasPhoto.preview = result;
      } else if (section === 'peninjau' && index !== null) {
        formData.peninjau[index].pasPhoto.preview = result;
      }
    };
    reader.readAsDataURL(file);
  }
};

// Handle surat mandat upload
const handleSuratMandatUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert('Ukuran file terlalu besar. Maksimal 5MB.', 'warning');
      return;
    }

    formData.suratMandat.fileName = file.name;
    formData.suratMandat.file = file;
  }
};

// Submit form
const submitForm = async () => {
  emit('loading', true);
  // Show photo validation errors
  showPhotoValidation.value = true;
  
  // Validation for peserta
  if (!formData.peserta.kta || !formData.peserta.email || !formData.peserta.namaLengkap || !formData.peserta.jabatan || !formData.peserta.nomorTelepon) {
    emit('loading', false);
    showAlert('Silakan lengkapi data peserta.', 'warning');
    return;
  }

  // Check if peserta photo is uploaded
  if (!formData.peserta.pasPhoto.file) {
    emit('loading', false);
    showAlert('Silakan unggah pas foto peserta.', 'warning');
    return;
  }

  // Validation for peninjau
  for (let i = 0; i < formData.peninjau.length; i++) {
    const peninjau = formData.peninjau[i];
    
    // Direktur Eksekutif (index 0) tidak perlu KTA
    const isDE = i === 0 && peninjau.direkturEksekutif;
    if (!isDE && !peninjau.kta) {
    emit('loading', false);
      showAlert(`Silakan lengkapi nomor KTA untuk peninjau ${i + 1}.`, 'warning');
    return;
  }

    // All other fields are required for all peninjau
    if (!peninjau.email || !peninjau.namaLengkap || !peninjau.nomorTelepon) {
    emit('loading', false);
      showAlert(`Silakan lengkapi data peninjau ${i + 1}.`, 'warning');
    return;
    }

    // Check if peninjau photo is uploaded
    if (!peninjau.pasPhoto.file) {
    emit('loading', false);
      showAlert(`Silakan unggah pas foto peninjau ${i + 1}.`, 'warning');
      return;
    }
  }

  try {
    const pesertaFormData = new FormData();
    pesertaFormData.append('kta', formData.peserta.kta);
    pesertaFormData.append('name', formData.peserta.namaLengkap);
    pesertaFormData.append('email', formData.peserta.email);
    pesertaFormData.append('position', formData.peserta.jabatan);
    pesertaFormData.append('phone', formData.peserta.nomorTelepon);
    pesertaFormData.append('category', formData.peserta.category || 'peserta');
    pesertaFormData.append('is_registered', true);
    if (formData.peserta.pasPhoto.file) {
      pesertaFormData.append('photo', formData.peserta.pasPhoto.file);
    }
    if (formData.suratMandat.file) {
      pesertaFormData.append('mandat', formData.suratMandat.file);
    }

    console.log('Creating peserta...');
    const pesertaResponse = await $fetch(config.public.BaseUrl + '/participants', {
      method: 'POST',
      body: pesertaFormData,
    });
    console.log('Peserta created:', pesertaResponse);

    for (let i = 0; i < formData.peninjau.length; i++) {
      const peninjau = formData.peninjau[i];
      const peninjauFormData = new FormData();
      
      if (peninjau.kta) {
        peninjauFormData.append('kta', peninjau.kta);
      }
      peninjauFormData.append('name', peninjau.namaLengkap);
      peninjauFormData.append('email', peninjau.email);
      peninjauFormData.append('position', peninjau.jabatan || '');
      peninjauFormData.append('phone', peninjau.nomorTelepon);
      peninjauFormData.append('category', peninjau.category || 'peninjau');
      peninjauFormData.append('executive_director', peninjau.direkturEksekutif || false);
      peninjauFormData.append('is_registered', true);
      
      if (peninjau.pasPhoto.file) {
        peninjauFormData.append('photo', peninjau.pasPhoto.file);
      }

      console.log(`Creating peninjau ${i + 1}...`);
      const peninjauResponse = await $fetch(config.public.BaseUrl + '/participants', {
        method: 'POST',
        body: peninjauFormData,
      });
      console.log(`Peninjau ${i + 1} created:`, peninjauResponse);
    }

    emit('loading', false);
    // Show success message
    showAlert("Pendaftaran berhasil dikirim!", "success");
    
    // Reset form
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
    showAlert(error.data?.message || "Terjadi kesalahan saat mengirim data. Silakan coba lagi.", "error");
  }
};

// Reset form
const resetForm = () => {
  Object.assign(formData, {
    peserta: {
      kta: '',
      email: '',
      namaLengkap: '',
      jabatan: '',
      nomorTelepon: '',
      category: '',
      locked: false,
      pasPhoto: {
        fileName: '',
        preview: null,
        file: null
      }
    },
    peninjau: [],
    suratMandat: {
      fileName: '',
      file: null
    }
  });

  // Reset available slots
  availableSlots.value = 0;

  // Reset photo validation flag
  showPhotoValidation.value = false;

  // Reset file inputs
  const fileInputs = ['pesertaPhoto', 'suratMandat'];
  fileInputs.forEach(input => {
    const element = document.querySelector(`input[ref="${input}"]`);
    if (element) {
      element.value = '';
    }
  });
};
</script>

