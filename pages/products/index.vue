<template>
  <ProductsComponent :singed='false'  />
</template>


<script>
import ProductsComponent from '~/components/productsComponent.vue';

export default {
  components: {
    ProductsComponent,
  },
};
</script>