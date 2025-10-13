<!-- components/ModalNotif.vue -->
<template>
  <div v-if="modal.show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-slate-500/50 transition-opacity" aria-hidden="true" @click="hideModal"></div>

      <!-- Modal panel -->
      <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-10">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

          <div class="flex flex-col justify-center items-center">
            <!-- Icon -->

            
              <VueIcon 
                :name="getIconName()"
                :class="getIconClass()"
                class="w-20 h-20 mb-2"
              />
           
            
            <!-- Content -->
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-2xl text-center font-bold uppercase text-gray-900 mb-4" id="modal-title">
                {{ modal.title }}
              </h3>
              <div class="mt-2">
                <p class="text-lg text-center text-gray-500">
                  {{ modal.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
          <button
            @click="confirmModal"
            :class="[
              'cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm',
              modal.type === 'success' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 
              modal.type === 'error' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 
              modal.type === 'warning' ? 'bg-amber-400 hover:bg-amber-500 focus:ring-yellow-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            ]"
          >
            {{ modal.confirmText }}
          </button>
          <button
            v-if="modal.showCancel"
            @click="cancelModal"
            class="cursor-pointer mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ modal.cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueIcon from '@kalimahapps/vue-icons/VueIcon';
const props = defineProps({
  modal: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['hide', 'confirm', 'cancel']);

const hideModal = () => {
  emit('hide');
};

const confirmModal = () => {
  emit('confirm');
};

const cancelModal = () => {
  emit('cancel');
};

const getIconName = () => {
  switch (props.modal.type) {
    case 'success':
      return 'bx:check-circle';
    case 'error':
      return 'bx:error';
    case 'warning':
      return 'bx:error-alt';
    default:
      return 'bx:info-circle';
  }
};

const getIconClass = () => {
  switch (props.modal.type) {
    case 'success':
      return 'text-green-600';
    case 'error':
      return 'text-red-600';
    case 'warning':
      return 'text-amber-400';
    default:
      return 'text-blue-600';
  }
};
</script>
