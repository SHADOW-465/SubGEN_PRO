import React, { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Settings, Key, Eye, EyeOff, Save, Check } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

export function SettingsDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("subgen_api_key");
    if (stored) setApiKey(stored);
  }, [open]);

  const handleSave = () => {
    localStorage.setItem("subgen_api_key", apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Optionally close
    // onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/10 bg-[#1a0d0a] p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[32px]">

          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h2 className="text-lg font-black leading-none tracking-tight text-white uppercase italic">Settings</h2>
            <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Configure your AI credentials</p>
          </div>

          <div className="grid gap-6 py-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E5352B]">Google Gemini API Key</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                      <Key size={14} />
                   </div>
                   <input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-[#E5352B]/50 transition-all"
                   />
                   <button
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                   >
                      {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                   </button>
                </div>
                <p className="text-[9px] text-white/30 leading-relaxed">
                   Your API key is stored locally in your browser and used directly to communicate with Google's servers.
                </p>
             </div>
          </div>

          <div className="flex justify-end gap-3">
             <button
                onClick={() => onOpenChange(false)}
                className="px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all"
             >
                Cancel
             </button>
             <button
                onClick={handleSave}
                className="px-6 py-3 rounded-full bg-[#E5352B] text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(229,53,43,0.4)] hover:bg-[#c92a20] transition-all flex items-center gap-2"
             >
                {saved ? <Check size={14} /> : <Save size={14} />}
                {saved ? "Saved" : "Save Settings"}
             </button>
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-white/50 hover:text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
