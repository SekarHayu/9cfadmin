<template>
<div class="h-screen items-center w-screen md:w-screen md:items-center md:justify-center sm:justify-center sm:pl-0 pl-16 pb-24"> 
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 ">
    <!-- Judul-->
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Scan QR Tiket</h2>

    <!-- Scanner Kamera -->
    <div class="scanner-container mx-4">
      <div id="reader"></div>
      <p class="text-center my-2">{{ resultMessage }}</p>
    </div>


    <button @click="resetScanner" class="bg-green-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition">
  Reset Scanner
</button>
    <!-- Hasil Scan -->
    <p v-if="message" :class="messageClass" class="mt-6 text-lg font-semibold px-4 py-2 rounded-md shadow">
      {{ message }}
    </p>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from "axios";

const resultMessage = ref('Arahkan kamera ke QR Code atau barcode...')
const messageClass = ref('')
const isProcessing = ref(false)
let html5QrCode = null

const apiUrl = import.meta.env.VITE_API_BASE;

async function startScanner() {
  const { Html5Qrcode } = await import('html5-qrcode')

  if (html5QrCode) {
    try {
      await html5QrCode.stop()
      await html5QrCode.clear()
    } catch (e) {
      console.warn("Gagal stop scanner sebelumnya:", e)
    }
  }

  html5QrCode = new Html5Qrcode("reader")

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    async (decodedText) => {
      if (isProcessing.value) return
      isProcessing.value = true
      resultMessage.value = "Memproses kode..."

      try {
        const apiUrl = import.meta.env.VITE_API_BASE;
        const response = await axios.post(`${apiUrl}/api/admin/tiket/scan-ticket`, {
          ticket: decodedText,
        })

        resultMessage.value = response.data.message
        messageClass.value = "text-green-600 bg-green-100"
      } catch (error) {
        resultMessage.value = error.response?.data?.message || "❌ Terjadi kesalahan!"
        messageClass.value = "text-red-600 bg-red-100"
      } finally {
        setTimeout(() => {
          isProcessing.value = false
          html5QrCode?.stop().then(() => html5QrCode.clear())
        }, 2000)
      }
    },
    (errorMessage) => {
      // scanning error (bisa dikosongkan)
    }
  )
}

async function resetScanner() {
  resultMessage.value = "Arahkan kamera ke QR Code atau barcode..."
  messageClass.value = ""

  if (html5QrCode) {
    try {
      await html5QrCode.stop()
      await html5QrCode.clear()
    } catch (e) {
      console.warn("Scanner belum nyala atau sudah berhenti:", e.message)
    }
  }

  startScanner()
}


onMounted(() => {
  startScanner()
})

onBeforeUnmount(() => {
  if (html5QrCode) {
    html5QrCode.stop().then(() => html5QrCode.clear())
  }
})
</script>
