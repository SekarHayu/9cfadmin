<template>
<div class="h-screen items-center w-screen md:w-screen md:items-center md:justify-center sm:justify-center sm:pl-0 pl-16 pb-24"> 
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 ">
    <!-- Judul tes-->
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Scan QR Tiket</h2>

    <!-- Scanner Kamera -->
    <div class="relative bg-white shadow-lg rounded-lg p-4 ">
      <qrcode-stream
        @decode="onDecode"
        @init="onInit"
        class="w-72 h-72 max-w-xs sm:max-w-md md:max-w-lg border-4 border-gray-300 rounded-lg"
      />
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-16 h-16 border-4 border-red-500 rounded-md animate-pulse"></div>
      </div>
    </div>

    <!-- Hasil Scan -->
    <p v-if="message" :class="messageClass" class="mt-6 text-lg font-semibold px-4 py-2 rounded-md shadow">
      {{ message }}
    </p>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import axios from "axios";

const scannedData = ref("");
const message = ref("");
const messageClass = ref("");
const apiUrl = import.meta.env.VITE_API_BASE;

// Saat QR berhasil discan
const onDecode = async (result) => {
  scannedData.value = result;
  message.value = "⏳ Memproses tiket...";
  messageClass.value = "text-blue-600 bg-blue-100";

  try {
    const response = await axios.post(`${apiUrl}/api/admin/tiket/scan-ticket`, {
      ticket: result,
    });

    message.value = `✅ ${response.data.message}`;
    messageClass.value = "text-green-600 bg-green-100";
  } catch (error) {
    message.value = error.response?.data?.message || "❌ Terjadi kesalahan!";
    messageClass.value = "text-red-600 bg-red-100";
  }
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
