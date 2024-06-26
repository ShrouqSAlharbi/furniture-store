<template>
    <div>
      <filters @sort-change="sortProducts" @updateSearch="updateSearch" @filter-products="filterProducts"></filters>
      <div class="py-10">
        <ul class="grid grid-cols-4 gap-5">
          <li class="my-5 overflow-hidden" v-for="product in filteredAndSortedProducts" :key="product.id">
            <div class="overflow-hidden w-[350px] relative">
                <img class="w-[330px] h-[330px] hover:scale-110 transition-transform duration-300"  :src="getImageUrl(product.image)">
                <!-- ADD PRODUCT TO CART-->
                <div @click="addToCart(product.id)" class="absolute right-24 top-4 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center hover:text-gray-600 hover:shadow-lg cursor-pointer bg-opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400 hover:text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <!-- END OF ADD PRODUCT TO CART-->

                <!-- PRODUCT VIEW -->
                <nuxt-link :to="productPath(product.id)" class="absolute right-24 top-16 w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center hover:text-gray-600 hover:shadow-lg cursor-pointer bg-opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400 hover:text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </nuxt-link>
                <!-- END OF PRODUCT VIEW -->
            </div>
            <div class="px-4">
                <div class="my-2">{{ product.section }}</div>
                <nuxt-link :to="productPath(product.id)">{{ product.name }}</nuxt-link>
                <div class="my-2 text-lg font-bold text-gray-600">£{{ product.price }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        sortBy: 'default', // Initialize sortBy with 'default'
        searchQuery: ''
      };
    },
    computed: {
      productPath() {
      return (productId) => this.signed ? `/signed/${productId}` : `/products/${productId}`;
    },

      ...mapGetters(['getImageUrl', 'products']),
      filteredAndSortedProducts() {
        
    let filteredProducts = this.products.filter(product => {
      return product.name.toUpperCase().includes(this.searchQuery.toUpperCase());
    });

     // Apply filtering based on price range
     if (this.minPrice !== null && this.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(product => {
          return product.price >= this.minPrice && product.price <= this.maxPrice;
        });
      }

    // Apply sorting to filtered products
    switch (this.sortBy) {
      case 'latest':
        // No sorting needed as products are already in the desired order
        break;
      case 'highToLow':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'lowToHigh':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return filteredProducts;
  }
    },
    async created() {
      await this.fetchProducts();
    },
    methods: {
      ...mapActions(['fetchProducts']),
      addToCart(productId) {
        this.$store.commit('addToCart', productId);
      },
      sortProducts(sortOption) {
        this.sortBy = sortOption; // Update sortBy with the selected option
      },
      updateSearch(searchQuery) {
        this.searchQuery = searchQuery;
      },
      filterProducts(filterData) {
      // Handle filtering based on minPrice and maxPrice emitted from filters component
      this.minPrice = filterData.minPrice;
      this.maxPrice = filterData.maxPrice;
    }


    },
    props: {
    signed: {
      type: Boolean,
      required: true,
    },
    minPrice: {
      type: Number,
      default: null,
    },
    maxPrice: {
      type: Number,
      default: null,
    },
  },
  };
  </script>
  