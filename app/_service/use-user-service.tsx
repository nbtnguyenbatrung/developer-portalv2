import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import _ from 'lodash'
import { API_URL } from '../constant/constant'
import { callApi } from './utils/api'

export function useUserService(): IUserService {
  const router = useRouter()
  const { toast } = useToast()
  return {
    register: async (user) => {
      try {
        const { method, path } = API_URL.REGISTER as {
          method: 'post' | 'get' | 'put' | 'delete'
          path: string
        }
        const response = (await callApi<any>(method, path, user)) as any
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
    create: async (user, ...callbacks) => {
      try {
        const { method, path } = API_URL.CREATE_USER as {
          method: 'post' | 'get' | 'put' | 'delete'
          path: string
        }
        const response = (await callApi<any>(method, path, user)) as any
        if (response.success) {
          toast({
            variant: 'default',
            title: 'Create User Successfully',
          })
          return response.data
        } else {
          toast({
            variant: 'destructive',
            title: 'Create User Failed',
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

    // delete: async (id) => {
    //   try {
    //     const response = await callApi<any>('delete', `/api/users/${id}`)
    //     if (response.success) {
    //       return response.data
    //     } else {
    //       return false
    //     }
    //   } catch (error: any) {
    //     return false
    //   }
    // },
  }
}

interface ISaveUser {
  email: string
  firstName: string
  lastName: string
  password: string
  role?: string
}
interface IUserService {
  register: (user: ISaveUser) => Promise<void>
  create: (
    user: ISaveUser,
    ...callbacks: (() => void | Promise<void>)[]
  ) => Promise<void>

  //delete: (id: string) => Promise<boolean>
}
