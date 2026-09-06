import { AlertTriangle, X } from "lucide-react"

export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" role="presentation" onMouseDown={onCancel}>
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10"><AlertTriangle size={21} /></div><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{message}</p></div></div>
        <button aria-label="Close dialog" onClick={onCancel} className="icon-button"><X size={18} /></button>
      </div>
      <div className="mt-6 flex justify-end gap-3"><button onClick={onCancel} className="button-secondary">Cancel</button><button onClick={onConfirm} className="button-danger">{confirmLabel}</button></div>
    </div>
  </div>
}
