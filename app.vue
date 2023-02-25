<template>
  <div class="app">
    <p v-html="pending ? 'loading...' : store.theWord || ''" />
    <button @click="refreshData">Refresh</button>
    <div v-if="store.theWord">
      <WordInput v-for="(row, index) in Array(5).fill('')" :key="index" :position="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const store = useGameStore()

const { data, refresh, pending } = await useFetch<[string, ...string[]]>('word', {
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

const refreshData = async () => {
  console.log('refreshing data...')
  store.isUpdating = true
  fetchWordData()
}

onMounted(fetchWordData)
</script>

<style scoped>
.app {
  max-width: 1080px;
  width: 80%;
  margin: 0 auto;
}
</style>
