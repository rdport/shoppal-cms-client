<template>
  <div>
    <div class="modal fade" id="edit-product-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
     <div v-if="error">
        <ErrorMessage v-for="(message, index) in messages" :key="index" :message="message" ref="error"></ErrorMessage>
      </div>
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style="background-color:transparent;border:none">
              <div class="add-edit-product-form-content">
                  <div class="add-edit-product-form-title">
                      <h1>Product Details</h1>
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
                    <div>
                      <label for="CategoryId">Category</label>
                      <select v-model="product.CategoryId" class="form-control category-select" name="CategoryId">
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                      </select>
                    </div>
                    <button type="submit" @click.prevent="editProduct" class="btn mt-4 add-edit-product-btn">Edit</button>
                    <button @click="$emit('close-edit-product-form')" type="button" class="btn mt-2 add-edit-cancel-btn">Close</button>
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
  name: 'ProductDetails',
  props: ['productEditData'],
  data () {
    return {
      product: {
        id: Number(this.productEditData.ProductId),
        name: this.productEditData.name,
        CategoryId: Number(this.productEditData.CategoryId),
        image_url: this.productEditData.image_url,
        price: this.productEditData.price,
        stock: this.productEditData.stock
      },
      error: false,
      messages: []
    }
  },
  methods: {
    editProduct () {
      const payload = this.product

      this.$store.dispatch('editProduct', payload)
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$emit('close-edit-product-form')
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.message) {
            this.messages.push(err.response.data.message)
          } else {
            this.messages = err.response.data.messages
          }
          this.error = true
          // this.$nextTick(()=> {
          //   console.log(this.$refs.error)
          //    this.$refs.error[0].$el.scrollIntoView();
          // });
        })
    }
    // fetchproducts() {
    //   this.$emit("fetchproducts");
    // },
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  mounted () {
    this.error = false
  },
  components: {
    ErrorMessage
  },
  created () {
    this.$store.dispatch('fetchCategories')
  }
}
</script>
<style>

</style>
