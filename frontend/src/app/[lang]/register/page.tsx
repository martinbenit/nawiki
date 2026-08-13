'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { createBrowserClient } from '@supabase/ssr';

const dictionaries = {
  'en': {
    title: "Create an Account",
    subtitle: "Join the scientific community",
    email: "Email",
    password: "Password",
    name: "First Name",
    lastName: "Last Name",
    university: "University",
    major: "Major",
    year: "Year",
    working: "Do you work?",
    role: "Account Type",
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
    name: "Nombre",
    lastName: "Apellido",
    university: "Universidad",
    major: "Carrera",
    year: "Año",
    working: "¿Trabajas?",
    role: "Tipo de Cuenta",
    avatar: "Selecciona tu Avatar Nanopartícula",
    submit: "Crear Cuenta",
    haveAccount: "¿Ya tienes cuenta?",
    login: "Ingresar"
  }
};

const avatars = [
  { id: 'oro_np', name: 'Oro NP', shapeClass: 'w-8 h-8 rounded-full', color: 'bg-yellow-400', shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.6)]' },
  { id: 'plata_np', name: 'Plata NP', shapeClass: 'w-4 h-10 rounded-full', color: 'bg-slate-300', shadow: 'shadow-[0_0_15px_rgba(203,213,225,0.6)]' },
  { id: 'carbon_nt', name: 'Carbon NT', shapeClass: 'w-3 h-10 rounded-sm border-2 border-zinc-500', color: 'bg-zinc-800', shadow: 'shadow-[0_0_15px_rgba(39,39,42,0.6)]' },
  { id: 'qdot', name: 'QDot', shapeClass: 'w-5 h-5 rounded-full blur-[1px]', color: 'bg-purple-500', shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.8)]' },
  { id: 'plasmon', name: 'Plasmón', shapeClass: 'w-8 h-8 rotate-45 rounded-sm', color: 'bg-rose-500', shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.6)]' },
];

export default function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang as 'en' | 'es-AR';
  const dict = dictionaries[lang] || dictionaries['en'];
  
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    university: '',
    major: '',
    year: '',
    working: 'No',
    role: 'Alumno'
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example';
  const supabase = createBrowserClient(supabaseUrl, supabaseKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          lastName: formData.lastName,
          university: formData.university,
          major: formData.major,
          year: formData.year,
          working: formData.working,
          role: formData.role,
          avatar: selectedAvatar
        }
      }
    });
    if (error) {
      console.error(error);
    } else {
      window.location.href = `/${lang}/hub`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans relative overflow-hidden py-12">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-2xl bg-card border border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">{dict.title}</h1>
        <p className="text-muted-foreground text-center mb-8">{dict.subtitle}</p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.name}</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.lastName}</label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.email}</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.password}</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.university}</label>
              <input 
                type="text" 
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.major}</label>
              <input 
                type="text" 
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.year}</label>
              <input 
                type="text" 
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{dict.working}</label>
              <select 
                value={formData.working}
                onChange={(e) => setFormData({...formData, working: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">{dict.role}</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              >
                <option value="Alumno">Alumno</option>
                <option value="Profesor">Profesor</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-foreground">{dict.avatar}</label>
            <div className="grid grid-cols-5 gap-3">
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
                  <div className={`${avatar.shapeClass} ${avatar.color} ${avatar.shadow} animate-pulse`} 
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
