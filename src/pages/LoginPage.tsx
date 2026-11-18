import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  Command,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  User,
} from "lucide-react";

/**
 * Halaman login — School Repository Hub
 *
 * Mengikuti design.md:
 *   - Palet  : biru #2563EB (aksi utama), navy #0F172A, teks #111827 / #64748B,
 *              latar #F8FAFC, permukaan #FFFFFF, border #E2E8F0,
 *              bahaya #DC2626, peringatan #D97706
 *   - Bentuk : kartu radius 16px, input & tombol radius 8px, tanpa bayangan berlebihan
 *   - Teks   : judul 24–28px, isi 14–16px, metadata 12–13px
 *   - Status : error dan catatan prototipe selalu memakai ikon + teks (tidak hanya warna)
 *   - Layout : halaman penuh tanpa sidebar — login bukan bagian navigasi utama (design.md §4)
 *
 * Komponen ini hanya UI. Logika login dikirim lewat prop `onLogin`,
 * yang harus melempar Error jika kredensial salah.
 *
 * Contoh:
 *   <LoginPage
 *     onLogin={async (email, password) => {
 *       await login(email, password);
 *       navigate("/");
 *     }}
 *     demoAccounts={[
 *       { label: "Teknisi", email: "...", password: "..." },
 *       { label: "Guest",   email: "...", password: "..." },
 *     ]}
 *   />
 *
 * `demoAccounts` opsional. Isi dari parent (jangan hardcode kredensial di sini)
 * dan hapus prop ini saat sudah memakai backend nyata.
 */

export type DemoAccount = { label: string; email: string; password: string };

export type LoginPageProps = {
  onLogin?: (username: string, password: string) => Promise<void>;
  demoAccounts?: DemoAccount[];
};

const inputBase =
  "h-11 w-full rounded-lg border border-[#E2E8F0] bg-white pl-10 text-base text-[#111827] " +
  "placeholder:text-[#64748B] hover:border-slate-300 " +
  "focus-visible:border-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30 " +
  "disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:text-[#64748B] " +
  "aria-[invalid=true]:border-[#DC2626] sm:text-sm";

export default function LoginPage({ onLogin, demoAccounts }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Isi username dan kata sandi terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      await onLogin?.(username.trim(), password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Username atau kata sandi tidak cocok. Periksa lagi lalu coba masuk."
      );
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(account: DemoAccount) {
    setUsername(account.email);
    setPassword(account.password);
    setError(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-[#111827]">
      {/* Header: logo saja — tanpa sidebar, sesuai design.md §4 */}
      <header className="flex h-16 items-center border-b border-[#E2E8F0] bg-white px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
            <Command className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-base font-semibold text-[#0F172A]">
            School Repository Hub
          </span>
        </div>
      </header>

      {/* Konten utama */}
      <main className="flex flex-1 items-start justify-center px-4 pb-10 pt-8 sm:items-center sm:px-8 sm:pt-0">
        <div className="w-full max-w-[420px]">

          {/* Kartu login — radius 16px sesuai design.md §2 */}
          <section
            aria-labelledby="login-title"
            className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-8"
          >
            <h1
              id="login-title"
              className="text-2xl font-semibold text-[#0F172A] sm:text-[28px]"
            >
              Masuk
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Gunakan akun sekolah untuk membuka Software Center dan Cloud
              Storage.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-[#111827]"
                >
                  Username
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
                    aria-hidden="true"
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    disabled={loading}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "login-error" : undefined}
                    className={`${inputBase} pr-3`}
                  />
                </div>
              </div>

              {/* Kata sandi */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-[#111827]"
                >
                  Kata sandi
                </label>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    disabled={loading}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "login-error" : undefined}
                    className={`${inputBase} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error: ikon + teks, bukan warna saja — design.md §10 */}
              {error && (
                <div
                  id="login-error"
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-[#DC2626]/30 bg-[#FEF2F2] p-3 text-sm"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#DC2626]"
                    aria-hidden="true"
                  />
                  <p className="text-[#111827]">
                    <span className="font-medium">Gagal masuk. </span>
                    {error}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] text-sm font-medium text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    Memeriksa akun…
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            {/* Akun demo (opsional, diisi dari parent — jangan hardcode di sini) */}
            {demoAccounts && demoAccounts.length > 0 && (
              <div className="mt-6 border-t border-[#E2E8F0] pt-5">
                <p className="text-[13px] text-[#64748B]">
                  Akun demo untuk mencoba prototipe
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.label}
                      type="button"
                      onClick={() => fillDemo(acc)}
                      disabled={loading}
                      className="h-10 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#111827] hover:bg-[#F8FAFC] active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Isi sebagai {acc.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Status jujur: mode prototipe — design.md §1 "Status yang jujur" */}
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#E2E8F0] bg-white p-3 text-[13px] text-[#111827]">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]"
              aria-hidden="true"
            />
            <p>
              <span className="font-medium">Mode prototipe. </span>
              Login memakai data demo di browser ini dan belum terhubung ke
              server sekolah.
            </p>
          </div>

        </div>
      </main>

      <footer className="border-t border-[#E2E8F0] px-4 py-4 sm:px-8">
        <p className="text-center text-[12px] text-[#64748B]">
          School Repository Hub · Portal akses terkontrol · Data lokal
        </p>
      </footer>
    </div>
  );
}
