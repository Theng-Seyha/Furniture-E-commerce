import React from 'react';
import MonitoringService from '../services/MonitoringService';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    MonitoringService.reportError(error, {
      severity: 'fatal',
      component: 'ErrorBoundary',
      info: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3">
              Unexpected Studio Fault
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
              We encountered a runtime mismatch while processing your request. The incident has been logged for our artisans to review.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Reload Application
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-3 rounded-full bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return to Entry
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-left overflow-auto max-h-40">
                <p className="text-[10px] font-mono text-red-500">{this.state.error?.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
