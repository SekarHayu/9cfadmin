<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4">Data Pembelian Tiket</h1>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">Nama</th>
          <th class="border p-2">Email</th>
          <th class="border p-2">Tipe Tiket</th>
          <th class="border p-2">Status Pembayaran</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id" class="text-center">
          <td class="border p-2">{{ ticket.name }}</td>
          <td class="border p-2">{{ ticket.email }}</td>
          <td class="border p-2">{{ ticket.type }}</td>
          <td class="border p-2">
            <span :class="{
              'text-green-500 font-bold': ticket.status === 'paid',
              'text-red-500 font-bold': ticket.status === 'pending'
            }">
              {{ ticket.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tickets = ref([
  { id: 1, name: 'Lintang', email: 'lintang@example.com', type: 'VIP', status: 'paid' },
  { id: 2, name: 'Ayu', email: 'ayu@example.com', type: 'Regular', status: 'pending' },
  { id: 3, name: 'Rizki', email: 'rizki@example.com', type: 'VIP', status: 'paid' },
])

// Auto-refresh tiap 5 detik (nanti ganti dengan API fetch)
const fetchTickets = () => {
  console.log('Fetching latest tickets...')
}

onMounted(() => {
  setInterval(fetchTickets, 5000)
})
</script>
