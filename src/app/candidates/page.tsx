/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import CandidateCard from "@/components/CandidateCard";
import { api } from "@/lib/api";
import { motion } from "framer-motion";

export default function CandidatesPage() {
     const [candidatesData, setCandidatesData] = useState<any[]>([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          api.getCandidates().then(data => {
               const mapped = data.map((c: any) => ({
                    id: c.orderNumber, // Use orderNumber for display 1, 2, ...
                    uuid: c.id, // Keep actual ID for reference
                    president: {
                         name: c.name.split('&')[0]?.trim() || c.name,
                         photo: c.photoUrl || '/placeholder.png',
                         major: '-',
                         batch: '-'
                    },
                    vicePresident: {
                         name: c.name.split('&')[1]?.trim() || '',
                         photo: c.photoUrl || '/placeholder.png', // Fallback to same photo or placeholder
                         major: '-',
                         batch: '-'
                    },
                    vision: c.vision,
                    mission: c.mission.split('\n')
               })).sort((a: any, b: any) => a.id - b.id);
               setCandidatesData(mapped);
               setIsLoading(false);
          }).catch(err => {
               console.error(err);
               setIsLoading(false);
          });
     }, []);

     if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

     return (
          <div className="container mx-auto px-4 py-24">
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
               >
                    <h1 className="text-4xl font-bold mb-6 text-slate-900">Kandidat Ketua & Wakil BEM</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                         Kenali calon pemimpinmu. Pelajari visi, misi, dan program kerja mereka sebelum menentukan pilihan.
                    </p>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {candidatesData.map((candidate, index) => (
                         <motion.div
                              key={candidate.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 }}
                         >
                              <CandidateCard candidate={candidate} />
                         </motion.div>
                    ))}
               </div>
          </div>
     );
}

