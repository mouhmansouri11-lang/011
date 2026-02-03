import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: postgres.Sql | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && ENV.supabaseUrl) {
    try {
      // Create connection string from Supabase credentials
      const connectionString = `postgresql://postgres.wlyjovoefnpmgiexkacs:${ENV.supabaseServiceRoleKey}@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`;
      _client = postgres(connectionString);
      _db = drizzle(_client);
      console.log("[Database] Connected to Supabase PostgreSQL");
    } catch (error) {
      console.warn("[Database] Failed to connect to Supabase:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  if (!user.userType) {
    throw new Error("User userType is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    // Check if user exists
    const existing = await db.select().from(users).where(eq(users.openId, user.openId)).limit(1);

    if (existing.length > 0) {
      // Update existing user
      await db
        .update(users)
        .set({
          email: user.email ?? existing[0].email,
          phone: user.phone ?? existing[0].phone,
          name: user.name ?? existing[0].name,
          userType: user.userType ?? existing[0].userType,
          loginMethod: user.loginMethod ?? existing[0].loginMethod,
          lastSignedIn: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(users.openId, user.openId));
    } else {
      // Insert new user
      await db.insert(users).values({
        openId: user.openId,
        email: user.email,
        phone: user.phone,
        name: user.name,
        userType: user.userType ?? "patient",
        loginMethod: user.loginMethod,
        lastSignedIn: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.


// Patient queries
export async function getPatientByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const { patients } = await import("../drizzle/schema");
  const result = await db.select().from(patients).where(eq(patients.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPatient(patientData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { patients } = await import("../drizzle/schema");
  const result = await db.insert(patients).values(patientData);
  return result;
}

// Medical professional queries
export async function getMedicalProfessionalByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const { medicalProfessionals } = await import("../drizzle/schema");
  const result = await db.select().from(medicalProfessionals).where(eq(medicalProfessionals.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMedicalProfessional(professionalData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { medicalProfessionals } = await import("../drizzle/schema");
  const result = await db.insert(medicalProfessionals).values(professionalData);
  return result;
}

// Health records queries
export async function getBloodPressureRecords(patientId: number, limit: number = 30) {
  const db = await getDb();
  if (!db) return [];

  const { bloodPressureRecords } = await import("../drizzle/schema");
  const result = await db.select().from(bloodPressureRecords).where(eq(bloodPressureRecords.patientId, patientId)).orderBy((t) => t.recordedAt).limit(limit);
  return result;
}

export async function getBloodSugarRecords(patientId: number, limit: number = 30) {
  const db = await getDb();
  if (!db) return [];

  const { bloodSugarRecords } = await import("../drizzle/schema");
  const result = await db.select().from(bloodSugarRecords).where(eq(bloodSugarRecords.patientId, patientId)).orderBy((t) => t.recordedAt).limit(limit);
  return result;
}

export async function addBloodPressureRecord(patientId: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { bloodPressureRecords } = await import("../drizzle/schema");
  const result = await db.insert(bloodPressureRecords).values({
    patientId,
    ...data,
  });
  return result;
}

export async function addBloodSugarRecord(patientId: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { bloodSugarRecords } = await import("../drizzle/schema");
  const result = await db.insert(bloodSugarRecords).values({
    patientId,
    ...data,
  });
  return result;
}

// Appointments queries
export async function getPatientAppointments(patientId: number) {
  const db = await getDb();
  if (!db) return [];

  const { appointments } = await import("../drizzle/schema");
  const result = await db.select().from(appointments).where(eq(appointments.patientId, patientId)).orderBy((t) => t.appointmentDate);
  return result;
}

export async function createAppointment(appointmentData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { appointments } = await import("../drizzle/schema");
  const result = await db.insert(appointments).values(appointmentData);
  return result;
}
