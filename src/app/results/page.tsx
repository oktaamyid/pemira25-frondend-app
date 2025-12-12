/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { motion } from "framer-motion";

export default function ResultsPage() {
     const [results, setResults] = useState<any[]>([]);
     const [stats, setStats] = useState({ totalVoters: 0, votesCast: 0, turnout: "0%" });

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [statsData, resultsData] = await Promise.all([
                         api.getStats(),
                         api.getResults()
                    ]);
                    setStats(statsData);
                    setResults(resultsData);
               } catch (e) {
                    console.error("Failed to fetch results", e);
               }
          };

          fetchData();
          // Optional: Polling every 10 seconds?
          const interval = setInterval(fetchData, 10000);
          return () => clearInterval(interval);
     }, []);

     return (
          <div className="container mx-auto px-4 py-24">
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
               >
                    <h1 className="text-4xl font-bold mb-6 text-slate-900">Hasil Sementara PEMIRA</h1>
                    <p className="text-slate-500">
                         Data diperbarui secara real-time.
                    </p>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 }}
                    >
                         <Card className="border-none shadow-xl shadow-slate-200/50 rounded-2xl h-full">
                              <CardHeader>
                                   <CardTitle className="text-slate-900">Perolehan Suara</CardTitle>
                              </CardHeader>
                              <CardContent className="h-[350px]">
                                   <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={results}>
                                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                             <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                             <Tooltip
                                                  cursor={{ fill: '#f8fafc' }}
                                                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                             />
                                             <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                                                  {results.map((entry, index) => (
                                                       <Cell key={`cell-${index}`} fill={entry.fill} />
                                                  ))}
                                             </Bar>
                                        </BarChart>
                                   </ResponsiveContainer>
                              </CardContent>
                         </Card>
                    </motion.div>

                    <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.3 }}
                    >
                         <Card className="border-none shadow-xl shadow-slate-200/50 rounded-2xl h-full">
                              <CardHeader>
                                   <CardTitle className="text-slate-900">Persentase Suara</CardTitle>
                              </CardHeader>
                              <CardContent className="h-[350px]">
                                   <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                             <Pie
                                                  data={results}
                                                  cx="50%"
                                                  cy="50%"
                                                  innerRadius={60}
                                                  outerRadius={100}
                                                  paddingAngle={5}
                                                  dataKey="votes"
                                             >
                                                  {results.map((entry, index) => (
                                                       <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                                                  ))}
                                             </Pie>
                                             <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                             <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                   </ResponsiveContainer>
                              </CardContent>
                         </Card>
                    </motion.div>
               </div>

               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-surface p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
               >
                    <h3 className="text-xl font-bold mb-8 text-center text-slate-900">Statistik Pemilihan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                         <div className="py-4 md:py-0">
                              <div className="text-4xl font-bold text-primary mb-2">{stats.totalVoters}</div>
                              <div className="text-sm font-medium text-neutral-slate uppercase tracking-wide">Total DPT</div>
                         </div>
                         <div className="py-4 md:py-0">
                              <div className="text-4xl font-bold text-green-600 mb-2">{stats.votesCast}</div>
                              <div className="text-sm font-medium text-neutral-slate uppercase tracking-wide">Suara Masuk</div>
                         </div>
                         <div className="py-4 md:py-0">
                              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.turnout}</div>
                              <div className="text-sm font-medium text-neutral-slate uppercase tracking-wide">Partisipasi</div>
                         </div>
                    </div>
               </motion.div>
          </div>
     );
}
