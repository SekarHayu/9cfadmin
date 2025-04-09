<template>
  <div
    class="h-screen items-center w-screen md:w-screen mb-12 md:items-center md:justify-center sm:justify-center sm:p-32 pl-24 p-8 pb-24">
    <div class="mb-4 md:mt-0 mt-4">
      <h1 class="text-2xl font-bold">Keterangan</h1>
      <li class="italic">Untuk penulisan alias pada "Tambah Tiket", tulis dengan format jenis_tiket</li>
      <li class="italic">Untuk penulisan harga pada "Tambah Tiket", tulis dengan format angka saja, misal 60000</li>
      <li class="italic">Untuk melihat perubahan setelah melakukan klik pada button, silakan refresh</li>
    </div>


    <h1 class="text-2xl font-bold mb-4">Daftar Jenis Tiket</h1>


    <!-- TABEL TIKET -->
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse border text-sm md:text-base">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Ticket ID</th>
            <th class="border p-2">Nama Tiket</th>
            <th class="border p-2">Harga</th>
            <th class="border p-2">Status</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td class="border p-2">{{ ticket.productId }}</td>
            <td class="border p-2">{{ ticket.name }}</td>
            <td class="border p-2">Rp {{ ticket.price.toLocaleString() }}</td>
            <td class="border p-2">
              <span :class="ticket.isReady ? 'text-green-600' : 'text-red-600'">
                {{ ticket.isReady ? "Aktif" : "Non-Aktif" }}
              </span>
            </td>
            <td class="border p-2">
              <button @click="toggleStatus(ticket)" class="px-4 py-2 text-white rounded mr-4"
                :class="ticket.isReady ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'">
                {{ ticket.isReady ? "Non-Aktifkan" : "Aktifkan" }}
              </button>
              <button @click="deleteTicket(ticket.productId)"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FORM TAMBAH TIKET -->
    <div class="max-w-md ">
      <h2 class="text-2xl font-bold mb-4">Tambah Tiket</h2>
      <form @submit.prevent="addTicket">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Alias</label>
          <input v-model="newTicket.alias" type="text" class="w-full border p-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Nama Tiket</label>
          <input v-model="newTicket.name" type="text" class="w-full border p-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Harga</label>
          <input v-model="newTicket.price" type="number" class="w-full border p-2 rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tambah Tiket
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tickets: [],
      newTicket: {
        alias: '',
        name: '',
        price: ''
      },
      apiUrl: import.meta.env.VITE_API_BASE
    };
  },
  async mounted() {
    await this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        console.log("[INFO] Fetching from:", this.apiUrl);
        const response = await axios.get(`${this.apiUrl}/api/admin/tiket/get-all`);
        this.tickets = response.data.data;
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    },
    async toggleStatus(ticket) {
      try {
        const newStatus = !ticket.isReady;
        await axios.post(`${this.apiUrl}/api/admin/tiket/ticket-status`, {
          ticketId: ticket.id,
          newStatus
        });

        if (response.status === 200) {
          ticket.isReady = newStatus; // Langsung update di frontend
        }
      } catch (error) {
        console.error("Error updating ticket status:", error);
      }
    },
    async addTicket() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/admin/tiket/add-ticket`, this.newTicket);
        alert(response.data.message); // Notifikasi sukses

        this.newTicket = { alias: '', name: '', price: '' }; // Reset form
      } catch (error) {
        console.error("Error menambahkan tiket:", error);
        alert("Gagal menambahkan tiket!");
      }
    },
    async deleteTicket(ticketId) {
      if (!confirm("Apakah kamu yakin ingin menghapus tiket ini?")) return;
      try {
        await axios.delete(`${this.apiUrl}/api/admin/tiket/delete-ticket`, {
          data: { ticketId }
        });
        this.tickets = this.tickets.filter(ticket => ticket.productId !== ticketId);
      } catch (error) {
        console.error("Error deleting ticket:", error);
      }
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>
