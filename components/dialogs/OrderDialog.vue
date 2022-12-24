<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

const session = useSessionStore()
const isOpen = ref(false)
const isVerificationOpen = ref(false)
const succeed = ref(false)

const form = reactive({
  amount: null,
  name: session.user.name,
})
const file = ref(null)
const fileObjectUrl = ref(null)
const filePreview = ref(null)
const trip = ref(null)

const isLoading = ref(false)

const close = () => {
  if (isLoading.value) return

  isOpen.value = false
  isVerificationOpen.value = false
  file.value = fileObjectUrl.value = null
}

const open = (_trip) => {
  isOpen.value = true
  trip.value = _trip
}

const totalPrice = computed(() => {
  return form.amount * trip.value.detail_pembayaran
})

const pickFile = () => {
  if (isLoading.value) return

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/png,image/jpeg,image/jpg'

  input.onchange = (e) => {
    file.value = e.target.files[0]
  }

  input.click()
}

const submit = async () => {
  if (isLoading.value || !form.amount || !file.value) return

  isLoading.value = true

  const formData = new FormData()

  formData.append('picture', file.value)
  formData.append('quantity', form.amount)
  formData.append('event_id', trip.value.id)

  const { error } = await useRequest('/join', {
    method: 'POST',
    body: formData,
  })

  if (error.value) return (isLoading.value = false)

  succeed.value = true
  isLoading.value = false
}

watch(file, () => {
  if (file.value) {
    fileObjectUrl.value = URL.createObjectURL(file.value)
  }
})

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
              :class="{
                'max-w-3xl': !succeed,
                'max-w-md': succeed,
              }"
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <template v-if="!succeed">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Pembayaran Tiket
                </DialogTitle>
                <div class="my-4">
                  <hr class="mb-4" />
                  <div class="flex gap-4">
                    <div class="w-1/2">
                      <form-text-field
                        v-model="form.amount"
                        label="Jumlah Tiket"
                        placeholder="Masukkan jumlah tiket"
                        type="number"
                        small
                      />
                    </div>
                    <div class="w-1/2">
                      <div class="font-medium mb-4">
                        Total yang harus dibayar
                      </div>
                      <div class="font-bold text-xl">Rp{{ totalPrice }}</div>
                    </div>
                  </div>
                  <form-text-field
                    v-model="form.name"
                    label="Nama Pemesan"
                    placeholder="Masukkan nama pemesan"
                    small
                  />
                  <div class="font-medium">Upload Pembayaran</div>
                  <div>Payment description</div>
                  <div class="flex mt-4">
                    <img
                      v-if="file && fileObjectUrl"
                      ref="filePreview"
                      :src="fileObjectUrl ?? '#'"
                      alt="Preview"
                      class="h-36 w-1/2 object-cover rounded-xl border-2 border-dashed border-primary border-opacity-50 cursor-pointer"
                      @click="pickFile"
                    />
                    <div
                      v-else
                      class="h-36 w-1/2 border-2 border-dashed border-primary border-opacity-50 rounded-xl flex justify-center items-center transition hover:bg-gray-100 cursor-pointer text-sm gap-2"
                      @click="pickFile"
                    >
                      <app-icon name="document-upload" />
                      <div>
                        <div class="font-medium">
                          Upload Bukti Transfer Disni
                        </div>
                        <div class="text-xs">
                          File berupa gambar (PNG, JPG, atau JPEG)
                        </div>
                      </div>
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
                    Proses
                  </button>
                </div>
              </template>
              <template v-else-if="succeed">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-bold leading-6 text-gray-900"
                >
                  Pemesanan Berhasil!
                </DialogTitle>
                <div class="my-4 text-gray-700">
                  <p class="mb-2">
                    Silakan menunggu konfirmasi dari Trip Organizer terlebih
                    dahulu!
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
