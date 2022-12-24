<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

const sessionStore = useSessionStore()

const isOpen = ref(false)
const isVerificationOpen = ref(false)
const succeed = ref(false)

const file = ref(null)
const fileObjectUrl = ref(null)
const filePreview = ref(null)

const isLoading = ref(false)

const close = () => {
  if (isLoading.value) return

  isOpen.value = false
  isVerificationOpen.value = false
  file.value = fileObjectUrl.value = null
}

const openAlert = () => (isOpen.value = true)

const openVerification = () => {
  isVerificationOpen.value = true
}

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
  if (isLoading.value || !file.value) return

  isLoading.value = true

  const formData = new FormData()

  formData.append('photo', file.value)

  const { error } = await useRequest('/verification', {
    method: 'POST',
    body: formData,
  })

  if (error.value) return (isLoading.value = false)

  await sessionStore.get()

  succeed.value = true
  isVerificationOpen.value = false

  isLoading.value = false
}

watch(file, () => {
  if (file.value) {
    fileObjectUrl.value = URL.createObjectURL(file.value)
  }
})

defineExpose({ close, openAlert })
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
                'max-w-md': !isVerificationOpen,
                'max-w-2xl': isVerificationOpen,
              }"
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <template v-if="!isVerificationOpen && !succeed">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Sepertinya Kamu Belum Verifikasi
                </DialogTitle>
                <div class="my-4">
                  <p class="text-sm text-gray-500">
                    Untuk mulai membuat tripmu sendiri, kamu harus memverifikasi
                    akunmu terlebih dahulu. Mudah kok! yuk verifikasi dulu!
                  </p>
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
                    @click="openVerification"
                  >
                    Verifikasi
                  </button>
                </div>
              </template>
              <template v-else-if="!isVerificationOpen && succeed">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-bold leading-6 text-gray-900"
                >
                  Verifikasi Berhasil!
                </DialogTitle>
                <div class="my-4 text-gray-700">
                  <p class="mb-2">
                    Sekarang kamu bisa mulai membuat Tripmu sendiri atau
                    bergabung ke Trip lainnya!
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
                  class="text-2xl font-bold leading-6 text-gray-900"
                >
                  Verifikasi
                </DialogTitle>
                <div class="my-4 text-gray-700">
                  <p class="mb-2">
                    Upload foto ktpmu untuk diproses verifikasi, pastikan foto
                    sesuai dengan ketentuan:
                  </p>
                  <div class="flex gap-10">
                    <ul class="shrink-0 list-inside list-disc">
                      <li>Tidak buram</li>
                      <li>Terlihat jelas</li>
                      <li>Pencahayaan yang cukup</li>
                    </ul>
                    <div class="grow">
                      <img
                        v-if="file && fileObjectUrl"
                        ref="filePreview"
                        :src="fileObjectUrl ?? '#'"
                        alt="Preview"
                        class="rounded-xl border-2 border-dashed border-primary border-opacity-50 cursor-pointer"
                        @click="pickFile"
                      />
                      <div
                        v-else
                        class="h-48 border-2 border-dashed border-primary border-opacity-50 rounded-xl flex justify-center items-center text-primary text-2xl transition hover:bg-gray-100 cursor-pointer"
                        @click="pickFile"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="close"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-primary hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="submit"
                  >
                    <loading-spinner v-if="isLoading" />
                    Proses
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
