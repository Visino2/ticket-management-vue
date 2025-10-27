<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-1 py-12 px-6">
      <div class="container-1440">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div class="flex gap-3">
            <router-link to="/tickets" class="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Manage Tickets
            </router-link>
            <button
              @click="handleLogout"
              class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-2xl p-6 shadow">
            <div class="text-sm text-gray-500">Total Tickets</div>
            <div class="mt-2 text-2xl font-bold">{{ stats.total }}</div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow">
            <div class="text-sm text-gray-500">Open Tickets</div>
            <div class="mt-2 text-2xl font-bold text-emerald-600">{{ stats.open }}</div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow">
            <div class="text-sm text-gray-500">In Progress</div>
            <div class="mt-2 text-2xl font-bold text-amber-600">{{ stats.inProgress }}</div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow">
            <div class="text-sm text-gray-500">Closed Tickets</div>
            <div class="mt-2 text-2xl font-bold text-gray-600">{{ stats.closed }}</div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
    <Toast v-model="toast.show" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'
import { ticketStore } from '@/store/ticketStore'
import { useRouter } from 'vue-router'

const toast = ref({ show: false, message: '', type: 'success' })
const router = useRouter()

function showToast(msg, type = 'success') {
  toast.value = { show: true, message: msg, type }
  setTimeout(() => (toast.value.show = false), 3000)
}

const stats = ref({ total: 0, open: 0, inProgress: 0, closed: 0 })

function loadStats() {
  const tickets = ticketStore.tickets || []
  stats.value = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  }
}

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('ticketapp_currentUser'))
  if (!currentUser) {
    showToast('Please login first', 'error')
    setTimeout(() => router.push('/auth/login'), 1000)
    return
  }

  loadStats()
})

function handleLogout() {
  localStorage.removeItem('ticketapp_currentUser')
  showToast('Logged out successfully', 'success')
  setTimeout(() => router.push('/auth/login'), 800)
}
</script>

<style scoped></style>
