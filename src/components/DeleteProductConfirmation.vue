<template>
  <div>
    <div class="modal fade" id="delete-product-confirm" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true">
        <div v-if="error">
          <ErrorMessage :message="message" ref="error"></ErrorMessage>
        </div>
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Delete Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span @click="closeDeleteproductConfirmation" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this product?</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeDeleteproductConfirmation" type="button" class="btn btn-secondary">Cancel</button>
                    <button @click="deleteProduct" type="button" class="btn btn-danger" id="delete-confirm-btn">Delete</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import ErrorMessage from './ErrorMessage'
export default {
  name: 'DeleteProductConfirmation',
  props: ['ProductId'],
  data () {
    return {
      error: false,
      message: ''
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.ProductId)
        .then(({ data }) => {
          this.$emit('close-delete-product-confirmation')
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          return this.$store.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          this.$nextTick(() => {
            this.$refs.error.$el.scrollIntoView()
          })
        })
    },
    closeDeleteproductConfirmation () {
      this.$emit('close-delete-product-confirmation')
      this.error = false
    }
  },
  components: {
    ErrorMessage
  }
}
</script>
<style>

</style>
