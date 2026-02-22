import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HackathonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white font-inter selection:bg-cyan-500/30 overflow-x-hidden">
            <Navbar />
            <main className="pt-24 min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
}
