<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p class="text-gray-600 mt-2">Login to continue to TicketFlow</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="formData.password"
              type="password"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p class="text-center mt-4 text-sm text-gray-600">
          Don't have an account?
          <router-link to="/auth/signup" class="text-indigo-600 font-semibold">Sign Up</router-link>
        </p>
      </div>
    </main>

    <Footer />
    <Toast v-model="toast.show" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({ email: '', password: '' })
const errors = ref({})
const toast = ref({ show: false, message: '', type: 'success' })

function validate() {
  const newErrors = {}
  if (!formData.value.email) newErrors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(formData.value.email)) newErrors.email = 'Email is invalid'
  if (!formData.value.password) newErrors.password = 'Password is required'
  else if (formData.value.password.length < 6)
    newErrors.password = 'Password must be at least 6 characters'
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

function handleSubmit() {
  if (!validate()) {
    showToast('Please fix the errors in the form', 'error')
    return
  }

  const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
  const found = users.find(
    u => u.email === formData.value.email && u.password === formData.value.password
  )

  if (found) {
    const token = 'mock_token_' + Date.now()
    localStorage.setItem('ticketapp_session', token)
    localStorage.setItem(
      'ticketapp_user',
      JSON.stringify({ email: found.email, name: found.name })
    )
    showToast('Login successful!', 'success')
    setTimeout(() => router.push('/dashboard'), 1000)
  } else {
    showToast('Invalid email or password', 'error')
  }
}

function showToast(msg, type = 'success') {
  toast.value = { show: true, message: msg, type }
  setTimeout(() => (toast.value.show = false), 3000)
}
</script>

<style scoped></style>
