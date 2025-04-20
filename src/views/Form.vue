<template>
    <div class="h-screen items-center w-screen md:w-screen md:items-center md:justify-center sm:justify-center sm:p-32 pl-24 p-8 pb-24">
      <h1 class="text-2xl font-bold mb-4">Tiket Internal</h1>
  
      <form  @submit.prevent="submitForm" class="p-6">
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2" >
              Nama Lengkap
            </label>
            <div class="relative">
              <input class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 pl-4 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-[#D52C2C] focus:ring-2 focus:ring-[#FF5F5F]/20 transition-all" 
             
                type="text" 
                v-model="form.name">
            </div>
            <p class="text-gray-500 text-xs mt-1">Harap masukkan nama lengkap</p>
          </div>
          
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2" >
              Email
            </label>
            <div class="relative">
              <input class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 pl-4 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-[#D52C2C] focus:ring-2 focus:ring-[#FF5F5F]/20 transition-all" 
                
                type="email" 
                v-model="form.email">
            </div>
            <p class="text-gray-500 text-xs mt-1">Harap masukkan email</p>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Nomor Whatsapp
            </label>
            <div class="relative">
              <input class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 pl-4 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-[#D52C2C] focus:ring-2 focus:ring-[#FF5F5F]/20 transition-all" 
             
                type="text" 
                v-model="form.phone">
            </div>
            <p class="text-gray-500 text-xs mt-1">Harap masukkan No. WA</p>
          </div>
          <!--
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Jenis ticket
            </label>
            <div class="relative">
                
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user-tag text-gray-400"></i>
                </div>
                <select id="grid-role"
                  class="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:bg-white focus:border-[#5EA2EF] transition-colors"
                  v-model="form.ticket_id">
                  <option value="" disabled selected>Pilih jenis tiket</option>
                  <option value="pelajar">Pelajar</option>
                  <option value="guru">Guru</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="umum">Umum</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i class="fas fa-chevron-down text-gray-400"></i>
                </div>
            
            </div>
            <p class="text-gray-500 text-xs mt-1">Harap masukkan ticket id</p>
          </div>
          -->

          

          
          

          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF5F5F] to-[#D52C2C] hover:from-[#FF4545] hover:to-[#C52020] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              Kirim
            </button>
          </div>
        </form>

    <p :style="{ color: messageColor }">{{ message }}</p>

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
  import axios from 'axios'
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    email: '',
    phone: '',
    ticket_id: '1004'
  })
  
  const message = ref('')
  const messageColor = ref('black')
  
  const submitForm = async () => {
    const apiUrl = import.meta.env.VITE_API_BASE;
    
    try {
      const res = await axios.post(`${apiUrl}/api/admin/tiket/make-ticket`, form.value, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      message.value = res.data.message
      messageColor.value = res.status === 200 ? 'green' : 'red'
    } catch (error) {
      message.value = 'Gagal mengirim data!'
      messageColor.value = 'red'
    }
  }
  </script>
  
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
  }
  </style>
  
