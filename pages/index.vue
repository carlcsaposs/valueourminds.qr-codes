<template>
  <div>
    <heading heading="Posters" />
    <p>
      <b-button to="/create/" size="lg" variant="primary"
        >Create posters</b-button
      >
    </p>
    <p>
      <b-button to="/scan/" size="lg" variant="primary"
        >Activate posters</b-button
      >
    </p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Posters',
  },
}
</script>
