<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="submitForm">
          <div class="rounded-md shadow-sm flex justify-center items-center flex-col gap-4">
            <div class="w-full">
              <label for="full_name">Full Name</label>
              <input v-model="userData.fullName" id="full_name" name="full_name" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name">
            </div>
            <div class="w-full">
              <label for="email">Email</label>
              <input v-model="userData.email" id="email" name="email" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email">
            </div>
            <div class="w-full">
              <label for="password">Password</label>
              <input v-model="userData.password" id="password" name="password" type="password" autocomplete="new-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
            <div class="w-full">
              <label for="username">Username</label>
              <input v-model="userData.username" id="username" name="username" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
            </div>
            <div class="w-full">
              <label for="address">Address</label>
              <input v-model="userData.address" id="address" name="address" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Address">
            </div>
            <div class="w-full">
              <label for="phone">Phone</label>
              <input v-model="userData.phone" id="phone" name="phone" type="tel" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Phone">
            </div>
            <div class="w-full">
              <label for="date_of_birth">Date of Birth</label>
              <input v-model="userData.dateOfBirth" id="date_of_birth" name="date_of_birth" type="date" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Date of Birth">
            </div>
            <div class="w-full flex justify-center items-start gap-3 flex-col">
              <label for="card_number">Card Number</label>
              <input v-model="userData.cardNumber" id="card_number" name="card_number" type="text" autocomplete="cc-number" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Card Number">
              <label for="expiry_date">Expiry Date</label>
              <input v-model="userData.expiryDate" id="expiry_date" name="expiry_date" type="text" autocomplete="cc-exp" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="MM/YY">
              <label for="cvv">CVV</label>
              <input v-model="userData.cvv" id="cvv" name="cvv" type="text" autocomplete="cc-csc" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="000">
            </div>
          </div>
  
          <div>
            <button @click="submitForm" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Account
            </button>
          </div>
          <div class="text-xs text-blue-500 font-semibold">
            <nuxt-link to="signin">Already Have An Account?</nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        userData: {
          fullName: '',
          password: '',
          username: '',
          address: '',
          phone: '',
          email: '',
          dateOfBirth: '',
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        }
      };
    },
    methods: {

    async submitForm(event) {
        event.preventDefault(); 
        const { data, error } = await this.$supabase
        .from('users')
        .insert([
          {
            FullName: this.userData.fullName,
            Password: this.userData.password,
            Username: this.userData.username,
            Address: this.userData.address,
            Phone: this.userData.phone,
            DateofBirth: this.userData.dateOfBirth,
            cardNumber: this.userData.cardNumber,
            expiryDate: this.userData.expiryDate,
            cvv: this.userData.cvv,
            Email: this.userData.email
          }
        ])
        .select();
          

      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log('User inserted successfully:', data);
        // Redirect to sign-in page
        this.$router.push('/signin');
      }
      }
    }
  };
  </script>