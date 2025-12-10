'use client'

import type React from 'react'

import { SessionProvider } from 'next-auth/react'



export function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  // const userService = useUserService()
  // const [user, setUser] = useState<User | null>(null)
  // const router = useRouter()
  // const [loading, setLoading] = useState(false)

  // // Cập nhật user khi session thay đổi
  // useEffect(() => {
  //   setUser(session ? (session.user as User) : null)
  // }, [session])

  // const login = async (email: string, password: string) => {
  //   setLoading(true)
  //   try {
  //     await signIn('credentials', {
  //       redirect: false,
  //       email,
  //       password,
  //     })
  //   } catch (error) {
  //     console.error('Login error:', error)
  //     throw error
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const register = async (data: any) => {
  //   setLoading(true)
  //   try {
  //     const newUser = (await userService.register({ ...data })) as any
  //     setUser(newUser)
  //   } catch (error) {
  //     console.error('Registration error:', error)
  //     throw error
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const logout = async () => {
  //   await signOut({ redirect: false })
  //   router.push('/')
  // }

  return (
    // <AuthContext.Provider
    //   value={{
    //     login,
    //     logout,
    //     register,
    //     isAuthenticated: session,
    //     user,
    //     loading,
    //   }}
    // >
      <SessionProvider session={session}>{children}</SessionProvider>
    // </AuthContext.Provider>
  )
}


