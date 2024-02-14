<template>
    <div>
      <div class="grid grid-cols-6 gap-10">
        <div class="w-full">
          <div class="flex w-full">
            <p class="w-full text-center py-10 font-bold text-teal-600 text-xl">Quick Access</p>
          </div>
          <div class="flex flex-col gap-5">
            <button @click="viewOrder = true" class="border-2 py-2 border-gray-300">Your Orders</button>
            <button class="border-2 py-2 border-gray-300">My Addresses</button>
            <button class="border-2 py-2 border-gray-300">My Account</button>
            <button class="border-2 py-2 border-gray-300">Wishlist</button>
          </div>
        </div>
        <div class="col-span-5">
          <div v-show="viewOrder" class="flex flex-col gap-10">
            <div v-for="order in orders" class="flex flex-col gap-2 border-2 border-gray-300 p-2 rounded-md">
              <div class="flex justify-between">
                <p>Product ID: #{{ order.OrderID }}</p>
                <p>Total: ${{ (order.TotalAmount / 100).toFixed(2) }}</p>
              </div>
              <p class="text-gray-400">Ordered in: {{ order.OrderDate }}</p>
              <div class="grid grid-cols-5 ">
                <div class=" col-span-3"> <!-- Product -->
                  <p class=" bg-gray-300 font-bold py-2 px-2">Product</p>
                  <div v-for="orderItem in order.orderItems" class="flex justify-center flex-col  px-2">
                    <div class="flex gap-3 py-2">
                    <img class="w-10 rounded-md" :src="getImageUrl(orderItem.product.image)" alt="">
                    <p>{{ orderItem.product.name }}</p>
                </div>
                  </div>
                </div>
                <div> <!-- Price -->
                  <p class=" bg-gray-300 font-bold py-2 px-2">Price Per Unit</p>
                  <div v-for="orderItem in order.orderItems" class="flex flex-col  gap-3 py-3 justify-center px-2">
                    <p >${{ orderItem.product.price  }}</p>
                  </div>
                </div>
                <div class="text-right"> <!-- Quantity -->
                  <p class=" bg-gray-300 font-bold py-2 px-2">Quantity</p>
                  <div v-for="orderItem in order.orderItems" class="flex flex-col  gap-3 py-3 justify-center px-2">
                    <p>{{ orderItem.Quantity }} items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import {  mapGetters } from 'vuex';
  export default {
  layout: 'signedLayout',
  data() {
    return {
      orders: [],
      orderItems: [],
      viewOrder: false,
    };
  },
  computed:{
    ...mapGetters(['getImageUrl']),
  },
  async created() {
  try {
    const userData = JSON.parse(localStorage.getItem('session'));

    if (!userData || !userData.id) {
      console.error('Invalid session data or missing user ID. Redirecting to sign-in page.');
      this.$router.push('/signin');
      return;
    }

    const userId = userData.id;
    console.log(userId);

    const { data: orders, error: ordersError } = await this.$supabase
      .from('orders')
      .select('*')
      .eq('CustomerID', userId);

    if (ordersError) {
      console.error('Error fetching orders:', ordersError.message);
      return;
    }

    this.orders = orders;

    const { data: products, error: productsError } = await this.$supabase
      .from('products')
      .select('*');

    if (productsError) {
      console.error('Error fetching products:', productsError.message);
      return;
    }

    for (const order of orders) {
      const { data: orderItems, error: orderItemsError } = await this.$supabase
        .from('orders-items')
        .select('*')
        .eq('OrderID', order.OrderID);

      if (orderItemsError) {
        console.error('Error fetching order items:', orderItemsError.message);
      } else {
        order.orderItems = orderItems.filter(item => item.OrderID === order.OrderID);
        order.orderItems.forEach(item => {
          const product = products.find(p => p.id === item.ProductID);
          if (product) {
            item.product = product;
          }
        });
      }
    }

    console.log(this.orders);

  } catch (error) {
    console.error('An error occurred:', error.message);
    
  }
},
methods: {
  findProduct(productId) {
    return this.products.find(product => product.ProductID === productId);
  },
},
};


</script>

  


