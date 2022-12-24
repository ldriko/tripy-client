<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const emit = defineEmits(['submitted'])

const tripId = ref(null)
const sessionStore = useSessionStore()

const isOpen = ref(false)
const succeed = ref(false)
const selectedOption = ref(null)
const preorder = reactive({
  amount: null,
  name: sessionStore.user.name,
})
const isLoading = ref(false)

const close = () => {
  if (isLoading.value) return
  isOpen.value = false
  tripId.value = false
  succeed.value = false
}

const open = (id) => {
  isOpen.value = true
  tripId.value = id
}

const submit = async () => {
  console.log(selectedOption, preorder)
  if (isLoading.value || selectedOption.value === null) return
  else if (selectedOption.value === 1 && (!preorder.amount || !preorder.name))
    return

  isLoading.value = true

  const body = {
    event_id: tripId.value,
    preorder: selectedOption.value,
  }

  if (selectedOption.value === 1) {
    body.preorder_amount = preorder.amount
    body.preorder_name = preorder.name
  }

  const { error } = await useRequest('/votes', {
    method: 'POST',
    body,
  })

  if (error.value) return (isLoading.value = false)

  succeed.value = true
  isLoading.value = false

  emit('submitted')
}

defineExpose({ close, open })
</script>

<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      as="div"
      @close="close"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="{ 'max-w-md': succeed, 'max-w-xl': !succeed }"
              class="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <template v-if="succeed">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-bold leading-6 text-gray-900"
                >
                  <template v-if="selectedOption === 0">
                    Vote berhasil!
                  </template>
                  <template v-else>Vote dan preorder berhasil!</template>
                </DialogTitle>
                <div class="my-4 text-gray-700">
                  <p class="mb-2">
                    <template v-if="selectedOption === 0">
                      Sekarang kamu dapat memesan tiket di halaman trip
                      tersebut!
                    </template>
                    <template v-else>
                      Sekarang kamu dapat mengkonfirmasi pembayaranmu di halaman
                      trip tersebut!
                    </template>
                  </p>
                </div>
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="inline-flex justify-center items-center rounded-md border border-transparent bg-green-100 px-4 py-2 font-medium text-green-700 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    @click="close"
                  >
                    Oke
                  </button>
                </div>
              </template>
              <template v-else>
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Konfirmasi Vote Trip
                </DialogTitle>
                <div class="my-4">
                  <div class="flex gap-4 mb-4">
                    <div
                      :class="{
                        'text-primary bg-primary bg-opacity-10 border-primary':
                          selectedOption === 1,
                        'text-gray-700': selectedOption !== 1,
                      }"
                      class="w-1/2 border rounded-lg p-4 cursor-pointer transition"
                      @click="selectedOption = 1"
                    >
                      <div class="text-lg">Vote dan Pesan Tiket</div>
                      <div class="text-sm">
                        Kamu bisa vote sekaligus pre-order tiket sekarang juga
                      </div>
                    </div>
                    <div
                      :class="{
                        'text-primary bg-primary bg-opacity-10 border-primary':
                          selectedOption === 0,
                        'text-gray-700': selectedOption !== 0,
                      }"
                      class="w-1/2 border rounded-lg p-4 cursor-pointer transition"
                      @click="selectedOption = 0"
                    >
                      <div class="text-lg">Vote Saja</div>
                      <div class="text-sm">
                        Pemesanan tiket dapat dilakukan di lain waktu
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="selectedOption === 1"
                    class="flex gap-4"
                  >
                    <div class="grow">
                      <form-text-field
                        v-model="preorder.amount"
                        placeholder=""
                        label="Jumlah Tiket"
                        small
                      ></form-text-field>
                    </div>
                    <div class="grow">
                      <form-text-field
                        v-model="preorder.name"
                        placeholder=""
                        label="Nama Pemesan"
                        small
                      ></form-text-field>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="close"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-primary hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="submit"
                  >
                    <loading-spinner v-if="isLoading" />
                    <template v-if="selectedOption === 1">
                      Vote dan Pesan
                    </template>
                    <template v-else>Vote</template>
                  </button>
                </div>
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
