<template>
    <div class="relative ">
      <div class="flex justify-between items-center gap-2 ">
        <button class="py-2 px-4 md:px-16 border-2 border-stone-600 font-bold text-stone-600 hover:bg-stone-400 hover:text-white hover:shadow-lg" @click="showFilter = !showFilter">Filter</button>
  
        <select @change="updateSorting($event.target.value)" class="py-2 px-4 md:px-16 border-2 border-stone-600" name="" id="">
          <option value="default">Default Sorting</option>
          <option value="latest">Sort By Latest</option>
          <option value="lowToHigh">Sort By Price: Low To High</option>
          <option value="highToLow">Sort By Price: High To Low</option>
        </select>
      </div>
  
      <div v-if="showFilter" class="fixed h-svh inset-y-0 left-0 top-0 w-[400px] bg-gray-200 px-8 z-10">
      <div @click="showFilter = false" class="justify-center items-start cursor-pointer mb-10 mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>

      <!-- filter by search -->
      <div class="">
        <!-- Search input -->
        <input type="text"  @change="updateSearch($event.target.value)" v-model="searchQuery" placeholder="Search by name" class="w-full py-2 px-3 border border-gray-400 rounded-md mb-4">

      </div>

      <h3 class="mb-5 text-xl">Filter by price</h3>
      <!-- filter by price code -->
      <label for="min-price" class="block mb-2 text-gray-900 dark:text-white">Minimum Price</label>
      <input  id="min-price"  type="number" min="0" v-model="minPrice" class="w-full py-2 px-3 border border-gray-400 rounded-md mb-4">

      <label for="max-price" class="block mb-2 text-gray-900 dark:text-white">Maximum Price</label>
      <input  id="max-price" type="number" min="0" v-model="maxPrice" class="w-full py-2 px-3 border border-gray-400 rounded-md mb-4">

      <button  @click="filterProducts" class="py-2 my-2 px-4 border-2 border-white font-bold text-stone-600 hover:bg-stone-400 hover:text-white hover:shadow-lg">Resort Products</button>
      <!-- filter by price code -->

      <!-- CATEGORY IN THE FILTER -->
      <div class="flex flex-col gap-3 pt-10">
         <p class="text-xl">Product Categories</p>
         <div class="flex flex-col gap-4">
         <nuxt-link class="hover:bg-stone-400 px-5 py-2 hover:font-bold" to="/products/chair">Chair</nuxt-link>
         <nuxt-link class="hover:bg-stone-400 px-5 py-2 hover:font-bold" to="/products/sofa">Sofa</nuxt-link>
         <nuxt-link class="hover:bg-stone-400 px-5 py-2 hover:font-bold" to="/products/table">Table</nuxt-link>
        </div>
      </div>
      <!-- END OF CATEGORY IN THE FILTER -->

    </div>

    
    
    </div>
  </template>
  
  <script>

  export default {
    data: () => ({
      showFilter: false,
      minPrice: null,
      maxPrice: null,
      searchQuery: '',
    }),

    methods: {
      updateSorting(sortOption) {
        this.$emit('sort-change', sortOption); // Emit event to parent component
      },
      updateSearch(searchQuery) {
        this.$emit('updateSearch', searchQuery); // Emit the search query
      },
      filterProducts() {
      // Emit minPrice and maxPrice to the parent component
      this.$emit('filter-products', { minPrice: this.minPrice, maxPrice: this.maxPrice });
      }
    },
  };
  </script>