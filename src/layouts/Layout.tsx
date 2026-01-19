
import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen pt-24 font-note text-ink overflow-x-hidden">
            <CustomCursor />
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 pb-20">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <Outlet />
                </motion.div>
            </main>
            <footer className="text-center py-12 space-y-4 opacity-60">
                <div className="flex justify-center gap-4 text-3xl">
                    <span className="animate-bounce" style={{ animationDelay: '0s' }}>🚀</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎨</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💻</span>
                </div>
                <p className="font-handwritten">Built with ❤️ and 🤖 | Journal Version 3.1</p>
                <p className="text-xs font-mono">Prop of Luna. Keep out (unless you're Wayne or a friendly robot).</p>
            </footer>
        </div>
    );
};

export default Layout;
