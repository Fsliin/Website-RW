import { useState } from "react";
import { Menu, X, MapPin, Phone, Mail, ChevronDown, TrendingUp, TrendingDown, Wallet, Users, Shield, Trash2, Bell } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const management = [
  { icon:"https://drive.google.com/file/d/1wwuN2Ok-wyhpjKdASmlh6XVg78NR3GtE/view?usp=sharing", role: "Ketua RW", name: "Ibu. Dewi Fatimah", phone: "0812-3456-7890" },
  { icon:"https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=600&h=400&fit=crop&auto=format", role: "Sekretaris", name: "Dummy", phone: "0856-7890-1234" },
  { icon:"https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=600&h=400&fit=crop&auto=format", role: "Bendahara", name: "Dummy", phone: "0878-2345-6789" },
  { icon:"https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=600&h=400&fit=crop&auto=format", role: "RT 1", name: "Ibu Teti & Bpk Awab", phone: "0821-dummy" },
  { icon:"https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=600&h=400&fit=crop&auto=format", role: "RT 2", name: "Dummy", phone: "0821-dummy" },
  { icon:"AH", role: "RT 3", name: "Ibu Eni & Bpk Burhan", phone: "0821-dummy" },
  { icon:"AH", role: "RT 4", name: "Bpk Yadi", phone: "0821-dummy" },
  { icon:"AH", role: "RT 5", name: "Ibu Mariyam & Bpk Din Din", phone: "0821-dummy" },
];

const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=600&h=400&fit=crop&auto=format",
    alt: "Warga berkumpul dalam acara kebersamaan RT",
    label: "Rapat Warga Bulanan",
    span: "col-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1758599668209-783bd3691ec8?w=600&h=400&fit=crop&auto=format",
    alt: "Kegiatan bersih-bersih lingkungan",
    label: "Kerja Bakti",
    span: "",
  },
  {
    url: "https://images.unsplash.com/photo-1777817530517-bd54a0574213?w=600&h=400&fit=crop&auto=format",
    alt: "Kegiatan pasar rakyat dan bazaar komunitas",
    label: "Bazaar Warga",
    span: "",
  },
  {
    url: "https://images.unsplash.com/photo-1566205865731-51803de32a35?w=600&h=400&fit=crop&auto=format",
    alt: "Lingkungan perumahan yang asri",
    label: "Lingkungan Kami",
    span: "",
  },
  {
    url: "https://images.unsplash.com/photo-1762040598334-51d816d8f71c?w=600&h=400&fit=crop&auto=format",
    alt: "Musyawarah warga dan diskusi komunitas",
    label: "Musyawarah RT",
    span: "col-span-2",
  },
];

interface FinancialRow {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  notes: string;
}

const financialData: FinancialRow[] = [
  { month: "Januari 2025", income: 3_200_000, expenses: 2_150_000, balance: 1_050_000, notes: "Pengecatan tiang RT" },
  { month: "Februari 2025", income: 3_100_000, expenses: 1_800_000, balance: 1_300_000, notes: "Operasional rutin" },
  { month: "Maret 2025", income: 3_200_000, expenses: 2_400_000, balance: 800_000, notes: "Perbaikan lampu jalan" },
  { month: "April 2025", income: 3_000_000, expenses: 1_950_000, balance: 1_050_000, notes: "Operasional rutin" },
  { month: "Mei 2025", income: 3_200_000, expenses: 3_100_000, balance: 100_000, notes: "Acara 17 Agustus (persiapan)" },
  { month: "Juni 2025", income: 3_200_000, expenses: 2_200_000, balance: 1_000_000, notes: "Operasional + kebersihan" },
];

const announcements = [
  { date: "15 Jun 2025", text: "Rapat bulanan RT dilaksanakan Sabtu, 21 Juni 2025 pukul 19.00 WIB di balai RT." },
  { date: "10 Jun 2025", text: "Pembayaran IPL bulan Juni dibuka mulai tanggal 1–10 setiap bulan. Hubungi bendahara RT." },
  { date: "5 Jun 2025", text: "Kerja bakti massal akan diadakan hari Minggu, 22 Juni 2025 pukul 07.00 WIB." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

const totalIncome = financialData.reduce((s, r) => s + r.income, 0);
const totalExpenses = financialData.reduce((s, r) => s + r.expenses, 0);
const totalBalance = financialData.reduce((s, r) => s + r.balance, 0);

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar() {
  const [open, setOpen] = useState(false);
  const links = ["Beranda", "Tentang Kami", "Galeri", "Keuangan", "Kontak"];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#beranda" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm font-['Plus_Jakarta_Sans']">RW</span>
          </div>
          <div className="leading-none">
            <div className="font-bold text-foreground text-sm">RW 04</div>
            <div className="text-muted-foreground text-xs">Desa Mekarsari</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-5 py-3 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground"
    >
      <img
        src="https://images.unsplash.com/photo-1558368333-a394063fbf24?w=1600&h=900&fit=crop&auto=format"
        alt="Lingkungan perumahan yang nyaman dan asri"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <MapPin size={12} className="text-primary" />
          Desa Mekarsari, Kecamatan Cibatu, Garut
        </div>

        <h1 className="text-white font-extrabold leading-tight mb-6"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.15 }}>
          Selamat Datang di<br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #4dd8cb 0%, #a8f0ea 100%)" }}>
            RW 04
          </span>
        </h1>

        <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Bersama membangun lingkungan yang aman, bersih, dan harmonis. Informasi warga, kegiatan, dan laporan keuangan RW tersedia di sini untuk semua.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#keuangan"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            <Wallet size={16} />
            Laporan Keuangan
          </a>
          <a
            href="#tentang-kami"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            Kenali Kami
            <ChevronDown size={16} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-10">
        {[
          { icon: Users, label: "Kepala Keluarga", value: "48 KK" },
          { icon: Shield, label: "Pos Keamanan", value: "24 Jam" },
          { icon: Trash2, label: "Jadwal Sampah", value: "2× Seminggu" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-white/60 text-xs mb-1">
              <Icon size={12} />
              {label}
            </div>
            <div className="text-white font-bold text-sm">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="tentang-kami" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-block text-primary font-semibold text-sm bg-secondary px-3 py-1 rounded-full mb-4">
              Tentang Kami
            </div>
            <h2 className="text-foreground font-extrabold mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>
              Pengurus RW yang Transparan dan Amanah
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              RW Mekarsari 04 Merupakan RW terletak di mekarsari kec cibatu kab garut, Kami berkomitmen untuk memberikan pelayanan terbaik, menjaga keamanan, kebersihan, dan keharmonisan lingkungan bersama.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Setiap warga berhak mengetahui pengelolaan dana secara terbuka. Laporan keuangan dipublikasikan setiap bulan agar tercipta kepercayaan dan akuntabilitas bersama, dan informasi kegiatan yang akan datang.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Tahun Berdiri", value: "2026" },
                { label: "Total Warga", value: "±192 Jiwa" },
                { label: "RW Aktif", value: "Periode 2026–NOW" },
                { label: "IPL / Bulan", value: "Rp 75.000" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-4">
                  <div className="text-muted-foreground text-xs mb-1">{label}</div>
                  <div className="text-foreground font-bold text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-1.5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1762627522949-9bb0b035c4a8?w=700&h=380&fit=crop&auto=format"
                alt="Pengurus RT dalam rapat rutin"
                className="w-full h-52 object-cover rounded-xl"
              />
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-foreground font-bold text-sm mb-4 flex items-center gap-2">
                <Users size={15} className="text-primary" />
                Susunan Pengurus
              </h3>
              <div className="space-y-3">
                {management.map(({ icon, role, name, phone }) => (
                    <div key={role} className="flex items-center justify-between py-2.5 border-b border-border last:border-0 gap-4">
                      <div className="flex flex-row items-center gap-3 min-w-0">
                        {/* Container Avatar dengan Ukuran Tetap */}
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-sky-100 flex items-center justify-center flex-shrink-0 border border-sky-200 text-sky-600 font-semibold text-sm">
                          {icon.startsWith("http") ? (
                            <img
                              src={icon}
                              alt={name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{icon}</span>
                          )}
                        </div>
                        
                        {/* Detail Nama & Jabatan */}
                        <div className="min-w-0">
                          <div className="text-xs text-primary font-semibold">{role}</div>
                          <div className="text-foreground font-medium text-sm truncate">{name}</div>
                        </div>
                      </div>
                      
                      {/* Nomor Telepon */}
                      <a
                        href={`tel:${phone.replace(/-/g, "")}`}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors font-['DM_Mono',monospace] flex-shrink-0"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="galeri" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <div className="inline-block text-primary font-semibold text-sm bg-secondary px-3 py-1 rounded-full mb-4">
            Galeri Kegiatan
          </div>
          <h2 className="text-foreground font-extrabold"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>
            Momen Kebersamaan Warga
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Dokumentasi kegiatan dan acara komunitas RT 07 sepanjang tahun.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 auto-rows-[200px]">
          {galleryItems.map((item) => (
            <div
              key={item.label}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-muted ${item.span} row-span-1`}
              onClick={() => setActive(active === item.url ? null : item.url)}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-semibold text-sm">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <img src={active} alt="Foto kegiatan" className="max-w-3xl w-full max-h-[85vh] object-contain rounded-2xl" />
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            onClick={() => setActive(null)}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </section>
  );
}

function FinancialDashboard() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section id="keuangan" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <div className="inline-block text-primary font-semibold text-sm bg-secondary px-3 py-1 rounded-full mb-4">
            Transparansi Keuangan
          </div>
          <h2 className="text-foreground font-extrabold"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>
            Laporan IPL Warga 2025
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Rincian pemasukan, pengeluaran, dan saldo iuran pemeliharaan lingkungan (IPL) setiap bulan secara terbuka.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-sm:grid-cols-1">
          {[
            {
              label: "Total Pemasukan",
              value: formatRupiah(totalIncome),
              icon: TrendingUp,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              border: "border-emerald-100",
            },
            {
              label: "Total Pengeluaran",
              value: formatRupiah(totalExpenses),
              icon: TrendingDown,
              color: "text-rose-600",
              bg: "bg-rose-50",
              border: "border-rose-100",
            },
            {
              label: "Saldo Berjalan",
              value: formatRupiah(totalBalance),
              icon: Wallet,
              color: "text-primary",
              bg: "bg-secondary",
              border: "border-accent",
            },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`rounded-2xl border ${border} ${bg} p-5 flex items-center gap-4`}>
              <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <div className="text-muted-foreground text-xs mb-1">{label}</div>
                <div className={`font-bold text-base ${color} font-['DM_Mono',monospace]`}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bulan</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pemasukan</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pengeluaran</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Saldo</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide max-sm:hidden">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((row, i) => {
                  const surplus = row.income - row.expenses;
                  return (
                    <tr
                      key={row.month}
                      className={`border-b border-border last:border-0 cursor-pointer transition-colors ${
                        activeRow === i ? "bg-secondary" : "hover:bg-muted/60"
                      }`}
                      onClick={() => setActiveRow(activeRow === i ? null : i)}
                    >
                      <td className="px-5 py-4 font-medium text-foreground">{row.month}</td>
                      <td className="px-5 py-4 text-right font-medium text-emerald-700 font-['DM_Mono',monospace] tabular-nums">
                        {formatRupiah(row.income)}
                      </td>
                      <td className="px-5 py-4 text-right font-medium text-rose-700 font-['DM_Mono',monospace] tabular-nums">
                        {formatRupiah(row.expenses)}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-['DM_Mono',monospace]">
                        <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg text-xs ${
                          surplus >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}>
                          {surplus >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                          {formatRupiah(row.balance)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground max-sm:hidden">{row.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-muted border-t-2 border-primary/20">
                  <td className="px-5 py-4 font-bold text-foreground text-xs uppercase tracking-wide">Total</td>
                  <td className="px-5 py-4 text-right font-bold text-emerald-700 font-['DM_Mono',monospace] tabular-nums">
                    {formatRupiah(totalIncome)}
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-rose-700 font-['DM_Mono',monospace] tabular-nums">
                    {formatRupiah(totalExpenses)}
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-primary font-['DM_Mono',monospace] tabular-nums">
                    {formatRupiah(totalBalance)}
                  </td>
                  <td className="max-sm:hidden" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Laporan keuangan diverifikasi oleh Bendahara RT. Pertanyaan? Hubungi Bpk. Agus Wijaya di 0878-2345-6789.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontak" className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white font-extrabold text-sm">RT</span>
              </div>
              <div>
                <div className="font-bold text-white">RT 07 / RW 03</div>
                <div className="text-white/50 text-xs">Kelurahan Sukamaju, Depok</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Melayani warga dengan transparansi, integritas, dan semangat kebersamaan demi lingkungan yang lebih baik.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:08123456789" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Phone size={14} className="text-primary flex-shrink-0" />
                0812-3456-7890 (Ketua RT)
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <Mail size={14} className="text-primary flex-shrink-0" />
                rt07rw03.sukamaju@gmail.com
              </div>
              <div className="flex items-start gap-2 text-white/60">
                <MapPin size={14} className="text-primary flex-shrink-0 mt-0.5" />
                Jl. Melati Raya No. 7, Sukamaju, Beji, Depok 16421
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={15} className="text-primary" />
              <h3 className="font-bold text-white">Pengumuman Terbaru</h3>
            </div>
            <div className="space-y-3">
              {announcements.map(({ date, text }) => (
                <div key={date} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-medium text-primary bg-primary/15 px-2.5 py-1 rounded-lg font-['DM_Mono',monospace]">
                      {date}
                    </span>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2025 RT 07 / RW 03 Kelurahan Sukamaju. Semua hak dilindungi.
          </p>
          <p className="text-white/30 text-xs">
            Dikelola oleh Pengurus RT · Periode 2023–2026
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <NavBar />
      <main className="pt-0">
        <Hero />
        <About />
        <Gallery />
        <FinancialDashboard />
      </main>
      <Footer />
    </div>
  );
}
