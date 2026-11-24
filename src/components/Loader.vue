<template>
  <svg
    class="lds-blocks"
    width="92"
    height="92"
    viewBox="0 0 100 100"
    role="img"
    aria-label="Loading"
  >
    <rect
      v-for="cell in cells"
      :key="`${cell.x}-${cell.y}`"
      class="cell"
      :x="cell.x"
      :y="cell.y"
      width="20"
      height="20"
      :style="{ '--step': cell.step }"
    />
  </svg>
</template>

<script setup lang="ts">
// Eight blocks lighting up in sequence around a ring. `step` is the order the block lights up.
const cells = [
  { x: 19, y: 19, step: 0 },
  { x: 40, y: 19, step: 1 },
  { x: 61, y: 19, step: 2 },
  { x: 61, y: 40, step: 3 },
  { x: 61, y: 61, step: 4 },
  { x: 40, y: 61, step: 5 },
  { x: 19, y: 61, step: 6 },
  { x: 19, y: 40, step: 7 },
]
</script>

<style scoped>
.cell {
  fill: var(--palette-white);
  animation: blink var(--duration-loop) var(--ease-linear) infinite;
  animation-delay: calc(var(--duration-loop) * var(--step) / 8);
}

@keyframes blink {
  0% {
    fill: var(--palette-blue);
  }
  12.5%,
  100% {
    fill: var(--palette-white);
  }
}
</style>
