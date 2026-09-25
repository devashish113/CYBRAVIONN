import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Navigation,
  Globe
} from 'lucide-react';

interface OfficeLocationMapProps {
  isDarkMode: boolean;
}

const OFFICE_DETAILS = {
  name: "CYBRAVION SOLUTIONS PRIVATE LIMITED",
  cin: "U62099DL2026PTC470901",
  lat: 28.519429,
  lng: 77.201125,
  label: "New Delhi, Delhi, India",
  street: "H. IN.KH.NO.293 S/F Western Marg, Saidulajab",
  landmark: "Near Kher Singh Estate",
  cityStateZip: "New Delhi, Delhi 110030",
  country: "India",
  primaryPhone: "+91-7258880881",
  alternatePhone: "+91-9358683634",
  email: "cybravions@gmail.com",
  supportEmail: "support@cybravions.com",
  hours: "Mon – Sat · 9:30 AM – 6:30 PM IST",
};

export const OfficeLocationMap: React.FC<OfficeLocationMapProps> = ({ isDarkMode }) => {
  const span = 0.008;
  const mapSrc =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${OFFICE_DETAILS.lng - span},${OFFICE_DETAILS.lat - span},${OFFICE_DETAILS.lng + span},${OFFICE_DETAILS.lat + span}` +
    `&layer=mapnik&marker=${OFFICE_DETAILS.lat},${OFFICE_DETAILS.lng}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_DETAILS.lat},${OFFICE_DETAILS.lng}`;
  const gmapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${OFFICE_DETAILS.lat},${OFFICE_DETAILS.lng}`;

  return (
    <section id="office-location" className={`py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 border-t transition-colors duration-300 ${
      isDarkMode ? 'border-stone-800/80 bg-[#060a14]/60' : 'border-slate-200 bg-slate-100/60'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-mono font-bold block mb-2">
            Registered Headquarters &amp; Physical Presence
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-950'
          }`}>
            Where to Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500">CYBRAVION</span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto mt-3 font-normal ${
            isDarkMode ? 'text-stone-300' : 'text-slate-600'
          }`}>
            Incorporated Indian enterprise with active global cybersecurity defense coverage, sovereign laboratories, and client advisory operations.
          </p>
        </div>

        {/* 2-Column Layout: Interactive Map (Left) + Headquarters Info Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-7 rounded-3xl overflow-hidden border shadow-2xl relative min-h-[420px] lg:min-h-[520px] ${
              isDarkMode ? 'border-stone-800 bg-stone-900' : 'border-slate-300 bg-white'
            }`}
          >
            {/* Overlay Map Badge */}
            <div className={`absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full px-3.5 py-1.5 backdrop-blur-md border text-xs font-mono font-semibold shadow-md ${
              isDarkMode 
                ? 'bg-stone-900/90 border-stone-700 text-stone-200' 
                : 'bg-white/95 border-slate-300 text-slate-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <MapPin size={13} className="text-orange-500" />
              <span>{OFFICE_DETAILS.label} (GPS: 28.5194° N, 77.2011° E)</span>
            </div>

            {/* Quick Navigation Floating Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer"
            >
              <Navigation size={13} />
              <span>Get Directions</span>
              <ExternalLink size={11} className="opacity-70" />
            </a>

            {/* OpenStreetMap iframe */}
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              style={{
                filter: isDarkMode
                  ? "invert(90%) hue-rotate(180deg) saturate(0.65) brightness(0.85) contrast(1.15)"
                  : "none",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CYBRAVION SOLUTIONS Registered Office Location"
            />
          </motion.div>

          {/* Right Column: Registered Corporate Credentials & Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-5 rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${
              isDarkMode 
                ? 'bg-[#0b1222] border-blue-500/20 text-stone-100' 
                : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60'
            }`}
          >
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-orange-500 font-bold flex items-center gap-1.5">
                  <Building2 size={13} />
                  Incorporated Entity
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <ShieldCheck size={10} />
                  MCA VERIFIED
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl font-extrabold leading-tight mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                {OFFICE_DETAILS.name}
              </h3>

              {/* CIN Badge Card */}
              <div className={`p-2.5 rounded-xl border mb-6 flex items-center justify-between text-xs ${
                isDarkMode 
                  ? 'bg-[#060a14] border-stone-800' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`font-mono text-[11px] ${isDarkMode ? 'text-stone-400' : 'text-slate-500'}`}>Corporate ID (CIN):</span>
                <span className="font-mono font-bold text-blue-500 text-xs tracking-wider">
                  {OFFICE_DETAILS.cin}
                </span>
              </div>

              {/* Information Rows */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-mono tracking-wider font-semibold mb-0.5 ${
                      isDarkMode ? 'text-stone-400' : 'text-slate-500'
                    }`}>
                      Registered Office Address
                    </div>
                    <div className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isDarkMode ? 'text-stone-200' : 'text-slate-800'
                    }`}>
                      <div>{OFFICE_DETAILS.street}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-stone-400' : 'text-slate-500'}`}>{OFFICE_DETAILS.landmark}</div>
                      <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{OFFICE_DETAILS.cityStateZip}, {OFFICE_DETAILS.country}</div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-mono tracking-wider font-semibold mb-0.5 ${
                      isDarkMode ? 'text-stone-400' : 'text-slate-500'
                    }`}>
                      Official Communications
                    </div>
                    <div className="text-xs sm:text-sm flex flex-col gap-0.5">
                      <a href={`mailto:${OFFICE_DETAILS.email}`} className={`font-mono font-semibold transition-colors ${
                        isDarkMode ? 'text-stone-200 hover:text-blue-400' : 'text-slate-800 hover:text-blue-600'
                      }`}>
                        {OFFICE_DETAILS.email}
                      </a>
                      <a href={`mailto:${OFFICE_DETAILS.supportEmail}`} className={`font-mono text-[11px] transition-colors ${
                        isDarkMode ? 'text-stone-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
                      }`}>
                        {OFFICE_DETAILS.supportEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-mono tracking-wider font-semibold mb-0.5 ${
                      isDarkMode ? 'text-stone-400' : 'text-slate-500'
                    }`}>
                      Direct Advisory Lines
                    </div>
                    <div className="text-xs sm:text-sm flex flex-col gap-0.5 font-mono">
                      <a href={`tel:${OFFICE_DETAILS.primaryPhone}`} className={`font-bold transition-colors ${
                        isDarkMode ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-600'
                      }`}>
                        {OFFICE_DETAILS.primaryPhone} <span className={`text-[10px] font-sans font-normal ${isDarkMode ? 'text-stone-400' : 'text-slate-500'}`}>(Direct / WhatsApp)</span>
                      </a>
                      <a href={`tel:${OFFICE_DETAILS.alternatePhone}`} className={`transition-colors text-[11px] ${
                        isDarkMode ? 'text-stone-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'
                      }`}>
                        {OFFICE_DETAILS.alternatePhone} <span className={`text-[10px] font-sans font-normal ${isDarkMode ? 'text-stone-400' : 'text-slate-500'}`}>(Hotline)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-mono tracking-wider font-semibold mb-0.5 ${
                      isDarkMode ? 'text-stone-400' : 'text-slate-500'
                    }`}>
                      Business &amp; Incident Operations
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-stone-200' : 'text-slate-800'}`}>
                      {OFFICE_DETAILS.hours}
                    </div>
                    <div className="text-[10px] text-orange-500 font-mono mt-0.5 font-semibold">
                      24/7 Rapid Incident Dispatch for Retained Clients
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className={`grid grid-cols-2 gap-3 mt-8 pt-4 border-t ${
              isDarkMode ? 'border-stone-800' : 'border-slate-200'
            }`}>
              <a
                href={gmapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer border ${
                  isDarkMode 
                    ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <Globe size={13} className="text-blue-500" />
                <span>Google Maps</span>
              </a>

              <a
                href={`mailto:${OFFICE_DETAILS.email}?subject=Enterprise%20Advisory%20Inquiry%20-%20CYBRAVION`}
                className="py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md text-center cursor-pointer"
              >
                <Mail size={13} />
                <span>Send Dispatch</span>
              </a>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
