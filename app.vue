<template>
  <div class="app">
    <p v-if="pending">Loading...</p>
    <div v-if="!store.isUpdating" class="game">
      <div v-if="store.theWord" class="word-attempts">
        <WordInputForm v-for="(row, index) in store.attempts" :key="index" :position="index" />
      </div>
      <div v-if="store.results" class="results">
        <p>You {{ store.results }}</p>
        <p v-if="store.results === 'lose'" v-html="store.theWord" />
        <button @click="fetchWordData()">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const store = useGameStore()

const { data, pending } = await useFetch<[string]>('word', {
  baseURL: 'https://random-word-api.herokuapp.com',
  query: { length: 5, lang: 'en' },
})

const fetchWordData = async () => {
  store.isUpdating = true
  try {
    await refreshNuxtData()
  } finally {
    store.setStore(data.value?.[0] || '')
    store.isUpdating = false
  }
}

onMounted(fetchWordData)
</script>

<style scoped>
.app {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
}
.game {
  position: relative;
  max-width: 30em;
  width: 88%;
  padding-bottom: 6em;
  margin-top: 3em;
}
.results {
  text-align: center;
}
</style>
