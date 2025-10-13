<template>
  <section id="beranda" class="hero-pattern pt-24 pb-16 md:pt-32 md:pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center">
        <div class="text-center md:text-left">
          <div class="flex md:flex-row flex-col gap-3 items-center justify-center">
            <img
              src="../../assets/logo.png"
              alt="Logo Kadin"
              class="w-24 mx-auto mb-2"
            />
            <h1 class="text-3xl md:text-5xl font-bold text-white leading-tight">
              RAPIMNAS<br />
              <span class="text-accent"
                >Rapat Pimpinan Nasional Kadin Indonesia</span
              >
            </h1>
          </div>
          <div
            class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#daftar"
              class="px-8 py-3 bg-amber-400 text-black font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 text-center"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No JavaScript needed for this component
</script>

<style scoped>
.hero-pattern {
  /* Background transparan agar gradient parent terlihat */
  background: transparent;
}
</style>
