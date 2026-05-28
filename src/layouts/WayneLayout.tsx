import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, BookOpen, Map, Home, Lightbulb, Wrench, GraduationCap, Laugh } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import i18n from '../i18n';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const hubSubdomain = import.meta.env.PROD
  ? 'https://bunnyuniverse.com'
  : '/?persona=hub';

const NAV_ITEMS = [
  { key: 'home',     path: '/wayne',          icon: Home,         end: true  },
  { key: 'plans',    path: '/wayne/plans',     icon: BookOpen,     end: false },
  { key: 'insights', path: '/wayne/insights',  icon: Lightbulb,    end: false },
  { key: 'courses',  path: '/wayne/courses',   icon: GraduationCap,end: false },
  { key: 'comics',   path: '/wayne/comics',    icon: Laugh,        end: false },
  { key: 'tools',    path: '/wayne/tools',     icon: Wrench,       end: false },
  { key: 'roadmap',  path: '/wayne/roadmap',   icon: Map,          end: false },
];

function LangToggle() {
  const { t } = useTranslation();
  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(next);
    try { localStorage.setItem('wayne-lang', next); } catch { /* ignore */ }
  };
  return (
    <button
      onClick={toggleLang}
      className="text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors select-none"
      title="Switch language"
    >
      {t('wayne_nav.lang_switch_to')}
    </button>
  );
}

const WayneNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link to="/wayne" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
              <span className="font-semibold text-slate-800 text-sm tracking-tight">Wayne's Plans</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {t(`wayne_nav.${item.key}`)}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right: Lang toggle + Luna link + Hub */}
          <div className="hidden md:flex items-center gap-3">
            <LangToggle />
            <a
              href={lunaSubdomain}
              className="text-xs text-pink-500 hover:text-pink-700 font-medium transition-colors"
            >
              🐰 {t('wayne_nav.luna_link')}
            </a>
            <a
              href={hubSubdomain}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {t('wayne_nav.hub_link')}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1"
          >
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {t(`wayne_nav.${item.key}`)}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-4 px-3">
              <a href={lunaSubdomain} className="text-xs text-pink-500">🐰 {t('wayne_nav.luna_link')}</a>
              <a href={hubSubdomain} className="text-xs text-slate-400">{t('wayne_nav.hub_link')}</a>
              <div className="ml-auto">
                <LangToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const WayneLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <SEOHead />
      <WayneNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <span>Wayne's Plans · <a href={hubSubdomain} className="hover:text-slate-600">{t('wayne_nav.hub_link')}</a></span>
          <span>{t('wayne_nav.footer_tagline')}</span>
        </div>
      </footer>
    </div>
  );
};

export default WayneLayout;
