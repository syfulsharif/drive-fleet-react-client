export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24 px-6 text-center">
      <h1 className="text-8xl font-serif text-[#d4af37] mb-4">404</h1>
      <p className="text-white text-xl font-serif mb-2">Page not found</p>
      <p className="text-[#71717a] text-sm mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e7] transition-colors">
        Return Home
      </a>
    </div>
  );
}