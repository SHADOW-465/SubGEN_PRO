import React from "react";
import { cn } from "@/lib/utils"; // Assuming utils exists, or I will use template literal

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ElementType;
}

export function LiquidButton({
  children,
  className = "",
  active = false,
  size = "md",
  icon: Icon,
  ...props
}: LiquidButtonProps) {
  const sizeClasses = size === "sm" ? "w-9 h-9" : size === "lg" ? "w-12 h-12" : "w-10 h-10";

  return (
    <button
      className={`
        ${sizeClasses} flex items-center justify-center rounded-full transition-all duration-500 relative group
        ${active
          ? 'bg-white/90 text-[#3A1C14] shadow-[0_0_25px_rgba(255,255,255,0.4),inset_0_2px_4px_rgba(255,255,255,0.8)] scale-110'
          : 'bg-white/10 text-white/80 backdrop-blur-xl border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95'
        }
        ${className}
      `}
      {...props}
    >
      {!active && <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />}
      {Icon ? <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 18} /> : children}
    </button>
  );
}
