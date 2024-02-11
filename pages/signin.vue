<template>
    <div>
      <h1>Sign In</h1>
      <form @submit="submitForm">
        <label for="Email">Email:</label>
        <input type="text" v-model="Email" id="Email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
        <br>
        <button type="submit">Sign In</button>
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
          .select('Email, Password')
          .eq('Email', this.Email)
          .eq('Password', this.password) // Check both email and password
          .single();


    if (error) {
      console.error('Error signing in:', error.message);
    } else if (!data) {
      console.error('Invalid Email or password.');
    } else {
      console.log('User signed in successfully:', JSON.stringify(data));
      localStorage.setItem('session', data);

      this.$router.push('/cart');
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
}

  },

};
</script>