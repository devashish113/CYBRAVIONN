import React from 'react';

/**
 * Enhanced lazy loader with automatic retry and stale-chunk recovery.
 * If a new build changes hashed asset names, this automatically triggers a clean reload
 * instead of letting React crash into a blank page.
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  retriesLeft = 2
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    for (let attempt = 0; attempt <= retriesLeft; attempt++) {
      try {
        return await componentImport();
      } catch (error: any) {
        if (attempt === retriesLeft) {
          const isChunkError = 
            error?.name === 'ChunkLoadError' ||
            error?.message?.includes('Failed to fetch dynamically imported module') ||
            error?.message?.includes('Importing a module script failed');

          if (isChunkError && typeof window !== 'undefined') {
            const reloadKey = 'cybravions_retry_' + window.location.pathname;
            if (!sessionStorage.getItem(reloadKey)) {
              sessionStorage.setItem(reloadKey, '1');
              console.warn('[Cybravions LazyLoader] Reloading with fresh cache for new build...');
              window.location.reload();
            }
          }
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    return componentImport();
  });
}
