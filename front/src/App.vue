<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/scores">Scores</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <main class="grid-container">
        <transition :name="transitionName" mode="out-in" appear>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';

export default Vue.extend({
    store,
    computed: {
        transitionName(): string {
            return this.$route.path === '/' ? 'slide-right' : 'slide-left';
        },
    },
    created() {
        store.dispatch('FETCH_SCORE');
    },
});
</script>


<style src="@/assets/styles/css/foundation.min.css"></style>    

<style lang="scss">
html,
body {
    font-size: 1em;

    @media screen and (min-width: 40rem) and (max-width: 63.9375rem) {
        font-size: 15px;
    }

    @media (max-width: 40rem) {
        padding: 0.3125rem;
    }
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 0.5rem 0.8125rem;

    @media (max-width: 40rem) {
        padding: 0.3125rem;
    }
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #2ba6cb;
        }
    }
}

// Animations

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active {
    animation: scale-in 0.3s;
}
.scale-leave-active {
    animation: scale-out 0.3s;
}
@keyframes scale-in {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes scale-out {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}

.slide-left-enter-active {
    transition: all 0.3s;
}
.slide-left-enter {
    transform: translateX(3.125rem);
    opacity: 0;
}

.slide-right-enter-active {
    transition: all 0.3s;
}
.slide-right-enter {
    transform: translateX(-3.125rem);
    opacity: 0;
}
</style>
