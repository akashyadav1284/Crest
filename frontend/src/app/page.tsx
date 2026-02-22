"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Navbar } from "@/components/Navbar";
import { BootSequence } from "@/components/landing/BootSequence";
import { MissionControl } from "@/components/landing/MissionControl";
import { AboutSection } from "@/components/AboutSection";
import { DomainsSection } from "@/components/DomainsSection";
import { TeamSection } from "@/components/TeamSection";
import { EventsSection } from "@/components/EventsSection";
import { JoinForm } from "@/components/JoinForm";
import { Footer } from "@/components/Footer";
import { TechBackground } from "@/components/TechBackground";

// --- Page Component ---

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      <TechBackground />

      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <Navbar />

      {/* Interactive Mission Control Hero Dashboard */}
      <MissionControl isBooted={!isBooting} />

      {/* Imported Sections */}
      <AboutSection />
      <DomainsSection />
      <TeamSection />
      <EventsSection />
      <JoinForm />
      <Footer />
    </>
  );
}
