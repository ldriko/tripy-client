<script setup>
import VerificationDialog from '~/components/dialogs/VerificationDialog.vue'

const sessionStore = useSessionStore()
const admin = useAdmin()

const showSearchField = useState('showSearchField', () => false)
const verificationDialog = ref(null)

const checkVerification = () => {
  if (sessionStore.user.role_id === 2) return (location.href = admin.baseURL)

  verificationDialog.value.openAlert()
}
</script>

<template>
  <div class="bg-gray-100 border-b-2 sticky top-0 z-10">
    <header
      class="max-w-screen-2xl xl:px-4 px-8 mx-auto py-4 flex justify-between"
    >
      <app-icon name="logo-text" />
      <app-navbar-menu>
        <app-navbar-menu-item to="/home">Home</app-navbar-menu-item>
        <app-navbar-menu-item to="/votes">Votes</app-navbar-menu-item>
        <app-navbar-menu-item to="/joined">Joined Trips</app-navbar-menu-item>
        <app-navbar-menu-item
          hide-right-border
          @click="checkVerification"
        >
          Manage Trips
        </app-navbar-menu-item>
      </app-navbar-menu>
      <div class="flex gap-4">
        <app-button
          color="white"
          icon
          outlined
          @click="showSearchField = !showSearchField"
        >
          <app-icon
            name="search-normal"
            width="25"
          />
        </app-button>
        <app-button
          color="white"
          icon
          outlined
          @click="navigateTo('/profile')"
        >
          <app-icon
            name="profile-circle"
            width="25"
          />
        </app-button>
      </div>
    </header>
  </div>
  <verification-dialog ref="verificationDialog" />
</template>
