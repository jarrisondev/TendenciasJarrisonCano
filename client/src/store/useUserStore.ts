import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Roles = 'Nurse' | 'Doctor' | 'Admin'

interface User {
  id: 1
  name: string
  username: string
  password: string
  email: string
  phone: string
  birthDate: string
  address: string
  role: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
