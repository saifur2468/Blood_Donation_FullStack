import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/home/navbar";
import Footer from "@/components/ui/home/footer";
import { ToastContainer } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />

          <main className="flex-grow">{children}</main>

          <Footer />

          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}