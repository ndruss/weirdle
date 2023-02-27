<template>
  <div class="app">
    <div v-if="store.theWord && !store.isUpdating" class="game">
      <WordInputForm v-for="(row, index) in store.attempts" :key="index" :position="index" />
    </div>
    <div v-if="store.isFinished">
      <p v-html="store.theWord" />
      <button @click="refreshData">Refresh</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const store = useGameStore()

const { data } = await useFetch<[string, ...string[]]>('word', {
  baseURL: 'https://random-word-api.herokuapp.com',
  query: { length: 5, lang: 'en' },
})

const fetchWordData = (): void => {
  refreshNuxtData().finally(() => {
    if (data.value) {
      store.setStore(data.value[0])
    }
  })
}

const refreshData = () => {
  store.isUpdating = true
  fetchWordData()
}

onMounted(fetchWordData)
</script>

<style scoped>
.app {
  font-size: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.game {
  position: relative;
  max-width: 30em;
  width: 88%;
  padding-bottom: 6em;
  margin: 3em 0;
}
@media (min-width: 420px) {
  .app {
    font-size: 14px;
  }
}
</style>
