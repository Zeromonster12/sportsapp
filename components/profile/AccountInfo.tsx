import { User } from "@supabase/supabase-js";

interface AccountInfoProps {
  user: User;
}

export function AccountInfo({ user }: AccountInfoProps) {
  return (
    <div className="pt-6 border-t border-zinc-800">
      <h3 className="text-lg font-semibold text-white mb-4">
        Informácie o účte
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          label="Dátum registrácie"
          value={
            user.created_at
              ? new Date(user.created_at).toLocaleDateString("sk-SK")
              : "N/A"
          }
        />
        <InfoCard
          label="Posledné prihlásenie"
          value={
            user.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleDateString("sk-SK")
              : "N/A"
          }
        />
        <InfoCard
          label="ID používateľa"
          value={user.id}
          valueClassName="font-mono text-xs truncate"
        />
        <InfoCard
          label="Metóda prihlásenia"
          value={user.app_metadata?.provider === "google" ? "Google" : "Email"}
        />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  valueClassName = "font-medium",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4">
      <p className="text-sm text-zinc-400 mb-1">{label}</p>
      <p className={`text-white ${valueClassName}`}>{value}</p>
    </div>
  );
}
