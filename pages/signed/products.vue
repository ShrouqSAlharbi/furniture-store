<template>
  <div>
    <ProductsComponent :signed="true"/>
  </div>
</template>

<script>
import ProductsComponent from '~/components/productsComponent.vue';

export default {
  layout: 'signedLayout',
  components: {
    ProductsComponent,
  },
};
</script>