<!-- <template>
  <div
    class="relative w-full max-w-xs overflow-hidden rounded-lg bg-cover bg-center shadow-lg h-[326px]"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div
      class="absolute inset-0 scale-110 bg-cover bg-center filter blur-xs"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>

    <div class="absolute inset-0 bg-black/15"></div>

    <div class="relative z-10 flex h-full flex-col">
      <div class="absolute top-4 left-4">
        <div class="flex w-[47px] flex-col items-center justify-center">
          <div
            class="flex h-6 w-full items-center justify-center rounded-t bg-white px-2 py-1"
          >
            <span
              class="font-montserrat text-center text-xs font-semibold text-black"
              >{{ month }}</span
            >
          </div>
          <div
            class="flex h-10 w-full items-center justify-center rounded-b bg-black px-2 py-2"
          >
            <span
              class="font-montserrat text-center text-lg font-extrabold text-white"
              >{{ date }}</span
            >
          </div>
        </div>
      </div>

      <div class="absolute top-4 right-4">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-500/50 transition-all hover:bg-opacity-70"
        >
          <svg
            class="h-4 w-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="6" r="1.5" />
            <circle cx="12" cy="18" r="1.5" />
          </svg>
        </button>
      </div>

      <div class="flex-grow"></div>

      <div class="flex w-full flex-col items-start p-4 sm:p-5 md:p-6">
        <div class="flex w-full flex-col items-start">
          <span class="font-normal text-white sm:text-sm md:text-base">{{
            location
          }}</span>

          <h3
            class="leading-tight text-white font-bold text-2xl sm:text-3xl md:text-4xl"
          >
            {{ title }}
          </h3>

          <span class="font-normal text-white sm:text-sm md:text-base">{{
            time
          }}</span>
        </div>

        <button
          class="mt-4 flex h-8 w-full items-center justify-center rounded bg-black px-4 py-2 transition-colors hover:bg-gray-800 sm:h-9 md:h-10"
        >
          <span class="text-center font-semibold text-white sm:text-sm"
            >See Event</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import placeholdImage from "~/assets/placehold.png";

defineProps({
  backgroundImage: {
    type: String,
    default: placeholdImage,
  },
  month: {
    type: String,
    default: "Dec",
  },
  date: {
    type: String,
    default: "28",
  },
  location: {
    type: String,
    default: "Ruang Kresna",
  },
  title: {
    type: String,
    default: "Rapat (n)",
  },
  time: {
    type: String,
    default: "13:00 - 15:00",
  },
});
</script>

 -->


 <template>
  <div
    :class="['relative w-full overflow-hidden rounded-lg bg-cover bg-center shadow-lg h-[326px]', isOpen ? 'max-w-xs' : 'w-full']"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div
      class="absolute inset-0 scale-110 bg-cover bg-center filter blur-xs"
      :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>

    <div class="absolute inset-0 bg-black/15"></div>

    <div class="relative z-10 flex h-full flex-col">
      <div class="absolute top-4 left-4">
        <div class="flex w-[47px] flex-col items-center justify-center">
          <div
            class="flex h-6 w-full items-center justify-center rounded-t bg-white px-2 py-1"
          >
            <span
              class="font-montserrat text-center text-xs font-semibold text-black"
              >{{ event.month }}</span
            >
          </div>
          <div
            class="flex h-10 w-full items-center justify-center rounded-b bg-black px-2 py-2"
          >
            <span
              class="font-montserrat text-center text-lg font-extrabold text-white"
              >{{ event.date }}</span
            >
          </div>
        </div>
      </div>

      <div class="absolute top-4 right-4">
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="cursor-pointer flex h-8 w-8 items-center justify-center rounded-sm bg-white/70 transition-all hover:bg-opacity-70 focus:bg-neutral-300"
          >
            <svg
              class="h-4 w-4 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="6" r="1.5" />
              <circle cx="12" cy="18" r="1.5" />
            </svg>
          </button>
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-32 rounded-md bg-white/70"
            >
              <div class="py-1">
                <button
                  @click.stop="handleEdit"
                  class="cursor-pointer flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-neutral-300 transition-colors"
                >
                  <svg
                    class="mr-3 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  @click.stop="handleDelete"
                  class="cursor-pointer flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <svg
                    class="mr-3 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>


      <div class="flex-grow"></div>

      <div class="flex w-full flex-col items-start p-4 sm:p-5 md:p-6">
        <div class="flex w-full flex-col items-start">
          <span class="font-normal text-white sm:text-sm md:text-base truncate">{{
            event.location
          }}</span>

          <h3
            class="text-white font-bold text-2xl sm:text-3xl md:text-4xl line-clamp-2"
          >
            {{ event.title }}
          </h3>

          <span class="font-normal text-white sm:text-sm md:text-base">{{
            event.time
          }}</span>
        </div>

        <button
          @click="router.push(`/admin/event-detail/${event.id}`)"
          class="cursor-pointer mt-2 flex h-8 w-full items-center justify-center rounded bg-black px-4 py-2 transition-all hover:bg-neutral-800 hover:scale-105 sm:h-9 md:h-10"
        >
          <span class="text-center font-semibold text-white sm:text-sm"
            >See Event</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import placeholdImage from "~/assets/placehold.png";
import { useRouter } from 'vue-router';

const { isOpen } = useSidebar();

const router = useRouter();

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const bgImage = computed(() => props.event?.backgroundImage || placeholdImage)

const emit = defineEmits(['edit', 'delete']);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleEdit = () => {
  emit('edit', props.event?.id);
  isDropdownOpen.value = false;
};

const handleDelete = () => {
  emit('delete', props.event?.id);
  isDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative');
  if (!dropdown) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>