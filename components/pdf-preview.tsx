'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ArrowRight, FileText, AlertCircle } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up the pdf.js worker with explicit https protocol
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// Static options configured to prevent chunked Range request mismatches on compressed/proxied static files
const pdfOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
  disableRange: true,
  disableStream: true,
  disableAutoFetch: true,
}

/** Lazy PDF preview — renders the first page using react-pdf */
export default function PdfPreview({ pdfUrl }: { pdfUrl: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const fileConfig = useMemo(() => ({
    url: pdfUrl,
    disableRange: true,
    disableStream: true,
  }), [pdfUrl])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noreferrer"
      className="block group/preview"
      aria-label="Open PDF"
    >
      <div
        ref={ref}
        className="relative w-full overflow-hidden bg-white aspect-[1/1.2]"
      >
        {/* Skeleton shimmer */}
        {!loaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-mist animate-pulse z-0">
            <FileText size={32} className="text-primary-green/30" />
            <div className="h-2 w-2/3 rounded-full bg-primary-green/10" />
            <div className="h-2 w-1/2 rounded-full bg-primary-green/10" />
          </div>
        )}

        {/* Error Fallback */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-sand/30 p-4 text-center z-0">
            <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center text-primary-green">
              <FileText size={20} />
            </div>
            <p className="text-xs font-semibold text-deep-forest">PDF Document</p>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Click to read</span>
          </div>
        )}

        {visible && !error && (
          <div className={`absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden transition-opacity duration-500 z-10 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Document
              file={fileConfig}
              options={pdfOptions}
              onLoadSuccess={() => setLoaded(true)}
              onLoadError={() => setError(true)}
              loading={null}
              error={null}
            >
              <Page
                pageNumber={1}
                width={600}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-sm [&>canvas]:!w-full [&>canvas]:!h-auto"
              />
            </Document>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-green/0 group-hover/preview:bg-primary-green/5 transition-colors duration-200 flex items-center justify-center z-20">
          <span className="opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm text-deep-forest text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <ArrowRight size={12} /> Open PDF
          </span>
        </div>
      </div>
    </a>
  )
}
