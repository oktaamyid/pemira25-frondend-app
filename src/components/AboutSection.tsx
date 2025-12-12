'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Vote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
     const highlights = [
          {
               icon: Vote,
               title: 'Demokratis',
               description:
                    'Menjunjung tinggi asas demokrasi di mana setiap suara mahasiswa memiliki nilai yang sama untuk menentukan masa depan.',
          },
          {
               icon: ShieldCheck,
               title: 'Jujur & Adil',
               description:
                    'Proses pemilihan yang dilaksanakan dengan integritas tinggi, bebas dari kecurangan, dan adil bagi seluruh kandidat.',
          },
          {
               icon: Users,
               title: 'Transparan',
               description:
                    'Seluruh tahapan, mulai dari pendaftaran hingga penghitungan suara, dilakukan secara terbuka dan dapat diawasi bersama.',
          },
     ];

     return (
          <section className="container mx-auto px-4 py-12">
               <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Side: Content */}
                    <motion.div
                         initial={{ opacity: 0, x: -30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.6 }}
                         className="lg:w-1/2"
                    >
                         <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-semibold tracking-wide">
                              TENTANG KAMI
                         </div>
                         <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tigher">
                              Apa Itu <span className="text-primary">PEMIRA?</span>
                         </h2>
                         <p className="text-lg text-neutral-slate mb-6 leading-relaxed">
                              Pemilihan Raya Mahasiswa (PEMIRA) STT Terpadu Nurul Fikri adalah pesta demokrasi terbesar di lingkungan kampus.
                              Momentum ini diselenggarakan setiap tahun untuk memilih para pemimpin lembaga mahasiswa yang akan membawa perubahan positif.
                         </p>
                         <p className="text-neutral-slate leading-relaxed">
                              Melalui PEMIRA, kita belajar berdemokrasi, menentukan arah kebijakan organisasi, dan melahirkan pemimpin-pemimpin
                              yang berintegritas serta kompeten untuk mewujudkan visi misi kampus tercinta.
                         </p>
                    </motion.div>

                    {/* Right Side: Highlights Grid */}
                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                         {highlights.map((item, index) => {
                              const Icon = item.icon;
                              return (
                                   <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                   >
                                        <Card className="h-full bg-surface border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                             <CardContent className="p-6">
                                                  <div className="w-12 h-12 rounded-xl bg-neutral-cream text-primary flex items-center justify-center mb-4">
                                                       <Icon size={24} />
                                                  </div>
                                                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                                  <p className="text-sm text-neutral-slate leading-relaxed">
                                                       {item.description}
                                                  </p>
                                             </CardContent>
                                        </Card>
                                   </motion.div>
                              )
                         })}
                         {/* Decorative Card / Image Placeholder or just empty space handled by grid */}
                         <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl bg-linear-to-br from-primary to-primary-light text-white shadow-xl"
                         >
                              <Vote size={48} className="mb-4 opacity-80" />
                              <p className="text-center font-semibold text-lg">Suaramu, Masa Depanmu!</p>
                         </motion.div>
                    </div>
               </div>
          </section>
     );
}
