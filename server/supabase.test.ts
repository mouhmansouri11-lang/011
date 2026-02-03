import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

describe("Supabase Connection", () => {
  it("should successfully connect to Supabase", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Test basic connection by checking auth status
    const { data, error } = await supabase.auth.getSession();
    
    // We expect no error even if there's no session
    expect(error).toBeNull();
  });

  it("should have valid Supabase credentials", () => {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check URL format
    expect(url).toMatch(/^https:\/\/.*\.supabase\.co$/);

    // Check keys are JWT tokens
    expect(anonKey).toMatch(/^eyJ/);
    expect(serviceKey).toMatch(/^eyJ/);

    // Check keys have proper length
    expect(anonKey?.length).toBeGreaterThan(100);
    expect(serviceKey?.length).toBeGreaterThan(100);
  });
});
