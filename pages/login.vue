<script setup>
import { useRequest } from '~/composables/request'

const form = reactive({
  email: null,
  password: null
})

const login = async () => {
  console.log(form)
  console.log(useRequest)

  const response = await useRequest('/auth/login', {
    method: 'POST',
    body: form
  })

  console.log(response)
}
</script>

<template>
  <input v-model="form.email" type="email">
  <input v-model="form.password" type="password">
  <button @click="login">Masuk</button>
</template>
