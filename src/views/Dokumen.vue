<template>
    <div class="h-screen items-center w-screen md:w-screen md:items-center md:justify-center sm:justify-center sm:p-32 pl-24 p-8 pb-24">
      <h1 class="text-2xl font-bold mb-4">Daftar Tiket Peserta</h1>
  
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Status Verifikasi</th>
            <th class="px-4 py-2 border">Dokumen</th> 
            <th class="px-4 py-2 border">Verifikasi</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.userId" class="hover:bg-gray-50">
            <td class="px-4 py-2 border">{{ item.userId }}</td>
            <td class="px-4 py-2 border">{{ item.email }}</td>
            <td class="px-4 py-2 border">{{ item.status }}</td>
            <td class="px-4 py-2 border">
              <a
                :href="getFileUrl(item)"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                {{ getFileName(item.path) }}
              </a>
            </td>
            <td class="px-4 py-2 border">
              <button
                @click="verifikasiManual(item.userId)"
                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              >
                ✅ Verifikasi
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <!--<div class="my-8">
    <h2 class="text-lg font-semibold mb-2">Verifikasi Dokumen</h2>
    <input
      v-model="manualUserId"
      type="text"
      placeholder="Masukkan User ID"
      class="border rounded px-4 py-2 mr-2"
    />
    <button
      @click="verifikasiManual"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Verifikasi
    </button>
    <p v-if="feedback" class="mt-2 text-sm text-green-600">{{ feedback }}</p>
  </div>-->
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref([])
const feedback = ref('')

// ✅ URL generator berdasarkan pola penamaan file
const getFileUrlByPattern = (userId, email, extension = 'jpg') => {
  if (!userId || !email) return '#'
  const formattedEmail = email.replace(/@/g, '_').replace(/\./g, '_')
  const filename = `${userId}-${formattedEmail}-1.${extension}`
  const apiUrl = import.meta.env.VITE_API_BASE
  return `${apiUrl}/file/verifikasi_dokumen/${userId}/${filename}`
}

const getFileUrl = (item) => {
  if (!item?.userId || !item?.email) return '#'
  const fileName = getFileName(item.path)
  const apiUrl = import.meta.env.VITE_API_BASE
  return `${apiUrl}/api/file/${item.userId}/${fileName}`
}


const getFileName = (path) => {
  const segments = path.split('\\')
  return segments[segments.length - 1]
}

// ✅ Deteksi format file dari path
const getExtensionFromPath = (path) => {
  const match = path?.match(/\.(jpg|jpeg|png|pdf)$/i)
  return match ? match[1] : 'jpg'
}

const fetchData = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE
    const response = await axios.get(`${apiUrl}/api/all-request`)
    data.value = response.data.data || []
  } catch (error) {
    console.error('Gagal ambil data verifikasi:', error)
  }
}
const verifikasiManual = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE
    const response = await axios.post(`${apiUrl}/api/admin/user/second-verified`, {
      userId
    })
    feedback.value = response.data.message || 'Berhasil diverifikasi!'
    await fetchData()
  } catch (err) {
    console.error('Gagal verifikasi:', err)
    feedback.value = 'Terjadi kesalahan saat verifikasi.'
  }
}

// Log the full path from backend for debugging
const logFilePath = (item) => {
  console.log('Full path from backend:', item.path)
}


onMounted(() => {
  fetchData()
  data.value.forEach(logFilePath)
})
</script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
  }
  </style>
  
