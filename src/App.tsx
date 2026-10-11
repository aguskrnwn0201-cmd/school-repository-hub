import { useMemo, useState } from 'react'
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
  MonitorDown,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { fileEntries, softwareItems, type FileEntry } from './data/repository'

const navItems = [
  { to: '/', label: 'Ringkasan', icon: LayoutDashboard, end: true },
  { to: '/software', label: 'Software', icon: MonitorDown, end: false },
  { to: '/files', label: 'Penyimpanan', icon: Cloud, end: false },
]

const pageDetails: Record<string, { title: string; eyebrow: string }> = {
  '/': { title: 'Ringkasan', eyebrow: 'Ruang kerja' },
  '/software': { title: 'Pusat Software', eyebrow: 'Katalog' },
  '/files': { title: 'Penyimpanan Cloud', eyebrow: 'Berkas bersama' },
}

function App() {
  const location = useLocation()
  const currentPage = pageDetails[location.pathname] ?? pageDetails['/']

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Repository Hub, ke ringkasan">
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

        <div className="sidebar-bottom">
          <div className="storage-status-icon"><HardDrive size={16} /></div>
          <div className="storage-status-copy">
            <strong>Mode pratinjau</strong>
            <span>Layanan langsung belum terhubung</span>
          </div>
          <span className="status-dot" aria-label="Data lokal" />
        </div>
        <div className="sidebar-footnote">SCHOOL REPOSITORY · V 0.1</div>
      </aside>

      <div className="content-frame">
        <header className="topbar">
          <div className="breadcrumbs"><span>{currentPage.eyebrow}</span><ChevronRight size={14} /><strong>{currentPage.title}</strong></div>
          <div className="topbar-meta"><span className="demo-pill"><span /> DATA CONTOH</span></div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/software" element={<SoftwarePage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </main>
        <footer className="page-footer"><span>School Repository Hub</span><span>Antarmuka baca-saja · Data lokal</span></footer>
      </div>
    </div>
  )
}

function DashboardPage() {
  return (
    <div className="page-stack dashboard-page">
      <section className="welcome-row">
        <div>
          <div className="section-kicker"><Sparkles size={14} /> PORTAL REPOSITORI SEKOLAH</div>
          <h1>Semua kebutuhan<br /><span>digital, satu tempat.</span></h1>
          <p className="welcome-copy">Temukan software pembelajaran dan jelajahi berkas bersama dengan mudah.</p>
        </div>
        <div className="welcome-stamp"><span>11</span><small>OKT<br />2026</small></div>
      </section>

      <section className="workspace-grid" aria-label="Area repositori">
        <NavLink to="/software" className="workspace-card software-card">
          <div className="workspace-card-top"><span className="workspace-icon"><MonitorDown size={21} /></span><span className="card-index">01 / KATALOG</span></div>
          <div><h2>Pusat Software</h2><p>Aplikasi dan utilitas yang dikurasi untuk kegiatan belajar.</p></div>
          <div className="workspace-card-bottom"><span>Jelajahi katalog <ArrowRight size={16} /></span><span className="card-total">04 <small>item contoh</small></span></div>
        </NavLink>
        <NavLink to="/files" className="workspace-card files-card">
          <div className="workspace-card-top"><span className="workspace-icon"><Cloud size={21} /></span><span className="card-index">02 / BERKAS</span></div>
          <div><h2>Penyimpanan Cloud</h2><p>Materi, panduan, dan folder bersama dalam satu penjelajah.</p></div>
          <div className="workspace-card-bottom"><span>Buka penyimpanan <ArrowRight size={16} /></span><span className="card-total">10 <small>item contoh</small></span></div>
        </NavLink>
      </section>

      <section className="dashboard-lower">
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

        <aside className="note-panel">
          <div className="note-icon"><BookOpen size={18} /></div>
          <span className="section-kicker">CATATAN PORTAL</span>
          <h2>Data contoh, bukan server langsung.</h2>
          <p>Daftar ini hanya pratinjau lokal. Tautan unduhan dan koneksi penyimpanan akan diaktifkan setelah sumber resmi dikonfirmasi.</p>
          <div className="note-rule"><Check size={14} /><span>Mode baca-saja aktif</span></div>
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