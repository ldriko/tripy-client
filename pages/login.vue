<script setup>
import { useRequest } from '~/composables/request'
import TextField from '~/components/form/text-field.vue'

definePageMeta({
  layout: 'auth'
})

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
  <h1 class="text-xl font-bold">Mulai perjalananmu di Tripy dengan mendaftarkan akunmu</h1>
  <text-field/>
</template>
