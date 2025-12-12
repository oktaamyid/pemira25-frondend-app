"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
     const pathname = usePathname();

     const navItems = [
          { name: "Beranda", path: "/" },
          { name: "Kandidat", path: "/candidates" },
          { name: "Vote", path: "/vote" },
          { name: "Hasil", path: "/results" },
     ];

     return (
          <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
               <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-6 py-3 flex items-center gap-2 md:gap-8"
               >
                    <Link href="/" className="font-bold text-primary mr-2 md:mr-4 flex items-center gap-2">
                         <Image src="/pemira-logo.png" alt="Logo" width={24} height={24} />
                         <span className="hidden md:inline">PEMIRA</span>
                    </Link>

                    <div className="flex items-center gap-1 bg-neutral-cream/50 p-1 rounded-full">
                         {navItems.map((item) => {
                              const isActive = pathname === item.path;
                              return (
                                   <Link
                                        key={item.path}
                                        href={item.path}
                                        className={cn(
                                             "relative px-4 py-2 rounded-full text-sm font-medium transition-colors z-10",
                                             isActive ? "text-white" : "text-neutral-slate hover:text-primary"
                                        )}
                                   >
                                        {isActive && (
                                             <motion.div
                                                  layoutId="nav-pill"
                                                  className="absolute inset-0 bg-primary rounded-full -z-10"
                                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                             />
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                   </Link>
                              );
                         })}
                    </div>
               </motion.nav>
          </div>
     );
}
