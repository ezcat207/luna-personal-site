import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { usePersona } from '../hooks/usePersona';
import { useAuth } from '../hooks/useAuth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Comment {
  id: string;
  email: string;
  name: string | null;
  body: string;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMAIL_KEY = 'bu_user_email';
const NAME_KEY  = 'bu_user_name';

function emailPrefix(email: string) {
  return email.split('@')[0];
}

function displayName(name: string | null, email: string) {
  return name?.trim() || emailPrefix(email);
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const PALETTE = [
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-sky-100 text-sky-700',
];

function Avatar({ name, email }: { name: string | null; email: string }) {
  const label = displayName(name, email);
  const color = PALETTE[email.charCodeAt(0) % PALETTE.length];
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${color}`}>
      {label[0].toUpperCase()}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CommentSection() {
  const { pathname } = useLocation();
  const pageId = pathname;
  const persona = usePersona();
  const isWayne = persona === 'wayne';
  const { user } = useAuth();

  // Theming
  const accentBorder  = isWayne ? 'border-indigo-200' : 'border-pink-200';
  const accentBg      = isWayne ? 'bg-indigo-50'      : 'bg-pink-50';
  const accentText    = isWayne ? 'text-indigo-700'   : 'text-pink-600';
  const accentBtn     = isWayne
    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
    : 'bg-pink-500  hover:bg-pink-600  text-white';

  // ── Like state ──
  const [likeCount,      setLikeCount]      = useState(0);
  const [userLiked,      setUserLiked]      = useState(false);
  const [likeLoading,    setLikeLoading]    = useState(false);
  const [showLikeInput,  setShowLikeInput]  = useState(false);
  const [likeEmailInput, setLikeEmailInput] = useState('');

  // ── Comment state ──
  const [showComments,    setShowComments]    = useState(false);
  const [comments,        setComments]        = useState<Comment[]>([]);
  const [commentsLoaded,  setCommentsLoaded]  = useState(false);
  const [cEmail,          setCEmail]          = useState('');
  const [cName,           setCName]           = useState('');
  const [cBody,           setCBody]           = useState('');
  const [submitting,      setSubmitting]      = useState(false);
  const [justPosted,      setJustPosted]      = useState(false);
  const [formError,       setFormError]       = useState('');

  // ── On mount / user change: prefer Google auth over localStorage ──
  useEffect(() => {
    const authEmail = user?.email ?? '';
    const authName  = (user?.user_metadata?.full_name as string | undefined) ?? '';
    const storedEmail = authEmail || (localStorage.getItem(EMAIL_KEY) ?? '');
    const storedName  = authName  || (localStorage.getItem(NAME_KEY)  ?? '');
    setCEmail(storedEmail);
    setCName(storedName);
    setLikeEmailInput(storedEmail);
    loadLikes(storedEmail);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, user?.email]);

  async function loadLikes(storedEmail: string) {
    if (!supabase) return;
    const { count } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('page_id', pageId);
    setLikeCount(count ?? 0);

    if (storedEmail) {
      const { data } = await supabase
        .from('likes')
        .select('email')
        .eq('page_id', pageId)
        .eq('email', storedEmail)
        .maybeSingle();
      setUserLiked(!!data);
    }
  }

  async function loadComments() {
    if (!supabase) return;
    const { data } = await supabase
      .from('comments')
      .select('id, email, name, body, created_at')
      .eq('page_id', pageId)
      .order('created_at', { ascending: true });
    setComments(data ?? []);
    setCommentsLoaded(true);
  }

  // ── Like toggle ──
  async function toggleLike(email: string) {
    if (!supabase || !isValidEmail(email)) return;
    setLikeLoading(true);
    if (userLiked) {
      await supabase.from('likes').delete()
        .eq('page_id', pageId).eq('email', email);
      setUserLiked(false);
      setLikeCount(n => Math.max(0, n - 1));
    } else {
      const { error } = await supabase.from('likes').insert({ page_id: pageId, email });
      if (!error) {
        setUserLiked(true);
        setLikeCount(n => n + 1);
        localStorage.setItem(EMAIL_KEY, email);
        setCEmail(email);
        setLikeEmailInput(email);
      }
    }
    setLikeLoading(false);
    setShowLikeInput(false);
  }

  function handleLikeClick() {
    // If signed in with Google, use their email directly — no prompt needed
    if (user?.email) { toggleLike(user.email); return; }
    const stored = localStorage.getItem(EMAIL_KEY);
    if (stored) { toggleLike(stored); return; }
    setShowLikeInput(v => !v);
  }

  // ── Submit comment ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!isValidEmail(cEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!cBody.trim()) {
      setFormError('Please write something before submitting.');
      return;
    }
    if (!supabase) { setFormError('Comments unavailable right now.'); return; }

    setSubmitting(true);
    const { error } = await supabase.from('comments').insert({
      page_id: pageId,
      email: cEmail.trim().toLowerCase(),
      name:  cName.trim() || null,
      body:  cBody.trim(),
    });
    if (error) {
      setFormError('Something went wrong. Please try again.');
    } else {
      localStorage.setItem(EMAIL_KEY, cEmail.trim().toLowerCase());
      if (cName.trim()) localStorage.setItem(NAME_KEY, cName.trim());
      setCBody('');
      setJustPosted(true);
      setLikeEmailInput(cEmail.trim().toLowerCase());
      await loadComments();
      setTimeout(() => setJustPosted(false), 3000);
    }
    setSubmitting(false);
  }

  const likedStyle = userLiked
    ? isWayne ? 'border-indigo-300 bg-indigo-50' : 'border-pink-300 bg-pink-50'
    : 'border-slate-200 bg-white hover:border-slate-300';

  const heartStyle = userLiked
    ? isWayne ? 'fill-indigo-600 text-indigo-600' : 'fill-pink-500 text-pink-500'
    : 'text-slate-400';

  if (!supabase) return null; // Silently absent until env vars are configured

  return (
    <div className="mt-16 border-t border-slate-100 pt-10 space-y-5">

      {/* ── Action row ── */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Like button */}
        <button
          onClick={handleLikeClick}
          disabled={likeLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all disabled:opacity-50 ${likedStyle}`}
        >
          <Heart className={`w-4 h-4 transition-all ${heartStyle}`} />
          <span className={`text-sm font-semibold ${userLiked ? accentText : 'text-slate-500'}`}>
            {likeCount > 0 ? `${likeCount} ` : ''}{userLiked ? 'Liked' : 'Like'}
          </span>
        </button>

        {/* Comment button */}
        <button
          onClick={() => {
            if (!showComments) { setShowComments(true); if (!commentsLoaded) loadComments(); }
            else setShowComments(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-500">
            {commentsLoaded && comments.length > 0
              ? `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`
              : 'Comment'}
          </span>
          {showComments
            ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      </div>

      {/* ── Like email prompt ── */}
      <AnimatePresence>
        {showLikeInput && !userLiked && (
          <motion.form
            key="like-prompt"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            onSubmit={e => { e.preventDefault(); toggleLike(likeEmailInput.trim()); }}
            className={`flex gap-2 items-center p-3 rounded-xl border ${accentBorder} ${accentBg}`}
          >
            <input
              type="email"
              autoFocus
              value={likeEmailInput}
              onChange={e => setLikeEmailInput(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-slate-400 min-w-0"
            />
            <button
              type="submit"
              disabled={!likeEmailInput.trim() || likeLoading}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors disabled:opacity-50 ${accentBtn}`}
            >
              Like
            </button>
            <button
              type="button"
              onClick={() => setShowLikeInput(false)}
              className="text-slate-400 hover:text-slate-600 text-sm px-1 shrink-0"
            >
              ✕
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* ── Comments + form ── */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 overflow-hidden"
          >
            {/* Existing comments */}
            {commentsLoaded && comments.length > 0 && (
              <div className="space-y-5">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-3">
                    <Avatar name={c.name} email={c.email} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-slate-800">
                          {displayName(c.name, c.email)}
                        </span>
                        <span className="text-xs text-slate-400">{timeAgo(c.created_at)}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {commentsLoaded && comments.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">
                No comments yet — be the first!
              </p>
            )}

            {/* Comment form */}
            <form
              onSubmit={handleSubmit}
              className={`border ${accentBorder} rounded-2xl p-5 space-y-3 bg-white`}
            >
              <p className={`text-xs font-bold uppercase tracking-wide ${accentText}`}>
                Leave a comment
              </p>

              {/* Email + name — hidden when signed in with Google */}
              {user ? (
                <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${accentBorder} ${accentBg}`}>
                  {user.user_metadata?.avatar_url && (
                    <img src={user.user_metadata.avatar_url as string} alt="" className="w-7 h-7 rounded-full" referrerPolicy="no-referrer" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{cName || emailPrefix(cEmail)}</p>
                    <p className="text-[10px] text-slate-400 truncate">{cEmail}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-slate-400">via Google</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    value={cEmail}
                    onChange={e => setCEmail(e.target.value)}
                    placeholder="Email (required)"
                    className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-slate-400 placeholder-slate-400 w-full"
                  />
                  <input
                    type="text"
                    value={cName}
                    onChange={e => setCName(e.target.value)}
                    placeholder={cEmail ? `Name (or: ${emailPrefix(cEmail)})` : 'Name (optional)'}
                    className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-slate-400 placeholder-slate-400 w-full"
                  />
                </div>
              )}

              <textarea
                required
                value={cBody}
                onChange={e => setCBody(e.target.value)}
                placeholder="What do you think?"
                rows={3}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-slate-400 placeholder-slate-400 w-full resize-none"
              />

              {/* Honeypot — bots fill this, humans don't */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
              />

              {formError && (
                <p className="text-red-500 text-xs">{formError}</p>
              )}

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Your email is never shown publicly.
                </p>
                <button
                  type="submit"
                  disabled={submitting || !cBody.trim() || !cEmail.trim()}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl transition-colors disabled:opacity-50 shrink-0 ${accentBtn}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Posting…' : justPosted ? 'Posted!' : 'Post'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
