import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

// Create Supabase client for server-side operations
export const supabase = createClient(
  ENV.supabaseUrl,
  ENV.supabaseServiceRoleKey
);

// Create Supabase client for client-side operations
export const supabaseClient = createClient(
  ENV.supabaseUrl,
  ENV.supabaseAnonKey
);

// Helper function to check if Supabase is connected
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count", { count: "exact" }).limit(1);
    if (error) {
      console.error("[Supabase] Connection error:", error);
      return false;
    }
    console.log("[Supabase] Connected successfully");
    return true;
  } catch (error) {
    console.error("[Supabase] Connection failed:", error);
    return false;
  }
}
