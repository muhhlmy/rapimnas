<template>
  <div
    class="fixed inset-0 p-4 flex flex-wrap justify-center items-start md:items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[#0000001a]"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white w-full max-w-md flex flex-col rounded-lg shadow-lg p-6 relative max-h-[90vh]"
    >
      <div class="flex flex-col justify-center items-center gap-5">
        <!-- Icon -->

        <VueIcon name="bx:error-alt" class="w-20 h-20  text-red-500" />

        <!-- Content -->
        <div class="text-center sm:text-left">
          <h3
            class="text-2xl text-center font-bold uppercase text-red-500 mb-4"
            id="modal-title"
          >
            Apakah Anda yakin ingin menghapus data ini?
          </h3>
          <div class="mt-2">
            <p class="text-md text-center text-gray-500">
              Data yang dihapus tidak dapat dipulihkan.
            </p>
          </div>
        </div>

        <div class="flex justify-center gap-2">
          <button
            class="block cursor-pointer px-4 py-2 bg-black text-white text-sm text-center rounded-md hover:bg-black/80 transition-colors"
            @click="$emit('close')"
          >
            Batalkan
          </button>
          <button
            class="block cursor-pointer px-4 py-2 bg-red-500 text-white text-sm text-center rounded-md hover:bg-red-600 transition-colors"
            @click="$emit('erase')"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
