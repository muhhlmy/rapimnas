<template>
  <div
    class="fixed inset-0 p-4 flex flex-wrap justify-center items-start md:items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[#0000001a]"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white w-full max-w-2xl flex flex-col rounded-lg shadow-lg p-6 relative max-h-[90vh]"
    >
      <div class="flex justify-between items-center relative pb-4">
        <h2 class="text-xl font-bold self-center text-center w-full text-black">{{ props.header }}</h2>

        <button
          @click="$emit('close')"
          class="cursor-pointer absolute right-0 text-black hover:text-gray-600 transition-colors"
        >
          <VueIcon name="bx:plus" class="w-8 h-8 rotate-45" />
        </button>
      </div>

      <div class="py-4 flex-1 overflow-y-auto">
        <slot />
      </div>

      <div class="flex justify-center gap-2 pt-4">
        <button
          :class="
            props.cancelButton
              ? 'block cursor-pointer px-4 py-2 bg-red-500 text-white text-sm text-center rounded-md hover:bg-red-600 transition-colors'
              : 'hidden'
          "
          @click="$emit('close')"
        >
          Batalkan
        </button>
        <button
          :class="
            props.saveButton
              ? 'block cursor-pointer px-4 py-2 bg-black text-white text-sm text-center rounded-md hover:bg-black/80 transition-colors'
              : 'hidden'
          "
          @click="$emit('save')"
        >
          Simpan
        </button>
        <button
          :class="
            props.closeButton
              ? 'block cursor-pointer px-4 py-2 bg-black text-white text-sm text-center rounded-md hover:bg-black/80 transition-colors'
              : 'hidden'
          "
          @click="$emit('close')"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueIcon from '@kalimahapps/vue-icons/VueIcon';

const emit = defineEmits(['close','save','cancel'])

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  saveButton: {
    type: Boolean,
  },
  closeButton: {
    type: Boolean,
  },
  cancelButton: {
    type: Boolean,
  },
});
</script>
