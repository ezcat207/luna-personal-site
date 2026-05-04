import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePersona } from '../hooks/usePersona';

const wayneSubdomain = import.meta.env.PROD
  ? 'https://wayne.bunnyuniverse.com'
  : '/?persona=wayne';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const hubSubdomain = import.meta.env.PROD
  ? 'https://bunnyuniverse.com'
  : '/?persona=hub';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const persona = usePersona();

  const wayneLinkClass = (isActive: boolean) =>
    `px-6 py-3 rounded-b-lg shadow-md font-bold text-ink cursor-pointer hover:translate-y-2 transition-transform bg-highlighter-blue ${isActive ? 'translate-y-2 shadow-inner' : ''}`;
  const lunaLinkClass = (isActive: boolean) =>
    `px-6 py-3 rounded-b-lg shadow-md font-bold text-ink cursor-pointer hover:translate-y-2 transition-transform bg-highlighter-pink ${isActive ? 'translate-y-2 shadow-inner' : ''}`;

  const hubLinks = [
    { name: t('nav.home'), path: '/', color: 'bg-paper', rotate: '-rotate-1' },
    { name: `🐱 ${t('hub.wayne_title')}`, href: wayneSubdomain, color: 'bg-highlighter-blue', rotate: 'rotate-1' },
    { name: `🐰 ${t('hub.luna_title')}`, href: lunaSubdomain, color: 'bg-highlighter-pink', rotate: '-rotate-1' },
  ];

  const wayneLinks = [
    { name: t('nav.home'), path: '/wayne', cls: wayneLinkClass },
    { name: t('nav.plans'), path: '/wayne/all', cls: wayneLinkClass },
  ];

  const lunaLinks = [
    { name: t('nav.home'), path: '/luna', cls: lunaLinkClass },
    { name: t('nav.journey'), path: '/luna/all', cls: lunaLinkClass },
  ];

  const renderBrand = () => {
    if (persona === 'wayne') {
      return (
        <a href={hubSubdomain} className="absolute top-0 right-4 px-4 py-3 rounded-b-lg bg-white/80 shadow-sm font-header text-lg text-blue-600 hover:translate-y-1 transition-transform">
          🐰 Bunny Universe
        </a>
      );
    }
    if (persona === 'luna') {
      return (
        <a href={hubSubdomain} className="absolute top-0 right-4 px-4 py-3 rounded-b-lg bg-white/80 shadow-sm font-header text-lg text-pink-500 hover:translate-y-1 transition-transform">
          🐰 Bunny Universe
        </a>
      );
    }
    return null;
  };

  return (
    <nav className="fixed -top-1 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 relative h-16 pointer-events-auto">

        {/* Desktop Tabs */}
        <div className="hidden md:flex absolute top-0 left-10 gap-2">
          {persona === 'hub' && hubLinks.map(link => (
            link.href ? (
              <a
                key={link.name}
                href={link.href}
                className={`px-6 py-3 rounded-b-lg shadow-md font-bold text-ink cursor-pointer hover:translate-y-2 transition-transform ${link.color} ${link.rotate}`}
              >
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.path!}
                end
                className={({ isActive }) =>
                  `px-6 py-3 rounded-b-lg shadow-md font-bold text-ink cursor-pointer hover:translate-y-2 transition-transform ${link.color} ${link.rotate} ${isActive ? 'translate-y-2 shadow-inner' : ''}`
                }
              >
                {link.name}
              </NavLink>
            )
          ))}

          {persona === 'wayne' && wayneLinks.map(link => (
            <NavLink key={link.name} to={link.path} end className={({ isActive }) => link.cls(isActive)}>
              {link.name}
            </NavLink>
          ))}

          {persona === 'luna' && lunaLinks.map(link => (
            <NavLink key={link.name} to={link.path} end className={({ isActive }) => link.cls(isActive)}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Brand back-link (for wayne/luna subdomains) */}
        {renderBrand()}

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute top-4 right-4 pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-paper p-2 rounded-lg shadow-md rotate-1 text-ink"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-4 right-4 bg-paper shadow-xl rounded-xl p-4 rotate-1 border-2 border-dashed border-pencil/20 pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              {persona === 'hub' && hubLinks.map(link => (
                link.href ? (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-lg font-bold text-center ${link.color}`}>
                    {link.name}
                  </a>
                ) : (
                  <NavLink key={link.name} to={link.path!} end onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `px-4 py-2 rounded-lg font-bold text-center ${link.color} ${isActive ? 'ring-2 ring-ink ring-offset-1' : ''}`}>
                    {link.name}
                  </NavLink>
                )
              ))}

              {persona === 'wayne' && wayneLinks.map(link => (
                <NavLink key={link.name} to={link.path} end onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `px-4 py-2 rounded-lg font-bold text-center bg-highlighter-blue ${isActive ? 'ring-2 ring-ink ring-offset-1' : ''}`}>
                  {link.name}
                </NavLink>
              ))}

              {persona === 'luna' && lunaLinks.map(link => (
                <NavLink key={link.name} to={link.path} end onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `px-4 py-2 rounded-lg font-bold text-center bg-highlighter-pink ${isActive ? 'ring-2 ring-ink ring-offset-1' : ''}`}>
                  {link.name}
                </NavLink>
              ))}

              <a href={hubSubdomain} className="px-4 py-2 rounded-lg font-bold text-center bg-paper border border-pencil/20 text-pencil text-sm">
                🐰 Bunny Universe Hub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
