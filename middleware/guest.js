export default defineNuxtRouteMiddleware(async () => {
  const session = useSessionStore()
  if (session.isLoggedIn) return '/home'
})
