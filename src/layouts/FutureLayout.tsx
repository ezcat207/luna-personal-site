import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const hubSubdomain = import.meta.env.PROD
  ? 'https://bunnyuniverse.com'
  : '/?persona=hub';

const FutureNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ background: '#120a1f', borderBottom: '1px solid #2a1c44', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg,#ff2e88,#ffe14d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1c1233', fontWeight: 700,
              fontFamily: "'Press Start 2P', monospace", fontSize: 11,
            }}>L</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>
              luna<span style={{ color: '#ff2e88' }}>&</span>wayne
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="lw-desktop-nav">
            <a href="#test" style={{ color: '#b6a3d6', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>AI Age</a>
            <a href="#tools" style={{ color: '#b6a3d6', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Tools</a>
            <a href="#courses" style={{ color: '#b6a3d6', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Courses</a>
            <a href={hubSubdomain} style={{ color: '#8b6fb0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 13, textDecoration: 'none' }}>← Hub</a>
            <a href="#test" style={{
              background: '#ff2e88', color: '#fff', fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
              padding: '9px 20px', borderRadius: 999, textDecoration: 'none',
              boxShadow: '0 4px 0 #b81e63',
            }}>Play free</a>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#b6a3d6', cursor: 'pointer', padding: 8, display: 'none' }}
            className="lw-mobile-burger"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ background: '#1c1233', borderTop: '1px solid #2a1c44', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {['#test:AI Age', '#tools:Tools', '#courses:Courses'].map(item => {
              const [href, label] = item.split(':');
              return (
                <a key={href} href={href} onClick={() => setMobileOpen(false)}
                  style={{ color: '#b6a3d6', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 15, textDecoration: 'none', padding: '8px 0' }}>
                  {label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .lw-desktop-nav { display: none !important; }
          .lw-mobile-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
};

const FutureLayout = () => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', background: '#120a1f', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEOHead />
      <FutureNav />
      <main style={{ paddingTop: 64 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer style={{ borderTop: '1px solid #2a1c44', background: '#0d0717', padding: '32px 40px', textAlign: 'center' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8b6fb0', letterSpacing: 1 }}>
          luna&amp;wayne · AI Education for the Future
        </span>
      </footer>
    </div>
  );
};

export default FutureLayout;
