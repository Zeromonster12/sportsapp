interface ProfileFormProps {
  fullName: string;
  email: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileForm({
  fullName,
  email,
  isEditing,
  onChange,
}: ProfileFormProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Osobné údaje</h3>
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Celé meno
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Vaše meno"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-500 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-zinc-500">Email nemožno zmeniť</p>
        </div>
      </div>
    </div>
  );
}
