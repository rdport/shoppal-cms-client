<template>
  <div class="mt-2">
    <div>
      <h1>Products in {{ categoryName }} category</h1>
      <b-button @click="showAddProductForm" class="text-center mb-4" variant="primary">Add Product</b-button>
    </div>
    <div class="container border" style="padding:2rem 0rem">
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Sort"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="sortBySelect"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
                  <template #first>
                    <option value="">-- none --</option>
                  </template>
                </b-form-select>
                <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              label="Initial sort"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="initialSortSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="sortDirection"
                id="initialSortSelect"
                size="sm"
                :options="['asc', 'desc', 'last']"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter On"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              description="Leave all unchecked to filter on all data"
              class="mb-0">
              <b-form-checkbox-group v-model="filterOn" class="mt-1">
                <b-form-checkbox value="name">Name</b-form-checkbox>
                <b-form-checkbox value="price">Price</b-form-checkbox>
                <b-form-checkbox value="stock">Stock</b-form-checkbox>
                <b-form-checkbox value="createdAt">Created</b-form-checkbox>
                <b-form-checkbox value="updatedAt">Updated</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>

          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table
          show-empty
          small
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template #cell(#)="row">
            {{ row.index + 1 }}
          </template>

          <template #cell(price)="row">
            {{ formatCurrency(row.item.price) }}
          </template>

          <template #cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-1 btn btn-success">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Image
            </b-button>
            <b-button size="sm" @click="info(row.item, row.index)" class="mr-1 btn btn-warning">
              Edit
            </b-button>
            <b-button size="sm" @click="showDeleteProductConfirmation(row.item.id)" class="btn btn-danger">
              Delete
            </b-button>
          </template>
          <template #row-details="row">
            <ProductImage :image_url="row.item.image_url"></ProductImage>
          </template>
        </b-table>
      </b-container>
    </div>
    <AddProductForm
      v-if="addProductForm"
      :CategoryId="CategoryId"
      @close-add-product-form="addProductForm = false">
    </AddProductForm>
    <EditProductForm
      v-if="editProductForm"
      :productEditData="productEditData"
      @close-edit-product-form="editProductForm = false">
    </EditProductForm>
    <DeleteProductConfirmation
      :ProductId="ProductId"
      @close-delete-product-confirmation="deleteProductConfirmation = false">
    </DeleteProductConfirmation>
  </div>
</template>

<script>
import $ from 'jquery'
import EditProductForm from '../components/EditProductForm'
import AddProductForm from '../components/AddProductForm'
import DeleteProductConfirmation from '../components/DeleteProductConfirmation'
import ProductImage from '../components/ProductImage'
import formatCurrency from '../helpers/formatCurrency'
export default {
  name: 'Products',
  data () {
    return {
      fields: [
        '#',
        { key: 'name', label: 'Name', sortable: true, sortDirection: 'asc' },
        { key: 'price', label: 'Price', sortable: true, sortDirection: 'asc' },
        { key: 'stock', label: 'Stock', sortable: true, sortDirection: 'asc' },
        { key: 'createdAt', label: 'Created', sortable: true, sortDirection: 'desc' },
        { key: 'updatedAt', label: 'Updated', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      productEditData: {
        ProductId: 0,
        name: '',
        CategoryId: 0,
        image_url: '',
        price: 0,
        stock: 0
      },
      ProductId: 0,
      categoryName: this.$route.query.category,
      CategoryId: Number(this.$route.params.CategoryId),
      addProductForm: false,
      editProductForm: false,
      deleteProductConfirmation: false
    }
  },
  computed: {
    items () {
      return this.$store.getters.filteredProductsByCategory(this.CategoryId)
    },
    totalRows: {
      get: function () {
        return this.$store.state.productsLength
      },
      set: function (newValue) {
        this.$store.commit('setProductsLength', newValue)
      }
    },
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    info (item, index) {
      this.productEditData.ProductId = item.id
      this.productEditData.name = item.name
      this.productEditData.CategoryId = item.CategoryId
      this.productEditData.image_url = item.image_url
      this.productEditData.price = item.price
      this.productEditData.stock = item.stock
      this.editProductForm = true
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    showAddProductForm () {
      this.addProductForm = true
    },
    showDeleteProductConfirmation (ProductId) {
      this.ProductId = ProductId
      this.deleteProductConfirmation = true
    },
    formatCurrency (price) {
      return formatCurrency(price)
    }
  },
  watch: {
    editProductForm: function () {
      this.$nextTick()
        .then(() => {
          if (this.editProductForm) {
            $('#edit-product-modal').modal('show')
          } else if (!this.editProductForm) {
            $('#edit-product-modal').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    },
    addProductForm: function () {
      this.$nextTick()
        .then(() => {
          if (this.addProductForm) {
            $('#add-product-modal').modal('show')
          } else if (!this.addProductForm) {
            $('#add-product-modal').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    },
    deleteProductConfirmation: function () {
      this.$nextTick()
        .then(() => {
          if (this.deleteProductConfirmation) {
            $('#delete-product-confirm').modal('show')
          } else if (!this.deleteProductConfirmation) {
            $('#delete-product-confirm').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    }

  },
  created () {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
  },
  components: {
    EditProductForm,
    AddProductForm,
    DeleteProductConfirmation,
    ProductImage
  }
}
</script>
