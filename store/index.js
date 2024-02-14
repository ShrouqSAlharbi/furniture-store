export const state = () => ({
    products: [],
    error: null,
    cart: [],
    filteredProducts: [],
    sortBy: 'price',
    sortOrder: 'asc',
  })
  export const mutations = {
    clearCart(state) {
      state.cart = [];
    },
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
    addToCart2(state, { product, quantity }) {
      const existingProductIndex = state.cart.findIndex(item => item.id === product.id);
    
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        state.cart[existingProductIndex].quantity += quantity;
      } else {
        // If the product does not exist in the cart, add it with the specified quantity
        state.cart.push({ ...product, quantity });
      }
    }
  }

  export const actions = {
    setFilteredProducts({ commit }, section) {
      commit("setFilteredProducts", section);
    },

      async fetchProducts({ commit }) {
        try {
          const { data, error } = await this.$supabase.from('products').select('*');
    
          if (error) {
            throw new Error('Error fetching products: ' + error.message);
          }
    
          commit('setProducts', data);
        } catch (error) {
          console.error(error.message);
        }
      },

      clearCart({ commit }) {
        commit('clearCart');
      }
  }

  export const getters = {
    products: state => state.products,
    getImageUrl: state => imageData => {
      try {
        const imageUrl = JSON.parse(imageData).data.publicUrl;
        return imageUrl;
      } catch (error) {
        console.error('Error parsing image data:', error.message);
        return '';
      }
    },
    cart: state => state.cart,
  };

