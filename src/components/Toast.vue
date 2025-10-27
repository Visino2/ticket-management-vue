<template>
    <transition name="toast">
        <div v-if="show" :class="['fixed right-6 top-6 z-50 px-4 py-3 rounded-lg shadow-lg', bgClass]" role="status" aria-live="polite" >
           <p class="text-sm font-medium">{{  message }}</p>
        </div>
    </transition>
</template>


<script setup>
import { computed, ref, watch  } from 'vue';

const props = defineProps({
    type: { type: String, default: 'success'},
    message: { type: String, default: ''},
    timeout: { type: Number, default: 3000 },
    modelValue: { type: Boolean, default: false},
})

const emit = defineEmits(['update:modelValue'])

const show = ref(props.modelValue)
watch(() => props.modelValue, v => show.value = v)

watch(show, (val) => emit('update:modelValue', val))

const bgClass = computed(() => (
    props.type === 'success'
    ? 'bg-emerald-600 text-white'
    :props.type === 'error'
    ? 'bg-red-600 text-white'
    : 'bg-gray-700 text-white'
))

if (props.modelValue) {
    setTimeout(() => show.value = false, props.timeout)
}
</script>

<style>
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from { transform: translateY(-8px); opacity: 0; }
.toast-enter-to { transform: translateY(0); opacity: 1; }
.toast-leave-from { transform: translateY(0); opacity: 1; }
.toast-leave-to { transform: translateY(-8px); opacity: 0; }
</style>