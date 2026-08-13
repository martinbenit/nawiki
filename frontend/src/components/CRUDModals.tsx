"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, X, Link as LinkIcon } from "lucide-react";

export function CRUDModals() {
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState([{ url: "", type: "pdf" }]);

  const addAsset = () => {
    if (assets.length < 3) {
      setAssets([...assets, { url: "", type: "pdf" }]);
    }
  };

  const removeAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const updateAsset = (index: number, field: string, value: string) => {
    const newAssets = [...assets];
    newAssets[index] = { ...newAssets[index], [field]: value };
    setAssets(newAssets);
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
      >
        <Plus size={18} /> Propose Knowledge
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl w-full max-w-lg border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
              <h2 className="text-xl font-bold">New Scientific Asset</h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" className="w-full p-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="Enter title" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <textarea className="w-full p-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary outline-none" rows={3} placeholder="Brief summary..."></textarea>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Sources (Max 3)</label>
                  <span className="text-xs text-muted-foreground">{assets.length}/3 added</span>
                </div>
                
                <div className="space-y-3">
                  {assets.map((asset, index) => (
                    <div key={index} className="flex gap-2 items-center bg-muted p-2 rounded-lg border border-border">
                      <LinkIcon size={16} className="text-muted-foreground ml-2" />
                      <input 
                        type="url" 
                        value={asset.url}
                        onChange={(e) => updateAsset(index, "url", e.target.value)}
                        className="flex-1 bg-transparent border-none text-sm outline-none px-2"
                        placeholder="https://..."
                      />
                      <select 
                        value={asset.type}
                        onChange={(e) => updateAsset(index, "type", e.target.value)}
                        className="bg-background border border-border rounded text-sm p-1 outline-none"
                      >
                        <option value="pdf">PDF</option>
                        <option value="word">Word</option>
                        <option value="sheets">Sheets</option>
                        <option value="video">Video</option>
                        <option value="link">Other Link</option>
                      </select>
                      <button 
                        onClick={() => removeAsset(index)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition"
                        title="Remove source"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {assets.length < 3 && (
                    <button 
                      onClick={addAsset}
                      className="w-full py-2 border-2 border-dashed border-border text-muted-foreground rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add another source
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition">
                Cancel
              </button>
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
