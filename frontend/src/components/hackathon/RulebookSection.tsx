"use client";

import { motion } from "framer-motion";
import { Download, AlertCircle, Users, CheckCircle, Ban } from "lucide-react";

export function RulebookSection() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h3 className="text-3xl font-black font-outfit uppercase tracking-tighter text-white">
                    Official <span className="text-cyan-400">Rulebook</span>
                </h3>

                {/* Download Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all font-mono tracking-widest uppercase text-xs"
                >
                    <Download size={16} /> PDF
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rules List */}
                <div className="space-y-6">
                    <RuleItem
                        icon={<Users className="text-cyan-400" size={24} />}
                        title="Team Size Regulations"
                        desc="Teams must consist of 2 to 4 members. Solo participants are not allowed. All members must be registered under the same team name."
                    />
                    <RuleItem
                        icon={<AlertCircle className="text-magenta-400" size={24} />}
                        title="Participation Guidelines"
                        desc="All code must be written during the hackathon period. Use of pre-existing templates or boilerplate code is allowed if declared."
                    />
                    <RuleItem
                        icon={<CheckCircle className="text-green-400" size={24} />}
                        title="Judging Criteria"
                        desc="Projects will be judged on Innovation (30%), Technical Execution (30%), UX/UI Design (20%), and Practical Viability (20%)."
                    />
                    <RuleItem
                        icon={<Ban className="text-red-400" size={24} />}
                        title="Disqualification Rules"
                        desc="Plagiarism, toxic behavior, or violating the API terms of sponsors will result in immediate disqualification and a ban from future events."
                    />
                </div>

                {/* Code of Conduct Card */}
                <div className="glass-card p-8 rounded-2xl border border-white/10 h-max sticky top-32">
                    <h4 className="font-outfit font-bold text-xl text-white mb-4">Code of Conduct</h4>
                    <p className="text-white/60 font-inter text-sm mb-6 leading-relaxed">
                        CREST is dedicated to providing a safe and comfortable environment for all our attendees.
                        We do not tolerate harassment in any form. Be respectful, inclusive, and professional.
                    </p>
                    <div className="p-4 rounded-lg bg-magenta-500/10 border border-magenta-500/30">
                        <p className="text-magenta-400 font-mono text-xs uppercase tracking-widest text-center">
                            Submission Deadline: Feb 28, 12:00 PM EST
                        </p>
                    </div>
                    {/* Mobile Download Button */}
                    <button className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-cyan-500 bg-cyan-500/10 text-cyan-400 font-mono tracking-widest uppercase text-xs">
                        <Download size={16} /> Download Rules PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

function RuleItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
        >
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div>
                <h4 className="font-outfit font-bold text-white mb-1">{title}</h4>
                <p className="text-white/50 text-sm font-inter leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}
