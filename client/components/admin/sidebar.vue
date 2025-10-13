<template>
  <aside
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
    :class="[
      'sticky top-0 flex flex-col h-screen justify-between bg-white shadow-xl transition-all duration-300 ease-in-out',
      isOpen ? 'w-72' : 'w-20',
    ]"
  >
    <div>
      <div class="flex items-center gap-3 overflow-hidden px-6 pb-4 pt-6">
        <div
          class="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-black/90 text-sm font-bold text-white"
        >
          R
        </div>
        <span
          v-if="isOpen"
          class="text-lg font-extrabold tracking-tight text-gray-900"
          >Rapimnas</span
        >
      </div>

      <nav class="mt-6 flex-1">
        <ul class="space-y-3 px-3">
          <li>
            <NuxtLink
              :to="'/admin/dashboard'"
              :class="navLinkClass('/admin/dashboard')"
              :title="isOpen ? '' : 'Dashboard'"
            >
              <VueIcon name="bx:home" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/pendaftaran-dewan'"
              :class="navLinkClass('/admin/pendaftaran-dewan')"
              :title="isOpen ? '' : 'Pendaftaran Dewan'"
            >
              <VueIcon
                name="bx:solid-dashboard"
                class="h-5 w-5 flex-shrink-0"
              />
              <span v-if="isOpen" class="truncate">Pendaftaran Dewan</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/pendaftaran-pengurus'"
              :class="navLinkClass('/admin/pendaftaran-pengurus')"
              :title="isOpen ? '' : 'Pendaftaran Pengurus'"
            >
              <VueIcon
                name="bx:solid-dashboard"
                class="h-5 w-5 flex-shrink-0"
              />
              <span v-if="isOpen" class="truncate">Pendaftaran Pengurus</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/pengaturan-provinsi'"
              :class="navLinkClass('/admin/pengaturan-provinsi')"
              :title="isOpen ? '' : 'Pengaturan Provinsi'"
            >
              <VueIcon name="bx:arch" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Pengaturan Provinsi</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/pendaftaran-alb'"
              :class="navLinkClass('/admin/pendaftaran-alb')"
              :title="isOpen ? '' : 'Pendaftaran ALB'"
            >
              <VueIcon name="bx:buildings" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Pendaftaran ALB</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/pendaftaran-media'"
              :class="navLinkClass('/admin/pendaftaran-media')"
              :title="isOpen ? '' : 'Pendaftaran Media'"
            >
              <VueIcon name="bx:tv" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Pendaftaran Media</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/pendaftaran-eksternal'"
              :class="navLinkClass('/admin/pendaftaran-eksternal')"
              :title="isOpen ? '' : 'Pendaftaran Eksternal'"
            >
              <VueIcon name="bx:badge-check" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Pendaftaran Eksternal</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/participant-management'"
              :class="navLinkClass('/admin/participant-management')"
              :title="isOpen ? '' : 'Participant Management'"
            >
              <VueIcon name="bx:solid-group" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Participant Management</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/staff-management'"
              :class="navLinkClass('/admin/staff-management')"
              :title="isOpen ? '' : 'Staff Management'"
            >
              <VueIcon name="bx:user" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Staff Management</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/event-management'"
              :class="navLinkClass('/admin/event-management')"
              :title="isOpen ? '' : 'Event Management'"
            >
              <VueIcon name="bx:calendar" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Event Management</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/room-management'"
              :class="navLinkClass('/admin/room-management')"
              :title="isOpen ? '' : 'Room Management'"
            >
              <VueIcon name="bx:location-plus" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Room Management</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/admin/registration-config'"
              :class="navLinkClass('/admin/registration-config')"
              :title="isOpen ? '' : 'Registration Config'"
            >
              <VueIcon name="bx:solid-cog" class="h-5 w-5 flex-shrink-0" />
              <span v-if="isOpen" class="truncate">Registration Config</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="px-3 pb-6">
      <div class="mb-2 border-t border-gray-200"></div>
      <button
        class="flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-100"
        :class="!isOpen && 'justify-center'"
        title="Logout"
      >
        <VueIcon class="h-5 w-5 flex-shrink-0" name="an:outlined-logout" />
        <span v-if="isOpen" class="truncate">Logout</span>
      </button>

      <!-- <button
        @click="toggleSidebar"
        class="mt-4 flex w-full items-center gap-3 overflow-hidden rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
        :class="!isOpen && 'justify-center'"
        :title="isOpen ? 'Ciutkan' : 'Lebarkan'"
      >
        <VueIcon
          :name="isOpen ? 'bx:chevron-left' : 'bx:chevron-right'"
          class="h-5 w-5 flex-shrink-0"
        />
        <span v-if="isOpen" class="truncate">Tutup</span>
      </button> -->
    </div>
  </aside>
</template>

<script setup>
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
const route = useRoute();

const { isOpen, toggleSidebar } = useSidebar();

const isActive = (path) => route.path.startsWith(path);

const navLinkClass = (path) => [
  "flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors overflow-hidden",
  isActive(path) ? "bg-black text-white" : "text-gray-900 hover:bg-gray-100",
];
</script>
