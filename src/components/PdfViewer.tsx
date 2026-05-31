import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
  title?: string;
}

export function PdfViewer({ url, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(720);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="my-10 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-200">
        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          <path fill="white" d="M14 2v6h6"/>
          <path fill="white" d="M9 13h6M9 17h4"/>
        </svg>
        <span className="text-sm font-medium text-slate-700 truncate">
          {title ?? url.split('/').pop()}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-indigo-500 hover:text-indigo-700 flex-shrink-0"
        >
          Open ↗
        </a>
      </div>

      {/* PDF pages */}
      <div ref={containerRef} className="px-4 py-4 space-y-4">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-full bg-slate-200 animate-pulse rounded-lg" style={{ height: Math.round(containerWidth * 0.5625) }} />
              ))}
            </div>
          }
          error={
            <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg text-sm">
              Unable to load PDF.{' '}
              <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                Open directly ↗
              </a>
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-white flex justify-center">
              <Page
                pageNumber={i + 1}
                width={containerWidth - 32}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
