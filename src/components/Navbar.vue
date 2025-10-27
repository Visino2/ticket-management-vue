<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { Motion, Presence } from '@motionone/vue'
import { useRouter } from 'vue-router'

const mobileMenuOpen = ref(false)
const router = useRouter()

function navigateTo(path) {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <Motion
    tag="header"
    :initial="{ y: -100, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
    class="bg-white shadow-sm sticky top-0 z-50"
  >
    <div class="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
      <Motion
        tag="h1"
        :initial="{ x: -50, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        class="text-2xl font-extrabold text-indigo-600"
      >
      <router-link to="/" aria-label="TicketFlow home">
        TicketFlow
        
        </router-link>
      </Motion>

       

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex gap-4">

        <Motion
          tag="button"
          @click="navigateTo('/auth/login')"
          :whileHover="{ scale: 1.05 }"
          :whileTap="{ scale: 0.95 }"
          class="px-4 py-2 text-indigo-600 hover:text-indigo-800"
        >
          Login
        </Motion>

        <Motion
          tag="button"
        @click="navigateTo('/dashboard')"
          :whileHover="{ scale: 1.05, boxShadow: '0 10px 25px rgba(79,70,229,0.3)' }"
          :whileTap="{ scale: 0.95 }"
          class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Get Started
        </Motion>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
        <component :is="mobileMenuOpen ? X : Menu" class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Presence>
      <Motion
        v-if="mobileMenuOpen"
        tag="div"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3 }"
        class="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-2 overflow-hidden"
      >
        <button
          @click="navigateTo('/auth/login')"
          class="px-4 py-2 text-indigo-600 text-left"
        >
          Login
        </button>
        <button
         @click="navigateTo('/dashboard')"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Get Started
        </button>
      </Motion>
    </Presence>
  </Motion>
</template>

<style scoped></style>
