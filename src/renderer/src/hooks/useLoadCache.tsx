import { useQuery } from '@tanstack/react-query'

export const useLoadCache = () => {
  return useQuery({
    queryKey: ['LOAD_CACHE'],
    queryFn: window.context.loadCache
  })
}
