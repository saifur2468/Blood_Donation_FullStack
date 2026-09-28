
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/home/navbar";
import Footer from "@/components/ui/home/footer";
// যদি Navbar বা Footer গ্লোবালি দেখাতে চান, তবে এগুলো ইমপোর্ট করতে পারেন:
// import Navbar from "@/components/home/navbar"; 
// import Footer from "@/components/home/footer.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blood Donation - Save Lives, Donate Blood",
  description: "A platform connecting blood donors with patients in urgent need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col`}>
        
      <Navbar></Navbar>

        {/* মূল কন্টেন্ট সেকশন */}
        <main className="flex-grow">
          {children}
        </main>

        {/* গ্লোবাল ফুটার রাখতে চাইলে এখানে কল করতে পারেন */}
      <Footer></Footer>
        
      </body>
    </html>
  );
}
