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
  /** @type string */
  statTag: {
    type: String,
  },
})
</script>

<template>
  <div class="stat__container">
    <div class="stat__label">
      <span>{{ statLabel }}</span>
      <span v-if="statTag" class="stat__tag">{{ statTag }}</span>
    </div>
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

.stat-container--best {
  background: var(--color-background-option);
}

.stat__label {
  font-size: var(--text-preset12-fs);
  color: var(--color-text-label);
}

.stat-container--best .stat__label {
  color: var(--color-text-value);
  font-size: var(--text-preset14-fs);
}

.stat__value {
  font-size: var(--text-preset8-fs);
  color: var(--color-text-value);
}

.stat-container--best .stat__value {
  font-size: var(--text-preset11-fs);
}

.stat__tag {
  display: inline-block;
  text-transform: uppercase;
  background: var(--color-background-highlighted);
  color: var(--color-text-highlighted);
  padding: var(--space-25) var(--space-100);
  margin-inline-start: var(--space-100);
  font-size: var(--text-preset14-fs);
  border-radius: var(--br-500);
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
