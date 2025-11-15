import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "your-project-url") {
    throw new Error(
      "Missing Supabase environment variables. Please update .env.local with your Supabase project URL and anon key."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
