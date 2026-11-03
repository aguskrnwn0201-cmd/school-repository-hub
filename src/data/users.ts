export type UserRole = 'teknisi' | 'guest'
export type UserStatus = 'active' | 'inactive'

export interface AppUser {
  id: string
  fullName: string
  email: string
  password: string
  role: UserRole
  status: UserStatus
  department: string
}

export const roleLabels: Record<UserRole, string> = {
  teknisi: 'Teknisi',
  guest: 'Guest',
}

export const canManageUsers = (role: UserRole) => role === 'teknisi'

export const defaultUsers: AppUser[] = [
  {
    id: 'user-1',
    fullName: 'Andi Pratama',
    email: 'teknisi@school.local',
    password: 'teknisi123',
    role: 'teknisi',
    status: 'active',
    department: 'IT & Infrastruktur',
  },
  {
    id: 'user-2',
    fullName: 'Sinta Dewi',
    email: 'guest@school.local',
    password: 'guest123',
    role: 'guest',
    status: 'active',
    department: 'Umum',
  },
]
