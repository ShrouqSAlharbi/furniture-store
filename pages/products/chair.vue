<template>
      <chairComponent :signed="false" />
</template> 

<script>
import chairComponent from '~/components/chairComponent.vue';

export default {
  components: {
      chairComponent,
  },
};
</script>