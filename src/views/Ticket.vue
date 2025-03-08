<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Daftar Tiket Peserta</h1>
  
      
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Cari Nama Peserta atau Nomor Tiket..." 
        class="w-full p-2 border rounded mb-4"
      />
  
      
      <table class="w-full border-collapse border">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Nomor Tiket</th>
            <th class="border p-2">Nama Peserta</th>
            <th class="border p-2">Jenis Tiket</th>
            <th class="border p-2">Tanggal Pembelian</th>
            <th class="border p-2">Status</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in filteredTickets" :key="index">
            <td class="border p-2">{{ ticket.nomor }}</td>
            <td class="border p-2">{{ ticket.nama }}</td>
            <td class="border p-2">{{ ticket.jenis }}</td>
            <td class="border p-2">{{ ticket.tanggal }}</td>
            <td class="border p-2">
              <span :class="ticket.status === 'Aktif' ? 'text-green-500' : 'text-red-500'">
                {{ ticket.status }}
              </span>
            </td>
            <td class="border p-2 flex gap-2">
              <button @click="editTicket(ticket)" class="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="deleteTicket(index)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
        tickets: [
          { nomor: "TKT123", nama: "Rina", jenis: "VIP", tanggal: "2025-03-01", status: "Aktif" },
          { nomor: "TKT124", nama: "Budi", jenis: "Reguler", tanggal: "2025-03-02", status: "Digunakan" },
          { nomor: "TKT125", nama: "Siti", jenis: "VIP", tanggal: "2025-03-03", status: "Aktif" },
        ],
      };
    },
    computed: {
      filteredTickets() {
        return this.tickets.filter(ticket => 
          ticket.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ticket.nomor.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      editTicket(ticket) {
        alert(`Edit tiket: ${ticket.nomor}`);
      },
      deleteTicket(index) {
        if (confirm("Yakin ingin menghapus tiket ini?")) {
          this.tickets.splice(index, 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
  }
  </style>
  