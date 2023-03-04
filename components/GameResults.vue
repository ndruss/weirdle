<template>
  <div class="results">
    <p v-if="results === 'lose'" class="the-word" v-html="theWord" />
    <p class="message">You {{ results || 'suck' }}</p>
    <button class="btn-primary" @click="playAgain">Play Again</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  results: 'win' | 'lose'
  theWord: string
  playAgain: () => void
}>()
</script>

<style scoped>
.results {
  text-align: center;
}
.message {
  font-size: 1rem;
  margin: 0.5em 0;
}
.the-word {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
}
button {
  margin-top: 1rem;
}
</style>
