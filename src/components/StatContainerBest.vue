<script setup>
import StatContainerBase from '@/components/StatContainerBase.vue'

const props = defineProps({
  /** @type string */
  statLabel: {
    type: String,
    required: true,
  },
  /** @type string */
  statValue: {
    type: String,
    required: true,
  },
  /** @type string */
  statTag: {
    type: String,
  },
})
</script>

<template>
  <StatContainerBase
    :statLabel="props.statLabel"
    :statValue="props.statValue"
    :statTag="props.statTag"
    class="stat-container--best"
  />
</template>

<style scoped></style>
