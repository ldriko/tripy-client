<script setup>
definePageMeta({
  layout: 'home-no-spaces',
})

const sessionStore = useSessionStore()
const user = computed(() => sessionStore.user)
const pictureURL = computed(() => {
  const baseURL = useRuntimeConfig().public.apiBaseURL
  return `${baseURL}/../storage/user-pictures/${user.value.picture}`
})

const isLoading = ref(false)

const form = reactive({
  name: user.value.name,
  age: user.value.age,
  phone: user.value.no_telp,
  picture: null,
  password: null,
  passwordConfirmation: null,
})
const editPictureURL = ref(null)

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
    editPictureURL.value = URL.createObjectURL(form.picture)
  }
)

const submit = async () => {
  if (isLoading.value) return

  isLoading.value = true

  const formData = new FormData()

  formData.append('_method', 'PUT')
  formData.append('name', form.name)
  formData.append('age', form.age)
  formData.append('no_telp', form.phone)
  formData.append('picture', form.picture)
  formData.append('password', form.password)
  formData.append('password_confirmation', form.passwordConfirmation)

  const { error } = await useRequest('/user', {
    method: 'POST',
    body: formData,
  })

  if (error.value) return (isLoading.value = false)

  await sessionStore.get()

  editPictureURL.value =
    form.picture =
    form.password =
    form.passwordConfirmation =
      null

  isLoading.value = false
}
</script>

<template>
  <img
    class="h-48 w-full object-cover"
    src="/img/profile-banner.jpg"
  />
  <div class="max-w-screen-lg px-8 xl:px-4 mx-auto pb-16">
    <div class="flex mb-8">
      <div class="w-56 relative flex">
        <div
          class="flex w-56 rounded-full border absolute top-0 -translate-y-1/2"
        >
          <img
            :src="pictureURL"
            alt="Foto profil"
            class="rounded-full border"
          />
        </div>
      </div>
      <div class="p-8">
        <div class="text-2xl font-bold">{{ user.name }}</div>
        <div class="text-gray-600">Pengguna</div>
      </div>
    </div>
    <div class="flex gap-8 mb-4">
      <form-text-field
        v-model="form.name"
        label="Nama"
        placeholder="Masukkan namamu"
        class="w-3/5"
      />
      <form-text-field
        v-model="form.age"
        label="Umur"
        placeholder="Masukkan umurmu"
        class="grow"
      />
    </div>
    <form-text-field
      v-model="form.phone"
      label="Telepon"
      placeholder="Masukkan nomor teleponmu"
      class="grow mb-8"
    />
    <div class="mb-4 font-medium">Foto Profil</div>
    <div class="flex gap-8 mb-8">
      <div class="w-40 aspect-square rounded-full bg-gray-100 shrink-0">
        <img
          v-if="editPictureURL"
          :src="editPictureURL"
          alt="Foto profil"
          class="rounded-full"
        />
      </div>
      <div
        class="grow border-2 border-dashed rounded-xl flex flex-col justify-center items-center transition hover:bg-blue-100 hover:border-primary cursor-pointer"
        @click="openPicturePicker"
      >
        <div>+</div>
        <div class="text-lg font-bold">Perbarui foto profil</div>
        <div class="text-sm">Pilih gambar untuk memperbarui foto profilmu</div>
      </div>
    </div>
    <div class="flex gap-8 mb-4">
      <div class="grow">
        <form-text-field
          v-model="form.password"
          label="Password"
          placeholder="Masukkan password"
          type="password"
          class="mb-0"
        />
        <small>Isi apabila ingin merubah password</small>
      </div>
      <form-text-field
        v-if="form.password"
        v-model="form.passwordConfirmation"
        label="Konfirmasi Password"
        placeholder="Masukkan ulang password"
        type="password"
        class="grow"
      />
    </div>
    <div class="flex justify-end">
      <app-button
        :color="isLoading ? 'white' : 'primary'"
        :loading="isLoading"
        @click="submit"
      >
        Simpan Perubahan
      </app-button>
    </div>
  </div>
</template>
