<script setup></script>

<template>
  <button type="button" class="button">
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.button {
  --_button-font-size: var(--button-font-size, inherit);
  --_button-line-height: var(--button-line-height, inherit);
  --_button-color: var(--button-color, var(--color-text-primary));
  --_button-color-active: var(--button-color-active, var(--color-text-active));
  --_button-background: var(--button-background, var(--color-background-accent));
  --_button-background-active: var(--button-background-active, var(--color-background-active));

  --_button-border-radius: var(--button-border-radius, var(--br-400));
  --_button-inline-padding: var(--button-inline-padding, var(--space-200));
  --_button-inline-size: var(--button-inline-size, fit-content);
  --_button-block-size: var(--button-block-size, 52px);

  display: block grid;
  place-content: center;
  border-radius: var(--_button-border-radius);

  background: var(--_button-background);
  color: var(--_button-color);
  text-decoration: none;
  font-size: var(--_button-font-size);
  line-height: var(--_button-line-height);

  padding-inline: var(--_button-inline-padding);
  inline-size: var(--_button-inline-size);
  block-size: var(--_button-block-size);
}

.button:hover,
.button:focus-visible {
  background: var(--_button-background-active);
  color: var(--_button-color-active);
}

.button:focus-visible {
  outline-offset: 2px;
  outline: 2px dashed var(--_button-background-active);
}

.button--highlighted {
  --button-color: var(--color-text-highlighted);
  --button-background: var(--color-background-button-highlighted);
  --button-background-active: var(--color-background-button-highlighted-active);
}

.button--big {
  --button-block-size: var(--button-block-size-big);
  --button-inline-size: var(--button-inline-size-big);
  --button-border-radius: var(--br-500);
}

.button--full {
  --button-inline-size: var(--button-inline-size-full);
}

.button--menu {
  --button-block-size: var(--button-block-size-menu);
  --button-inline-padding: 18.5px;
}
</style>
