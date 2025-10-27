<template>
  <div class="relative">
    <!-- ✅ Success Toast -->
    <transition name="fade-slide">
      <div
        v-if="showToast"
        class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        ✅ Ticket saved successfully!
      </div>
    </transition>

    <form @submit.prevent="onSubmit" class="space-y-4 p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
      <div>
        <label for="title" class="block text-sm font-semibold text-gray-700">Title *</label>
        <input
          id="title"
          v-model.trim="form.title"
          @input="clearError('title')"
          class="mt-1 w-full rounded-lg border px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'border-red-500': errors.title}"
        />
        <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          id="description"
          v-model.trim="form.description"
          @input="clearError('description')"
          rows="4"
          class="mt-1 w-full rounded-lg border px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'border-red-500': errors.description}"
        ></textarea>
        <p v-if="errors.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="status" class="block text-sm font-semibold text-gray-700">Status *</label>
          <select
            id="status"
            v-model="form.status"
            @change="clearError('status')"
            class="mt-1 w-full rounded-lg border px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.status}"
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" class="text-sm text-red-600 mt-1">{{ errors.status }}</p>
        </div>

        <div>
          <label for="priority" class="block text-sm font-semibold text-gray-700">Priority</label>
          <select
            id="priority"
            v-model="form.priority"
            class="mt-1 w-full rounded-lg border px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, ref, nextTick } from 'vue'

const props = defineProps({
  model: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      status: '',
      priority: '',
    }),
  },
})
const emit = defineEmits(['save', 'cancel'])

const form = reactive({ ...props.model })
const errors = reactive({})
const showToast = ref(false)

watch(
  () => props.model,
  (v) => Object.assign(form, v || { title: '', description: '', status: '', priority: '' })
)

function clearError(field) {
  delete errors[field]
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.title) errors.title = 'Title is required'
  else if (form.title.length > 200) errors.title = 'Title must be less than 200 characters'

  if (form.description && form.description.length > 1000)
    errors.description = 'Description must be less than 1000 characters'

  if (!form.status) errors.status = 'Status is required'
  else if (!['open', 'in_progress', 'closed'].includes(form.status))
    errors.status = 'Invalid status selected'

  return Object.keys(errors).length === 0
}

async function onSubmit() {
  await nextTick()
  if (!validate()) return

  emit('save', { ...form })
  showToast.value = true

  // Hide toast automatically
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
