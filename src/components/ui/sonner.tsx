/** @format */

"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--surface)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "border shadow-lg shadow-slate-200/40",
          title: "text-sm font-medium text-slate-900",
          description: "text-xs text-slate-500",
          success: "border-emerald-200 bg-emerald-50/95 text-emerald-950",
          error: "border-red-200 bg-red-50/95 text-red-950",
          info: "border-blue-200 bg-blue-50/95 text-blue-950",
          warning: "border-amber-200 bg-amber-50/95 text-amber-950",
          closeButton:
            "border-slate-200 bg-white text-slate-500 hover:bg-slate-50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
