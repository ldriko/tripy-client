export default defineNuxtRouteMiddleware(async (to) => {
  if (['index', 'login', 'register'].includes(to.name)) return
  const session = useSessionStore()
  await session.get()
  if (!session.isLoggedIn) return '/login'
})
