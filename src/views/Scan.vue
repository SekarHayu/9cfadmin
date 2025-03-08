<template>
<div class="items-center justify-center h-screen w-screen sm:w-screen "> 
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <!-- Judul -->
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Scan QR Tiket</h2>

    <!-- Scanner Kamera -->
    <div class="relative bg-white shadow-lg rounded-lg p-4">
      <qrcode-stream
        @decode="onDecode"
        @init="onInit"
        class="md:w-72 md:h-72 border-4 border-gray-300 rounded-lg"
      />
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-16 h-16 border-4 border-red-500 rounded-md animate-pulse"></div>
      </div>
    </div>

    <!-- Hasil Scan -->
    <p
      v-if="scannedData"
      class="mt-6 text-lg font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-md shadow"
    >
      ✅ Hasil Scan: {{ scannedData }}
    </p>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";

const scannedData = ref("");

// Saat QR berhasil discan
const onDecode = (result) => {
  scannedData.value = result;
  alert("QR Code Berhasil Dipindai: " + result);
};

// Saat kamera siap
const onInit = async (promise) => {
  try {
    await promise;
  } catch (error) {
    console.error("Gagal akses kamera:", error);
  }
};
</script>
