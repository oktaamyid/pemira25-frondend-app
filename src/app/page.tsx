"use client";

import { useEffect, useState } from "react"; // Added hooks
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeline } from "@/lib/data"; // stats removed, we fetch it
import { api } from "@/lib/api"; // Import API
import AboutSection from "@/components/AboutSection";
import { Calendar, Users, Vote, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
     const [stats, setStats] = useState({
          totalVoters: 0,
          votesCast: 0,
          turnout: "0%"
     });

     useEffect(() => {
          api.getStats().then(data => setStats(data)).catch(err => console.error(err));
     }, []);

     return (
          <div className="flex flex-col gap-24 pb-24">
               {/* Hero Section */}
               <section className="relative pt-20 md:pt-32 px-4 text-center pb-8 overflow-hidden">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8 }}
                         className="max-w-4xl mx-auto z-10 relative"
                    >
                         <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/50 text-primary text-sm font-bold tracking-wide border border-primary/10">
                              PEMIRA STTNF 2025
                         </div>
                         <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 leading-tight">
                              Suaramu Menentukan <br />
                              <span className="text-primary">Masa Depan Kampus</span>
                         </h1>
                         <p className="text-xl text-neutral-slate mb-10 max-w-2xl mx-auto leading-relaxed">
                              Mari wujudkan demokrasi yang jujur, adil, dan transparan.
                              Gunakan hak pilihmu untuk STT Terpadu Nurul Fikri yang lebih baik.
                         </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                              <Link href="/vote">
                                   <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-primary hover:bg-primary-light shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                        Vote Sekarang <ChevronRight className="ml-2 h-5 w-5" />
                                   </Button>
                              </Link>
                              <Link href="/candidates">
                                   <Button size="lg" variant="ghost" className="rounded-full text-lg h-14 px-8 text-neutral-slate hover:text-primary hover:bg-white/50">
                                        Lihat Kandidat
                                   </Button>
                              </Link>
                         </div>
                    </motion.div>

                    {/* Background Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/30 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
               </section>


               {/* Stats Section */}
               <section className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 }}
                         >
                              <Card className="bg-surface shadow-xl shadow-slate-200/50 border-slate-100 hover:border-primary/20 transition-colors group">
                                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-neutral-slate">Total Pemilih</CardTitle>
                                        <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                   </CardHeader>
                                   <CardContent>
                                        <div className="text-4xl font-bold text-slate-900">{stats.totalVoters}</div>
                                        <p className="text-xs text-slate-400 mt-1">Mahasiswa aktif</p>
                                   </CardContent>
                              </Card>
                         </motion.div>
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                         >
                              <Card className="bg-surface shadow-xl shadow-slate-200/50 border-slate-100 hover:border-green-100 transition-colors group">
                                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-neutral-slate">Suara Masuk</CardTitle>
                                        <Vote className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                                   </CardHeader>
                                   <CardContent>
                                        <div className="text-4xl font-bold text-slate-900">{stats.votesCast}</div>
                                        <p className="text-xs text-slate-400 mt-1">Telah menggunakan hak pilih</p>
                                   </CardContent>
                              </Card>
                         </motion.div>
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                         >
                              <Card className="bg-surface shadow-xl shadow-slate-200/50 border-slate-100 hover:border-secondary/50 transition-colors group">
                                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-neutral-slate">Partisipasi</CardTitle>
                                        <TrendingUp className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                                   </CardHeader>
                                   <CardContent>
                                        <div className="text-4xl font-bold text-slate-900">{stats.turnout}</div>
                                        <p className="text-xs text-slate-400 mt-1">Dari total pemilih</p>
                                   </CardContent>
                              </Card>
                         </motion.div>
                    </div>
               </section>
               {/* About Section */}
               <AboutSection />

               {/* Timeline Section */}
               <section className="container mx-auto px-4">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold mb-4 text-slate-900">Jadwal PEMIRA</h2>
                         <p className="text-neutral-slate">Catat tanggal-tanggal penting berikut ini</p>
                    </div>
                    <div className="grid md:grid-cols-5 gap-6">
                         {timeline.map((item, index) => (
                              <motion.div
                                   key={index}
                                   initial={{ opacity: 0, scale: 0.9 }}
                                   whileInView={{ opacity: 1, scale: 1 }}
                                   viewport={{ once: true }}
                                   transition={{ delay: index * 0.1 }}
                                   className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                              >
                                   <div className="w-14 h-14 rounded-2xl bg-neutral-cream text-primary flex items-center justify-center mb-4 rotate-3 group-hover:rotate-6 transition-transform">
                                        <Calendar className="h-7 w-7" />
                                   </div>
                                   <h3 className="font-bold text-slate-900 mb-2">{item.event}</h3>
                                   <p className="text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full">{item.date}</p>
                              </motion.div>
                         ))}
                    </div>
               </section>

               {/* CTA Section */}
               <section className="container mx-auto px-4">
                    <div className="bg-primary rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                         <div className="relative z-10 max-w-2xl mx-auto">
                              <h2 className="text-4xl font-bold mb-6">Jangan Golput!</h2>
                              <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                                   Satu suara anda sangat berarti untuk kemajuan kampus kita tercinta.
                                   Gunakan hak pilih anda dengan bijak sekarang juga.
                              </p>
                              <Link href="/vote">
                                   <Button size="lg" className="bg-secondary text-primary hover:bg-secondary-hover font-bold h-14 px-10 rounded-full text-lg shadow-xl shadow-black/10">
                                        Mulai Voting
                                   </Button>
                              </Link>
                         </div>
                    </div>
               </section>
          </div>
     );
}
