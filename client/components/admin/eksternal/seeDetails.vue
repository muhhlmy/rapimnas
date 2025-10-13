<template>
  <div class="flex gap-2 items-start">
    <div class="border border-neutral-200 rounded-lg p-2 space-y-3 flex-1">
      <!-- Foto -->
      <img
        src="https://picsum.photos/seed/picsum/300/200"
        alt="Foto"
        class="aspect-[707/1000] object-cover"
      />
      <button class="w-full px-4 py-2 text-sm text-white bg-black rounded-lg">
        Download Foto
      </button>
    </div>
    <div
      class="border border-neutral-200 rounded-lg p-2 space-y-2 w-full flex-2"
    >
      <div class="flex justify-between items-center w-full">
        <p class="text-sm text-gray-500 max-w-[75%]">Nama File</p>
        <div class="flex flex-col gap-1">
          <button
            class="text-sm text-gray-500 bg-black text-white px-4 py-1 rounded-lg"
          >
            Lihat File
          </button>
          <button
            class="text-sm text-gray-500 bg-lime-500 text-black px-4 py-1 rounded-lg"
          >
            Download File
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
