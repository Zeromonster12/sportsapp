"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { AccountInfo } from "@/components/profile/AccountInfo";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { DangerZone } from "@/components/profile/DangerZone";
import { useProfileForm } from "@/hooks/useProfileForm";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const {
    formData,
    isEditing,
    isSaving,
    message,
    setIsEditing,
    handleChange,
    handleSave,
    handleCancel,
  } = useProfileForm({ user });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Načítavanie...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Môj profil</h1>
          <p className="text-zinc-400">
            Spravujte svoje osobné údaje a nastavenia
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <ProfileAvatar user={user} fullName={formData.fullName} />

          {/* Form Section */}
          <div className="p-8">
            {/* Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  message.type === "success"
                    ? "bg-green-900/30 border-green-800 text-green-400"
                    : "bg-red-900/30 border-red-800 text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-6">
              <ProfileForm
                fullName={formData.fullName}
                email={formData.email}
                isEditing={isEditing}
                onChange={handleChange}
              />

              <AccountInfo user={user} />

              <ProfileActions
                isEditing={isEditing}
                isSaving={isSaving}
                onEdit={() => setIsEditing(true)}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>

        <DangerZone />
      </div>
    </div>
  );
}
