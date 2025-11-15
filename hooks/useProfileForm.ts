import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

interface UseProfileFormProps {
  user: User | null;
}

export function useProfileForm({ user }: UseProfileFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "Profil bol úspešne aktualizovaný",
        });
        setIsEditing(false);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Nastala chyba pri ukladaní" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
      });
    }
    setMessage(null);
  };

  return {
    formData,
    isEditing,
    isSaving,
    message,
    setIsEditing,
    handleChange,
    handleSave,
    handleCancel,
  };
}
