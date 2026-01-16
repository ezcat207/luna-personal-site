import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/', color: 'bg-highlighter-pink', rotate: '-rotate-2' },
        { name: 'Portfolio', path: '/portfolio', color: 'bg-highlighter-yellow', rotate: 'rotate-1' },
        { name: 'Future', path: '/future', color: 'bg-paper', rotate: '-rotate-1' },
        { name: 'Life', path: '/life', color: 'bg-highlighter-green', rotate: 'rotate-2' },
    ];

    return (
        <nav className="fixed -top-1 left-0 right-0 z-50 pointer-events-none">
            <div className="max-w-4xl mx-auto px-4 relative h-16 pointer-events-auto">
                {/* Desktop Tabs */}
                <div className="hidden md:flex absolute top-0 left-10 gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `px-6 py-3 rounded-b-lg shadow-md font-bold text-ink cursor-pointer hover:translate-y-2 transition-transform ${link.color} ${link.rotate} ${isActive ? 'translate-y-2 shadow-inner' : ''}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

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

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-16 left-4 right-4 bg-paper shadow-xl rounded-xl p-4 rotate-1 border-2 border-dashed border-pencil/20 pointer-events-auto"
                    >
                        <div className="flex flex-col gap-4">
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg font-bold text-center ${link.color} ${isActive ? 'ring-2 ring-ink ring-offset-1' : ''}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
