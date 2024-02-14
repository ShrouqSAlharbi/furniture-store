<template>
  <chairComponent :signed="true"/>
</template>

<script>
import chairComponent from '~/components/chairComponent.vue';

export default {
  layout: 'signedLayout',
  components: {
    chairComponent,
  },
};
</script>