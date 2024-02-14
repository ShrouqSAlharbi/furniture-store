<template>
  <div>
    <h1 style="text-align: center; margin-bottom: 20px;">Add New Product</h1>
    <form @submit.prevent="addProduct" style="max-width: 400px; margin: 0 auto;">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required class="input-field"><br><br>

      <label for="section">Section:</label>
      <input type="text" id="section" v-model="section" required class="input-field"><br><br>

      <label for="price">Price:</label>
      <input type="number" id="price" v-model="price" step="0.01" required class="input-field"><br><br>

      <label for="description">Description:</label><br>
      <textarea id="description" v-model="description" rows="4" cols="50" class="input-field"></textarea><br><br>

      <label for="image">Image:</label>
      <input type="file" id="image" @change="handleImageUpload" accept="image/*" required class="input-field"><br><br>

      <input type="submit" value="Submit" class="submit-button">
    </form>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        section: '',
        price: 0,
        description: '',
        image: null,
        imageUrl: null // Added to store the URL of the uploaded image
      }
    },
    methods: {
      async addProduct() {
        // Upload image to Supabase storage
        const { data: imageData, error: imageError } = await this.$supabase.storage
          .from('products')
          .upload(`products/${this.image.name}`, this.image);
  
        if (imageError) {
          alert('Error uploading image');
          return;
        } 
        // Get image URL from storage
        this.imageUrl = await this.$supabase.storage
          .from('products')
          .getPublicUrl(`products/${this.image.name}`);
  
        // Add product to database
        const { data: productData, error: dbError } = await this.$supabase.from('products').insert([
          { 
            name: this.name,
            section: this.section,
            price: this.price,
            description: this.description,
            image: this.imageUrl // Update the image column with the image URL
          }
        ]);
  
        if (dbError) {
          console.error('Error inserting product:', dbError.message);
          return;
        }
  
        console.log('Product added successfully:', productData);
        alert('Product added successfully');
      },
      handleImageUpload(event) {
        this.image = event.target.files[0];
      }
    }
  }
  </script>

<style>
h1 {
  color: #333;
  font-size: 24px;
  text-transform: uppercase;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 10px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
  