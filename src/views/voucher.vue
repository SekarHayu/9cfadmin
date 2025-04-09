<template>
  <div class="h-screen w-screen pl-24 pt-10 pr-20">
    <h1 class="text-2xl font-bold mb-4">Daftar Voucher</h1>



    <div class="overflow-x-auto">
      <table class="w-full border-collapse border text-sm md:text-base">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">Code</th>
            <th class="border p-2">Description</th>
            <th class="border p-2">Discount Amount</th>
            <th class="border p-2">Status</th>
            <th class="border p-2">Used Count</th>
            <th class="border p-2">Max Use</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="voucher in vouchers" :key="voucher.id">
            <td class="border p-2">{{ voucher.code }}</td>
            <td class="border p-2">{{ voucher.description }}</td>
            <td class="border p-2">{{ voucher.discountAmount }}</td>
            <td class="border p-2">
              <span :class="voucher.isActive ? 'text-green-600' : 'text-red-600'">
                {{ voucher.isActive ? "Aktif" : "Non-Aktif" }}
              </span>
            </td>
            <td class="border p-2">{{ voucher.usedCount }}</td>
            <td class="border p-2">{{ voucher.maxUse }}</td>
            <td class="border p-2">
              <button @click="toggleStatus(voucher)" class="px-4 py-2 text-white rounded mr-4"
                :class="voucher.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'">
                {{ voucher.isActive ? "Non-Aktifkan" : "Aktifkan" }}
              </button>
              <button @click="deleteVoucher(voucher.id)"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="max-w-md pt-10">
      <h2 class="text-2xl font-bold mb-4">Tambah Voucher</h2>
      <form @submit.prevent="addVoucher">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Code</label>
          <input v-model="newVoucher.code" type="text" class="w-full border p-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <input v-model="newVoucher.description" type="text" class="w-full border p-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Discount Amount</label>
          <input v-model="newVoucher.discountAmount" type="number" class="w-full border p-2 rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Max Use</label>
          <input v-model="newVoucher.maxUse" type="number" class="w-full border p-2 rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tambah Tiket
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      vouchers: [],
      newVoucher: {
        code: '',
        description: '',
        discountAmount: '',
        maxUse: ''
      },
      message: "",
      messageType: "",
      loading: false,
      apiUrl: import.meta.env.VITE_API_BASE
    };
  },
  async mounted() {
    await this.fetchVouchers();
  },
  methods: {
    async fetchVouchers() {
      try {
        console.log("[INFO] Fetching from:", this.apiUrl);
        const response = await axios.get(`${this.apiUrl}/api/getallvoucher `);
        this.vouchers = response.data.data;
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    },
    async toggleStatus(voucher) {
      try {
        const isActive = !voucher.isActive;
        const response = await axios.put(`${this.apiUrl}/api/updatevoucher/${voucher.id}`, {
          isActive
        });

        if (response.status === 200) {
          voucher.isActive = isActive; // Langsung update di frontend
        }
      } catch (error) {
        console.error("Error updating voucher status:", error);
      }
    },
    async addVoucher() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/createvoucher`, this.newVoucher);
        alert(response.data.message); // Notifikasi sukses

        // Tambahkan voucher baru ke daftar
        this.vouchers.push(response.data.data); // pastikan API mengembalikan objek voucher yang lengkap

        // Reset form
        this.newVoucher = { code: '', description: '', discountAmount: '', maxUse: '' };
      } catch (error) {
        console.error("Error menambahkan tiket:", error);
        alert("Gagal menambahkan tiket!");
      }
    },
    async deleteVoucher(voucherId) {
      if (!confirm("Apakah kamu yakin ingin menghapus tiket ini?")) return;
      try {
        await axios.delete(`${this.apiUrl}/api/deletevoucher/${voucherId}`);
        this.vouchers = this.vouchers.filter(voucher => voucher.id !== voucherId);
      } catch (error) {
        console.error("Error deleting voucher:", error);
      }
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
