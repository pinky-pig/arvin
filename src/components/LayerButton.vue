<script setup lang="ts">

</script>

<template>
  <button>
    <span aria-hidden="true">12</span>
    <span />
    <span>Paste Link111</span>
  </button>
</template>

<style scoped>
button:is(:hover, :focus-visible) {
  --active: 1;
}

button {
  --active: 0;
  color: white;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  font-weight: bold;
  border: 0;
  background: transparent;
  padding: 0;
}

button span:first-of-type {
  padding: 1rem 4rem;
}

button span:not(:first-of-type) {
  position: absolute;
}

[aria-hidden] {
  color: transparent;
}

button span {
  inset: 0;
  display: grid;
  background: var(--bg);
  place-items: center;
  transition: 0.2s ease;
  border: 2px solid black;
  translate:
    calc((var(--active) * var(--coefficient, 0)) * (0.5rem * -1)) calc((var(--active) * var(--coefficient, 0)) * (0.5rem * -1));
}

span:nth-of-type(1) {
  --bg: #FF90E8;
}

span:nth-of-type(2) {
  --coefficient: 1;
  --bg: #FFD433;
}

span:nth-of-type(3) {
  --coefficient: 2;
  --bg: #121212;
}

button:active {
  --active: 0.5;
}
</style>
