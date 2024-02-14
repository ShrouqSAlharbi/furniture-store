<template>
    <div>
        <body>
  <div class="h-screen bg-gray-100 pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        <div v-for="item in cart" class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img :src="getImageUrl(item.image)" alt="product-image" class="w-full rounded-lg sm:w-40" />
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
  import {  mapGetters } from 'vuex';
  export default {
    layout: 'signedLayout',
    computed: {
      ...mapGetters(['getImageUrl', 'products']),
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
      return +(this.calculateSubtotal() + 4.99); // Add shipping fee
    },
    // Method to handle checkout


    async checkout() {
  try {
    if(this.$store.state.cart == null || this.$store.state.cart ==''){
      alert('You Can\'t Checkout When The Cart Is Empty')
      return; // Stop execution if the cart is empty
    }
    // Check if user is authenticated
    const userData = JSON.parse(localStorage.getItem('session'));


    if (!userData || !userData.id) {
      console.error('Invalid session data or missing user ID. Redirecting to sign-in page.');
      this.$router.push('/signin');
      return;
    }

    // Get the user's ID from session
    const userId = userData.id;

    // Fetch user details from the backend based on the ID
    const { data: user, error: userError } = await this.$supabase
      .from('users')
      .select('id, FullName, Address, Phone')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(`Failed to fetch user details: ${userError.message}`);
    }

    // Calculate the total amount as an integer (assuming no decimal precision is needed)
    const totalAmount = Math.round(this.calculateTotal() * 100); // Convert to cents

    // Create the order in the "orders" table
    const { data: order, error: orderError } = await this.$supabase
  .from('orders')
  .insert({
    OrderDate: new Date(),
    CustomerID: userId, // Using the user's ID from session
    TotalAmount: totalAmount,
    ShippingAddress: user.Address, // Assuming the user's address is available
    // Additional columns...
  })
  .single().select();

  console.log(order);

      

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Check if the order object is null or undefined
if (!order) {
  throw new Error('Order object is null or undefined');
}

    // Get the OrderID from the created order
    const OrderID = order.OrderID;
    console.log('OrderID'+ OrderID);

    // Use the retrieved order ID to create order items in the "order-items" table
    const orderItems = this.cart.map(item => ({
      OrderID: OrderID, // Use the order ID from the response directly
      ProductID: item.id,
      Quantity: item.quantity,
      PricePerUnit: Math.round(item.price * 100), 
      created_at: new Date()
    }));

    const { error: orderItemsError } = await this.$supabase
      .from('orders-items')
      .insert(orderItems);

    if (orderItemsError) {
      throw new Error(`Failed to add order items: ${orderItemsError.message}`);
    }

    // Clear the cart after successful checkout
    this.$store.commit('clearCart');
    alert('Thank You For Choosing Us ...')

    // Redirect the user to a thank you page
    this.$router.push('/signed');
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('Error during checkout. Please try again.');
  }
}







    }

  };
  </script>
  