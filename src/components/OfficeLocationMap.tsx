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
    <section id="office-location" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 border-t border-slate-200/80 dark:border-stone-900 bg-slate-50/50 dark:bg-stone-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 dark:text-orange-400 font-mono font-bold block mb-2">
            Registered Headquarters &amp; Physical Presence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Where to Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500">CYBRAVION</span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light">
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
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 dark:border-stone-800 shadow-2xl relative min-h-[420px] lg:min-h-[520px] bg-slate-100 dark:bg-stone-900"
          >
            {/* Overlay Map Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-slate-200 dark:border-stone-700 text-xs font-mono font-semibold shadow-md text-slate-800 dark:text-stone-200">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <MapPin size={13} className="text-orange-500" />
              <span>{OFFICE_DETAILS.label} (GPS: 28.5194° N, 77.2011° E)</span>
            </div>

            {/* Quick Navigation Floating Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-orange-500 text-white dark:bg-stone-900/90 dark:hover:bg-orange-500 border border-white/10 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg backdrop-blur-md cursor-pointer"
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
            className="lg:col-span-5 rounded-3xl bg-white dark:bg-stone-900/90 border border-slate-200 dark:border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1.5">
                  <Building2 size={13} />
                  Incorporated Entity
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <ShieldCheck size={10} />
                  MCA VERIFIED
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                {OFFICE_DETAILS.name}
              </h3>

              {/* CIN Badge Card */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-stone-950/80 border border-slate-200 dark:border-stone-800/80 mb-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-stone-400 font-mono text-[11px]">Corporate ID (CIN):</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs tracking-wider">
                  {OFFICE_DETAILS.cin}
                </span>
              </div>

              {/* Information Rows */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 dark:bg-orange-500/15 dark:text-orange-400 border border-orange-500/20 shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-stone-500 font-semibold mb-0.5">
                      Registered Office Address
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-stone-200 leading-relaxed font-normal">
                      <div>{OFFICE_DETAILS.street}</div>
                      <div className="text-slate-500 dark:text-stone-400 text-xs">{OFFICE_DETAILS.landmark}</div>
                      <div className="font-medium text-slate-900 dark:text-stone-100">{OFFICE_DETAILS.cityStateZip}, {OFFICE_DETAILS.country}</div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-stone-500 font-semibold mb-0.5">
                      Official Communications
                    </div>
                    <div className="text-xs sm:text-sm flex flex-col gap-0.5">
                      <a href={`mailto:${OFFICE_DETAILS.email}`} className="text-slate-800 dark:text-stone-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono">
                        {OFFICE_DETAILS.email}
                      </a>
                      <a href={`mailto:${OFFICE_DETAILS.supportEmail}`} className="text-slate-500 dark:text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono text-[11px]">
                        {OFFICE_DETAILS.supportEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-stone-500 font-semibold mb-0.5">
                      Direct Advisory Lines
                    </div>
                    <div className="text-xs sm:text-sm flex flex-col gap-0.5 font-mono">
                      <a href={`tel:${OFFICE_DETAILS.primaryPhone}`} className="text-slate-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold">
                        {OFFICE_DETAILS.primaryPhone} <span className="text-[10px] font-sans font-normal text-slate-400">(Direct / WhatsApp)</span>
                      </a>
                      <a href={`tel:${OFFICE_DETAILS.alternatePhone}`} className="text-slate-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-[11px]">
                        {OFFICE_DETAILS.alternatePhone} <span className="text-[10px] font-sans font-normal text-slate-400">(Hotline)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-stone-500 font-semibold mb-0.5">
                      Business &amp; Incident Operations
                    </div>
                    <div className="text-xs text-slate-800 dark:text-stone-200">
                      {OFFICE_DETAILS.hours}
                    </div>
                    <div className="text-[10px] text-orange-500 font-mono mt-0.5">
                      24/7 Rapid Incident Dispatch for Retained Clients
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-4 border-t border-slate-200/80 dark:border-stone-800/80">
              <a
                href={gmapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-slate-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer border border-slate-200 dark:border-stone-700"
              >
                <Globe size={13} className="text-blue-500" />
                <span>Google Maps</span>
              </a>

              <a
                href={`mailto:${OFFICE_DETAILS.email}?subject=Enterprise%20Advisory%20Inquiry%20-%20CYBRAVION`}
                className="py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md text-center cursor-pointer"
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
