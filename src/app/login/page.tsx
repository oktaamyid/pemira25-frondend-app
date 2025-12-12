"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
     const [nim, setNim] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const router = useRouter();
     const searchParams = useSearchParams();
     const redirect = searchParams.get("redirect") || "/vote";

     const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault();
          setError("");
          setLoading(true);

          try {
               const data = await api.login(nim, password);
               // Store token
               localStorage.setItem("token", data.token);
               localStorage.setItem("user", JSON.stringify(data.user));

               router.push(redirect);
          } catch (err) {
               setError("NIM atau Password salah");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="container mx-auto px-4 py-32 flex items-center justify-center min-h-[60vh]">
               <Card className="w-full max-w-md shadow-2xl bg-surface border-slate-100">
                    <CardHeader className="text-center">
                         <CardTitle className="text-2xl font-bold text-slate-900">Login PEMIRA</CardTitle>
                         <p className="text-sm text-neutral-slate">Masuk untuk menggunakan hak pilih</p>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleLogin} className="space-y-4">
                              {error && (
                                   <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
                                        {error}
                                   </div>
                              )}
                              <div className="space-y-2">
                                   <label className="text-sm font-medium text-slate-700">NIM</label>
                                   <input
                                        type="text"
                                        value={nim}
                                        onChange={(e) => setNim(e.target.value)}
                                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Masukkan NIM"
                                        required
                                   />
                              </div>
                              <div className="space-y-2">
                                   <label className="text-sm font-medium text-slate-700">Password</label>
                                   <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Masukkan Password"
                                        required
                                   />
                              </div>

                              <Button type="submit" className="w-full bg-primary hover:bg-primary-light" disabled={loading}>
                                   {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                   Masuk
                              </Button>
                         </form>
                    </CardContent>
               </Card>
          </div>
     );
}
