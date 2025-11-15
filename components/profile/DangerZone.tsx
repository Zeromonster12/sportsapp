export function DangerZone() {
  return (
    <div className="mt-8 bg-zinc-900 rounded-lg border border-red-900/50 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-2">
          Nebezpečná zóna
        </h3>
        <p className="text-zinc-400 text-sm mb-4">
          Permanentné akcie, ktoré nemožno vrátiť späť
        </p>
        <button className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 font-medium rounded-lg transition text-sm">
          Zmazať účet
        </button>
      </div>
    </div>
  );
}
