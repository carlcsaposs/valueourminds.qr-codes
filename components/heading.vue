<template>
  <div>
    <h1>{{ heading }}</h1>
    <p v-if="subheading" id="subheading">{{ subheading }}</p>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-family: Cabin, sans-serif;
}

#subheading {
  font-size: 1.5rem;
}
</style>
