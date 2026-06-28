import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AuthButton } from '../components/AuthButton';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/todo/today', label: "Today's Plan", icon: '📅' },
  { path: '/todo/focus', label: 'Pomodoro', icon: '🍅' },
  { path: '/todo/review', label: 'Daily Review', icon: '📝' },
];

export default function TodoLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/todo/today" className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-slate-900">Log</h1>
                <p className="text-xs text-slate-500 -mt-1">Todo Star</p>
              </div>
            </Link>
          </div>

          {/* Right side: Auth + Settings */}
          <div className="flex items-center gap-2">
            <AuthButton />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-60 min-h-[calc(100vh-4rem)] bg-slate-50 border-r border-slate-200">
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive(item.path)
                    ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700 font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Back to Learning Log */}
          <div className="p-4 mt-8 border-t border-slate-200">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <span>←</span>
              <span>Back to Learning Log</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 lg:hidden overflow-y-auto">
              <nav className="p-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive(item.path)
                        ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-100'
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Back to Learning Log */}
              <div className="p-4 mt-8 border-t border-slate-200">
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <span>←</span>
                  <span>Back to Learning Log</span>
                </Link>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
