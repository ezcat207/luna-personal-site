
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen pt-24 font-note text-ink">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 pb-20">
                <Outlet />
            </main>
            <footer className="text-center py-12 space-y-4 opacity-60">
                <div className="flex justify-center gap-4 text-3xl">
                    <span className="rotate-12 block">🚀</span>
                    <span className="rotate-[-10deg] block">🎨</span>
                    <span className="rotate-6 block">💻</span>
                </div>
                <p className="font-handwritten">Built with ❤️ and 🤖 | Journal Version 3.0</p>
                <p className="text-xs font-mono">Prop of Luna. Keep out (unless you're Wayne or a friendly robot).</p>
            </footer>
        </div>
    );
};

export default Layout;
