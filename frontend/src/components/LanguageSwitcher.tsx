'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = useCallback(
    (newLang: string) => {
      if (!pathname) return;
      const segments = pathname.split('/');
      segments[1] = newLang;
      router.push(segments.join('/'));
    },
    [pathname, router]
  );

  return (
    <div className="flex bg-secondary/50 p-1 rounded-full border border-border/50">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
          currentLang === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('es-AR')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
          currentLang === 'es-AR'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
    </div>
  );
}
