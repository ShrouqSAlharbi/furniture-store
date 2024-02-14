<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row px-20">
      <div class="md:w-1/2 flex justify-center items-center">
        <img v-if="product && product.image" :src="getImageUrl(product.image)" alt="Product Image" class="w-80 mb-4 hover:scale-110">
      </div>
      <div class="md:w-1/2 flex flex-col">
        <h1 class="text-3xl font-bold mb-4" v-if="product && product.name">{{ product.name }}</h1>
        <p class="text-lg mb-4" v-if="product && product.description">{{ product.description }}</p>
        <p class="text-lg mb-4" v-if="product && product.section">Section: {{ product.section }}</p>
        <p class="text-lg font-semibold mb-4" v-if="product && product.price">Price: £{{ product.price }}</p>
        <!-- Other product details remain unchanged -->
        <div v-if="product">
          <!-- <p class="text-lg font-semibold mb-2">Quantity: {{ getProductQuantityInCart(product.id) }}</p> -->
          <div class="flex items-center mb-4">
            <button @click="decrementQuantity" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-10 px-4 rounded-l">
              -
            </button>
            <input min="1" class=" h-10 w-12 border bg-white text-center text-xs outline-none" type="text" v-model="quantity"  />
            <button @click="incrementQuantity" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              +
            </button>
          </div>
          <button @click="addToCart2({ product, quantity })" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold h-10 px-6 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  mapGetters } from 'vuex';
export default {
  data() {
    return {
      product: null,
      quantity: 1
    };
  },
  computed: {
    ...mapGetters(['getImageUrl', 'products']),
    
    productId() {
  
        const productId = +this.$route.params.id;
        return productId;
      }
    
  },
  mounted() {
    this.getProduct();
    
  },
  methods: {
    async getProduct() {
      try {
        // Fetch the product from the Vuex store based on its ID
        const product = this.$store.getters.products.find(prod => prod.id === this.productId);

        // Check if the product exists
        if (product) {
          // Set the product data property
          this.product = product;
        } else {
          // Handle the case where the product is not found
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    },

    decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      // Handle negative quantity or keep it at 0
      // For example, you could show an error message or disable the decrement button
    }
  },
  incrementQuantity() {
    this.quantity++;
  },
  addToCart2({ product, quantity }) {
    if (product) {
        // Check if the product already exists in the cart using a getter
        const existingProduct = this.$store.getters.cart.find((item) => item.id === product.id);
        if (existingProduct) {
            // If the product already exists, increment the quantity by committing a mutation
            this.$store.commit('addToCart2', { product, quantity });
        } else {
            // If the product doesn't exist, add it to the cart
            this.$store.commit('addToCart2', { product, quantity: 1 });
        }
    }
}

  },
  
};
</script>