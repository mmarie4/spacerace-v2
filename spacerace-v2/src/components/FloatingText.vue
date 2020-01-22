<template>
  <div v-on="$listeners" class="flex items-center justify-center">
    <img :src="source" />
  </div>
</template>

<script>
export default {
  name: "FloatingText",
  props: {
    source: String
  }
};
</script>