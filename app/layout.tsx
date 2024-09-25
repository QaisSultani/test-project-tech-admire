import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Test Project | Tech Admire Agency",
  description: "Developed By Qais Sultani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-[100vh] h-full justify-between">
          <nav className="min-h-[5vh] flex justify-center items-center bg-primary text-primary-foreground text-wrap text-xl font-semibold text-center p-4">
            Test Project For Tech Admire Agency
          </nav>
          <main className="flex-1 flex">{children}</main>
          <footer className="min-h-[10vh] flex justify-center items-center bg-primary text-primary-foreground text-wrap text-center p-4">
            Developed By Qais Sultani
          </footer>
          <Toaster richColors />
        </div>
      </body>
    </html>
  );
}
