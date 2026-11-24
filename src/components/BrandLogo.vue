<template>
  <div :class="['brand-logo', `${color}-logo`, `${type}-logo`]">
    <Logo class="logo" />
    <component :is="heading ? 'h1' : 'p'" class="brand-title">
      <span>Leonardo Vel&aacute;zquez</span>
      <span class="sub-header">Software Developer</span>
    </component>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'

withDefaults(
  defineProps<{ color?: 'white' | 'black'; type?: 'header' | 'intro'; heading?: boolean }>(),
  { color: 'white', type: 'header', heading: false }
)
</script>

<style lang="scss" scoped>
@use '../styles/media-queries.scss' as media;

.white-logo {
  color: var(--color-on-media);
  svg {
    fill: var(--color-on-media);
    filter: drop-shadow(2px 2px 50px var(--color-shadow));
  }
}
.black-logo {
  color: var(--color-on-surface);
  svg {
    fill: var(--color-on-surface);
  }
}

.brand-logo {
  display: flex;
  text-transform: uppercase;

  .brand-title {
    font-family: var(--font-display);
    font-weight: var(--weight-bold);
    font-size: var(--text-3xl);
    white-space: nowrap;
    width: 100%;
    line-height: 0.75;
    margin: 0;
    letter-spacing: var(--tracking-wide);
    text-shadow: 2px 2px 50px var(--color-shadow);
    span:first-child {
      margin-bottom: 0.1em;
    }
    span {
      display: block;
    }
  }
}

.header-logo {
  .logo {
    width: 8vw;
    height: 8vw;
    max-width: var(--space-8);
  }
  .brand-title {
    font-size: 5vw;
    letter-spacing: 0.15px;
    line-height: 0.8;
    text-shadow: none;
  }
  @media (min-width: media.$bp-sm) {
    .brand-title {
      font-size: var(--text-xl);
    }
    .logo {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  @media (min-width: media.$bp-md) {
    .brand-title {
      font-size: 1.6rem;
    }
    .logo {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
  @media (min-width: media.$bp-lg) {
    .logo {
      width: 3.3rem;
      height: 3.3rem;
    }
    .brand-title {
      font-size: var(--text-2xl);
    }
  }
}

.intro-logo {
  flex-direction: column;
  @media (min-width: media.$bp-ms) {
    flex-direction: row;
  }
  .logo {
    margin: 0 auto;
    width: 5rem;
    height: 4.2rem;
  }
  .brand-title {
    text-align: center;
    line-height: 1;
    margin-bottom: var(--space-4);
    span {
      margin: 0 auto;
      width: 100%;
      white-space: normal;
      @media (min-width: media.$bp-sm) {
        width: 80%;
      }
      @media (min-width: media.$bp-ms) {
        white-space: nowrap;
        text-align: left;
        line-height: 0.75;
        width: 100%;
      }
    }
  }
}

/* While the background video buffers, the intro logo breathes between two loader colors. */
@keyframes fillLoop {
  0%,
  100% {
    fill: var(--color-loader-from);
  }
  50% {
    fill: var(--color-loader-to);
  }
}

@keyframes colorLoop {
  0%,
  100% {
    color: var(--color-loader-from);
  }
  50% {
    color: var(--color-loader-to);
  }
}

.loader.intro-logo {
  .logo {
    animation: fillLoop var(--duration-loop-slow) var(--ease-linear) infinite;
  }
  .brand-title {
    animation: colorLoop var(--duration-loop-slow) var(--ease-linear) infinite;
  }
}
</style>
