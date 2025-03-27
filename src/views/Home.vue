<template>
    <div class="h-screen items-center w-screen md:w-screen md:items-center md:justify-center sm:justify-center sm:p-32 pl-24 p-8">
      <h1 class="text-2xl font-bold mb-4">Home</h1>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-white p-6 md:w-96 rounded-lg shadow-md">
            <h2 class="font-bold text-xl">Jumlah Tiket Terjual</h2>
            <p class="text-4xl font-bold text-blue-500">{{ totalTiket }}</p>
        </div>
        
        <div class="bg-white p-6 md:w-96 rounded-lg shadow-md">
            <h2 class="font-bold text-xl">Jumlah Tiket Sudah Diambil</h2>
            <p class="text-4xl font-bold text-blue-500">{{ totalScannedTiket }}</p>
        </div>
      </div>
        

      
    </div>
  </template>
  
  <script>
  import axios from "axios";

    export default {
    data() {
        return {
        totalTiket: 0, // Menyimpan total tiket yang sudah dibeli
        totalScannedTiket: 0, // tiket sudah di scan
        };
    },
    async mounted() {
        try {
        const apiUrl = import.meta.env.VITE_API_BASE;
        const response = await axios.get(`${apiUrl}/api/admin/tiket/get-ticket-success`);
        
        if (response.data.code === 200) {
        const transactions = response.data.data;
        
        // Menghitung total tiket yang dibeli
        this.totalTiket = transactions.reduce((total, transaction) => total + transaction.tickets.length, 0);
        
        // Menghitung total tiket yang sudah di-scan
        this.totalScannedTiket = transactions.reduce((total, transaction) => 
          total + transaction.tickets.filter(ticket => ticket.isScanned).length, 0
        );
      }
        } catch (error) {
        console.error("Error fetching ticket data:", error);
        }
    },
    };
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
 
  </style>
  