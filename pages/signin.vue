<template>
    <div class="flex justify-center items-center flex-col gap-4 border-[0.25px] py-10 shadow-lg">
      <h1 class="font-bold text-xl mb-10">Sign In</h1>
      <form @submit="submitForm" class="flex justify-center items-center gap-8 flex-col w-full">
        <div  class="w-full flex justify-center items-center">
        <input 
        class="border-[0.25px] border-stone-700 rounded-md px-2 py-1 w-3/12"
         type="text" v-model="Email" id="Email" placeholder="Email" required>
        </div>
        <div class="w-full flex justify-center items-center">
        <input class="border-[0.25px] border-stone-700 rounded-md px-2 py-1 w-3/12" placeholder="Password" type="password" v-model="password" id="password" required>
      </div>
        <button class="mt-5 flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Sign In</button>
      </form>
    </div>
  </template>

<script>

export default {
  data() {
    return {
        Email: '',
      password: ''
    };
  },
  methods: {
    async submitForm(event) {
  event.preventDefault();

  try {
    const { data, error } = await this.$supabase
          .from('users')
          .select('Email, Password , id')
          .eq('Email', this.Email)
          .eq('Password', this.password) // Check both email and password
          .single();


    if (error) {
      alert('Invalid Email or password.')
    } else if (!data) {
      alert('Invalid Email or password.')
    } else {
      localStorage.setItem('session', JSON.stringify({ id: data.id }));

      this.$router.push('/signed/cart');
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
}

  },

};
</script>