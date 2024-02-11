export const state = () => ({
    products: [],
    error: null,
    cart: [],
    filteredProducts: [],
    sortBy: 'price',
    sortOrder: 'asc',

  })
  export const mutations = {
    setProducts(state, products) {
      state.products = products
    },
    setError(state, error) {
      state.error = error
    },
    addToCart(state, productId) {
      const product = state.products.find((product) => product.id === productId);
      if (product) {
        // Check if the product already exists in the cart
        const existingProduct = state.cart.find((item) => item.id === productId);
        if (existingProduct) {
          // If the product already exists, increment the quantity
          existingProduct.quantity++;
        } else {
          // If it doesn't exist, add the product to the cart with a quantity of 1
          state.cart.push({ ...product, quantity: 1 });
        }
      }
    },
    setFilteredProducts(state, section) {
      state.filteredProducts = section
        ? state.products.filter((product) => product.section === section)
        : state.products;
    },
    setSortOrder(state, payload) {
      state.sortBy = payload.sortBy;
      state.sortOrder = payload.sortOrder;
    },
    removeFromCart(state, itemId) {
      const index = state.cart.findIndex(item => item.id === itemId);
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          // If quantity is greater than 1, decrement the quantity by 1
          state.cart[index].quantity--;
        } else {
          // If quantity is 1 or less, remove the entire item from the cart
          state.cart.splice(index, 1);
        }
      }
    },
    incrementQuantity(state, itemId) {
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.quantity++; // Increment quantity by 1
      }
    },
    decrementQuantity(state, itemId) {
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.quantity--; // Increment quantity by 1
      }
    },

    
  }

  export const actions = {
    async fetchProducts({ commit }) {
      const { data, error } = await this.$supabase.from("products").select("*");
      if (error) {
        commit("setError", error);
      } else {
        for (const product of data) {
          const { data: imageData, error: imageError } = await this.$supabase
            .storage.from("products")
            .download(product.image);
        
            product.image = URL.createObjectURL(imageData);
          
        }
        commit("setProducts", data);
      }
    },
    setFilteredProducts({ commit }, section) {
      commit("setFilteredProducts", section);
    },
  }