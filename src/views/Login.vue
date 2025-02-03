<template>
  <div>
  <div class="error-container" v-if="error">
        <ErrorMessage :message="message" ref="error"></ErrorMessage>
  </div>
  <div class="container login-page">
    <div class="container shadow login-form-background">
      <img class="barcode1-img" src="../assets/barcode1.svg" width="">
      <img class="barcode2-img" src="../assets/barcode2.svg" width="">
      <img class="checklist-img" src="../assets/checklist.svg" width="">
      <img class="box2-img" src="../assets/box2.svg" width="">
      <div class="container login-form-container">
        <div class="card shadow login-form-card">
          <div class="form-content">
            <!-- <div class="container"> -->
              <div class="login-image-container">
                <img class="cms-logo-login" src="../assets/Shoppal.svg" alt="shoppal" width="200">
              </div>
              <p style="font-weight: bold; margin-bottom: 1rem;">Client Management System</p>
            <!-- </div> -->
            <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success">Log In</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Info @closeShowInfo="showInfo=false" v-if="showInfo"></Info>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from '../config/axiosinstance'
import ErrorMessage from '../components/ErrorMessage.vue'
import Info from '../components/Info.vue'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: false,
      message: '',
      showInfo: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .post('/admin/login', this.form)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('fullName', data.fullName)
          this.$router.push('/')
        })
        .catch((err) => {
          this.message = err.response.data.message
          this.error = true
          this.$nextTick(() => {
            this.$refs.error.$el.scrollIntoView()
          })
        })
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
    ErrorMessage,
    Info
  },
  mounted () {
    if (!localStorage.getItem('access_token')) {
      $('#info-modal').modal('show')
    }
  }
}
</script>
