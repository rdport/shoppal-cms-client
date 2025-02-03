<template>
  <div>
    <div class="modal fade" id="add-product-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
      <div v-if="error">
        <ErrorMessage v-for="(message, index) in messages" :key="index" :message="message" ref="error"></ErrorMessage>
      </div>
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style="background-color:transparent;border:none">
              <div class="add-edit-product-form-content">
                  <div class="add-edit-product-form-title">
                      <h1>Add Product</h1>
                  </div>
                  <form class="add-edit-product-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input v-model="product.name" type="text" class="form-control" id="add-product-name" name="name">
                    </div>
                    <div class="form-group">
                        <label for="name">Image Url</label>
                        <input v-model="product.image_url" type="text" class="form-control" id="add-product-image_url" name="image_url">
                    </div>
                    <div class="form-group">
                        <label for="name">Price</label>
                        <input v-model="product.price" type="number" class="form-control" id="add-product-price" name="price">
                    </div>
                    <div class="form-group">
                        <label for="name">Stock</label>
                        <input v-model="product.stock" type="number" class="form-control" id="add-product-stock" name="stock">
                    </div>
                    <button type="submit" @click.prevent="addProduct" class="btn mt-4 add-edit-product-btn">Add</button>
                    <button data-dismiss="modal" @click="$emit('close-add-product-form')" type="button" class="btn mt-2 add-edit-cancel-btn">Cancel</button>
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
  name: 'AddProductForm',
  props: ['CategoryId'],
  data () {
    return {
      product: {
        name: '',
        CategoryId: this.CategoryId,
        image_url: '',
        price: 0,
        stock: 0
      },
      error: false,
      messages: []
    }
  },
  methods: {
    addProduct () {
      const payload = this.product
      this.$store.dispatch('addProduct', payload)
        .then(({ data }) => {
          this.$emit('close-add-product-form')
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          return this.$store.dispatch('fetchProducts')
        })
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
          this.product.name = ''
          this.product.CategoryId = 0
          this.product.image_url = ''
          this.product.price = 0
          this.product.stock = 0
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
