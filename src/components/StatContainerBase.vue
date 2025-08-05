<script setup>
defineProps({
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
})
</script>

<template>
  <div class="stat__container">
    <div class="stat__label">{{ statLabel }}</div>
    <div class="stat__value">{{ statValue }}</div>
  </div>
</template>

<style scoped>
.stat__container {
  background: var(--color-background-accent);
  padding: 10.5px 13.5px;
  border-radius: var(--br-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat__label {
  font-size: var(--text-preset12-fs);
  color: var(--color-text-label);
}

.stat__value {
  font-size: var(--text-preset8-fs);
  color: var(--color-text-value);
}

.stat__container--highlight {
  background: var(--color-background-highlighted);
}

.stat__container--highlight .stat__label,
.stat__container--highlight .stat__value {
  color: var(--color-text-highlighted);
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .stat__container {
    padding: 16px 22.5px;
    border-radius: var(--br-200);
  }

  .stat__label {
    font-size: var(--text-preset9-fs);
  }

  .stat__value {
    font-size: var(--text-preset5-fs);
  }
}
</style>
