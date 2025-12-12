import Link from "next/link";

export default function Footer() {
     return (
          <footer className="bg-white py-8 mt-auto">
               <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>&copy; 2025 IT Support PEMIRA STT Terpadu Nurul Fikri.</p>
                    <div className="flex items-center gap-6">
                         <Link href="https://www.instagram.com/pemirasttnf/" className="hover:text-primary transition-colors">Instagram</Link>
                    </div>
               </div>
          </footer>
     );
}
