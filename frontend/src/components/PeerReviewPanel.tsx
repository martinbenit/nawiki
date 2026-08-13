"use client";

import { Send, FileText, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export function PeerReviewPanel({ userRole = 'Alumno' }: { userRole?: string }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Curator", text: "The methodology section needs more detail regarding the sample size.", time: "10:30 AM" },
    { id: 2, sender: "Contributor", text: "I've updated the document to include the G*Power analysis.", time: "11:15 AM" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "Curator", text: input, time: "Now" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] w-full max-w-7xl mx-auto border border-border rounded-xl overflow-hidden bg-background shadow-lg">
      
      {/* Left: Document/Metadata View */}
      <div className="flex-1 border-b md:border-b-0 md:border-r border-border flex flex-col bg-muted/30">
        <div className="p-4 border-b border-border bg-background flex justify-between items-center">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Document Review
          </h2>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full font-medium">
            PENDING
          </span>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-xl font-bold mb-2">Sustainable Urban Agriculture Models</h3>
            <p className="text-muted-foreground text-sm mb-4">Author: Marcus Chen</p>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md flex justify-between items-center">
                <span className="font-medium text-sm">Main Report (PDF)</span>
                <a href="#" className="text-primary text-sm hover:underline">View Document</a>
              </div>
              <div className="p-4 bg-muted rounded-md flex justify-between items-center">
                <span className="font-medium text-sm">Data Appendix (Sheets)</span>
                <a href="#" className="text-primary text-sm hover:underline">View Document</a>
              </div>
            </div>
          </div>
          
          {/* Curator Action Buttons */}
          {userRole === 'Profesor' && (
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex justify-center items-center gap-2">
                <CheckCircle size={18} /> Aprobar
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex justify-center items-center gap-2">
                <XCircle size={18} /> Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Chat Panel */}
      <div className="w-full md:w-96 flex flex-col bg-background">
        <div className="p-4 border-b border-border bg-muted/50">
          <h3 className="font-semibold">Feedback & Review Thread</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === "Curator" ? "items-end" : "items-start"}`}>
              <span className="text-xs text-muted-foreground mb-1">{msg.sender} • {msg.time}</span>
              <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.sender === "Curator" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {userRole === 'Profesor' ? (
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type feedback..." 
                className="flex-1 bg-muted border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={sendMessage} className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-t border-border bg-background text-center text-sm text-muted-foreground">
            Solo los Profesores pueden dejar feedback.
          </div>
        )}
      </div>
    </div>
  );
}
