<template>
  <footer class="bg-[#1E3A8A] text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <img :src="logoUrl" width="50" />

            <span class="ml-3 text-xl font-semibold">RAPIMNAS KADIN INDONESIA</span>
          </div>
          <p class="text-gray-300 mb-4">
            Rapat Pimpinan Nasional Kadin Indonesia 2025
            
          </p>
          <p class="text-gray-300">
            © {{ currentYear }} Kadin Indonesia. All rights reserved.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Tautan Cepat</h3>
          <ul class="space-y-2">
            <li v-for="(link, index) in quickLinks" :key="index">
              <a
                :href="link.url"
                class="text-gray-300 hover:text-white transition duration-300"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Informasi</h3>
          <ul class="space-y-2">
            <li v-for="(info, index) in infoLinks" :key="index">
              <a
                :href="info.url"
                class="text-gray-300 hover:text-white transition duration-300"
                >{{ info.text }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-sm text-gray-300 mb-4 md:mb-0">
          Dikembangkan oleh Sekretariat Kadin Indonesia
        </p>
        <div class="flex space-x-4 mr-12">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.url"
            class="text-gray-300 hover:text-white transition duration-300"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="social.icon"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { sekretariat } from "~/constants/details";
import logoUrl from "~/assets/logo.png";


const currentYear = computed(() => new Date().getFullYear());

const quickLinks = [
  { text: "Beranda", url: "#beranda" },
  // { text: "Tentang", url: "#tentang" },
  // { text: "Agenda", url: "#agenda" },
  // { text: "Pembicara", url: "#pembicara" },
  // { text: "Lokasi", url: "#lokasi" },
  { text: "Pendaftaran", url: "#daftar" },
];

const infoLinks = [{ text: "Kadin Indonesia", url: "http://www.kadin.id" }];

const socialLinks = [
  {
    url: sekretariat.facebook,
    icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    url: sekretariat.twitter,
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    url: sekretariat.instagram,
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    url: sekretariat.youtube,
    icon: "M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z",
  },
  {
    url: sekretariat.linkedin,
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];
</script>
