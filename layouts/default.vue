<template>
    <div class="md:bg-gray-100">
    <div class="px-1 md:mx-36 font-custom bg-white">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
        <header>
            <div class="flex overflow-hidden  justify-between items-center py-10 md:px-10 font-bold">
              <div class="">
              <nuxt-link to="/"><img class="md:hidden  w-44" src="https://websitedemos.net/furniture-store-02/wp-content/uploads/sites/155/2018/01/logo06@2x-free-img.png" alt=""></nuxt-link>
                <div  class="hidden md:flex gap-5 justify-center items-center uppercase">
                    <nuxt-link to="/"><img class=" w-52" src="https://websitedemos.net/furniture-store-02/wp-content/uploads/sites/155/2018/01/logo06@2x-free-img.png" alt=""></nuxt-link>
                    <nuxt-link class="hover:text-stone-500" to="/products">All Products</nuxt-link>
                    <nuxt-link class="hover:text-stone-500" to="/products/sofa">Sofa</nuxt-link>
                    <nuxt-link class="hover:text-stone-500" to="/products/chair">Chair</nuxt-link>
                    <nuxt-link class="hover:text-stone-500" to="/products/table">Table</nuxt-link>
                </div>
              </div>

              <!-- div that appear only in sm screen and if the user click on the menu -->
              <div v-if="showMenu" class="md:hidden fixed h-svh inset-y-0 right-0 top-0 w-[400px] bg-gray-200 px-8 z-10 grid grid-rows-7 py-2">
                <div @click="showMenu = false" class="justify-center items-start cursor-pointer ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <div  class="md:hidden text-left w-full flex flex-col gap-5 justify-start items-start uppercase">
                    <nuxt-link class="hover:text-stone-500 bg-gray-400 rounded-sm w-full p-2" to="/products"><button @click="showMenu = false"></button>All Products</nuxt-link>
                    <nuxt-link class="hover:text-stone-500 bg-gray-400 rounded-sm w-full p-2" to="/products/sofa"><button @click="showMenu = false"></button>Sofa</nuxt-link>
                    <nuxt-link class="hover:text-stone-500 bg-gray-400 rounded-sm w-full p-2" to="/products/chair"><button @click="showMenu = false"></button>Chair</nuxt-link>
                    <nuxt-link class="hover:text-stone-500 bg-gray-400 rounded-sm w-full p-2" to="/products/table"><button @click="showMenu = false"></button>Table</nuxt-link>
                    <nuxt-link class="hover:text-stone-500 bg-gray-400 rounded-sm w-full p-2" to="/products/aboutus"><button @click="showMenu = false"></button>About us</nuxt-link>
                </div>
              
              </div>
              <!-- end of the div that appear only in sm screen and if the user click on the menu -->


                <div class="flex justify-center items-center gap-5 uppercase">
                <nuxt-link class="hidden md:flex hover:text-stone-500" to="/aboutus">About Us</nuxt-link>
                <div class="cursor-pointer relative " @click="showCart = !showCart">
                    <div class=" absolute -top-3 -right-2 rounded-full bg-gray-400 w-5 h-5 flex justify-center items-center  shadow-xl">{{ cartLength }}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>

                <!-- the menu icon that appear only in sm screen -->
                <div @click="showMenu = true" class=" md:hidden relative ml-1">
                  <svg class="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              
                </div>
                <!-- end of the menu icon that appear only in sm screen -->



                <div v-if="showCart" class="fixed h-svh inset-y-0 right-0 top-0 w-[400px] bg-gray-200 px-8 z-10 grid grid-rows-7 py-2">
                    <div @click="showCart = false" class="justify-center items-start cursor-pointer ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </div>

                    <!-- items in the storage -->
                    <ul class="flex justify-start flex-col items-start gap-5 w-full row-span-4 overflow-y-auto mb-10 ">
                      <li class="relative flex w-full justify-start gap-5 items-center border-t-2 border-b  border-gray-500" v-for="item in combinedCart" :key="item.id">
                          <div class="flex justify-start items-center gap-3 ">
                              <img class="w-20" :src="getImageUrl(item.image)" alt="">
                              <div class="flex flex-col gap-3">
                                <p>{{ item.name }}</p>
                                <p>£{{ item.price }}</p>
                                <p>Quantity: {{ item.quantity }}</p> <!-- Add this line to display the quantity -->
                              </div>
                          </div>
                          <div @click="removeItem(item)" class="justify-center items-center cursor-pointer ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                          </div>
                      </li>
                  </ul>
                    <!-- end items in the storage -->
                    <div class="flex flex-col justify-center items-center gap-2  h-2/12 mt-3 ">
                      <nuxt-link to="/cart" >
                        <button   class="border-2 border-gray-400 px-20 py-3 text-gray-600 hover:bg-slate-600 hover:text-white">View Cart</button>
                      </nuxt-link>  
  
                    </div>
                </div>
            </div>
            </div>
           
        </header>
        <body>
            <div class="px-10 py-10">
            <nuxt/>
        </div>
            
        </body>
        
        <footer>
            <div class=" pt-10">
              <footerComponent></footerComponent>
            </div>
        </footer>
        
    </div>
</div>
</template>

<script>
  import {  mapGetters } from 'vuex';
export default {
  data() {
    return {
      showCart: false,
      showMenu: false
    };
  },
  computed: {
    ...mapGetters(['getImageUrl', 'products']),
    combinedCart() {
      const combinedItems = {};

      // Loop through each item in the cart
      for (const item of this.$store.state.cart) {
        // Check if the item's ID already exists in the combinedItems object
        if (combinedItems[item.id]) {
          // If it exists, increment the quantity of the existing item
          combinedItems[item.id].quantity += item.quantity;
        } else {
          // If it doesn't exist, add the item to the combinedItems object
          combinedItems[item.id] = { ...item };
        }
      }

      // Convert the combinedItems object back to an array
      return Object.values(combinedItems);
    },
    cartLength() {
      // Calculate the total quantity of items in the combined cart
      return this.combinedCart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  methods: {
    removeItem(item) {
    // Dispatch the removeFromCart mutation with the item's ID
    this.$store.commit('removeFromCart', item.id);
    }
  },
};
</script>
