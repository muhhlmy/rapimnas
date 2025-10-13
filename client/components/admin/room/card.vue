<template>
  <div
    @click="emit('detail', room?.id)"
    class="w-full h-full min-h-32 px-6 py-8 rounded-md space-y-6 border border-neutral-200 hover:bg-neutral-100 transition-all cursor-pointer"
  >
    <div class="flex w-full justify-between items-start gap-2">
      <!-- <div> -->
      <!-- <p class="mt-1">{{room.tv_code}}</p> -->
      <!-- </div> -->
      <h1 class="font-bold text-lg">{{ room.name }}</h1>
      <div class="flex gap-2">
        <button
          @click.stop="emit('edit', room?.id)"
          class="cursor-pointer p-1 text-xs rounded-full flex items-center border border-slate-200 hover:bg-slate-200 text-gray-500 gap-1 transition-all"
        >
          <VueIcon name="an:outlined-edit" class="w-5 h-5" />
        </button>

        <button
          @click.stop="emit('erase', room?.id)"
          class="cursor-pointer p-1 text-xs rounded-full flex items-center border border-red-500 hover:bg-red-500 hover:text-white transition-all text-red-500 gap-1"
        >
          <VueIcon name="ak:trash-can" class="w-5 h-5" />
        </button>
      </div>
    </div>
    <!-- <span class="p-2 text-xs bg-green-100 text-green-400 rounded"
      >Available</span
    > -->
  </div>
</template>

<script setup>
const props = defineProps({
  room: {
    type: Object,
  },
});

const emit = defineEmits(['detail', 'edit', 'erase']);
</script>
