interface ProfileActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileActions({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
}: ProfileActionsProps) {
  return (
    <div className="pt-6 border-t border-zinc-800 flex gap-3">
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Upraviť profil
        </button>
      ) : (
        <>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
          >
            {isSaving ? "Ukladanie..." : "Uložiť zmeny"}
          </button>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-medium rounded-lg transition"
          >
            Zrušiť
          </button>
        </>
      )}
    </div>
  );
}
