  <template>
      <div class="h-screen items-center w-screen md:w-screen md:items-center md:justify-center sm:justify-center sm:p-32 pl-24 p-8 pb-24  "> 

        <h1 class="text-2xl font-bold mb-4">Manual Ticket Scan</h1>
    
    <div class="bg-white p-6 rounded-lg shadow-md md:w-96">
      <input 
        v-model="bookingCode" 
        type="text" 
        placeholder="Masukkan Booking Code" 
        class="border p-2 w-full rounded-md focus:ring focus:ring-blue-200"
      />
      
      <button 
        @click="scanTicket" 
        :disabled="loading || !bookingCode" 
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 disabled:bg-gray-300"
      >
        {{ loading ? "Scanning..." : "Scan Ticket" }}
      </button>

      <p v-if="message" :class="messageType">{{ message }}</p>
    </div>
        <h1 class="text-2xl pt-12 font-bold mb-4">Daftar Tiket Peserta</h1>
    
        
        <input
          type="text"
          v-model="searchEmail"
          placeholder="Cari berdasarkan email..."
          class="border p-2 rounded mb-4 w-full md:w-96"
        />
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border mb-4 text-sm md:text-base">
            <thead>
              <tr class="bg-gray-100">
          <th class="border p-2">Email</th>
          <th class="border p-2">ID</th>
          <th class="border p-2">Booking Code</th>
          <th class="border p-2">Scanned</th>
          <th class="border p-2">Ticket ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in filteredTickets" :key="ticket.id">
          <td class="border p-2">{{ ticket.email }}</td>
          <td class="border p-2">{{ ticket.id }}</td>
          <td class="border p-2">{{ ticket.bookingCode }}</td>
          <td class="border p-2">{{ ticket.scanned ? '✅' : '❌' }}</td>
          <td class="border p-2">{{ ticket.ticketId }}</td>
        </tr>
      </tbody>
        </table>

        
      </div>

      
      </div>
    </template>
    
    <script>
import axios from "axios";

export default {
  data() {
    return {
      tickets: [],
      bookingCode: "",
      message: "",
      messageType: "",
      loading: false,
      searchEmail: "", 
    };
  },
  methods: {
    async scanTicket() {
      if (!this.bookingCode) return;
      
      this.loading = true;
      this.message = "";
      
      try {
        const apiUrl = import.meta.env.VITE_API_BASE;
        const response = await axios.post(`${apiUrl}/api/admin/tiket/manual-scanned`, {
          bookingCode: this.bookingCode,
        });

        this.message = response.data.message;
        this.messageType = "text-green-500";
        
      } catch (error) {
        this.message = error.response?.data?.message || "Terjadi kesalahan!";
        this.messageType = "text-red-500";
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE;
      const response = await axios.get(`${apiUrl}/api/admin/tiket/get-ticket-success`);
      if (response.data.code === 200) {
        this.tickets = response.data.data.flatMap((transaction) =>
          transaction.tickets.map((ticket) => ({
            email: transaction.user.email,
            id: transaction.id, 
            bookingCode : ticket.bookingCode,
            scanned: ticket.isScanned,
            ticketId: ticket.urlTicket ? ticket.urlTicket.ticketId : "-",
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
    
  },
  computed: {
  filteredTickets() {
    return this.tickets.filter(ticket =>
      ticket.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  }
}
};
</script>
    
    <style scoped>
    .container {
      max-width: 900px;
      margin: auto;
    }
    </style>
    
