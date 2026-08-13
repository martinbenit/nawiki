import Link from 'next/link';
import { BookOpen, Globe2, ShieldCheck, Zap } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getDictionary } from '@/dictionaries';

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es-AR');

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter text-primary">
            <div className="bg-primary/10 p-2 rounded-xl">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span>NAWIKI</span>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSwitcher currentLang={lang} />
            <ThemeSwitcher />
            <Link 
              href={`/${lang}/login`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict.landing.login}
            </Link>
            <Link 
              href={`/${lang}/register`}
              className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              {dict.landing.register}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Globe2 className="w-4 h-4" />
          <span>{dict.landing.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-4xl leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          {dict.landing.title.split('NAWIKI')[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">NAWIKI</span>
          {dict.landing.title.split('NAWIKI')[1] || ""}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {dict.landing.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link 
            href={`/${lang}/register`}
            className="text-lg font-medium bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"
          >
            {dict.landing.getStarted}
          </Link>
          <Link 
            href={`/${lang}/hub`}
            className="text-lg font-medium bg-secondary text-secondary-foreground px-8 py-4 rounded-full hover:bg-secondary/80 transition-all hover:-translate-y-1"
          >
            {dict.landing.exploreHub}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
          <div className="flex flex-col items-center p-6 text-center space-y-4 rounded-3xl bg-secondary/30 border border-border/50">
            <div className="bg-background p-4 rounded-2xl shadow-sm">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{dict.landing.features.vetted.title}</h3>
            <p className="text-muted-foreground">{dict.landing.features.vetted.desc}</p>
          </div>
          <div className="flex flex-col items-center p-6 text-center space-y-4 rounded-3xl bg-secondary/30 border border-border/50">
            <div className="bg-background p-4 rounded-2xl shadow-sm">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{dict.landing.features.fast.title}</h3>
            <p className="text-muted-foreground">{dict.landing.features.fast.desc}</p>
          </div>
          <div className="flex flex-col items-center p-6 text-center space-y-4 rounded-3xl bg-secondary/30 border border-border/50">
            <div className="bg-background p-4 rounded-2xl shadow-sm">
              <Globe2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{dict.landing.features.global.title}</h3>
            <p className="text-muted-foreground">{dict.landing.features.global.desc}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
