<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="{ name: 'Home' }" style="font-weight: bold;">
      <img src="../assets/ECommerce-logo.svg" style="position:relative;top:-0.2rem" width="30" height="30" alt="shopping bag">
      Shoppal CMS
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item> -->
        <b-nav-item :to="{ name: 'Categories' }"><img src="../assets/category.svg" style="position:relative;top:-0.2rem" width="30" height="30" alt="list icon">Categories</b-nav-item>
        <b-nav-item @click="$emit('showInfo')"><img src="../assets/info.svg" class="mr-1" style="position:relative;top:-0.2rem" width="30" height="30" alt="info icon">Info</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ fullName }}</em>
          </template>
          <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  name: 'NavBar',
  data () {
    return {
      fullName: localStorage.getItem('fullName')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style>

</style>
