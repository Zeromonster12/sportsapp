import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-400">
            © {new Date().getFullYear()} SportsApp. Všetky práva vyhradené.
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-zinc-400 hover:text-white transition">
              O nás
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition">
              Kontakt
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition">
              Ochrana údajov
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
