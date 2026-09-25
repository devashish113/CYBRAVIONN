import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home, Terminal, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Cybravions Sovereign Shield] Uncaught Runtime Exception caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });

    // Handle ChunkLoadError (when new deploy invalidates old hashes)
    const isChunkLoadError = 
      error.name === 'ChunkLoadError' || 
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Importing a module script failed');

    if (isChunkLoadError) {
      const reloadKey = 'cybravions_chunk_reload_' + (error.message || '');
      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, '1');
        console.warn('[Cybravions Shield] Stale asset hash detected after new release. Auto-refreshing cache...');
        window.location.reload();
      }
    }
  }

  private handleHardReload = () => {
    try {
      localStorage.removeItem('cybravions_cache');
      sessionStorage.clear();
      // Force hard cache reload
      const url = new URL(window.location.href);
      url.searchParams.set('v', Date.now().toString());
      window.location.href = url.toString();
    } catch {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    try {
      this.setState({ hasError: false, error: null, errorInfo: null });
      window.location.href = '/';
    } catch {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'An unexpected rendering error occurred.';
      const isChunkError = 
        errorMessage.includes('Failed to fetch dynamically imported module') ||
        errorMessage.includes('ChunkLoadError');

      return (
        <div className="min-h-screen w-full bg-[#05070d] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans select-none">
          {/* Cyber Atmospheric Glow */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-xl w-full p-8 md:p-10 rounded-3xl bg-[#090d1a]/95 border border-red-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(239,68,68,0.15)] backdrop-blur-2xl relative z-10 text-center">
            
            {/* Shield Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
              <ShieldAlert size={32} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/25 text-xs font-mono font-bold mb-4">
              <AlertTriangle size={12} />
              <span>Sovereign Guard Activated</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {isChunkError ? 'New Release Detected' : 'Runtime Recovery Shield'}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              {isChunkError
                ? 'A new system update has been deployed to the Cybravions cloud. Click below to load the latest verified security modules.'
                : 'The application encountered an unexpected state. Our fault-tolerance boundary isolated the process to prevent data loss.'}
            </p>

            {/* Collapsible Error Debug Terminal */}
            <div className="mb-8 text-left">
              <details className="group rounded-xl bg-black/60 border border-stone-800 text-xs font-mono overflow-hidden">
                <summary className="p-3 text-stone-400 cursor-pointer hover:text-stone-200 flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-2">
                    <Terminal size={14} className="text-orange-400" />
                    <span>Technical Diagnostics</span>
                  </span>
                  <span className="text-[10px] text-stone-500 group-open:hidden">[Click to Expand]</span>
                </summary>
                <div className="p-3 border-t border-stone-800 text-red-300 bg-black/90 font-mono text-[11px] max-h-40 overflow-auto whitespace-pre-wrap break-all leading-snug">
                  {errorMessage}
                  {this.state.errorInfo?.componentStack && (
                    <div className="mt-2 text-stone-500 text-[10px]">
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </div>
              </details>
            </div>

            {/* Recovery Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleHardReload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                <span>Reload Latest Build</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home size={14} />
                <span>Return to Home</span>
              </button>
            </div>

            <div className="mt-6 text-[10px] font-mono text-stone-600">
              CYBRAVION SOLUTIONS PRIVATE LIMITED · CIN: U62099DL2026PTC470901
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
