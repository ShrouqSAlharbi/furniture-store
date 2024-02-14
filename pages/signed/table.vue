<template>
  <tableComponent :signed="true"/>
</template>

<script>
import tableComponent from '~/components/tableComponent.vue';

export default {
  layout: 'signedLayout',
  components: {
    tableComponent,
  },
};
</script>