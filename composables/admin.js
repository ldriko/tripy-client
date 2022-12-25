export const useAdmin = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.adminBaseURL

  return { baseURL }
}
