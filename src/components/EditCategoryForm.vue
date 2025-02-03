<template>
  <div>
    <div class="modal fade" id="edit-category-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
      <div v-if="error">
        <ErrorMessage v-for="(message, index) in messages" :key="index" :message="message" ref="error"></ErrorMessage>
      </div>
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style="background-color:transparent;border:none">
              <div class="add-edit-category-form-content">
                  <div class="add-edit-category-form-title">
                      <h1>Edit Category</h1>
                  </div>
                  <form class="add-edit-category-form">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input v-model="category.name" type="text" class="form-control add-edit-category-name" name="name">
                    </div>
                    <div class="category-form-btn-container">
                        <button @click.prevent="editCategory" type="submit" class="btn mt-4 add-edit-category-btn">Edit</button>
                        <button @click="$emit('close-edit-category-form')" type="button" class="btn mt-2 category-cancel-btn">Cancel</button>
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
  name: 'EditCategoryForm',
  props: ['categoryEditData'],
  data () {
    return {
      error: false,
      messages: []
    }
  },
  methods: {
    editCategory () {
      const payload = this.category
      this.$store.dispatch('editCategory', payload)
        .then(({ data }) => {
          this.$store.dispatch('fetchCategories')
          this.$emit('close-edit-category-form')
        })
        .catch((err) => {
          console.log(err)
          this.messages = err.response.data.messages
          this.error = true
          // this.$nextTick(() => {
          //   this.$refs.error[0].$el.scrollIntoView()
          // })
        })
    }
  },
  computed: {
    category () {
      const obj = {
        name: this.categoryEditData.name,
        CategoryId: this.categoryEditData.CategoryId
      }
      return obj
    }
  },
  components: {
    ErrorMessage
  }
}
</script>
<style>

</style>
