import {
  pgTable,
  pgEnum,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  numeric,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * User roles enum
 */
export const userRoleEnum = pgEnum("user_role", ["patient", "doctor", "clinic", "lab", "admin"]);

/**
 * Appointment status enum
 */
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

/**
 * Prescription status enum
 */
export const prescriptionStatusEnum = pgEnum("prescription_status", ["active", "expired", "completed"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  name: text("name"),
  userType: userRoleEnum("userType").notNull().default("patient"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Patient profiles
 */
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  dateOfBirth: timestamp("dateOfBirth"),
  gender: varchar("gender", { length: 10 }),
  bloodType: varchar("bloodType", { length: 5 }),
  wilaya: varchar("wilaya", { length: 100 }),
  commune: varchar("commune", { length: 100 }),
  address: text("address"),
  emergencyContact: varchar("emergencyContact", { length: 20 }),
  medicalHistory: jsonb("medicalHistory"),
  allergies: jsonb("allergies"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Patient = typeof patients.$inferSelect;
export type InsertPatient = typeof patients.$inferInsert;

/**
 * Medical professionals (doctors, clinics, labs)
 */
export const medicalProfessionals = pgTable("medicalProfessionals", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  professionalType: varchar("professionalType", { length: 50 }).notNull(), // doctor, clinic, lab
  specialization: varchar("specialization", { length: 100 }),
  licenseNumber: varchar("licenseNumber", { length: 100 }).unique(),
  yearsOfExperience: integer("yearsOfExperience"),
  wilaya: varchar("wilaya", { length: 100 }),
  commune: varchar("commune", { length: 100 }),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  website: varchar("website", { length: 255 }),
  consultationFee: numeric("consultationFee", { precision: 10, scale: 2 }),
  bio: text("bio"),
  avatar: varchar("avatar", { length: 255 }),
  rating: numeric("rating", { precision: 3, scale: 2 }),
  reviewCount: integer("reviewCount").default(0),
  isVerified: boolean("isVerified").default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type MedicalProfessional = typeof medicalProfessionals.$inferSelect;
export type InsertMedicalProfessional = typeof medicalProfessionals.$inferInsert;

/**
 * Blood pressure records
 */
export const bloodPressureRecords = pgTable("bloodPressureRecords", {
  id: serial("id").primaryKey(),
  patientId: integer("patientId").notNull().references(() => patients.id, { onDelete: "cascade" }),
  systolic: integer("systolic").notNull(),
  diastolic: integer("diastolic").notNull(),
  pulse: integer("pulse"),
  notes: text("notes"),
  recordedAt: timestamp("recordedAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type BloodPressureRecord = typeof bloodPressureRecords.$inferSelect;
export type InsertBloodPressureRecord = typeof bloodPressureRecords.$inferInsert;

/**
 * Blood sugar records
 */
export const bloodSugarRecords = pgTable("bloodSugarRecords", {
  id: serial("id").primaryKey(),
  patientId: integer("patientId").notNull().references(() => patients.id, { onDelete: "cascade" }),
  value: integer("value").notNull(),
  type: varchar("type", { length: 50 }), // fasting, after_meal, random
  notes: text("notes"),
  recordedAt: timestamp("recordedAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type BloodSugarRecord = typeof bloodSugarRecords.$inferSelect;
export type InsertBloodSugarRecord = typeof bloodSugarRecords.$inferInsert;

/**
 * Appointments
 */
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patientId").notNull().references(() => patients.id, { onDelete: "cascade" }),
  professionalId: integer("professionalId")
    .notNull()
    .references(() => medicalProfessionals.id, { onDelete: "cascade" }),
  appointmentDate: timestamp("appointmentDate").notNull(),
  duration: integer("duration"), // in minutes
  status: appointmentStatusEnum("status").notNull().default("pending"),
  notes: text("notes"),
  reason: text("reason"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Prescriptions
 */
export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  patientId: integer("patientId").notNull().references(() => patients.id, { onDelete: "cascade" }),
  professionalId: integer("professionalId")
    .notNull()
    .references(() => medicalProfessionals.id, { onDelete: "cascade" }),
  medications: jsonb("medications").notNull(), // Array of {name, dosage, frequency, duration}
  notes: text("notes"),
  issuedDate: timestamp("issuedDate").notNull().defaultNow(),
  expiryDate: timestamp("expiryDate"),
  status: prescriptionStatusEnum("status").notNull().default("active"),
  documentUrl: varchar("documentUrl", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Prescription = typeof prescriptions.$inferSelect;
export type InsertPrescription = typeof prescriptions.$inferInsert;

/**
 * Lab results
 */
export const labResults = pgTable("labResults", {
  id: serial("id").primaryKey(),
  patientId: integer("patientId").notNull().references(() => patients.id, { onDelete: "cascade" }),
  labId: integer("labId")
    .notNull()
    .references(() => medicalProfessionals.id, { onDelete: "cascade" }),
  testName: varchar("testName", { length: 255 }).notNull(),
  results: jsonb("results"), // Array of {name, value, unit, status}
  notes: text("notes"),
  orderedDate: timestamp("orderedDate").notNull().defaultNow(),
  resultDate: timestamp("resultDate"),
  documentUrl: varchar("documentUrl", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type LabResult = typeof labResults.$inferSelect;
export type InsertLabResult = typeof labResults.$inferInsert;

/**
 * Wilayas (provinces)
 */
export const wilayas = pgTable("wilayas", {
  id: serial("id").primaryKey(),
  code: integer("code").notNull().unique(),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  nameFr: varchar("nameFr", { length: 100 }).notNull(),
});

export type Wilaya = typeof wilayas.$inferSelect;

/**
 * Communes
 */
export const communes = pgTable("communes", {
  id: serial("id").primaryKey(),
  wilayaId: integer("wilayaId").notNull().references(() => wilayas.id, { onDelete: "cascade" }),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  nameFr: varchar("nameFr", { length: 100 }).notNull(),
});

export type Commune = typeof communes.$inferSelect;

/**
 * Medical specializations
 */
export const specializations = pgTable("specializations", {
  id: serial("id").primaryKey(),
  nameAr: varchar("nameAr", { length: 100 }).notNull().unique(),
  nameFr: varchar("nameFr", { length: 100 }).notNull().unique(),
  description: text("description"),
});

export type Specialization = typeof specializations.$inferSelect;

/**
 * Reviews and ratings
 */
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  patientId: integer("patientId").notNull().references(() => patients.id, { onDelete: "cascade" }),
  professionalId: integer("professionalId")
    .notNull()
    .references(() => medicalProfessionals.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * OTP verifications
 */
export const otpVerifications = pgTable("otpVerifications", {
  id: serial("id").primaryKey(),
  phone: varchar("phone", { length: 20 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  attempts: integer("attempts").default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type OTPVerification = typeof otpVerifications.$inferSelect;
export type InsertOTPVerification = typeof otpVerifications.$inferInsert;
