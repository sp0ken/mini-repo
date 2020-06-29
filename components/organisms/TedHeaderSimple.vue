<template>
  <headroom :class="headerClass" @pin="pinHeader" @unpin="unpinHeader">
    <header class="navbar shadow bg-light">
      <section class="navbar-section">
        <nuxt-link :to="localePath('mattress')" class="logo">
          <img
            src="https://res.cloudinary.com/dgodjz1pn/image/upload/site/icons/logo_ours.svg"
            :alt="$t('header.alt.logo-tediber')"
            class="ml-2"
          />
        </nuxt-link>
      </section>

      <section class="navbar-center">
        <nuxt-link :to="localePath('mattress')" class="logo">
          <img
            src="https://res.cloudinary.com/dgodjz1pn/image/upload/site/icons/logo_ours.svg"
            :alt="$t('header.alt.logo-ours')"
            class="hide-sm ours"
          />
        </nuxt-link>
      </section>

      <section class="navbar-section"> </section>
    </header>
  </headroom>
</template>

<script>
  import { headroom } from 'vue-headroom'

  export default {
    components: { headroom },

    data() {
      return {
        headerClass: 'headroom--pinned'
      }
    },

    beforeDestroy() {
      this.headerClass = 'headroom--pinned'
    },

    methods: {
      /**
       * Listener for vue-headroom "pin" event
       */
      pinHeader: function () {
        this.headerClass = 'headroom--pinned'
      },

      /**
       * Listener for vue-headroom "unpin" event
       */
      unpinHeader: function () {
        this.headerClass = 'headroom--unpinned'
      },

      /**
       * Commits a UI change to toggle the sidebar
       */
      toggleSidebar: function () {
        this.$store.commit('ui/toggleSidebar')
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    height: 3rem;
    letter-spacing: 1.5px;

    & > * {
      height: 100%;
    }

    & .logo,
    & .cart-link,
    & .stores-link {
      align-items: center;
      display: flex;
      padding-top: 0;
      padding-bottom: 0;
    }

    .logo .ours:hover {
      animation: move-ours 0.5s infinite linear;
    }

    & img {
      height: 2.5rem;
    }

    & .stores-link img {
      height: 2rem;
    }

    .badge[data-badge] {
      &::after {
        line-height: 1.3;
        transform: translate(-0.5rem, -0.5rem);
      }

      &.pulse::after {
        animation: pulse 1500ms 1;
      }
    }
  }

  @media (max-width: $size-sm) {
    header {
      height: 2.4rem;

      & .show-sm {
        display: flex !important;
      }

      & img {
        height: 2rem;
      }

      & .stores-link img {
        height: 1.7rem;
      }

      & #off-canvas-toggle {
        height: 1rem;
        position: relative;
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;
        width: 1.25rem;

        & span {
          background: $primary-color;
          border-radius: $border-radius;
          display: block;
          height: 0.15rem;
          left: 0;
          opacity: 1;
          position: absolute;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
          width: 100%;

          &:hover {
            background: $primary-color-light;
          }

          &:nth-child(1) {
            top: 0%;
          }

          &:nth-child(2),
          &:nth-child(3) {
            top: calc(50% - 0.075rem);
          }

          &:nth-child(4) {
            bottom: 0%;
          }
        }

        &.open span {
          background: $error-color;

          &:nth-child(1),
          &:nth-child(4) {
            top: calc(50% - 0.075rem);
            width: 0%;
            left: 50%;
          }

          &:nth-child(2) {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
          }

          &:nth-child(3) {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }
        }
      }
    }
  }

  @keyframes move-ours {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes pulse {
    0% {
      background: $secondary-color;
    }

    50% {
      background: $secondary-color;
      transform: translate(-0.5rem, -0.5rem) scale(1.5);
    }

    70% {
      background: $secondary-color;
      transform: translate(-0.5rem, -0.5rem) scale(0.8);
    }

    100% {
      background: $secondary-color;
      transform: translate(-0.5rem, -0.5rem) scale(1);
    }
  }
</style>
