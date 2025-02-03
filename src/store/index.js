import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosinstance'
import formatDate from '../helpers/formatDate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    categoriesLength: 0,
    productsLength: 0
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setCategoriesLength (state, payload) {
      state.categoriesLength = payload
    },
    setProductsLength (state, payload) {
      state.productsLength = payload
    }
  },
  actions: {
    fetchCategories ({ commit }) {
      return axios
        .post('/categories')
        .then(({ data }) => {
          const objFormatted = []
          let obj = {}
          data.map((category) => {
            obj = {
              id: category.id,
              name: category.name,
              createdAt: formatDate(category.createdAt),
              updatedAt: formatDate(category.updatedAt)
            }
            objFormatted.push(obj)
          })
          commit('setCategories', objFormatted)
          commit('setCategoriesLength', objFormatted.length)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchProducts ({ commit }) {
      return axios
        .post('/products')
        .then(({ data }) => {
          const objFormatted = []
          let obj = {}
          data.map((product) => {
            obj = {
              id: product.id,
              name: product.name,
              CategoryId: product.CategoryId,
              image_url: product.image_url,
              price: product.price,
              stock: product.stock,
              createdAt: formatDate(product.createdAt),
              updatedAt: formatDate(product.updatedAt)
            }
            objFormatted.push(obj)
          })
          commit('setProducts', objFormatted)
          commit('setProductsLength', objFormatted.length)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addCategory (context, payload) {
      return axios
        .post('/categories/add', payload)
    },
    editCategory (context, payload) {
      return axios
        .put(`/categories/${payload.CategoryId}`, payload)
    },
    deleteCategory (context, CategoryId) {
      return axios
        .delete(`/categories/${CategoryId}`)
    },
    addProduct (context, payload) {
      return axios
        .post('/products/add', payload)
    },
    editProduct (context, payload) {
      return axios
        .put(`/products/${payload.id}`, payload)
    },
    deleteProduct (context, ProductId) {
      return axios
        .delete(`/products/${ProductId}`)
    }
  },
  getters: {
    filteredProductsByCategory: (state) => (CategoryId) => {
      return state.products.filter((el) => {
        return el.CategoryId === CategoryId
      })
    }
  }
})
