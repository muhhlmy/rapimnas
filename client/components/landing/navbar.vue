<template>
    <nav class="bg-white shadow-md fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <!-- Logo SVG -->
              <img :src="logoUrl" width="50" alt="Logo KADIN" />
              <!-- <svg
                class="h-10 w-auto"
                viewBox="0 0 100 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="60" rx="5" fill="#1E3A8A" />
                <path
                  d="M20 15H80M20 30H80M20 45H80"
                  stroke="#FBBF24"
                  stroke-width="3"
                />
                <text
                  x="50"
                  y="25"
                  font-family="Arial"
                  font-size="10"
                  fill="white"
                  text-anchor="middle"
                >
                  KADIN
                </text>
                <text
                  x="50"
                  y="40"
                  font-family="Arial"
                  font-size="8"
                  fill="white"
                  text-anchor="middle"
                >
                  JAWA BARAT
                </text>
              </svg> -->
              <span
                class="ml-3 text-xl font-semibold text-primary hidden md:block"
                >RAPIMNAS KADIN INDONESIA</span
              >
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a
              href="#beranda"
              class="text-primary hover:text-secondary font-medium"
              >Beranda</a
            >
             <!-- <a
              href="#tentang"
              class="text-primary hover:text-secondary font-medium hidden"
              >Tentang</a
            >
            <a
              href="#agenda"
              class="text-primary hover:text-secondary font-medium hidden"
              >Agenda</a
            >
            <a
              href="#pembicara"
              class="text-primary hover:text-secondary font-medium hidden"
              >Pembicara</a
            >
            <a
              href="#lokasi"
              class="text-primary hover:text-secondary font-medium hidden"
              >Lokasi</a
            > -->
            <a
              href="#kontak"
              class="text-primary hover:text-secondary font-medium"
              >Kontak</a
            >
          </div>
          <div class="flex items-center md:hidden">
            <button
              @click="toggleMobileMenu"
              class="text-gray-600 hover:text-primary focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden bg-white shadow-md">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#beranda"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100"
            >Beranda</a
          >
          <!-- <a
            href="#tentang"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 hidden"
            >Tentang</a
          >
          <a
            href="#agenda"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 hidden"
            >Agenda</a
          >
          <a
            href="#pembicara"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 hidden"
            >Pembicara</a
          >
          <a
            href="#lokasi"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 hidden"
            >Lokasi</a
          > -->
          <a
            href="#kontak"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100"
            >Kontak</a
          >
        </div>
      </div>
    </nav>
  </template>
  
<script setup>
import { ref } from "vue";
import { sekretariat } from "~/constants/details";
import logoUrl from "~/assets/logo.png";
  
  const mobileMenuOpen = ref(false);
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
  
  const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
  };
  </script>
  