<script setup>
import { useRequest } from '~/composables/request'
import TextField from '~/components/form/TextField.vue'
import TextLink from '~/components/TextLink.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const session = useSessionStore()

const form = reactive({
  email: null,
  password: null,
})

const login = async () => {
  const { error } = await useRequest('/auth/login', {
    method: 'POST',
    body: form,
  })

  if (error && error.status === 422) {
    return
  }

  if (await session.get()) {
    navigateTo('/home')
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-2">Ayo mulai perjalananmu dengan Tripy</h1>
  <div class="mb-6">Masukkan detail akunmu untuk memulai perjalananmu</div>
  <form @submit.prevent="login">
    <text-field
      v-model="form.email"
      label="Email"
      placeholder="Masukkan emailmu"
      required
      type="email"
    />
    <text-field
      v-model="form.password"
      label="Password"
      placeholder="Masukkan passwordmu"
      required
      type="password"
    />
    <div class="flex gap-4 justify-between items-center">
      <div>
        Belum punya akun Tripy?
        <text-link to="/register">Buat sekarang</text-link>
      </div>
      <app-button type="submit">Masuk Sekarang</app-button>
    </div>
  </form>
</template>
