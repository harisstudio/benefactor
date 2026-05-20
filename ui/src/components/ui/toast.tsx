"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { IconCheck, IconAlertTriangle, IconInfoCircle, IconX } from "@tabler/icons-react";

type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: number;
  tone: ToastTone;
  title: string;
  description?: string;
}

interface ToastContextValue {
  show: (input: { tone?: ToastTone; title: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Drop-in replacement for window.alert() that fits the Benefactor design system. */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback<ToastContextValue["show"]>(
    ({ tone = "info", title, description }) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, tone, title, description }]);
      // Auto-dismiss after 5s
      setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-5 right-5 left-5 sm:left-auto sm:bottom-6 sm:right-6 z-[10000] flex flex-col gap-3 pointer-events-none"
      >
        {items.map((t) => (
          <ToastCard key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [enter, setEnter] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const palette = (
    {
      success: { bg: "bg-emerald-50", border: "border-emerald-200", iconBg: "bg-emerald-500", Icon: IconCheck },
      error: { bg: "bg-rose-50", border: "border-rose-200", iconBg: "bg-rose-500", Icon: IconAlertTriangle },
      info: { bg: "bg-bg-off-white", border: "border-surface-muted", iconBg: "bg-primary-navy", Icon: IconInfoCircle },
    } as const
  )[item.tone];

  return (
    <div
      role="status"
      className={`pointer-events-auto sm:max-w-[400px] w-full ${palette.bg} ${palette.border} border rounded-2xl shadow-xl px-4 py-3.5 flex items-start gap-3 transition-all duration-300 ${enter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      <span
        className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full ${palette.iconBg} text-white`}
      >
        <palette.Icon size={20} stroke={2.4} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-primary-navy leading-tight">{item.title}</p>
        {item.description && (
          <p className="text-[13px] text-text-gray leading-snug mt-0.5">{item.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 -mr-1 -mt-1 w-7 h-7 rounded-full text-text-gray hover:text-primary-navy hover:bg-white/60 transition-colors flex items-center justify-center"
      >
        <IconX size={16} stroke={1.8} />
      </button>
    </div>
  );
}
