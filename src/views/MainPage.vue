<template>
  <div class="main-page">
    <NavBar @showInfo="showInfo=true"></NavBar>
    <router-view></router-view>
    <Footer></Footer>
    <Info @closeShowInfo="showInfo=false" v-if="showInfo"></Info>
  </div>
</template>
<script>
import $ from 'jquery'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Info from '../components/Info.vue'
export default {
  name: 'MainPage',
  data () {
    return {
      showInfo: false
    }
  },
  watch: {
    showInfo: function () {
      this.$nextTick()
        .then(() => {
          if (this.showInfo) {
            $('#info-modal').modal('show')
          } else if (!this.showInfo) {
            $('#info-modal').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    }
  },
  components: {
    NavBar,
    Footer,
    Info
  }
}
</script>
<style>

</style>
