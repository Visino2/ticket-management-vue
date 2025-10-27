<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-1 py-12">
      <div class="container-1440 px-4">
                      <!-- Header -->
        <div class="flex items-center justify-between flex-wrap gap-3">
          <h1 class="text-3xl font-bold text-gray-800">Ticket Management</h1>

          
          <div
            class="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0"
          >
            <button
              @click="openCreate"
              class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-full sm:w-auto"
            >
              <span class="hidden sm:inline">+ Create Ticket</span>
              <span class="sm:hidden">+ Ticket</span>
            </button>

            <button
              @click="goBack"
              class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border hover:bg-red-500 hover:text-white transition w-full sm:w-auto"
            >
              <ArrowLeft class="w-5 h-5" />
              <span class="hidden sm:inline">Back</span>
              <span class="sm:hidden">Go</span>
            </button>
          </div>
        </div>

                       <!-- Ticket List -->
        <div class="mt-6">
          <div
            v-if="tickets.length === 0"
            class="bg-white rounded-2xl p-8 text-center shadow"
          >
            <p class="text-gray-600">No tickets found. Create your first ticket!</p>
          </div>

          <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TicketCard
              v-for="t in tickets"
              :key="t.id"
              :ticket="t"
              @edit="openEdit"
              @delete="confirmDelete"
            />
          </div>
        </div>

                     <!-- Create/Edit Modal -->
        <div
          v-if="modalOpen"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div class="bg-white rounded-2xl w-full max-w-lg p-6">
            <h2 class="text-xl font-semibold mb-4">
              {{ editing ? "Edit Ticket" : "Create Ticket" }}
            </h2>
            <TicketForm :model="formModel" @save="saveTicket" @cancel="closeModal" />
          </div>
        </div>

                       <!-- Delete Confirm Modal -->
        <div
          v-if="deleteConfirm"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div class="bg-white rounded-2xl w-full max-w-md p-6 text-center">
            <h3 class="text-lg font-semibold">Confirm Delete</h3>
            <p class="mt-3 text-gray-600">
              Are you sure you want to delete this ticket? This action cannot be undone.
            </p>
            <div class="mt-6 flex justify-center gap-3">
              <button @click="deleteConfirm = null" class="px-4 py-2 rounded-lg border">
                Cancel
              </button>
              <button
                @click="deleteTicket"
                class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
    <Toast v-model="toast.show" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import TicketCard from "@/components/TicketCard.vue";
import TicketForm from "@/components/TicketForm.vue";
import Toast from "@/components/Toast.vue";
import { ticketStore } from "@/store/ticketStore";
import { ArrowLeft } from "lucide-vue-next";

const router = useRouter();
const tickets = computed(() => ticketStore.ttickets || []);

const modalOpen = ref(false);
const editing = ref(false);
const formModel = ref({ title: "", description: "", status: "", priority: "" });
const editingId = ref(null);
const deleteConfirm = ref(null);
const toast = ref({ show: false, message: "", type: "success" });

function goBack() {
  router.back();
}

function showToast(msg, type = "success") {
  toast.value = { show: true, message: msg, type };
  setTimeout(() => (toast.value.show = false), 3000);
}

function openCreate() {
  editing.value = false;
  editingId.value = null;
  formModel.value = { title: "", description: "", status: "", priority: "" };
  modalOpen.value = true;
}

function openEdit(ticket) {
  editing.value = true;
  editingId.value = ticket.id;
  formModel.value = { ...ticket };
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  editing.value = false;
  editingId.value = null;
}

function saveTicket(payload) {
  try {
    if (editing.value && editingId.value) {
      ticketStore.update({ id: editingId.value, ...payload });
      showToast("Ticket updated successfully!", "success");
    } else {
      ticketStore.add(payload);
      showToast("Ticket created successfully!", "success");
    }
    closeModal();
  } catch (e) {
    showToast("Failed to save ticket. Please retry.", "error");
  }
}

function confirmDelete(id) {
  deleteConfirm.value = id;
}

function deleteTicket() {
  try {
    ticketStore.remove(deleteConfirm.value);
    showToast("Ticket deleted successfully!", "success");
    deleteConfirm.value = null;
  } catch {
    showToast("Failed to delete ticket. Please retry.", "error");
  }
}
</script>
