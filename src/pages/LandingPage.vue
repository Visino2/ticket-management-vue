<script setup>
import { Motion } from '@motionone/vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { Ticket, Clock, Settings } from 'lucide-vue-next' 
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 relative z-10">
        <!-- Animated Circle -->
        <Motion
          tag="div"
          :animate="{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }"
          :transition="{ duration: 20, repeat: Infinity, ease: 'easeInOut' }"
          class="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400 rounded-full opacity-20"
        />

        <div class="max-w-2xl text-center md:text-left">
          <Motion
            tag="h2"
            :initial="{ opacity: 0, y: 50 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.3 }"
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Manage Your Tickets Effortlessly
          </Motion>

          <Motion
            tag="p"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.5 }"
            class="text-base sm:text-lg md:text-xl mb-8 text-indigo-100"
          >
            Track, organize, and resolve support tickets with our powerful management system.
          </Motion>

          <Motion
            tag="div"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.7 }"
            class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Motion
              tag="button"
              :whileHover="{ scale: 1.05, y: -5 }"
              :whileTap="{ scale: 0.95 }"
              class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 w-full sm:w-auto"
              @click="$router.push('/auth/signup')"
            >
              Get Started Free
            </Motion>

            <Motion 
              tag="button"
              :whileHover="{ scale: 1.05, y: -5 }"
              :whileTap="{ scale: 0.95 }"
              class="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 w-full sm:w-auto"
              @click="$router.push('/auth/login')"
            >
              Login
            </Motion>
          </Motion>
        </div>
      </div>

      <!-- Wave Divider -->
      <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="#f8fafc"
          d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z"
        />
      </svg>
    </section>

    <!-- Features Section -->
    <section class="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-16">
      <Motion
        tag="h3"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
      >
        Why Choose TicketFlow?
      </Motion>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Motion
          v-for="(f, i) in [
            { icon: Ticket, title: 'Easy Tracking', desc: 'Monitor all tickets in one place with real-time status updates' },
            { icon: Clock, title: 'Fast Resolution', desc: 'Prioritize and resolve tickets quickly with our intuitive interface' },
            { icon: Settings, title: 'Full Control', desc: 'Create, edit, and manage tickets with complete flexibility' }
          ]"
          :key="i"
          tag="div"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: i * 0.2 }"
          class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
        >
          <component :is="f.icon" class="w-12 h-12 mx-auto mb-4 text-indigo-600" />
          <h4 class="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{{ f.title }}</h4>
          <p class="text-sm sm:text-base text-gray-600">{{ f.desc }}</p>
        </Motion>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped></style>
