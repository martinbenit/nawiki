import Link from 'next/link';
import { getDictionary } from '@/dictionaries';
import { BookOpen } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es-AR');

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-md bg-card border border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">{dict.auth.loginTitle}</h1>
        <p className="text-muted-foreground text-center mb-8">{dict.auth.loginSubtitle}</p>
        
        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.auth.email}</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.auth.password}</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-4"
          >
            {dict.auth.submitLogin}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {dict.auth.noAccount}{" "}
          <Link href={`/${lang}/register`} className="text-primary hover:underline font-medium">
            {dict.auth.submitRegister}
          </Link>
        </div>
      </div>
    </div>
  );
}
