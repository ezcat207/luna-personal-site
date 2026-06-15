import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

// ─── Google "G" logo SVG ──────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AuthButtonProps {
  lang?: string;
  /** Pass to show privacy toggle in dropdown (log page only) */
  isPublic?: boolean;
  onPrivacyChange?: (isPublic: boolean) => void;
  /** Visual variant */
  variant?: 'default' | 'nav';
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AuthButton({
  lang = 'en',
  isPublic,
  onPrivacyChange,
  variant = 'default',
}: AuthButtonProps) {
  const { user, authLoading, signInWithGoogle, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  if (authLoading) {
    return <div className="w-20 h-7 bg-white/50 rounded-full animate-pulse shrink-0" />;
  }

  // ── Not signed in ──────────────────────────────────────────────────────────
  if (!user) {
    if (variant === 'nav') {
      return (
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          <GoogleIcon />
          {lang === 'zh' ? '登录' : 'Sign in'}
        </button>
      );
    }
    return (
      <button
        onClick={signInWithGoogle}
        className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:shadow transition-all active:scale-95 shrink-0 whitespace-nowrap"
      >
        <GoogleIcon />
        {lang === 'zh' ? 'Google 登录' : 'Sign in'}
      </button>
    );
  }

  // ── Signed in ──────────────────────────────────────────────────────────────
  const avatar   = user.user_metadata?.avatar_url as string | undefined;
  const fullName = user.user_metadata?.full_name  as string | undefined;
  const firstName = fullName?.split(' ')[0] ?? user.email?.split('@')[0] ?? '?';
  const showPrivacy = onPrivacyChange !== undefined && isPublic !== undefined;

  return (
    <div className="relative shrink-0" ref={menuRef}>
      {/* Trigger pill */}
      <button
        onClick={() => setShowMenu(v => !v)}
        className="flex items-center gap-1.5 bg-white/80 hover:bg-white border border-slate-200 rounded-full pl-1 pr-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition-all"
        aria-expanded={showMenu}
      >
        {avatar ? (
          <img src={avatar} alt={firstName} className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-pink-400 text-white text-[10px] flex items-center justify-center font-bold">
            {firstName[0].toUpperCase()}
          </div>
        )}
        <span className="max-w-[72px] truncate">{firstName}</span>
        <span className="text-slate-400 text-[10px] leading-none">▾</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-9 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-56"
          >
            {/* User info */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {avatar ? (
                  <img src={avatar} alt={firstName} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-pink-400 text-white text-sm flex items-center justify-center font-bold">
                    {firstName[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{fullName || firstName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Privacy toggle (log page only) */}
            {showPrivacy && (
              <div className="px-3 py-2.5 border-b border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-1.5">
                  {lang === 'zh' ? '日志可见性' : 'Log visibility'}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => { onPrivacyChange(true); setShowMenu(false); }}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      isPublic
                        ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    🌐 {lang === 'zh' ? '公开' : 'Public'}
                  </button>
                  <button
                    onClick={() => { onPrivacyChange(false); setShowMenu(false); }}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      !isPublic
                        ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-300'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    🔒 {lang === 'zh' ? '私密' : 'Private'}
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 mt-1">
                  {!isPublic
                    ? (lang === 'zh' ? '仅自己可见' : 'Only you can see this')
                    : (lang === 'zh' ? '所有人可查看' : 'Visible to anyone with the link')
                  }
                </p>
              </div>
            )}

            {/* Sign out */}
            <button
              onClick={() => { signOut(); setShowMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <span>↩</span>
              {lang === 'zh' ? '退出登录' : 'Sign out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
