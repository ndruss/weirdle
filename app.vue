<template>
  <div class="app">
    <p v-if="pending">Loading...</p>
    <div v-if="!store.isUpdating" class="game">
      <div class="grid">
        <WordInputForm v-for="(_row, index) in store.attempts" :key="index" :position="index" />
      </div>
      <GameResults
        v-if="store.results"
        :results="store.results"
        :the-word="store.theWord"
        :play-again="fetchWordData"
      />
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
  max-width: 30em;
  width: 88%;
  margin-top: 3em;
}
.grid {
  position: relative;
  padding-bottom: 6em;
}
</style>
