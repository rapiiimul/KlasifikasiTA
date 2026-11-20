'use client'

import { ChangeEvent, useState } from 'react'
import { Activity, ArrowUpRight, Camera, CheckCircle2, Download, FileImage, Leaf, Moon, RotateCcw, ShieldCheck, Sparkles, Sprout, Sun, Upload, X } from 'lucide-react'

const recommendations = [
  { title: 'Penjelasan singkat', body: 'Bercak cokelat pada daun umumnya disebabkan oleh jamur Bipolaris oryzae. Kondisi ini berkembang lebih cepat pada tanaman yang kekurangan nutrisi atau mengalami stres air.' },
  { title: 'Langkah penanganan', body: 'Buang daun dengan infeksi berat, perbaiki pemupukan berimbang, dan aplikasikan fungisida sesuai anjuran penyuluh pertanian setempat.' },
  { title: 'Upaya pencegahan', body: 'Gunakan benih sehat, jaga jarak tanam, bersihkan sisa tanaman, serta pantau lahan secara rutin terutama setelah hujan.' },
]

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(false)
  const [dark, setDark] = useState(false)
  const [toast, setToast] = useState('')
  const [open, setOpen] = useState(0)

  const showToast = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3200) }
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    if (!selected) return
    if (!['image/jpeg', 'image/png'].includes(selected.type)) return showToast('Format tidak sesuai. Gunakan JPG, JPEG, atau PNG.')
    if (selected.size > 8 * 1024 * 1024) return showToast('Ukuran gambar terlalu besar. Maksimal 8 MB.')
    setFile(selected); setPreview(URL.createObjectURL(selected)); setResult(false)
    setTimeout(() => { setAnalyzing(true); setTimeout(() => { setAnalyzing(false); setResult(true) }, 1400) }, 250)
  }
  const reset = () => { setFile(null); setPreview(''); setResult(false); setAnalyzing(false) }
  const exportResult = () => { window.print(); showToast('Dialog cetak dibuka. Pilih “Save as PDF” untuk menyimpan.') }

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <header className="topbar">
        <div className="brand"><span className="brand-mark"><Leaf /></span><span>padi<span className="brand-accent">sehat</span></span></div>
        <div className="header-actions"><span className="status-dot" /> <span className="status-label">Sistem siap</span><button className="icon-button" aria-label="Ganti tema" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button></div>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles /> DETEKSI CERDAS TANAMAN</div>
        <h1>Kenali kesehatan<br /><em>daun padi</em> Anda.</h1>
        <p>Unggah foto daun padi untuk mendapatkan diagnosis dan rekomendasi penanganan yang tepat.</p>
      </section>

      <section className="quick-stats" aria-label="Ringkasan layanan"><div><Activity /><strong>94.8%</strong><span>Akurasi model</span></div><div><Camera /><strong>3.2k+</strong><span>Foto dianalisis</span></div><div><Sprout /><strong>24/7</strong><span>Panduan tersedia</span></div></section>

      <section className="workspace" aria-label="Area deteksi daun padi">
        {!file ? <label className="dropzone"><input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={handleFile} /><span className="upload-icon"><Upload /></span><strong>Letakkan foto daun di sini</strong><span>atau klik untuk memilih dari perangkat</span><small><FileImage /> JPG, JPEG, PNG · Maks. 8 MB</small></label> : <div className="selected-card"><div className="image-wrap"><img src={preview} alt="Pratilik daun padi yang diunggah" /></div><div className="selected-info"><span className="eyebrow">FOTO TERPILIH</span><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(2)} MB</span><button className="text-button" onClick={reset}><RotateCcw /> Ganti foto</button></div><button className="close-button" aria-label="Hapus foto" onClick={reset}><X /></button></div>}
        {analyzing && <div className="loading"><span className="spinner" /><div><strong>Menganalisis pola daun...</strong><span>Model AI sedang memeriksa citra Anda</span></div></div>}
        {result && <div className="result-panel"><div className="result-heading"><div><span className="eyebrow">HASIL DIAGNOSIS</span><h2>Brown Spot</h2><span className="confidence"><ShieldCheck /> Tingkat keyakinan 94.8%</span></div><span className="badge">Perlu perhatian</span></div><div className="recommendations">{recommendations.map((item, index) => <div className="recommendation" key={item.title}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span><b>0{index + 1}</b>{item.title}</span><span className="plus">{open === index ? '−' : '+'}</span></button>{open === index && <p>{item.body}</p>}</div>)}</div><button className="export-button" onClick={exportResult}><Download /> Unduh hasil diagnosis</button></div>}
      </section>

      <footer><span><ShieldCheck /> Data Anda diproses dengan aman dan tidak disimpan.</span><span>© 2025 padisehat</span></footer>
      {toast && <div className="toast" role="alert"><X />{toast}</div>}
    </main>
  )
}
