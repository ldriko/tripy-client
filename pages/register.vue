<script setup>
import { useRequest } from '~/composables/request'
import TextField from '~/components/form/TextField.vue'
import TextLink from '~/components/TextLink.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const session = useSessionStore()
const appAlertState = useState('appAlert', () => null)

const state = ref(1)
const form = reactive({
  email: null,
  password: null,
  passwordConfirmation: null,
  picture: null,
  name: null,
  phone: null,
  age: null,
})
const error = reactive({
  confirmPassword: null,
})
const pictureURL = ref(null)
const isLoading = ref(false)

const nextState = () => {
  if (isLoading.value) return

  appAlertState.value = null

  if (state.value === 1) {
    if (
      !form.email ||
      !form.password ||
      !form.passwordConfirmation ||
      form.password !== form.passwordConfirmation
    )
      return (appAlertState.value = {
        type: 'warning',
        text: 'Lengkapi semua data untuk melanjutkan!',
      })
    return state.value++
  }

  if (!form.name || !form.phone || !form.age) {
    return (appAlertState.value = {
      type: 'warning',
      text: 'Lengkapi semua data untuk melanjutkan!',
    })
  }

  submit()
}

const openPicturePicker = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/png,image/jpeg,image/jpg'
  input.onchange = (e) => (form.picture = e.target.files[0])

  input.click()
}

watch(
  () => form.picture,
  () => {
    pictureURL.value = URL.createObjectURL(form.picture)
  }
)

const submit = async () => {
  if (isLoading.value) return

  isLoading.value = true

  const formData = new FormData()

  formData.append('email', form.email)
  formData.append('password', form.password)
  formData.append('password_confirmation', form.passwordConfirmation)
  formData.append('name', form.name)
  formData.append('no_telp', form.phone)
  formData.append('age', form.age)
  formData.append('picture', form.picture)

  const { error } = await useRequest('/auth/register', {
    method: 'POST',
    body: formData,
  })

  if (error.value) return (isLoading.value = false)

  if (await session.get()) navigateTo('/home')
}

watch(
  () => form.passwordConfirmation,
  () => {
    error.confirmPassword =
      form.passwordConfirmation !== form.password
        ? 'Password yang anda masukkan tidak sesuai'
        : null
  }
)
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">
    Ayo mulai perjalananmu di Tripy dengan mendaftarkan dirimu
  </h1>
  <div class="mb-6">Lengkap data berikut untuk lanjut</div>
  <app-alert class="mb-4" />
  <template v-if="state === 1">
    <text-field
      v-model="form.email"
      label="Email"
      placeholder="Masukkan emailmu"
      type="email"
      required
    />
    <text-field
      v-model="form.password"
      label="Password"
      placeholder="Masukkan password"
      type="password"
      required
    />
    <text-field
      v-model="form.passwordConfirmation"
      :error="error.confirmPassword"
      label="Konfirmasi Password"
      placeholder="Masukkan ulang password"
      type="password"
      required
    />
  </template>
  <template v-else-if="state === 2">
    <div class="flex flex-col gap-2 items-center">
      <div class="font-bold">Foto Profil</div>
      <div
        class="w-1/4 aspect-square rounded-full cursor-pointer border bg-gray-100 transition hover:bg-gray-300 flex justify-center items-center text-xl mb-8"
        @click="openPicturePicker"
      >
        <img
          v-if="form.picture && pictureURL"
          :src="pictureURL"
          alt="Foto profil"
          class="object-cover w-full h-full rounded-full border"
        />
        <template v-else>+</template>
      </div>
    </div>
    <text-field
      v-model="form.name"
      label="Nama"
      placeholder="Masukkan namamu"
      type="text"
      required
    />
    <text-field
      v-model="form.phone"
      label="Telepon"
      placeholder="Masukkan nomor teleponmu"
      type="text"
      required
    />
    <text-field
      v-model="form.age"
      label="Umur"
      placeholder="Masukkan umurmu"
      type="text"
      required
    />
  </template>
  <div class="flex gap-4 justify-between items-center">
    <div>
      Sudah punya akun Tripy?
      <text-link to="/login">Masuk disini</text-link>
    </div>
    <app-button
      :color="isLoading ? 'white' : 'primary'"
      :loading="isLoading"
      @click="nextState"
    >
      Lanjut
    </app-button>
  </div>
</template>
