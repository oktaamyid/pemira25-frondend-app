'use client';

import { useState } from 'react';
import { MessageCircle, X, User, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FloatingChat() {
     const [isOpen, setIsOpen] = useState(false);

     const toggleOpen = () => setIsOpen((prev) => !prev);

     const contactOptions = [
          {
               label: 'Humas',
               icon: User,
               // Placeholder number for Humas
               href: 'https://wa.me/6281234567890',
               color: 'bg-green-500 hover:bg-green-600',
          },
          {
               label: 'IT Support',
               icon: ShieldCheck,
               // Placeholder number for IT Support
               href: 'https://wa.me/6280987654321',
               color: 'bg-blue-500 hover:bg-blue-600',
          },
     ];

     return (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
               <AnimatePresence>
                    {isOpen && (
                         <motion.div
                              initial={{ opacity: 0, y: 20, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 20, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col gap-3 mb-2"
                         >
                              <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-4 w-60 overflow-hidden">
                                   <h3 className="text-sm font-semibold text-primary mb-3 text-center border-b border-gray-100 pb-2">
                                        Hubungi Kami
                                   </h3>
                                   <div className="flex flex-col gap-2">
                                        {contactOptions.map((option) => {
                                             const Icon = option.icon;
                                             return (
                                                  <a
                                                       key={option.label}
                                                       href={option.href}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className={`flex items-center gap-3 w-full p-2.5 rounded-lg text-white transition-colors duration-200 ${option.color} shadow-sm group`}
                                                  >
                                                       <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                                                            <Icon size={18} />
                                                       </div>
                                                       <span className="font-medium text-sm">{option.label}</span>
                                                  </a>
                                             );
                                        })}
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               <button
                    onClick={toggleOpen}
                    className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 ${isOpen ? 'bg-neutral-slate rotate-90' : 'bg-primary hover:bg-primary-light hover:scale-105'
                         }`}
                    aria-label={isOpen ? 'Close chat options' : 'Open chat options'}
               >
                    {isOpen ? (
                         <X className="text-white" size={24} />
                    ) : (
                         <MessageCircle className="text-white animate-pulse-slow" size={28} />
                    )}
               </button>
          </div>
     );
}
