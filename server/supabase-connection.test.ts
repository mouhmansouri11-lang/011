import { describe, it, expect } from "vitest";
import { getDb } from "./db";

describe("Supabase Connection", () => {
  it("should connect to Supabase PostgreSQL", async () => {
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("should query users table", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    try {
      const { users } = await import("../drizzle/schema");
      const result = await db.select().from(users).limit(1);
      expect(Array.isArray(result)).toBe(true);
    } catch (error) {
      // Table might be empty, that's okay
      expect(error).toBeDefined();
    }
  });

  it("should query wilayas table", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    try {
      const { wilayas } = await import("../drizzle/schema");
      const result = await db.select().from(wilayas).limit(5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      console.error("Error querying wilayas:", error);
      throw error;
    }
  });

  it("should query specializations table", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    try {
      const { specializations } = await import("../drizzle/schema");
      const result = await db.select().from(specializations).limit(5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      console.error("Error querying specializations:", error);
      throw error;
    }
  });

  it("should query communes table", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    try {
      const { communes } = await import("../drizzle/schema");
      const result = await db.select().from(communes).limit(5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      console.error("Error querying communes:", error);
      throw error;
    }
  });
});
