<template>
  <button
    @click="handleClick"
    :class="buttonClasses"
    :title="props.title"
  >
    <svg
      v-if="props.type === 'edit'"
      class="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      ></path>
    </svg>
    <svg
      v-else-if="props.type === 'delete'"
      class="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      ></path>
    </svg>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'edit', 'delete'].includes(value)
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click', 'edit', 'delete'])

const buttonClasses = computed(() => {
  const baseClasses = 'p-1.5 text-white rounded transition-colors cursor-pointer'
  
  switch (props.type) {
    case 'edit':
      return `${baseClasses} bg-yellow-400 hover:bg-yellow-500`
    case 'delete':
      return `${baseClasses} bg-red-500 hover:bg-red-600`
    default:
      return baseClasses
  }
})

const handleClick = () => {
  emit('click')
  
  if (props.type === 'edit') {
    emit('edit')
  } else if (props.type === 'delete') {
    emit('delete')
  }
}
</script>
