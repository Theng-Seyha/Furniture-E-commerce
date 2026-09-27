import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; 

/**
 * Monitoring Service
 * Captured and reports runtime errors to Firestore for proactive debugging.
 */
class MonitoringService {
  static async reportError(error, context = {}) {
    const errorData = {
      message: error.message || 'Unknown error',
      stack: error.stack || null,
      url: window.location.href,
      userAgent: navigator.userAgent,
      component: context.component || 'Global',
      severity: context.severity || 'error',
      timestamp: serverTimestamp(),
      additionalInfo: context.info || null
    };

    try {
      if (db) {
        await addDoc(collection(db, 'runtime_errors'), errorData);
      } else {
        console.warn('MonitoringService: Firestore DB not initialized. Error details:', errorData);
      }
    } catch (err) {
      console.error('MonitoringService: Failed to report error to Firestore:', err);
    }
  }

  static initGlobalListeners() {
    window.addEventListener('error', (event) => {
      this.reportError(event.error || { message: event.message }, { severity: 'error' });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(event.reason instanceof Error ? event.reason : { message: String(event.reason) }, { 
        severity: 'fatal',
        info: 'Unhandled Promise Rejection'
      });
    });
  }
}

export default MonitoringService;
