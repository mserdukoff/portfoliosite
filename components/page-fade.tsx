export function PageFade({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col animate-page-fade">{children}</div>;
}
