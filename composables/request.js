export const useFetchCookies = async () => {
  const config = useRuntimeConfig()

  await $fetch.raw('/../sanctum/csrf-cookie', {
    baseURL: config.public.apiBaseURL,
    credentials: 'include',
  })
}

export const useRequest = async (url, options = {}) => {
  const config = useRuntimeConfig()
  const csrf_cookie = 'XSRF-TOKEN'
  let token = useCookie(csrf_cookie)?.value

  if (!token) {
    await useFetchCookies()

    token = useCookie(csrf_cookie).value
  }

  console.log(config.public)

  const headers = {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'X-XSRF-TOKEN': token,
    ...options?.headers,
  }
  const opts = options ? (({ headers, ...opts }) => opts)(options) : null
  const baseURL = !options?.baseURL ? config.public.apiBaseURL : options.baseURL

  return useFetch(url, {
    baseURL: baseURL,
    credentials: 'include',
    headers,
    ...opts,
  })
}
