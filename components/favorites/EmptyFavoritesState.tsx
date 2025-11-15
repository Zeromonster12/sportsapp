import Link from "next/link";

export function EmptyFavoritesState() {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-12 text-center">
      <div className="text-6xl mb-4">⭐</div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Zatiaľ nemáte žiadne obľúbené tímy
      </h3>
      <p className="text-zinc-400 mb-6">
        Začnite sledovať svoje obľúbené tímy a majte prehľad o ich zápasoch
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
      >
        Prehľadať tímy
      </Link>
    </div>
  );
}
