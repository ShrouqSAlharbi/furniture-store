<template>
    <div>
        <body>
  <div class="h-screen bg-gray-100 pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        <div v-for="item in cart" class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img :src="item.image" alt="product-image" class="w-full rounded-lg sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">

            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">{{ item.name }}</h2>
              <p class="mt-1 text-xs text-gray-700">£{{ item.price }}</p>
            </div>

            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <span @click="decrementQuantity(item)" class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" :value="item.quantity"  />
                <span @click="incrementQuantity(item)" class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm">£{{ item.price * item.quantity }}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Sub total -->
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">£{{ calculateSubtotal() }}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">£4.99</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">£{{ calculateTotal() }}</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button @click="checkout" class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
    </div>
  </div>
</body>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      // Retrieve cart from Vuex store
      cart() {
        return this.$store.state.cart;
      }
    },
    methods: {
      // Method to remove item from cart
    removeItem(itemId) {
      this.$store.commit('removeFromCart', itemId);
    },
    // Method to increment quantity
    incrementQuantity(item) {
      this.$store.commit('incrementQuantity', item.id);
    },
    // Method to decrement quantity
    decrementQuantity(item) {
      if (item.quantity > 1) {
        this.$store.commit('decrementQuantity', item.id);
      } else {
        this.removeItem(item.id);
      }
    },
    // Calculate subtotal
    calculateSubtotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    // Calculate total
    calculateTotal() {
      return this.calculateSubtotal() + 4.99; // Add shipping fee
    },
    // Method to handle checkout
    checkout() {
      if (!!localStorage.getItem('session')) {
        // If session exists, navigate to checkout page
        alert('Your Order Has been Sent Successfully.')
        this.$router.push('/signed');
      } else {
        // If session is null or empty, navigate to sign-in page
        this.$router.push('/signin');
      }
    },
    }
  };
  </script>
  