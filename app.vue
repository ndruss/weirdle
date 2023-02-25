<template>
  <div class="app">
    <p v-if="store.theWord" v-html="store.theWord" />
    <p v-else v-html="`loading...`" />
    <button @click="refreshData">Refresh</button>
    <div v-if="store.theWord">
      <WordInput v-for="(row, index) in Array(5).fill('')" :key="index" :index="index" />
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

const refreshData = async () => {
  console.log('refreshing data...')
  refreshNuxtData()
  store.currentRow = 0
}

onMounted(() => {
  refresh().finally(() => {
    if (data.value) {
      store.setStore(data.value[0])
    }
  })
})
</script>

<style scoped>
.app {
  max-width: 1080px;
  width: 80%;
  margin: 0 auto;
}
</style>
