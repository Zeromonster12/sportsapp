"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { createClient } from "../../lib/supabase";
import { SocialAuthButtons } from "../../components/auth/SocialAuthButtons";
import { AuthFormInput } from "../../components/auth/AuthFormInput";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Nastala chyba pri prihlasovaní");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Nastala chyba pri prihlasovaní cez Google");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Vitajte späť
              </h1>
              <p className="text-zinc-400">Prihláste sa do svojho účtu</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AuthFormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.com"
                required
              />

              <AuthFormInput
                id="password"
                name="password"
                type="password"
                label="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                  Zabudli ste heslo?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
              >
                {isLoading ? "Prihlasovanie..." : "Prihlásiť sa"}
              </button>
            </form>

            <SocialAuthButtons
              onGoogleSignIn={handleGoogleSignIn}
              mode="login"
            />

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-zinc-400">
              Nemáte účet?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition"
              >
                Zaregistrujte sa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
