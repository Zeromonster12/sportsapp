"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { createClient } from "../../lib/supabase";
import { SocialAuthButtons } from "../../components/auth/SocialAuthButtons";
import { AuthFormInput } from "../../components/auth/AuthFormInput";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Heslá sa nezhodujú");
      return;
    }

    if (formData.password.length < 8) {
      setError("Heslo musí mať aspoň 8 znakov");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          setError("Tento email už je registrovaný");
          setIsLoading(false);
          return;
        }

        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      setError("Nastala chyba pri registrácii");
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
      setError("Nastala chyba pri registrácii cez Google");
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
                Vytvorte si účet
              </h1>
              <p className="text-zinc-400">
                Začnite sledovať svoje obľúbené športy
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthFormInput
                id="name"
                name="name"
                type="text"
                label="Meno"
                value={formData.name}
                onChange={handleChange}
                placeholder="Vaše meno"
                required
              />

              <AuthFormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vas@email.com"
                required
              />

              <AuthFormInput
                id="password"
                name="password"
                type="password"
                label="Heslo"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                helpText="Minimálne 8 znakov"
              />

              <AuthFormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Potvrďte heslo"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 bg-zinc-800 border-zinc-700 rounded focus:ring-2 focus:ring-blue-600"
                />
                <label htmlFor="terms" className="text-sm text-zinc-400">
                  Súhlasím s{" "}
                  <Link
                    href="/terms"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    podmienkami používania
                  </Link>{" "}
                  a{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    zásadami ochrany osobných údajov
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
              >
                {isLoading ? "Registrácia..." : "Zaregistrovať sa"}
              </button>
            </form>

            <SocialAuthButtons
              onGoogleSignIn={handleGoogleSignIn}
              mode="register"
            />

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-zinc-400">
              Už máte účet?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition"
              >
                Prihláste sa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
