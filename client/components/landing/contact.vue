<template>
  <section id="kontak" class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold">Kontak Kami</h2>
        <div class="w-24 h-1 bg-[#FBBF24] mx-auto mt-4"></div>
        <p class="mt-4 text-gray-800 max-w-3xl mx-auto">
          Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut,
          silakan hubungi kami
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 md:justify-center gap-8">
        <div
          v-for="(contact, index) in contactInfo"
          :key="index"
          class="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-md text-center"
        >
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1E3A8A] text-white mb-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="contact.icon"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-black mb-2">
            {{ contact.title }}
          </h3>
          <p v-for="(line, i) in contact.lines" :key="i" class="text-gray-800">
            {{ line }}
          </p>
        </div>
      </div>

      <p class="mt-12 text-center font-medium mb-2 text-[#1E3A8A]">
        Ikuti Sosial Media Resmi Kadin
      </p>
      <div
        class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
      >
        <a
          v-for="(social, index) in socialMedia"
          :key="index"
          :href="social.link"
          class="inline-flex items-center justify-center p-3 text-white font-medium rounded-full shadow-md transition duration-300"
          :class="social.bgColor"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="social.icon"></path>
          </svg>
          <!-- <span>{{ social.name }}</span> -->
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { sekretariat } from "~/constants/details";

const contactInfo = [
  // {
  //   title: "Telepon",
  //   icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  //   lines: sekretariat.phone,
  // },
  {
    title: "Email",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    lines: sekretariat.email,
  },
  {
    title: "Alamat",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    lines: [sekretariat.building, sekretariat.address],
  },
];

const socialMedia = [
  {
    name: "Facebook",
    link: sekretariat.facebook,
    bgColor: "bg-blue-600 hover:bg-blue-700",
    icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    name: "Twitter",
    link: sekretariat.twitter,
    bgColor: "bg-blue-400 hover:bg-blue-500",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "YouTube",
    link: sekretariat.youtube,
    bgColor: "bg-red-600 hover:bg-red-700",
    icon: "M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z",
  },
  {
    name: "Instagram",
    link: sekretariat.instagram,
    bgColor: "bg-pink-600 hover:bg-pink-700",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "LinkedIn",
    link: sekretariat.linkedin,
    bgColor: "bg-blue-600 hover:bg-blue-700",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];
</script>
