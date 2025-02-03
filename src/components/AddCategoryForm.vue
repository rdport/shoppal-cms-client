<template>
  <div>
    <div class="modal fade" id="add-category-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div v-if="error">
        <ErrorMessage v-for="(message, index) in messages" :key="index" :message="message" ref="error"></ErrorMessage>
      </div>
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="cat-pro-modal-content modal-content" style="background-color:transparent;border:none">
              <div class="add-edit-category-form-content">
                  <div class="add-edit-category-form-title">
                      <h1>Add Category</h1>
                  </div>
                  <form class="add-edit-category-form">
                      <div class="form-group">
                          <label for="name">Name</label>
                          <input v-model="category.name" type="text" class="form-control" id="add-edit-category-name" name="name">
                      </div>
                      <div class="category-form-btn-container">
                        <button @click.prevent="addCategory" type="submit" class="btn btn-primary mt-4 add-edit-category-btn">Add</button>
                        <button @click="$emit('close-add-category-form')" data-dismiss="modal" type="button" class="btn btn-info mt-2 category-cancel-btn">Cancel</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import ErrorMessage from './ErrorMessage'
export default {
  name: 'AddCategoryForm',
  data () {
    return {
      category: {
        name: ''
      },
      error: false,
      messages: []
    }
  },
  methods: {
    addCategory () {
      const payload = this.category
      this.$store.dispatch('addCategory', payload)
        .then(({ data }) => {
          this.$emit('close-add-category-form')
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          this.$store.dispatch('fetchCategories')
        })
      // .then(() => {
      //   this.$router.push('/categories')
      // })
        .catch((err) => {
          console.log(err)
          this.messages = err.response.data.messages
          this.error = true
          // this.$nextTick(()=> {
          //   console.log(this.$refs.error)
          //    this.$refs.error[0].$el.scrollIntoView();
          // });
        })
        .finally(() => {
          this.category.name = ''
        })
    }
  },
  components: {
    ErrorMessage
  }
}
</script>
<style>

</style>
