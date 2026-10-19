import React from 'react';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import type { AppView } from '../utils/routing';

const TrainingPage = lazyWithRetry(() => import('../pages/Training').then(m => ({ default: m.TrainingPage })));
const CompliancePage = lazyWithRetry(() => import('../pages/Compliance').then(m => ({ default: m.CompliancePage })));
const CybravionsAIPage = lazyWithRetry(() => import('../pages/CybravionsAI').then(m => ({ default: m.CybravionsAIPage })));
const CyberVersePage = lazyWithRetry(() => import('../pages/CyberVerse').then(m => ({ default: m.CyberVersePage })));
const ExceptionManagerPage = lazyWithRetry(() => import('../pages/ExceptionManager').then(m => ({ default: m.ExceptionManagerPage })));
const AboutUsPage = lazyWithRetry(() => import('../pages/AboutUs').then(m => ({ default: m.AboutUsPage })));
const ThreatForgePage = lazyWithRetry(() => import('../pages/ThreatForge').then(m => ({ default: m.ThreatForgePage })));
const SocAiTriagePage = lazyWithRetry(() => import('../pages/SocAiTriage').then(m => ({ default: m.SocAiTriagePage })));
const ThreatIntelCollectorPage = lazyWithRetry(() => import('../pages/ThreatIntelCollector').then(m => ({ default: m.ThreatIntelCollectorPage })));
const VaptServicePage = lazyWithRetry(() => import('../pages/services/VaptService').then(m => ({ default: m.VaptServicePage })));
const Iso27001ServicePage = lazyWithRetry(() => import('../pages/services/Iso27001Service').then(m => ({ default: m.Iso27001ServicePage })));
const Soc2ServicePage = lazyWithRetry(() => import('../pages/services/Soc2Service').then(m => ({ default: m.Soc2ServicePage })));
const CloudSecurityServicePage = lazyWithRetry(() => import('../pages/services/CloudSecurityService').then(m => ({ default: m.CloudSecurityServicePage })));
const AiSecurityServicePage = lazyWithRetry(() => import('../pages/services/AiSecurityService').then(m => ({ default: m.AiSecurityServicePage })));
const DpdpComplianceServicePage = lazyWithRetry(() => import('../pages/services/DpdpComplianceService').then(m => ({ default: m.DpdpComplianceServicePage })));
const ResourcesPage = lazyWithRetry(() => import('../pages/Resources').then(m => ({ default: m.ResourcesPage })));

interface AppRoutesProps {
  currentView: AppView;
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  onOpenAuditModal: () => void;
  children: React.ReactNode;
}

export function AppRoutes({ currentView, setCurrentView, isDarkMode, onOpenAuditModal, children }: AppRoutesProps) {
  if (currentView === 'about') {
    return <AboutUsPage setCurrentView={setCurrentView} onOpenAuditModal={onOpenAuditModal} isDarkMode={isDarkMode} />;
  }
  if (currentView === 'exception-manager') {
    return <ExceptionManagerPage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'threatforge') {
    return <ThreatForgePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'soc-ai') {
    return <SocAiTriagePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'threat-collector') {
    return <ThreatIntelCollectorPage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'cyberverse') {
    return <CyberVersePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'ai') return <CybravionsAIPage />;
  if (currentView === 'training') return <TrainingPage />;
  if (currentView === 'compliance') return <CompliancePage />;
  if (currentView === 'vapt') {
    return <VaptServicePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'iso-27001') {
    return <Iso27001ServicePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'soc-2') {
    return <Soc2ServicePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'cloud-security') {
    return <CloudSecurityServicePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'ai-security') {
    return <AiSecurityServicePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'dpdp-compliance') {
    return <DpdpComplianceServicePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'resources') {
    return <ResourcesPage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'not-found') {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="text-slate-600 dark:text-stone-400">The page you requested does not exist.</p>
        <button type="button" onClick={() => setCurrentView('home')} className="px-5 py-3 rounded-lg bg-orange-500 text-white font-semibold">
          Return home
        </button>
      </section>
    );
  }

  return <>{children}</>;
}
