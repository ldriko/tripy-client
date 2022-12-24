export default defineNuxtRouteMiddleware(async () => {
  const session = useSessionStore()
  // await session.get()
  if (session.isLoggedIn) return '/home'
})
