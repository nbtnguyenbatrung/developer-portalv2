import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { callApi } from './utils/api'
import { API_URL } from '../constant/constant'

interface IDocumentationService {
  getDocumentBySlug: (slug: string) => Promise<void>
}
export function useDocumentationService(): IDocumentationService {
  const router = useRouter()

  return {
    getDocumentBySlug: async(slug) => {
      try {
        const { method, path } = API_URL.REGISTER as {
          method: 'post' | 'get' | 'put' | 'delete'
          path: string
        }
        const response = (await callApi<any>(method, path)) as any
        if (response.success) {
          toast({
            variant: 'default',
            title: 'Create User Successfully',
          })

          return response.data
        } else {
          toast({
            variant: 'destructive',
            title: 'Register Failed',
            description:
              response.error || 'There was a problem with your request.',
          })
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description:
            error?.message || 'There was a problem with your request.',
        })
      }
    },
  }
}
