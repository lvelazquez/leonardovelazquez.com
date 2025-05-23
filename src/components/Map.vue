<template>
  <div id="map" class="map-placeholder">
    <p>Map Placeholder</p>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
}
</script>

<style scoped>
.map-placeholder {
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
}

.map-placeholder p {
  color: #666;
  font-size: 1.2rem;
}
</style>
