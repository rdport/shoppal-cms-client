<template>
  <div>
    <div v-html="html"></div>
  </div>
</template>

<script>
export default {
  name: 'ProductImage',
  props: ['image_url'],
  data () {
    return {
      html: `<div style="max-height:20rem; overflow-y:auto" class="container"><img height="320" src="${this.image_url}"><div>`
    }
  }
}
</script>
