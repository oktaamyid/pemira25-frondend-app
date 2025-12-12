/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Candidate {
     id: number | string;
     name: string;
     photo_url: string;
}

export default function VotePage() {
     const [candidates, setCandidates] = useState<any[]>([]);
     const [selectedId, setSelectedId] = useState<number | string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isSuccess, setIsSuccess] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState("");
     const router = useRouter();

     useEffect(() => {
          // Auth Check
          const token = localStorage.getItem("token");
          if (!token) {
               router.push("/login?redirect=/vote");
               return;
          }

          // Check if already voted
          api.getVoteStatus(token).then(status => {
               if (status.hasVoted) {
                    setIsSuccess(true); // Show success/already voted screen
               }
          });

          // Fetch Candidates
          api.getCandidates().then(data => {
               setCandidates(data);
               setIsLoading(false);
          }).catch(err => {
               console.error(err);
               setError("Gagal memuat kandidat. Pastikan backend berjalan.");
               setIsLoading(false);
          });
     }, [router]);

     const handleVote = async () => {
          if (!selectedId) return;

          setIsSubmitting(true);
          try {
               const token = localStorage.getItem("token");
               if (!token) throw new Error("No token");

               await api.vote(selectedId.toString(), token);
               setIsSuccess(true);
          } catch (err: any) {
               alert(err.message || "Gagal memilih");
          } finally {
               setIsSubmitting(false);
          }
     };

     if (isSuccess) {
          return (
               <div className="container mx-auto px-4 py-32 text-center min-h-[60vh] flex items-center justify-center">
                    <motion.div
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="max-w-md w-full bg-surface p-10 rounded-3xl shadow-2xl shadow-blue-100 border border-blue-50"
                    >
                         <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                              <CheckCircle2 className="h-12 w-12" />
                         </div>
                         <h2 className="text-3xl font-bold mb-4 text-slate-900">Terima Kasih!</h2>
                         <p className="text-neutral-slate mb-10 text-lg">
                              Suara anda telah berhasil direkam. Terima kasih telah berpartisipasi dalam PEMIRA STTNF 2025.
                         </p>
                         <Button onClick={() => window.location.href = "/"} className="w-full h-12 text-lg rounded-full bg-primary hover:bg-primary-light">
                              Kembali ke Beranda
                         </Button>
                    </motion.div>
               </div>
          );
     }

     if (isLoading) {
          return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
     }

     if (error) {
          return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
     }

     return (
          <div className="container mx-auto px-4 py-24 pb-32">
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
               >
                    <h1 className="text-4xl font-bold mb-6 text-slate-900">Bilik Suara Digital</h1>
                    <p className="text-neutral-slate text-lg">
                         Silakan pilih salah satu pasangan calon di bawah ini.
                    </p>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                    {candidates.map((candidate) => (
                         <motion.div
                              key={candidate.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedId(candidate.id)}
                              className={cn(
                                   "cursor-pointer transition-all duration-300 relative",
                                   selectedId === candidate.id ? "ring-4 ring-primary ring-offset-4 rounded-2xl" : "opacity-80 hover:opacity-100"
                              )}
                         >
                              <Card className="overflow-hidden h-full border-none shadow-xl shadow-slate-200/50 rounded-2xl bg-surface">
                                   {/* Customized layout heavily to match single-photo backend limitation */}
                                   <div className="relative aspect-video bg-neutral-cream w-full overflow-hidden">
                                        <Image
                                             src={candidate.photo_url || "/placeholder.jpg"}
                                             alt={candidate.name}
                                             fill
                                             className="object-cover"
                                        />
                                   </div>
                                   <div className="p-6 text-center bg-surface">
                                        <h3 className="font-bold text-xl text-slate-900">No. Urut {candidate.order_number}</h3>
                                        <p className="text-lg font-semibold mt-2">{candidate.name}</p>
                                        <p className="text-sm text-neutral-slate mt-2 italic line-clamp-2">{candidate.vision}</p>
                                   </div>

                                   {selectedId === candidate.id && (
                                        <motion.div
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg z-10"
                                        >
                                             <CheckCircle2 className="h-6 w-6" />
                                        </motion.div>
                                   )}
                              </Card>
                         </motion.div>
                    ))}
               </div>

               <AnimatePresence>
                    {selectedId && (
                         <motion.div
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 100, opacity: 0 }}
                              className="fixed bottom-8 left-0 right-0 px-4 z-40"
                         >
                              <div className="container mx-auto max-w-xl bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl border border-blue-100 flex items-center justify-between pl-8">
                                   <div className="text-sm font-medium text-slate-600">
                                        Pilihan Anda: <span className="font-bold text-primary">No. {candidates.find(c => c.id === selectedId)?.order_number}</span>
                                   </div>
                                   <Button
                                        size="lg"
                                        disabled={isSubmitting}
                                        onClick={handleVote}
                                        className="min-w-[140px] rounded-full bg-primary hover:bg-primary-light h-12"
                                   >
                                        {isSubmitting ? (
                                             <>
                                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                  Mengirim...
                                             </>
                                        ) : (
                                             "Kirim Suara"
                                        )}
                                   </Button>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>
          </div>
     );
}
