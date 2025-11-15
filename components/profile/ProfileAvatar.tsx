import { User } from "@supabase/supabase-js";

interface ProfileAvatarProps {
  user: User;
  fullName: string;
}

export function ProfileAvatar({ user, fullName }: ProfileAvatarProps) {
  const initial =
    fullName?.charAt(0)?.toUpperCase() ||
    user.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-800 p-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-4xl">
          {initial}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {fullName || "Používateľ"}
          </h2>
          <p className="text-blue-100">{user.email}</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-900/50 rounded-full text-sm text-blue-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Aktívny účet
          </div>
        </div>
      </div>
    </div>
  );
}
