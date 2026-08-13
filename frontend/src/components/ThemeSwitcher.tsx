"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const themes = ["light", "emerald", "amethyst", "monochrome", "sunset"];

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={toggleDarkMode}
        className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
        title="Toggle Dark Mode"
      >
        {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="relative group">
        <button className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors flex items-center gap-2" title="Change Theme Palette">
          <Palette size={18} />
        </button>
        <div className="absolute right-0 top-full mt-2 w-32 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-muted capitalize first:rounded-t-lg last:rounded-b-lg"
            >
              {t === "light" ? "Default" : t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
