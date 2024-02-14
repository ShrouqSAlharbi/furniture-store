<template>
  <sofaComponent :signed="true"/>
</template>

<script>
import sofaComponent from '~/components/sofaComponent.vue';

export default {
  layout: 'signedLayout',
  components: {
    sofaComponent,
  },
};
</script>