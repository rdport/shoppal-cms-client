<template>
  <div class="container home">
      <b-card
        img-src="../assets/store.svg"
        img-alt="store"
        img-top
        tag="article"
        style="width:15rem;max-height: 35rem"
        class=""
      >
        <router-link :to="{ name: 'Categories' }"><b-button variant="success">Product Categories</b-button></router-link>
      </b-card>
      <!-- <b-card
        img-src="../assets/banner.svg"
        img-alt="store"
        img-top
        tag="article"
        style="width:15rem;max-height: 35rem"
        class=""
      >
        <router-link :to="{ name: 'Banners' }"><b-button variant="success">Banners</b-button></router-link>
      </b-card> -->
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
