<template>
    <main class="email-page">
        <h1>Email</h1>
        <p>Template Email Untuk Peserta</p>

        <label>Judul Email:</label>
        <input type="text" v-model="emailSubject"/>

        <label>Isi Email:</label>
        <textarea v-model="emailBody"></textarea>

        <div>
            <button @click="insertVariable('{nama_peserta}')" class="btn">Nama</button>
            <button @click="insertVariable('{nomor_tiket}')" class="btn">Nomor Tiket</button>
            <button @click="insertVariable('{event}')" class="btn">Event</button>
        </div>

        <h2>Preview Email</h2>
        <div>
            <p><strong>Subject:</strong> {{ emailSubject }}</p>
            <p v-html="emailBody"></p>
        </div>

        <div class="mt-4 flex gap-2">
            <button @click="saveTemplate" class="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
            <button @click="sendTestEmail" class="bg-green-500 text-white px-4 py-2 rounded">Kirim Uji Coba</button>
        </div>
    </main>
</template>

<script>
export default {
  data() {
    return {
      emailSubject: "",
      emailBody: "",
    };
  },
  methods: {
    insertVariable(variable) {
      this.emailBody += " " + variable;
    },
    saveTemplate() {
      alert("Template email disimpan!");
    },
    sendTestEmail() {
      alert("Email uji coba dikirim!");
    },
  },
};
</script>
