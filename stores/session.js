import { useRequest } from '~/composables/request'

export const useSessionStore = defineStore('session', () => {
  const userJson = localStorage.getItem('user')
  const user = ref(userJson ? JSON.parse(userJson) : null)
  const isLoggedIn = computed(() => user.value !== null)

  const get = async () => {
    const { data: _user } = await useRequest('/user')

    if (_user.value) {
      user.value = _user.value
      localStorage.setItem('user', JSON.stringify(_user.value))

      return true
    }

    user.value = null
    localStorage.setItem('user', null)

    return false
  }

  const clear = () => {
    user.value = null
    localStorage.clear()
  }

  return { user, isLoggedIn, get, clear }
})