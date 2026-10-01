import React from 'react';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import type { AppView } from '../utils/routing';

const TrainingPage = lazyWithRetry(() => import('../pages/Training').then(m => ({ default: m.TrainingPage })));
const CompliancePage = lazyWithRetry(() => import('../pages/Compliance').then(m => ({ default: m.CompliancePage })));
const CybravionsAIPage = lazyWithRetry(() => import('../pages/CybravionsAI').then(m => ({ default: m.CybravionsAIPage })));
const CyberVersePage = lazyWithRetry(() => import('../pages/CyberVerse').then(m => ({ default: m.CyberVersePage })));
const ExceptionManagerPage = lazyWithRetry(() => import('../pages/ExceptionManager').then(m => ({ default: m.ExceptionManagerPage })));
const AboutUsPage = lazyWithRetry(() => import('../pages/AboutUs').then(m => ({ default: m.AboutUsPage })));

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
  if (currentView === 'cyberverse') {
    return <CyberVersePage setCurrentView={setCurrentView} isDarkMode={isDarkMode} onOpenConsultation={onOpenAuditModal} />;
  }
  if (currentView === 'ai') return <CybravionsAIPage />;
  if (currentView === 'training') return <TrainingPage />;
  if (currentView === 'compliance') return <CompliancePage />;
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
