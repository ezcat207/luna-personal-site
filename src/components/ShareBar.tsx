import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

interface ShareBarProps {
  title: string;
  summary?: string;
  /** defaults to window.location.href */
  url?: string;
}

// Inline SVG brand icons (avoids lucide version drift issues)
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ShareBar({ title, summary, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const resolvedUrl =
    url ?? (typeof window !== 'undefined' ? window.location.href : '');

  const shareText = summary ? `${title} — ${summary}` : title;

  const openX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(resolvedUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const openLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resolvedUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for browsers without clipboard API
      const el = document.createElement('input');
      el.value = resolvedUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Use native Web Share API on mobile if available
  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: shareText, url: resolvedUrl });
    } catch {
      // user cancelled or not supported — fallback silently
    }
  };

  const canNativeShare =
    typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-slate-400 mr-1">Share</span>

      {/* X / Twitter */}
      <button
        onClick={openX}
        aria-label="Share on X"
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-black hover:text-white text-slate-600 transition-colors"
      >
        <XIcon />
      </button>

      {/* LinkedIn */}
      <button
        onClick={openLinkedIn}
        aria-label="Share on LinkedIn"
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-600 transition-colors"
      >
        <LinkedInIcon />
      </button>

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label={copied ? 'Copied!' : 'Copy link'}
        className={`flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium transition-colors ${
          copied
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            Copy link
          </>
        )}
      </button>

      {/* Native share (mobile only — shows when Web Share API available) */}
      {canNativeShare && (
        <button
          onClick={nativeShare}
          aria-label="Share"
          className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-medium transition-colors sm:hidden"
        >
          Share
        </button>
      )}
    </div>
  );
}
