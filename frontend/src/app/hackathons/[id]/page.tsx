"use client";

import { motion } from "framer-motion";
import { SponsorCard } from "@/components/hackathon/SponsorCard";
import { RulebookSection } from "@/components/hackathon/RulebookSection";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const premiumSponsors = [
    {
        name: "Hi Devs",
        description: "Innovation Partner providing cloud infrastructure and mentorship to top teams.",
        tier: "Premium" as const,
        website: "https://hidevs.com",
    },
    {
        name: "Polygon",
        description: "Web3 Ecosystem Partner offering $5k bounties for decentralized applications.",
        tier: "Premium" as const,
        website: "https://polygon.technology",
    }
];

const inKindSponsors = [
    {
        name: "Devfolio",
        description: "Official Hackathon Platform powering the submission workflows.",
        tier: "In-Kind" as const,
        website: "https://devfolio.co",
    },
    {
        name: "Github",
        description: "Code Collab Partner giving out free GitHub Copilot licenses to winners.",
        tier: "In-Kind" as const,
        website: "https://github.com",
    }
];

export default function HackathonDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Mocking the event data
    const hackathon = {
        name: id === "hack-and-build-2026" ? "Hack and Build 2026" : "Inferno Verse 2025",
        date: "Feb 25-28, 2026",
        duration: "24 Hours Non-Stop",
        venue: "LPU Campus, Punjab",
        participants: "500+ Innovators",
        description: "Join the most ambitious hackathon of the year. Build the future with AI, Web3, robotics, and immersive tech. We are looking for passionate developers to create groundbreaking solutions that solve real-world problems. Whether you are a beginner or a veteran, this is your chance to shine on a global stage.",
        organizer: "Crest Club"
    };

    return (
        <div className="container mx-auto px-6 py-12 relative z-10">
            {/* Context/Back Navigation */}
            <div className="mb-8">
                <Link href="/hackathons" className="text-cyan-400 font-mono tracking-widest uppercase text-xs hover:text-white transition-colors">
                    &lt; Back to Listings
                </Link>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
            >
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono tracking-widest text-cyan-400 uppercase mb-6">
                    Organized by {hackathon.organizer}
                </span>

                <h1 className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter text-white mb-8">
                    {hackathon.name}
                </h1>

                {/* Event Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <DetailBox icon={<Calendar size={20} className="text-magenta-400" />} label="Date" value={hackathon.date} />
                    <DetailBox icon={<Clock size={20} className="text-magenta-400" />} label="Duration" value={hackathon.duration} />
                    <DetailBox icon={<MapPin size={20} className="text-magenta-400" />} label="Venue" value={hackathon.venue} />
                    <DetailBox icon={<Users size={20} className="text-magenta-400" />} label="Expected" value={hackathon.participants} />
                </div>

                <div className="mb-12">
                    <h3 className="text-xl font-bold font-outfit text-white mb-4">Event Overview</h3>
                    <p className="text-white/60 font-inter text-lg leading-relaxed max-w-4xl">
                        {hackathon.description}
                    </p>
                </div>

                <div className="flex justify-start">
                    <Link href={`/hackathons/${id}/register`}>
                        <button className="relative group overflow-hidden rounded-xl bg-magenta-500/10 border border-magenta-500 px-10 py-4 text-magenta-400 font-bold tracking-widest uppercase hover:text-white transition-colors duration-300 flex items-center gap-3">
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                Register Your Team <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 h-full w-0 bg-magenta-500 transition-all duration-300 ease-out group-hover:w-full z-0" />
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Prizes Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-32"
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white mb-4">
                        Prizes & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Rewards</span>
                    </h2>
                    <p className="text-white/60 font-inter">Win incredible tech setups, cash bounties, and exclusive mentorships.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 2nd Place */}
                    <PrizeBox rank="2nd Place" prize="$2,000" sponsor="Polygon" color="gray" />
                    {/* 1st Place */}
                    <div className="md:-mt-8">
                        <PrizeBox rank="1st Place" prize="$5,000" sponsor="Crest Club" color="yellow" featured={true} />
                    </div>
                    {/* 3rd Place */}
                    <PrizeBox rank="3rd Place" prize="$1,000" sponsor="Hi Devs" color="orange" />
                </div>
            </motion.div>

            {/* Sponsors Section */}
            <div className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white mb-4">
                        Powered By <span className="text-cyan-400">Partners</span>
                    </h2>
                    <p className="text-white/60 font-inter">Our incredible sponsors making this event possible.</p>
                </div>

                <div className="space-y-12">
                    {/* Premium */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {premiumSponsors.map(sponsor => (
                            <SponsorCard key={sponsor.name} {...sponsor} />
                        ))}
                    </div>
                    {/* In-Kind */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {inKindSponsors.map(sponsor => (
                            <SponsorCard key={sponsor.name} {...sponsor} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Rulebook Section */}
            <div className="mb-20">
                <RulebookSection />
            </div>

        </div>
    );
}

function DetailBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="hidden sm:block">{icon}</div>
            <div>
                <p className="text-white/40 font-mono text-xs uppercase tracking-widest">{label}</p>
                <p className="text-white font-inter text-sm md:text-base font-medium">{value}</p>
            </div>
        </div>
    );
}

function PrizeBox({ rank, prize, sponsor, color, featured = false }: { rank: string, prize: string, sponsor: string, color: "yellow" | "gray" | "orange", featured?: boolean }) {

    let glowColor = "from-gray-400/20";
    let textColor = "text-gray-400";

    if (color === "yellow") {
        glowColor = "from-yellow-400/20";
        textColor = "text-yellow-400";
    } else if (color === "orange") {
        glowColor = "from-orange-400/20";
        textColor = "text-orange-400";
    }

    return (
        <div className={`glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center text-center ${featured ? 'h-full py-12 border-yellow-500/30' : ''}`}>
            <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${glowColor} to-transparent -z-10`} />
            <h4 className={`text-2xl font-black font-outfit uppercase ${textColor} mb-2`}>{rank}</h4>
            <span className="text-5xl font-black text-white mb-2">{prize}</span>
            <p className="text-white/50 font-mono text-xs tracking-widest uppercase">Sponsored by {sponsor}</p>
        </div>
    )
}
