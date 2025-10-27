<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Create Account</h2>
          <p class="text-gray-600 mt-2">Sign up to continue to TicketFlow</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</p>
          </div>

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
            Sign Up
          </button>
        </form>

        <p class="text-center mt-4 text-sm text-gray-600">
          Already have an account?
          <router-link to="/auth/login" class="text-indigo-600 font-semibold">Login</router-link>
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

const formData = ref({ name: '', email: '', password: '' })
const errors = ref({})
const toast = ref({ show: false, message: '', type: 'success' })

function validate() {
  const newErrors = {}
  if (!formData.value.name) newErrors.name = 'Name is required'
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

  if (users.find(u => u.email === formData.value.email)) {
    showToast('Email already exists', 'error')
    return
  }

  const newUser = {
    name: formData.value.name,
    email: formData.value.email,
    password: formData.value.password,
  }

  users.push(newUser)
  localStorage.setItem('ticketapp_users', JSON.stringify(users))
  localStorage.setItem('ticketapp_currentUser', JSON.stringify(newUser))

  showToast('Account created successfully!', 'success')
  formData.value = { name: '', email: '', password: '' } 

  setTimeout(() => router.push('/dashboard'), 1200)
}

function showToast(msg, type = 'success') {
  toast.value = { show: true, message: msg, type }
  setTimeout(() => (toast.value.show = false), 3000)
}
</script>
