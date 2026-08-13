"use client";

import { ExternalLink } from "lucide-react";

interface AssetLink {
  url: string;
  type: string; // "pdf", "word", "sheets", "video", etc.
}

interface ScientificAsset {
  id: string;
  title: string;
  summary: string;
  author: string;
  tags: string[];
  links: AssetLink[];
  status?: string;
}

export function ScientificHubBoard({ userRole = 'Alumno' }: { userRole?: string }) {
  // Mock Data
  const assets: ScientificAsset[] = [
    {
      id: "1",
      title: "Quantum Entanglement in Macroscopic Systems",
      summary: "A novel approach to demonstrating quantum entanglement at larger scales than previously thought possible.",
      author: "Dr. Elena Rostova",
      tags: ["Physics", "Quantum", "Research"],
      links: [
        { url: "https://example.com/paper.pdf", type: "pdf" },
        { url: "https://example.com/data.xlsx", type: "sheets" }
      ],
      status: "pending"
    },
    {
      id: "2",
      title: "Sustainable Urban Agriculture Models",
      summary: "Analyzing the efficiency of vertical farming in high-density urban environments.",
      author: "Marcus Chen",
      tags: ["Sustainability", "Agriculture", "Urban Planning"],
      links: [
        { url: "https://example.com/report.pdf", type: "pdf" }
      ],
      status: "approved"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {assets.map((asset) => (
        <div 
          key={asset.id} 
          className="group relative bg-muted rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border flex flex-col h-full overflow-hidden"
        >
          {/* Card Hover Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
          
          <div className="flex-1 relative z-10">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{asset.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{asset.summary}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {asset.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-background text-xs rounded-full border border-border text-foreground">
                  {tag}
                </span>
              ))}
              {asset.status === 'pending' && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full font-medium">
                  Pendiente
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-foreground">{asset.author}</span>
            <div className="flex gap-2 items-center">
              {userRole === 'Profesor' && asset.status === 'pending' && (
                <button className="text-xs bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full hover:bg-green-500/30 transition-colors font-medium">
                  Aprobar
                </button>
              )}
              {asset.links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                  title={`Open ${link.type.toUpperCase()}`}
                >
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
