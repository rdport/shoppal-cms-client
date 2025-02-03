<template>
  <div>
    <div class="modal fade" id="delete-category-confirm" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true">
      <div v-if="error">
          <ErrorMessage :message="message" ref="error"></ErrorMessage>
      </div>
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Delete Confirmation</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span @click="closeDeleteCategoryConfirmation" aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <p>Are you sure you want to delete this category?</p>
                  <p>All products in this category will also be deleted.</p>
              </div>
              <div class="modal-footer">
                  <button @click="closeDeleteCategoryConfirmation" type="button" class="btn btn-secondary">Cancel</button>
                  <button @click="deleteCategory" type="button" class="btn btn-danger" id="delete-confirm-btn">Delete</button>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import ErrorMessage from './ErrorMessage'
export default {
  name: 'DeleteCategoryConfirmation',
  props: ['CategoryId'],
  data () {
    return {
      error: false,
      message: ''
    }
  },
  methods: {
    deleteCategory () {
      const payload = this.CategoryId
      this.$store.dispatch('deleteCategory', payload)
        .then(({ data }) => {
          this.$emit('close-delete-category-confirmation')
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          return this.$store.dispatch('fetchCategories')
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          // this.$nextTick(()=> {
          //    this.$refs.error.$el.scrollIntoView();
          // });
        })
    },
    closeDeleteCategoryConfirmation () {
      this.$emit('close-delete-category-confirmation')
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
