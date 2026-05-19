export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-bg-off-white px-4">
      <div className="flex flex-col items-center gap-5 rounded-2xl bg-bg-light px-10 py-8 shadow-md border border-surface-muted">
        <div
          className="w-11 h-11 border-[3px] border-surface-muted border-t-primary-yellow rounded-full animate-spin"
          aria-hidden
        />
        <p className="text-sm font-medium text-text-gray">Loading…</p>
      </div>
    </div>
  );
}
