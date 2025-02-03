<template>
  <h1>Product</h1>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      CategoryId: this.$route.params.CategoryId
    }
  },
  computed: {
    item () {
      const ProductId = this.$route.params.ProductId
      return this.$store.getters.filteredProductById(ProductId)
    }
  }
}
</script>

<style>

</style>
