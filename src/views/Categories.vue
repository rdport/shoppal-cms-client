<template>
  <div class="mt-2">
    <div>
      <h2>Categories</h2>
      <b-button @click="showAddCategoryForm" class="text-center mb-4" variant="primary">Add Category</b-button>
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
                <b-form-checkbox value="name">Category</b-form-checkbox>
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

          <template #cell(actions)="row">
            <b-button size="sm" @click="seeProducts(row.item.id, row.item.name)" class="mr-1 btn btn-success" >
              See Products
            </b-button>
            <b-button size="sm" @click="info(row.item, row.index)" class="mr-1 btn btn-warning">
              Edit
            </b-button>
            <b-button size="sm" @click="showDeleteCategoryConfirmation(row.item.id)" class="btn btn-danger">
              Delete
            </b-button>
          </template>
        </b-table>
      </b-container>
    </div>
    <AddCategoryForm
      v-if="addCategoryForm"
      @close-add-category-form="addCategoryForm = false">
    </AddCategoryForm>
    <EditCategoryForm
      v-if="editCategoryForm"
      :categoryEditData="categoryEditData"
      @close-edit-category-form="editCategoryForm = false">
    </EditCategoryForm>
    <DeleteCategoryConfirmation
      :CategoryId="CategoryId"
      @close-delete-category-confirmation="deleteCategoryConfirmation = false">
    </DeleteCategoryConfirmation>
  </div>
</template>

<script>
import $ from 'jquery'
import EditCategoryForm from '../components/EditCategoryForm'
import AddCategoryForm from '../components/AddCategoryForm'
import DeleteCategoryConfirmation from '../components/DeleteCategoryConfirmation'
export default {
  name: 'Categories',
  data () {
    return {
      fields: [
        '#',
        { key: 'name', label: 'Category', sortable: true, sortDirection: 'asc' },
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
      categoryEditData: {
        CategoryId: 0,
        name: ''
      },
      CategoryId: 0,
      addCategoryForm: false,
      editCategoryForm: false,
      deleteCategoryConfirmation: false
    }
  },
  computed: {
    items () {
      return this.$store.state.categories
    },
    totalRows: {
      get: function () {
        return this.$store.state.categoriesLength
      },
      set: function (newValue) {
        this.$store.commit('setCategoriesLength', newValue)
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
    seeProducts (CategoryId, categoryName) {
      this.$router.push({ name: 'Products', params: { CategoryId: CategoryId }, query: { category: categoryName } })
    },
    info (item, index) {
      this.categoryEditData.name = item.name
      this.categoryEditData.CategoryId = item.id
      this.editCategoryForm = true
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    showAddCategoryForm () {
      this.addCategoryForm = true
    },
    showDeleteCategoryConfirmation (CategoryId) {
      this.CategoryId = CategoryId
      this.deleteCategoryConfirmation = true
    }
  },
  watch: {
    editCategoryForm: function () {
      this.$nextTick()
        .then(() => {
          if (this.editCategoryForm) {
            $('#edit-category-modal').modal('show')
          } else if (!this.editCategoryForm) {
            $('#edit-category-modal').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    },
    addCategoryForm: function () {
      this.$nextTick()
        .then(() => {
          if (this.addCategoryForm) {
            $('#add-category-modal').modal('show')
          } else if (!this.addCategoryForm) {
            $('#add-category-modal').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    },
    deleteCategoryConfirmation: function () {
      this.$nextTick()
        .then(() => {
          if (this.deleteCategoryConfirmation) {
            $('#delete-category-confirm').modal('show')
          } else if (!this.deleteCategoryConfirmation) {
            $('#delete-category-confirm').modal('hide')
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
          }
        })
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
  },
  components: {
    EditCategoryForm,
    AddCategoryForm,
    DeleteCategoryConfirmation
  }
}
</script>
