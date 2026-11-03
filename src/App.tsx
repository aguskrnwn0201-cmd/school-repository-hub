import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Cloud,
  Command,
  File,
  FileText,
  Folder,
  FolderOpen,
  Grid2X2,
  HardDrive,
  LayoutDashboard,
  List,
  LockKeyhole,
  LogOut,
  MonitorDown,
  PencilLine,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { fileEntries, softwareItems, type FileEntry } from './data/repository'
import { canManageUsers, defaultUsers, roleLabels, type AppUser, type UserRole, type UserStatus } from './data/users'

const STORAGE_KEY = 'school-repository-users'
const SESSION_KEY = 'school-repository-session'

const getStoredUsers = (): AppUser[] => {
  if (typeof window === 'undefined') {
    return defaultUsers
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultUsers

    const parsed = JSON.parse(stored) as AppUser[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultUsers
  } catch {
    return defaultUsers
  }
}

const getStoredSession = (): AppUser | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.localStorage.getItem(SESSION_KEY)
    if (!stored) return null
    return JSON.parse(stored) as AppUser
  } catch {
    return null
  }
}

const pageDetails: Record<string, { title: string; eyebrow: string }> = {
  '/': { title: 'Ringkasan', eyebrow: 'Ruang kerja' },
  '/software': { title: 'Pusat Software', eyebrow: 'Katalog' },
  '/files': { title: 'Penyimpanan Cloud', eyebrow: 'Berkas bersama' },
  '/users': { title: 'Manajemen User', eyebrow: 'Akses' },
  '/login': { title: 'Masuk', eyebrow: 'Autentikasi' },
}

function App() {
  const location = useLocation()
  const [users, setUsers] = useState<AppUser[]>(() => getStoredUsers())
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => getStoredSession())
  const currentPage = pageDetails[location.pathname] ?? pageDetails['/']

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser))
      return
    }

    window.localStorage.removeItem(SESSION_KEY)
  }, [currentUser])

  const navItems = currentUser
    ? [
        { to: '/', label: 'Ringkasan', icon: LayoutDashboard, end: true },
        { to: '/software', label: 'Software', icon: MonitorDown, end: false },
        { to: '/files', label: 'Penyimpanan', icon: Cloud, end: false },
        ...(canManageUsers(currentUser.role)
          ? [{ to: '/users', label: 'User', icon: Users, end: false }]
          : []),
      ]
    : [{ to: '/login', label: 'Login', icon: LockKeyhole, end: true }]

  const handleLogin = (email: string, password: string) => {
    const matchedUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)

    if (!matchedUser) {
      return { ok: false, message: 'Email atau password tidak valid.' }
    }

    if (matchedUser.status !== 'active') {
      return { ok: false, message: 'Akun ini sedang non-aktif. Hubungi teknisi untuk aktivasi.' }
    }

    setCurrentUser(matchedUser)
    return { ok: true, message: 'Login berhasil.' }
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const handleSaveUser = (input: Omit<AppUser, 'id'> & { id?: string }) => {
    const sanitizedEmail = input.email.trim()
    const sanitizedName = input.fullName.trim()

    if (!sanitizedEmail || !sanitizedName) {
      return { ok: false, message: 'Nama dan email wajib diisi.' }
    }

    const emailExists = users.some((user) => user.email.toLowerCase() === sanitizedEmail.toLowerCase() && user.id !== input.id)
    if (emailExists) {
      return { ok: false, message: 'Email sudah dipakai oleh user lain.' }
    }

    setUsers((prev) => {
      const normalizedInput = {
        ...input,
        email: sanitizedEmail,
        fullName: sanitizedName,
        department: input.department.trim() || 'Umum',
        password: input.password.trim() || 'password123',
      }

      if (input.id) {
        return prev.map((user) => (user.id === input.id ? { ...user, ...normalizedInput } : user))
      }

      const newUser: AppUser = {
        ...normalizedInput,
        id: `user-${Date.now()}`,
      }

      return [newUser, ...prev]
    })

    return { ok: true, message: input.id ? 'Data user berhasil diperbarui.' : 'User baru berhasil dibuat.' }
  }

  const handleDeleteUser = (userId: string) => {
    if (!currentUser || !canManageUsers(currentUser.role)) {
      return
    }

    setUsers((prev) => prev.filter((user) => user.id !== userId))
    if (currentUser.id === userId) {
      setCurrentUser(null)
    }
  }

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <NavLink to={currentUser ? '/' : '/login'} className="brand" aria-label="Repository Hub, ke ringkasan">
          <span className="brand-mark"><Command size={19} strokeWidth={2.5} /></span>
          <span className="brand-name">repository<span>hub</span></span>
        </NavLink>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="primary-nav" aria-label="Navigasi utama">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {to === '/software' && <span className="nav-count">04</span>}
            </NavLink>
          ))}
        </nav>

        {currentUser && (
          <div className="account-box">
            <div className="account-badge"><ShieldCheck size={13} /></div>
            <div>
              <strong>{currentUser.fullName}</strong>
              <span>{roleLabels[currentUser.role]}</span>
            </div>
          </div>
        )}

        <div className="sidebar-bottom">
          <div className="storage-status-icon"><HardDrive size={16} /></div>
          <div className="storage-status-copy">
            <strong>{currentUser ? 'Akun aktif' : 'Mode pratinjau'}</strong>
            <span>{currentUser ? 'Hak akses tersedia untuk portal' : 'Layanan langsung belum terhubung'}</span>
          </div>
          <span className="status-dot" aria-label="Data lokal" />
        </div>
        <div className="sidebar-footnote">SCHOOL REPOSITORY · V 0.2</div>
      </aside>

      <div className="content-frame">
        <header className="topbar">
          <div className="breadcrumbs"><span>{currentPage.eyebrow}</span><ChevronRight size={14} /><strong>{currentPage.title}</strong></div>
          <div className="topbar-meta">
            {currentUser ? (
              <>
                <span className="demo-pill"><span /> {currentUser.role.toUpperCase()}</span>
                <button type="button" className="logout-button" onClick={handleLogout}>
                  <LogOut size={14} /> Keluar
                </button>
              </>
            ) : (
              <span className="demo-pill"><span /> LOGIN DIBUTUHKAN</span>
            )}
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/" element={currentUser ? <DashboardPage currentUser={currentUser} /> : <Navigate to="/login" replace />} />
            <Route path="/software" element={currentUser ? <SoftwarePage /> : <Navigate to="/login" replace />} />
            <Route path="/files" element={currentUser ? <FilesPage /> : <Navigate to="/login" replace />} />
            <Route path="/users" element={currentUser && canManageUsers(currentUser.role) ? <UserManagementPage currentUser={currentUser} users={users} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} /> : <Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to={currentUser ? '/' : '/login'} replace />} />
          </Routes>
        </main>
        <footer className="page-footer"><span>School Repository Hub</span><span>Portal akses terkontrol · Data lokal</span></footer>
      </div>
    </div>
  )
}

function LoginPage({ onLogin }: { onLogin: (email: string, password: string) => { ok: boolean; message: string } }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('teknisi@school.local')
  const [password, setPassword] = useState('teknisi123')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = onLogin(email, password)
    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate('/')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="section-kicker"><ShieldCheck size={12} /> PORTAL SEKOLAH</span>
          <h1>Masuk ke Repository Hub</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="teknisi@school.local" required />
          </label>

          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Masukan password" required />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="primary-button">Masuk</button>
        </form>

        <div className="auth-footer">
          <p>Demo akun</p>
          <ul>
            <li>teknisi@school.local / teknisi123</li>
            <li>guest@school.local / guest123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function UserManagementPage({ currentUser, users, onSaveUser, onDeleteUser }: {
  currentUser: AppUser
  users: AppUser[]
  onSaveUser: (input: Omit<AppUser, 'id'> & { id?: string }) => { ok: boolean; message: string }
  onDeleteUser: (userId: string) => void
}) {
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    id: '',
    fullName: '',
    email: '',
    password: '',
    role: 'guest' as UserRole,
    status: 'active' as UserStatus,
    department: '',
  })
  const [message, setMessage] = useState('')

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const text = `${user.fullName} ${user.email} ${user.department} ${roleLabels[user.role]}`.toLowerCase()
        return text.includes(search.toLowerCase())
      }),
    [search, users],
  )

  const resetForm = () => {
    setEditingId(null)
    setForm({
      id: '',
      fullName: '',
      email: '',
      password: '',
      role: 'guest',
      status: 'active',
      department: '',
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = onSaveUser({ ...form, id: editingId ?? undefined })
    setMessage(result.message)

    if (result.ok) {
      resetForm()
    }
  }

  const handleEdit = (user: AppUser) => {
    setEditingId(user.id)
    setForm({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      department: user.department,
    })
  }

  return (
    <div className="page-stack">
      <PageIntro kicker="ACCESS CONTROL" title="Manajemen user" copy="Kelola pengguna portal, status otomatis, dan role level akses." />

      <div className="user-panels">
        <section className="user-form-panel">
          <div className="panel-heading">
            <h2>{editingId ? 'Edit pengguna' : 'Tambah pengguna'}</h2>
            {editingId && <button type="button" className="ghost-button" onClick={resetForm}>Batal</button>}
          </div>

          <form className="user-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                <span>Nama lengkap</span>
                <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Nama lengkap" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="user@school.local" required />
              </label>
              <label>
                <span>Password</span>
                <input type="text" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password awal" required />
              </label>
              <label>
                <span>Departemen</span>
                <input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} placeholder="Teknologi, Laboratorium, dll" required />
              </label>
              <label>
                <span>Role</span>
                <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as UserRole })}>
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Status</span>
                <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as UserStatus })}>
                  <option value="active">Aktif</option>
                  <option value="inactive">Non-aktif</option>
                </select>
              </label>
            </div>

            {message && <div className="form-success">{message}</div>}
            <button type="submit" className="primary-button wide-button">
              {editingId ? 'Simpan perubahan' : 'Tambah user'}
            </button>
          </form>
        </section>

        <section className="user-list-panel">
          <div className="panel-heading">
            <h2>Daftar pengguna</h2>
            <label className="search-box compact inline-search">
              <Search size={15} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari user" />
            </label>
          </div>

          <div className="user-table-header">
            <span>Nama</span>
            <span>Role</span>
            <span>Status</span>
            <span>Aksi</span>
          </div>

          <div className="user-list">
            {filteredUsers.map((user) => (
              <article className="user-card" key={user.id}>
                <div className="user-card-main">
                  <span className="user-avatar">{user.fullName.charAt(0).toUpperCase()}</span>
                  <div>
                    <strong>{user.fullName}</strong>
                    <span>{user.email}</span>
                    <small>{user.department}</small>
                  </div>
                </div>

                <div className="user-meta">
                  <span className="role-pill">{roleLabels[user.role]}</span>
                </div>

                <div className="user-meta status-wrap">
                  <span className={`status-pill ${user.status}`}>{user.status === 'active' ? 'Aktif' : 'Non-aktif'}</span>
                </div>

                <div className="user-card-actions">
                  <button type="button" className="icon-action" onClick={() => handleEdit(user)} aria-label={`Edit ${user.fullName}`}>
                    <PencilLine size={14} />
                  </button>
                  {user.id !== currentUser.id && (
                    <button type="button" className="icon-action danger" onClick={() => onDeleteUser(user.id)} aria-label={`Hapus ${user.fullName}`}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function DashboardPage({ currentUser }: { currentUser: AppUser }) {
  const isTechnician = currentUser.role === 'teknisi'

  return (
    <div className="page-stack dashboard-page">
      <section className="welcome-row">
        <div>
          <div className="section-kicker"><Sparkles size={14} /> {isTechnician ? 'PANEL TEKNISI' : 'PORTAL TAMU'}</div>
          <h1>{isTechnician ? 'Dashboard operasional' : 'Akses terbatas'}<br /><span>{isTechnician ? 'untuk teknisi sekolah.' : 'untuk tamu dan pengguna umum.'}</span></h1>
          <p className="welcome-copy">{isTechnician ? 'Pantau sistem, kelola pengguna, dan akses perangkat yang dibutuhkan untuk operasional sekolah.' : 'Lihat katalog software dan berkas publik yang tersedia untuk kebutuhan belajar dan akses umum.'}</p>
          <div className={`role-banner ${isTechnician ? 'technician' : 'guest'}`}>
            <ShieldCheck size={14} />
            <span>Role aktif: {roleLabels[currentUser.role]}</span>
          </div>
        </div>
        <div className="welcome-stamp"><span>{isTechnician ? 'T' : 'G'}</span><small>{isTechnician ? 'TEKNISI' : 'GUEST'}</small></div>
      </section>

      {!isTechnician && (
        <div className="guest-limited-panel">
          <div className="guest-limited-icon"><ShieldCheck size={16} /></div>
          <div>
            <strong>Mode tamu aktif</strong>
            <span>Anda hanya dapat melihat katalog software dan file publik dalam mode baca-saja.</span>
          </div>
        </div>
      )}

      {isTechnician && (
        <section className="tech-metrics" aria-label="Statistik teknisi">
          <article className="metric-card">
            <span className="metric-label">User aktif</span>
            <strong>12</strong>
            <small>+2 minggu ini</small>
          </article>
          <article className="metric-card">
            <span className="metric-label">Software</span>
            <strong>04</strong>
            <small>tersedia di katalog</small>
          </article>
          <article className="metric-card">
            <span className="metric-label">Folder publik</span>
            <strong>08</strong>
            <small>ready untuk akses</small>
          </article>
          <article className="metric-card alert">
            <span className="metric-label">Status sistem</span>
            <strong>Normal</strong>
            <small>tidak ada notifikasi kritis</small>
          </article>
        </section>
      )}

      <section className="workspace-grid" aria-label="Area repositori">
        <NavLink to="/software" className="workspace-card software-card">
          <div className="workspace-card-top"><span className="workspace-icon"><MonitorDown size={21} /></span><span className="card-index">01 / KATALOG</span></div>
          <div><h2>Pusat Software</h2><p>{isTechnician ? 'Aplikasi dan utilitas yang dikurasi untuk kegiatan belajar.' : 'Katalog software yang dapat dilihat oleh pengguna umum dalam mode terbatas.'}</p></div>
          <div className="workspace-card-bottom"><span>Jelajahi katalog <ArrowRight size={16} /></span><span className="card-total">04 <small>item contoh</small></span></div>
        </NavLink>
        <NavLink to="/files" className="workspace-card files-card">
          <div className="workspace-card-top"><span className="workspace-icon"><Cloud size={21} /></span><span className="card-index">02 / BERKAS</span></div>
          <div><h2>Penyimpanan Cloud</h2><p>{isTechnician ? 'Materi, panduan, dan folder bersama dalam satu penjelajah.' : 'Berkas publik yang disediakan untuk akses tamu secara terbatas.'}</p></div>
          <div className="workspace-card-bottom"><span>Buka penyimpanan <ArrowRight size={16} /></span><span className="card-total">10 <small>item contoh</small></span></div>
        </NavLink>
      </section>

      <section className="dashboard-lower">
        {isTechnician ? (
          <div className="recent-section">
            <div className="section-heading"><div><span className="section-kicker">PILIHAN UNTUK MEMULAI</span><h2>Baru di repositori</h2></div><NavLink to="/software" className="text-link">Lihat semua <ArrowRight size={15} /></NavLink></div>
            <div className="recent-list">
              {softwareItems.slice(0, 3).map((item, index) => (
                <div className="recent-row" key={item.id}>
                  <span className={`software-monogram ${item.accent}`}>{item.initials}</span>
                  <div className="recent-main"><strong>{item.name}</strong><span>{item.category} <i /> {item.version}</span></div>
                  <span className="recent-date">{item.updatedAt}</span>
                  <span className="row-number">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="recent-section guest-section">
            <div className="section-heading"><div><span className="section-kicker">AKSES TAMU</span><h2>Mode lihat saja</h2></div></div>
            <div className="guest-summary">
              <p>Anda dapat menelusuri software dan file yang dipublikasikan untuk umum, tetapi tidak memiliki akses untuk mengelola pengguna atau mengubah konfigurasi.</p>
            </div>
          </div>
        )}

        <aside className="note-panel">
          <div className="note-icon"><BookOpen size={18} /></div>
          <span className="section-kicker">CATATAN PORTAL</span>
          <h2>{isTechnician ? 'Data contoh, bukan server langsung.' : 'Hak akses terbatas untuk tamu.'}</h2>
          <p>{isTechnician ? 'Daftar ini hanya pratinjau lokal. Tautan unduhan dan koneksi penyimpanan akan diaktifkan setelah sumber resmi dikonfirmasi.' : 'Semua konten yang tersedia untuk tamu hanya bersifat publik dan tidak dapat diubah dari portal ini.'}</p>
          <div className="note-rule"><Check size={14} /><span>{isTechnician ? 'Mode baca-saja aktif' : 'Mode tamu aktif'}</span></div>
        </aside>
      </section>
    </div>
  )
}

function SoftwarePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua kategori')
  const categories = ['Semua kategori', ...Array.from(new Set(softwareItems.map((item) => item.category)))]
  const filteredItems = useMemo(() => softwareItems.filter((item) => {
    const matchesQuery = `${item.name} ${item.description} ${item.platform}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (category === 'Semua kategori' || item.category === category)
  }), [category, query])

  return (
    <div className="page-stack">
      <PageIntro kicker="SOFTWARE CENTER" title="Perangkat lunak" copy="Pilihan aplikasi untuk komputer dan perangkat belajar sekolah." />
      <div className="catalog-toolbar">
        <label className="search-box"><Search size={17} /><span className="sr-only">Cari software</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau deskripsi..." /></label>
        <label className="filter-select"><SlidersHorizontal size={16} /><span className="sr-only">Filter kategori</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((option) => <option key={option}>{option}</option>)}</select></label>
        <span className="results-count">{filteredItems.length} item</span>
      </div>
      {filteredItems.length ? <div className="software-grid">
        {filteredItems.map((item) => <article className="software-tile" key={item.id}>
          <div className="software-tile-top"><span className={`software-monogram large ${item.accent}`}>{item.initials}</span><span className="sample-tag">CONTOH</span></div>
          <div className="software-title-row"><h2>{item.name}</h2><span className="category-tag">{item.category}</span></div>
          <p>{item.description}</p>
          <div className="software-meta"><span>Versi <strong>{item.version}</strong></span><span>{item.size}</span><span>{item.updatedAt}</span></div>
          <button className="download-button" type="button" disabled title="Tautan unduhan belum dikonfigurasi"><ArrowDownToLine size={16} /> Tautan belum tersedia</button>
        </article>)}
      </div> : <EmptyState title="Tidak ada hasil" copy="Coba kata kunci atau kategori yang berbeda." />}
      <p className="inline-notice"><Check size={15} /> Semua entri adalah data contoh. Verifikasi sumber dan lisensi sebelum distribusi.</p>
    </div>
  )
}

function FilesPage() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const folderChain = useMemo(() => {
    const chain: FileEntry[] = []
    let folderId = currentFolder
    while (folderId) {
      const folder = fileEntries.find((entry) => entry.id === folderId)
      if (!folder) break
      chain.unshift(folder)
      folderId = folder.folderId
    }
    return chain
  }, [currentFolder])
  const visibleFiles = useMemo(() => fileEntries.filter((entry) => entry.folderId === currentFolder && entry.name.toLowerCase().includes(query.toLowerCase())), [currentFolder, query])

  return (
    <div className="page-stack">
      <PageIntro kicker="CLOUD STORAGE" title="Berkas bersama" copy="Jelajahi folder dan dokumen yang tersedia di repositori." />
      <div className="file-toolbar">
        <nav className="file-breadcrumb" aria-label="Lokasi folder">
          <button type="button" className={currentFolder === null ? 'crumb current' : 'crumb'} onClick={() => setCurrentFolder(null)}>Semua berkas</button>
          {folderChain.map((folder) => <span className="crumb-part" key={folder.id}><ChevronRight size={14} /><button type="button" className={folder.id === currentFolder ? 'crumb current' : 'crumb'} onClick={() => setCurrentFolder(folder.id)}>{folder.name}</button></span>)}
        </nav>
        <div className="file-toolbar-actions">
          <label className="search-box compact"><Search size={16} /><span className="sr-only">Cari dalam folder</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari di folder ini" /></label>
          <div className="view-toggle" aria-label="Tampilan berkas">
            <button type="button" className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')} aria-label="Tampilan daftar" aria-pressed={view === 'list'}><List size={17} /></button>
            <button type="button" className={view === 'grid' ? 'selected' : ''} onClick={() => setView('grid')} aria-label="Tampilan kisi" aria-pressed={view === 'grid'}><Grid2X2 size={16} /></button>
          </div>
        </div>
      </div>
      <div className={`file-list ${view === 'grid' ? 'as-grid' : ''}`}>
        <div className="file-list-head"><span>Nama</span><span>Diubah</span><span>Ukuran</span></div>
        {visibleFiles.map((entry) => <FileRow key={entry.id} entry={entry} onOpen={() => entry.kind === 'folder' && setCurrentFolder(entry.id)} />)}
        {visibleFiles.length === 0 && <EmptyState title={query ? 'Tidak ada kecocokan' : 'Folder ini kosong'} copy={query ? 'Hapus pencarian atau coba istilah lain.' : 'Belum ada berkas contoh di lokasi ini.'} />}
      </div>
      <p className="inline-notice"><HardDrive size={15} /> Tampilan lokal. Layanan penyimpanan langsung belum dikonfigurasi.</p>
    </div>
  )
}

function FileRow({ entry, onOpen }: { entry: FileEntry; onOpen: () => void }) {
  const Icon = entry.kind === 'folder' ? Folder : entry.fileType === 'PDF' ? FileText : File
  return (
    <button type="button" className={`file-row${entry.kind === 'folder' ? ' is-folder' : ''}`} onClick={onOpen} disabled={entry.kind === 'file'}>
      <span className="file-name-cell"><span className={`file-icon ${entry.kind}`}><Icon size={18} /></span><strong>{entry.name}</strong>{entry.kind === 'folder' && <ChevronRight className="file-open-arrow" size={15} />}</span>
      <span className="file-date">{entry.modifiedAt}</span>
      <span className="file-size">{entry.size ?? '—'}</span>
    </button>
  )
}

function PageIntro({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return <section className="page-intro"><span className="section-kicker">{kicker}</span><h1>{title}</h1><p>{copy}</p></section>
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return <div className="empty-state"><FolderOpen size={24} /><strong>{title}</strong><span>{copy}</span></div>
}

export default App