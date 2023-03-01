<template>
  <div class="game">
    <div v-if="store.theWord && !store.isUpdating">
      <WordInputForm v-for="(row, index) in store.attempts" :key="index" :position="index" />
      <div v-if="store.isFinished">
        <p v-html="store.theWord" />
        <button @click="refreshNuxtData()">Refresh</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const store = useGameStore()

const props = defineProps<{
  theWord: string
}>()

store.setStore(props.theWord)
</script>

<style scoped>
.game {
  position: relative;
  max-width: 30em;
  width: 88%;
  padding-bottom: 6em;
  margin: 3em 0;
}
</style>
