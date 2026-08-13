'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { createBrowserClient } from '@supabase/ssr';

const dictionaries = {
  'en': {
    auth: {
      loginTitle: "Welcome back",
      loginSubtitle: "Sign in to your account",
      email: "Email",
      password: "Password",
      submitLogin: "Login",
      noAccount: "Don't have an account?",
      submitRegister: "Create Account"
    }
  },
  'es-AR': {
    auth: {
      loginTitle: "Bienvenido de nuevo",
      loginSubtitle: "Ingresa a tu cuenta",
      email: "Correo Electrónico",
      password: "Contraseña",
      submitLogin: "Ingresar",
      noAccount: "¿No tienes cuenta?",
      submitRegister: "Crear Cuenta"
    }
  }
};

export default function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang as 'en' | 'es-AR';
  const dict = dictionaries[lang] || dictionaries['en'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example';
  const supabase = createBrowserClient(supabaseUrl, supabaseKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
    } else {
      window.location.href = `/${lang}/hub`;
    }
  };

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
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm text-center font-medium">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.auth.email}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.auth.password}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
              required
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
