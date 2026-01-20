"use client"
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Zap, Scissors, Smartphone, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SovereignStudio() {
  const [loading, setLoading] = useState(false);

  const executeOrder = async (svc, prc) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: "ELITE CUSTOMER", email: "client@teduh.studio", service: svc, price: prc })
      });
      const data = await res.json();
      if (data.redirect_url) window.location.href = data.redirect_url;
    } catch (e) { alert("CONNECTION TO CLOUD INTERRUPTED."); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#020202] text-white min-h-screen font-sans selection:bg-green-500">
      <nav className="p-10 flex justify-between items-center max-w-7xl mx-auto">
        <h2 className="text-2xl font-black tracking-[15px] text-green-500">BY.IGO</h2>
        <div className="flex gap-4 opacity-30 text-[10px] tracking-widest uppercase hidden md:flex">
          <span>Neural Link Active</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-10 pt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="text-left md:w-2/3">
             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-8xl md:text-[140px] font-black leading-[0.9] tracking-tighter uppercase italic">
                   TEDUH<br/><span className="text-green-500">STUDIO</span>
                </h1>
                <p className="text-zinc-600 tracking-[18px] text-[12px] mt-8 uppercase font-bold">Absolute Sovereign Hair Architecture</p>
             </motion.div>
          </div>

          <div className="md:w-1/3 w-full space-y-6">
             <motion.div whileHover={{ scale: 1.05 }} className="bg-zinc-900/50 border border-green-500/20 p-10 rounded-[40px] backdrop-blur-3xl group transition-all hover:border-green-500 cursor-pointer" onClick={() => executeOrder('Sovereign Executive Cut', 75000)}>
                <div className="flex justify-between items-start mb-10">
                   <div className="p-4 bg-green-500 rounded-2xl"><Scissors className="text-black" size={30}/></div>
                   <span className="text-4xl font-mono font-bold text-green-500">75k</span>
                </div>
                <h3 className="text-3xl font-black uppercase italic mb-4">SOVEREIGN CUT</h3>
                <p className="text-zinc-400 text-sm mb-10">Pangkas kedaulatan mutlak. Setiap garis rambut dikalkulasi oleh visi AI.</p>
                <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest bg-zinc-800 p-4 rounded-2xl group-hover:bg-white group-hover:text-black transition-all">
                  {loading ? 'Transmitting Data...' : 'Pay & Secure'} <ArrowRight size={16}/>
                </div>
             </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-32 border-t border-zinc-900 pt-16">
            {[
              { icon: <Cpu />, title: '1T DATA INTELLIGENCE', desc: 'Sirkuit riset market crypto dan financial global tertanam.' },
              { icon: <Smartphone />, title: 'TERMUX INDEPENDENT', desc: 'Web di-deploy langsung dari Android tanpa bergantung pihak ke-3.' },
              { icon: <ShieldCheck />, title: 'OAUTH2 SECURE', desc: 'Identitas manusia dan kedaulatan data dijaga enkripsi militer.' }
            ].map((item, i) => (
              <div key={i} className="text-left p-6">
                <div className="text-green-500 mb-4">{item.icon}</div>
                <h4 className="font-bold text-[10px] tracking-[4px] uppercase mb-2">{item.title}</h4>
                <p className="text-zinc-600 text-[11px] uppercase leading-relaxed">{item.desc}</p>
              </div>
            ))}
        </div>

        <footer className="mt-40 mb-20 opacity-30 text-[9px] tracking-[8px] uppercase text-center border-t border-zinc-900 pt-10">
          Sovereign Architectured Studio x Omniscience AI — Genesis Edition v1.0
        </footer>
      </main>
    </div>
  );
}
