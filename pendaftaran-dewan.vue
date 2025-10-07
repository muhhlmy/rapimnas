<template>
  <NuxtLayout>
    <!-- Header -->
    <div class="flex justify-between p-10 items-center">
      <h1 class="font-bold text-4xl text-gray-800">Pendaftaran Dewan</h1>
      <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <svg
            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Export Excel
        </button>
      </div>
    </div>
    <!-- Main Content -->
    <div class="flex flex-col p-10 gap-8 w-full h-full">
      <div class="flex flex-col gap-4 rounded-2xl bg-white p-4 h-fit w-full">
        <!-- Search & Filter -->
        <div class="flex gap-4 w-full justify-end">
          <button class="bg-black text-white px-6 py-2 rounded-xl">
            <a href="">Tambah ALB</a>
          </button>
          <button class="bg-black text-white px-6 py-2 rounded-xl">
            <a href="">Filter</a>
          </button>
        </div>
        <!-- Room Card -->
        <table
          class="table-auto w-full border border-slate-200 border-separate rounded-xl"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-4 text-left border-b border-slate-200">
                Nama
              </th>
              <th class="px-4 py-4 text-left border-b border-slate-200">
                No. KTA
              </th>
              <th class="px-4 py-4 text-left border-b border-slate-200">
                Email
              </th>
              <th class="px-4 py-4 text-left border-b border-slate-200">HP</th>
              <th class="px-4 py-4 text-center border-b border-slate-200">
                Photo
              </th>
              <th class="px-4 py-4 text-center border-b border-slate-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="i in allData">
              <tr class="hover:bg-gray-50 items-center">
                <td class="px-4 py-3 border-b border-slate-200">
                  {{ i.Nama }}
                </td>
                <td class="px-4 py-3 border-b border-slate-200">
                  {{ i.KTA }}
                </td>
                <td class="px-4 py-3 border-b border-slate-200">
                  {{ i.Email }}
                </td>
                <td class="px-4 py-3 border-b border-slate-200">
                  {{ i.HP }}
                </td>
                <td class="px-4 py-3 border-b border-slate-200">
                  <img
                    src="assets/profile.png"
                    alt="Pas Foto"
                    class="w-fit h-10 rounded-full mx-auto"
                  />
                </td>
                <td
                  class="px-4 py-3 border-b border-slate-200 text-center space-x-2"
                >
                  <button
                    @click="editItem(item)"
                    class="p-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
                    title="Edit"
                  >
                    <svg
                      class="w-4 h-4"
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
                  </button>
                  <button
                    @click="deleteItem(item)"
                    class="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <svg
                      class="w-4 h-4"
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
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex w-full justify-center gap-4">
          <div><</div>
          <template v-for="i in 10">
            <div>1</div>
          </template>
          <div>></div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const allData = [
  {
    Nama: "Andi Pratama",
    KTA: "KTA-001",
    Email: "andi.pratama@example.com",
    HP: "081234567890",
  },
  {
    Nama: "Budi Santoso",
    KTA: "KTA-002",
    Email: "budi.santoso@example.com",
    HP: "081298765432",
  },
  {
    Nama: "Citra Lestari",
    KTA: "KTA-003",
    Email: "citra.lestari@example.com",
    HP: "082112233445",
  },
  {
    Nama: "Dewi Kartika",
    KTA: "KTA-004",
    Email: "dewi.kartika@example.com",
    HP: "085677889900",
  },
  {
    Nama: "Eko Wibowo",
    KTA: "KTA-005",
    Email: "eko.wibowo@example.com",
    HP: "087811223344",
  },
  {
    Nama: "Fitri Handayani",
    KTA: "KTA-006",
    Email: "fitri.handayani@example.com",
    HP: "089912345678",
  },
  {
    Nama: "Gilang Saputra",
    KTA: "KTA-007",
    Email: "gilang.saputra@example.com",
    HP: "081377889922",
  },
  {
    Nama: "Hana Oktaviani",
    KTA: "KTA-008",
    Email: "hana.oktaviani@example.com",
    HP: "082188899977",
  },
];

const latihan = {
  Nama: "Helmy",
  Jabatan: "Ketua Umum KADIN Indonesia",
  Anak: [
    { Nama: "Helmy JR", Umur: 18 },
    { Nama: "Bagas JR", Umur: 18 },
  ],
};
</script>
