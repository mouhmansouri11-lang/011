import { defineConfig } from "drizzle-kit";

// Use Supabase PostgreSQL if available, otherwise use local MySQL
const useSupabase = !!process.env.SUPABASE_URL;
const connectionString = useSupabase
  ? `postgresql://postgres.tvroufdlsoqddxkrqeaj:[password]@db.tvroufdlsoqddxkrqeaj.supabase.co:5432/postgres`
  : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or SUPABASE_URL is required to run drizzle commands");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: useSupabase ? "postgresql" : "mysql",
  dbCredentials: {
    url: connectionString,
  },
});
