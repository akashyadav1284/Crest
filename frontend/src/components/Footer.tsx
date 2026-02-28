export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-transparent pt-16 pb-8 relative overflow-hidden text-inter">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <img src="/crestlogo.png" alt="CREST" className="w-8 h-8 object-contain" />
                            <span className="text-2xl font-outfit font-bold tracking-widest text-white uppercase">CREST</span>
                        </div>
                        <p className="text-white/50 text-sm max-w-sm">
                            A student-led innovation lab exploring the frontiers of Robotics, Artificial Intelligence, and immersive tech.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8">
                        <div className="space-y-2">
                            <h4 className="text-white font-bold uppercase tracking-widest font-mono text-xs text-cyan-400">Headquarters</h4>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Room 29-104, Innovation Studio<br />
                                LPU, Punjab
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white font-bold uppercase tracking-widest font-mono text-xs text-magenta-400">Technical Support</h4>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Email: akasxhyadav@gmail.com<br />
                                Phone: +91 9467658854
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest font-mono mb-6">Nav Protocols</h4>
                    <ul className="space-y-3 text-white/50 text-sm">
                        <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
                        <li><a href="#domains" className="hover:text-cyan-400 transition-colors">Domains</a></li>
                        <li><a href="#events" className="hover:text-cyan-400 transition-colors">System Logs</a></li>
                        <li><a href="#team" className="hover:text-cyan-400 transition-colors">The Core</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest font-mono mb-6">Social Links</h4>
                    <ul className="space-y-3 text-white/50 text-sm">
                        <li><a href="https://www.instagram.com/crest.lpu/" target="blank" className="hover:text-magenta-400 transition-colors">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/company/crest-lpu/" target="_blank" rel="noopener noreferrer" className="hover:text-magenta-400 transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-magenta-400 transition-colors">Discord Server</a></li>
                        <li><a href="#" className="hover:text-magenta-400 transition-colors">Twitter (X)</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-mono tracking-widest uppercase">
                <p>© 2026 CREST Innovation Club. All rights reserved.</p>
                <p className="mt-2 md:mt-0">System Version 3.1.0 // Online</p>
            </div>
        </footer>
    );
}
