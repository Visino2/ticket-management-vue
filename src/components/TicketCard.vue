<template>
  <article class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition">
    <div class="flex justify-between items-start gap-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800">{{ ticket.title }}</h3>
        <p v-if="ticket.description" class="text-sm text-gray-600 mt-2 line-clamp-3">{{ ticket.description }}</p>
        <div class="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span class="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs" :class="statusClass">
            {{ statusLabel }}
          </span>
          <span v-if="ticket.priority" class="px-2 py-1 rounded-md bg-gray-100 text-gray-700">
            Priority: {{ ticket.priority }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2">
        <button
          @click="$emit('edit', ticket)"
          class="p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Edit ticket"
        >
          <Edit class="w-5 h-5 text-gray-700" />
        </button>

        <button
          @click="$emit('delete', ticket.id)"
          class="p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Delete ticket"
        >
          <Trash2 class="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { Edit, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  ticket: { type: Object, required: true },
})

const statusClass = computed(() => {
  if (props.ticket.status === 'open') return 'bg-emerald-100 text-emerald-700'
  if (props.ticket.status === 'in_progress') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-700'
})

const statusLabel = computed(() => {
  return props.ticket.status.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
})
</script>
