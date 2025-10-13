<template>
  <DesktopOnlyWrapper>
    <NuxtLayout>
      <div class="flex flex-col gap-4 px-4 md:px-8 pt-10 pb-8 ">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="font-bold text-2xl text-gray-800">Nama Acara</h1>

            <!-- Search and Export -->
            <!-- <div class="flex gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:flex-none text-sm">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search Event..."
                  class="pl-10 pr-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
                <svg
                  class="absolute left-3 top-2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <button
                @click="exportExcel"
                class="px-4 py-2 bg-lime-400 rounded-md hover:bg-lime-600 transition-colors flex-shrink-0 text-sm"
              >
                Export Excel
              </button>
            </div> -->
            <div class="">
              <div class="relative">
                <button
                  @click="toggleDropdown"
                  class="cursor-pointer flex h-8 w-8 items-center justify-center rounded-sm bg-black text-white transition-all hover:bg-opacity-70"
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
                    class="absolute right-0 mt-2 w-32 rounded-md bg-black"
                  >
                    <div class="py-1">
                      <button
                        @click="handleEdit"
                        class="cursor-pointer flex w-full items-center px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
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
                        @click="handleDelete"
                        class="cursor-pointer flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-500/50 hover:text-red-100 transition-colors"
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
          </div>
        </div>

        <!-- Content Card -->
        <div
          class="flex flex-col gap-4 rounded-md justify-center items-center bg-white p-6"
        >
          <img
            src="https://placehold.co/600x400"
            class="w-3/4 md:h-[600px] object-cover object-center mb-4"
            alt=""
          />
          <div class="px-6 grid grid-cols-3 w-full justify-between gap-2">
            <div class="text-wrap px-2 col-span-2">
              <!-- <h2 class="text-xl font-bold">Description</h2> -->
              <h2 class="text-xl mb-4 font-bold">Tentang Acara</h2>
              <p class="whitespace-pre-line text-justify">Deskripsi Acara</p>
            </div>
            <div class="px-2 space-y-2">
              <div>
                <h2 class="text-md font-bold">Event Room</h2>
                <p class="indent-2 text-sm">R. Kresna</p>
              </div>
              <div>
                <h2 class="text-md font-bold">Date</h2>
                <p class="indent-2 text-sm">28 Oktober 2025</p>
              </div>
              <div>
                <h2 class="text-md font-bold">Time</h2>
                <p class="indent-2 text-sm">13:00 - 15:00</p>
              </div>
            </div>
            <div class="text-wrap px-2 col-span-2">
              <h2 class="text-md mb-2 font-bold">Eligible Role</h2>
              <p class="text-sm whitespace-pre-line text-justify">
                Peninjau, Media, Dewan Pengurus
              </p>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </DesktopOnlyWrapper>
</template>

<script setup>
import { ref } from "vue";

const isDropdownOpen = ref(false);

const fetchId = useRoute().params.event;
const fetchEvent = async () => {
  // const response = await $fetch(`${config.public.BaseUrl}/event/${fetchId}`);
  // console.log(response, "<<<<<<<<<<<< FETCH EVENT");
};

onMounted(() => {
  fetchEvent();
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleEdit = () => {
  emit("edit");
  isDropdownOpen.value = false;
};

const handleDelete = () => {
  emit("delete");
  isDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest(".relative");
  if (!dropdown) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
