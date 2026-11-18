export type SoftwareCategory = 'Windows' | 'Linux' | 'Android' | 'Drivers' | 'Utilities' | 'ISO'

export interface SoftwareItem {
  id: string
  name: string
  description: string
  category: SoftwareCategory
  platform: string
  version: string
  size: string
  updatedAt: string
  initials: string
  accent: string
  downloadUrl?: string
}

export interface FileEntry {
  id: string
  name: string
  kind: 'file' | 'folder'
  folderId: string | null
  modifiedAt: string
  size?: string
  fileType?: string
  downloadUrl?: string
}

export const softwareItems: SoftwareItem[] = [
  {
    id: 'libreoffice',
    name: 'LibreOffice',
    description: 'Paket produktivitas untuk dokumen, spreadsheet, dan presentasi.',
    category: 'Windows',
    platform: 'Windows / macOS / Linux',
    version: '24.8.4',
    size: '345 MB',
    updatedAt: '12 Feb 2025',
    initials: 'LO',
    accent: 'coral',
    downloadUrl: 'https://download.documentfoundation.org/libreoffice/stable/24.8.4/win/x86_64/LibreOffice_24.8.4_Win_x86-64.msi',
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Editor kode ringan dengan dukungan ekstensi yang luas.',
    category: 'Utilities',
    platform: 'Windows / macOS / Linux',
    version: '1.96.4',
    size: '95 MB',
    updatedAt: '8 Feb 2025',
    initials: 'VS',
    accent: 'blue',
    downloadUrl: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user',
  },
  {
    id: 'vlc',
    name: 'VLC media player',
    description: 'Pemutar media lintas platform untuk beragam format audio dan video.',
    category: 'Windows',
    platform: 'Windows / macOS / Linux',
    version: '3.0.21',
    size: '42 MB',
    updatedAt: '30 Jan 2025',
    initials: 'VL',
    accent: 'amber',
    downloadUrl: 'https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe',
  },
  {
    id: 'android-studio',
    name: 'Android Studio',
    description: 'Lingkungan pengembangan resmi untuk aplikasi Android.',
    category: 'Android',
    platform: 'Windows / macOS / Linux',
    version: '2024.2.1',
    size: '1.2 GB',
    updatedAt: '22 Jan 2025',
    initials: 'AS',
    accent: 'green',
    downloadUrl: 'https://redirector.gvt1.com/edgedl/android/studio/install/2024.2.1.12/android-studio-2024.2.1.12-windows.exe',
  },
]

export const fileEntries: FileEntry[] = [
  { id: 'kurikulum',  name: 'Materi Kurikulum',           kind: 'folder', folderId: null,         modifiedAt: 'Hari ini' },
  { id: 'software',   name: 'Installer Software',          kind: 'folder', folderId: null,         modifiedAt: 'Kemarin' },
  {
    id: 'panduan',
    name: 'Panduan penggunaan lab.pdf',
    kind: 'file',
    folderId: null,
    modifiedAt: '10 Okt 2025',
    size: '2.4 MB',
    fileType: 'PDF',
    downloadUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF1.pdf',
  },
  {
    id: 'jadwal',
    name: 'Jadwal praktikum.xlsx',
    kind: 'file',
    folderId: 'kurikulum',
    modifiedAt: '8 Okt 2025',
    size: '184 KB',
    fileType: 'XLSX',
    downloadUrl: 'https://file-examples.com/storage/fe1f4df45867b8b98e7c5a7/2017/02/file_example_XLSX_10.xlsx',
  },
  {
    id: 'modul',
    name: 'Modul pembelajaran.pdf',
    kind: 'file',
    folderId: 'kurikulum',
    modifiedAt: '7 Okt 2025',
    size: '8.1 MB',
    fileType: 'PDF',
    downloadUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf',
  },
  { id: 'semester', name: 'Semester Ganjil',              kind: 'folder', folderId: 'kurikulum',  modifiedAt: '3 Okt 2025' },
  { id: 'windows',  name: 'Windows',                      kind: 'folder', folderId: 'software',   modifiedAt: '9 Okt 2025' },
  { id: 'android',  name: 'Android',                      kind: 'folder', folderId: 'software',   modifiedAt: '6 Okt 2025' },
  { id: 'linux',    name: 'Linux',                        kind: 'folder', folderId: 'software',   modifiedAt: '1 Okt 2025' },
  {
    id: 'rangkuman',
    name: 'Rangkuman materi.pdf',
    kind: 'file',
    folderId: 'semester',
    modifiedAt: '2 Okt 2025',
    size: '1.8 MB',
    fileType: 'PDF',
    downloadUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF3.pdf',
  },
]
