<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../pict/logocf.jpeg" alt="logo">
      <h3 class="title pt-3 text-bold">ADMIN CF#9</h3>
    </div>


    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link class="button" to="/scan">
        <span class="material-icons">camera</span>
        <span class="text">Scan Tiket</span>
      </router-link>
      <router-link class="button" to="/ticket">
        <span class="material-icons">receipt</span>
        <span class="text">Data Tiket</span>
      </router-link>
      <router-link class="button" to="/voucher">
        <span class="material-icons">confirmation_number</span>
        <span class="text">Edit Voucher</span>
      </router-link>
      <router-link class="button" to="/dokumen">
                <span class="material-icons">checklist</span>
                <span class="text">Verifikasi Dokumen</span>
      </router-link>
      <router-link class="button" to="/form">
                <span class="material-icons">input</span>
                <span class="text">Form Internal</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link class="button" to="/settings">
        <span class="material-icons">call</span>
        <span class="text">Help</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value

  localStorage.setItem("is_expanded", is_expanded.value)
}

</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap; // Mencegah teks turun ke bawah
    margin-bottom: 1rem;

    img {
      width: 2rem;
      flex-shrink: 0; // Supaya tidak mengecil saat sidebar diperluas
    }

    .title {
      opacity: 0;
      transition: opacity 0.3s ease-out;
      overflow: hidden;
      white-space: nowrap;
      max-width: 0; // Default disembunyikan
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h3 {
    color: var(grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .logo .title {
      font-weight: bold;
      font-size: larger;
      opacity: 1;
      max-width: 100%; // Biarkan teks muncul normal
    }

    .menu-toggle-wrap {
      top: -4rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }



  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>
