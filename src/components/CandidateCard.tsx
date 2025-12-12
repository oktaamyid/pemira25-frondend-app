import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Candidate {
     id: number;
     president: {
          name: string;
          photo: string;
          major: string;
          batch: string;
     };
     vicePresident: {
          name: string;
          photo: string;
          major: string;
          batch: string;
     };
     vision: string;
     mission: string[];
}

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
     return (
          <motion.div
               whileHover={{ y: -5 }}
               transition={{ duration: 0.3 }}
          >
               <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-surface rounded-2xl h-full flex flex-col">
                    <div className="grid grid-cols-2 gap-0.5 bg-neutral-cream">
                         <div className="relative aspect-4/5">
                              <Image
                                   src={candidate.president.photo}
                                   alt={candidate.president.name}
                                   fill
                                   className="object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3">
                                   <p className="text-white font-bold text-sm truncate">{candidate.president.name}</p>
                                   <p className="text-white/80 text-xs">Ketua</p>
                              </div>
                         </div>
                         <div className="relative aspect-4/5">
                              <Image
                                   src={candidate.vicePresident.photo}
                                   alt={candidate.vicePresident.name}
                                   fill
                                   className="object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3">
                                   <p className="text-white font-bold text-sm truncate">{candidate.vicePresident.name}</p>
                                   <p className="text-white/80 text-xs">Wakil</p>
                              </div>
                         </div>
                    </div>

                    <CardHeader className="text-center pb-2 pt-6">
                         <div className="mx-auto w-12 h-12 rounded-full bg-neutral-cream text-primary text-xl font-bold flex items-center justify-center mb-3">
                              {candidate.id}
                         </div>
                         <CardTitle className="text-lg font-bold text-slate-900">Pasangan Calon {candidate.id}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6 px-6 pb-8 grow">
                         <div>
                              <h4 className="font-bold text-sm mb-2 text-primary uppercase tracking-wider">Visi</h4>
                              <p className="text-sm text-neutral-slate italic leading-relaxed">&quot;{candidate.vision}&quot;</p>
                         </div>
                         <div>
                              <h4 className="font-bold text-sm mb-2 text-primary uppercase tracking-wider">Misi</h4>
                              <ul className="text-sm text-neutral-slate space-y-2">
                                   {candidate.mission.map((m: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                             <span className="block w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                             <span>{m}</span>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    </CardContent>
               </Card>
          </motion.div>
     );
}
