'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const dictionaries = {
  'en': {
    title: "Create an Account",
    subtitle: "Join the scientific community",
    email: "Email",
    password: "Password",
    name: "Full Name",
    avatar: "Select your Nanoparticle Avatar",
    submit: "Create Account",
    haveAccount: "Already have an account?",
    login: "Login"
  },
  'es-AR': {
    title: "Crear una Cuenta",
    subtitle: "Únete a la comunidad científica",
    email: "Correo Electrónico",
    password: "Contraseña",
    name: "Nombre Completo",
    avatar: "Selecciona tu Avatar Nanopartícula",
    submit: "Crear Cuenta",
    haveAccount: "¿Ya tienes cuenta?",
    login: "Ingresar"
  }
};

const avatars = [
  { id: 'gold', name: 'Gold Nanosphere', color: 'bg-yellow-400', shadow: 'shadow-yellow-400/50' },
  { id: 'silver', name: 'Silver Nanorod', color: 'bg-slate-300', shadow: 'shadow-slate-300/50' },
  { id: 'liposome', name: 'Liposome', color: 'bg-emerald-400', shadow: 'shadow-emerald-400/50' },
  { id: 'quantum', name: 'Quantum Dot', color: 'bg-purple-500', shadow: 'shadow-purple-500/50' },
];

export default function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang as 'en' | 'es-AR';
  const dict = dictionaries[lang] || dictionaries['en'];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans relative overflow-hidden py-12">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-md bg-card border border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">{dict.title}</h1>
        <p className="text-muted-foreground text-center mb-8">{dict.subtitle}</p>
        
        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.name}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Dr. Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.email}</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{dict.password}</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-foreground">{dict.avatar}</label>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map(avatar => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`relative aspect-square rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                    selectedAvatar === avatar.id 
                      ? 'border-primary bg-primary/5 scale-105' 
                      : 'border-border/50 bg-background hover:border-primary/50'
                  }`}
                  title={avatar.name}
                >
                  <div className={`w-8 h-8 rounded-full ${avatar.color} shadow-lg ${avatar.shadow} animate-pulse`} 
                       style={{ animationDuration: '3s' }} />
                </button>
              ))}
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-6"
          >
            {dict.submit}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {dict.haveAccount}{" "}
          <Link href={`/${lang}/login`} className="text-primary hover:underline font-medium">
            {dict.login}
          </Link>
        </div>
      </div>
    </div>
  );
}
