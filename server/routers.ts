import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { isValidAlgerianPhone, formatAlgerianPhone } from "../shared/phone-utils";

// Development mode: Skip database for OTP operations
const isDev = process.env.NODE_ENV === "development";

// Validation schemas
const sendOTPSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
});

const verifyOTPSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const registerPatientSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  fullName: z.string().min(2, "Full name is required"),
  wilaya: z.string().min(1, "Wilaya is required"),
  commune: z.string().min(1, "Commune is required"),
});

const registerProfessionalSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name is required"),
  professionalType: z.enum(["doctor", "clinic", "lab"]),
  licenseNumber: z.string().min(1, "License number is required"),
  specialization: z.string().optional(),
  wilaya: z.string().min(1, "Wilaya is required"),
  commune: z.string().min(1, "Commune is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),

    // Send OTP to patient phone
    sendOTP: publicProcedure
      .input(sendOTPSchema)
      .mutation(async ({ input }) => {
        const { phone } = input;

        // Validate Algerian phone number
        if (!isValidAlgerianPhone(phone)) {
          throw new Error("Invalid Algerian phone number");
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        try {
          // In development, skip database and return OTP directly
          if (process.env.NODE_ENV === "development") {
            console.log(`[OTP] Development mode - OTP ${otp} for ${phone}`);
            return {
              success: true,
              message: "OTP sent successfully (dev mode)",
              otp: otp, // Return OTP in dev mode
            };
          }

          // In production, save to database and send via SMS
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }

          const { otpVerifications } = await import("../drizzle/schema");
          await db.insert(otpVerifications).values({
            phone: formatAlgerianPhone(phone),
            code: otp,
            expiresAt,
          });

          // TODO: Send SMS via Twilio or other provider
          console.log(`[OTP] Sending OTP ${otp} to ${phone}`);

          return {
            success: true,
            message: "OTP sent successfully",
            otp: undefined, // Don't return OTP in production
          };
        } catch (error) {
          console.error("Error sending OTP:", error);
          throw new Error("Failed to send OTP");
        }
      }),

    // Verify OTP
    verifyOTP: publicProcedure
      .input(verifyOTPSchema)
      .mutation(async ({ input }) => {
        const { phone, otp } = input;

        if (!isValidAlgerianPhone(phone)) {
          throw new Error("Invalid Algerian phone number");
        }

        try {
          // In development, accept any 6-digit OTP
          if (process.env.NODE_ENV === "development") {
            if (!/^\d{6}$/.test(otp)) {
              throw new Error("Invalid OTP format");
            }
            console.log(`[OTP] Development mode - OTP verified for ${phone}`);
            return {
              success: true,
              message: "OTP verified successfully (dev mode)",
            };
          }

          // In production, verify against database
          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }

          const { otpVerifications } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");

          const formattedPhone = formatAlgerianPhone(phone);
          const record = await db
            .select()
            .from(otpVerifications)
            .where(eq(otpVerifications.phone, formattedPhone))
            .orderBy((t) => t.createdAt)
            .limit(1);

          if (record.length === 0) {
            throw new Error("OTP not found");
          }

          const otpRecord = record[0];

          // Check if OTP is expired
          if (new Date() > otpRecord.expiresAt) {
            throw new Error("OTP expired");
          }

          // Check if OTP matches
          if (otpRecord.code !== otp) {
            throw new Error("Invalid OTP");
          }

          return {
            success: true,
            message: "OTP verified successfully",
          };
        } catch (error) {
          console.error("Error verifying OTP:", error);
          throw error;
        }
      }),

    // Register patient
    registerPatient: publicProcedure
      .input(registerPatientSchema)
      .mutation(async ({ input }) => {
        const { phone, fullName, wilaya, commune } = input;

        if (!isValidAlgerianPhone(phone)) {
          throw new Error("Invalid Algerian phone number");
        }

        try {
          // In development, skip database checks
          if (process.env.NODE_ENV === "development") {
            console.log(`[Register] Development mode - Patient registered: ${fullName}`);
            return {
              success: true,
              message: "Patient registered successfully (dev mode)",
            };
          }

          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }

          const { patients, users } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");

          // Check if user already exists
          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.phone, formatAlgerianPhone(phone)))
            .limit(1);

          if (existingUser.length > 0) {
            throw new Error("Patient already registered");
          }

          // Create patient record (user creation happens via OAuth)
          await db.insert(patients).values({
            userId: 0, // Will be updated after OAuth
            wilaya,
            commune,
          });

          return {
            success: true,
            message: "Patient registered successfully",
          };
        } catch (error) {
          console.error("Error registering patient:", error);
          throw error;
        }
      }),

    // Register professional
    registerProfessional: publicProcedure
      .input(registerProfessionalSchema)
      .mutation(async ({ input }) => {
        const {
          email,
          password,
          fullName,
          professionalType,
          licenseNumber,
          specialization,
          wilaya,
          commune,
          address,
          phone,
        } = input;

        if (!isValidAlgerianPhone(phone)) {
          throw new Error("Invalid Algerian phone number");
        }

        try {
          // In development, skip database checks
          if (process.env.NODE_ENV === "development") {
            console.log(`[Register] Development mode - Professional registered: ${fullName}`);
            return {
              success: true,
              message: "Professional registered successfully (dev mode)",
            };
          }

          const db = await getDb();
          if (!db) {
            throw new Error("Database not available");
          }

          const { medicalProfessionals, users } = await import("../drizzle/schema");
          const { eq } = await import("drizzle-orm");

          // Check if professional already exists
          const existingProfessional = await db
            .select()
            .from(medicalProfessionals)
            .where(eq(medicalProfessionals.licenseNumber, licenseNumber))
            .limit(1);

          if (existingProfessional.length > 0) {
            throw new Error("Professional already registered");
          }

          // Check if email already exists
          const existingEmail = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (existingEmail.length > 0) {
            throw new Error("Email already registered");
          }

          // TODO: Hash password before storing
          // Create professional record (user creation happens via OAuth)
          await db.insert(medicalProfessionals).values({
            userId: 0, // Will be updated after OAuth
            professionalType,
            licenseNumber,
            specialization: specialization || undefined,
            wilaya,
            commune,
            address,
            phone,
            isVerified: false,
          });

          return {
            success: true,
            message: "Professional registered successfully",
          };
        } catch (error) {
          console.error("Error registering professional:", error);
          throw error;
        }
      }),
  }),

  // Patient operations
  patient: router({
    // Get patient profile
    getProfile: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.userType !== "patient") {
        throw new Error("Not a patient");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { patients } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, ctx.user.id))
          .limit(1);

        return patient[0] || null;
      } catch (error) {
        console.error("[Router] Error fetching patient profile:", error);
        throw error;
      }
    }),

    // Get blood pressure records
    getBloodPressure: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.userType !== "patient") {
        throw new Error("Not a patient");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { bloodPressureRecords, patients } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        // Get patient ID
        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, ctx.user.id))
          .limit(1);

        if (!patient[0]) throw new Error("Patient not found");

        const records = await db
          .select()
          .from(bloodPressureRecords)
          .where(eq(bloodPressureRecords.patientId, patient[0].id));

        return records;
      } catch (error) {
        console.error("[Router] Error fetching blood pressure:", error);
        return [];
      }
    }),

    // Get blood sugar records
    getBloodSugar: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.userType !== "patient") {
        throw new Error("Not a patient");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { bloodSugarRecords, patients } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, ctx.user.id))
          .limit(1);

        if (!patient[0]) throw new Error("Patient not found");

        const records = await db
          .select()
          .from(bloodSugarRecords)
          .where(eq(bloodSugarRecords.patientId, patient[0].id));

        return records;
      } catch (error) {
        console.error("[Router] Error fetching blood sugar:", error);
        return [];
      }
    }),

    // Get appointments
    getAppointments: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.userType !== "patient") {
        throw new Error("Not a patient");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { appointments, patients, medicalProfessionals, users } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, ctx.user.id))
          .limit(1);

        if (!patient[0]) throw new Error("Patient not found");

        const patientAppointments = await db
          .select()
          .from(appointments)
          .where(eq(appointments.patientId, patient[0].id));

        return patientAppointments;
      } catch (error) {
        console.error("[Router] Error fetching appointments:", error);
        return [];
      }
    }),

    // Get prescriptions
    getPrescriptions: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.userType !== "patient") {
        throw new Error("Not a patient");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { prescriptions, patients } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, ctx.user.id))
          .limit(1);

        if (!patient[0]) throw new Error("Patient not found");

        const patientPrescriptions = await db
          .select()
          .from(prescriptions)
          .where(eq(prescriptions.patientId, patient[0].id));

        return patientPrescriptions;
      } catch (error) {
        console.error("[Router] Error fetching prescriptions:", error);
        return [];
      }
    }),

    // Get lab results
    getLabResults: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.userType !== "patient") {
        throw new Error("Not a patient");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { labResults, patients } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const patient = await db
          .select()
          .from(patients)
          .where(eq(patients.userId, ctx.user.id))
          .limit(1);

        if (!patient[0]) throw new Error("Patient not found");

        const results = await db
          .select()
          .from(labResults)
          .where(eq(labResults.patientId, patient[0].id));

        return results;
      } catch (error) {
        console.error("[Router] Error fetching lab results:", error);
        return [];
      }
    }),
  }),

  // Doctor operations
  doctor: router({
    // Get doctor profile
    getProfile: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || !["doctor", "clinic", "lab"].includes(ctx.user.userType)) {
        throw new Error("Not a medical professional");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { medicalProfessionals } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const professional = await db
          .select()
          .from(medicalProfessionals)
          .where(eq(medicalProfessionals.userId, ctx.user.id))
          .limit(1);

        return professional[0] || null;
      } catch (error) {
        console.error("[Router] Error fetching doctor profile:", error);
        throw error;
      }
    }),

    // Get doctor appointments
    getAppointments: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || !["doctor", "clinic", "lab"].includes(ctx.user.userType)) {
        throw new Error("Not a medical professional");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const { appointments, medicalProfessionals } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const professional = await db
          .select()
          .from(medicalProfessionals)
          .where(eq(medicalProfessionals.userId, ctx.user.id))
          .limit(1);

        if (!professional[0]) throw new Error("Professional not found");

        const doctorAppointments = await db
          .select()
          .from(appointments)
          .where(eq(appointments.professionalId, professional[0].id));

        return doctorAppointments;
      } catch (error) {
        console.error("[Router] Error fetching doctor appointments:", error);
        return [];
      }
    }),
  }),

  // Search operations
  search: router({
    // Search doctors by specialization, location, name
    searchDoctors: publicProcedure
      .input(z.object({
        specialization: z.string().optional(),
        wilaya: z.string().optional(),
        name: z.string().optional(),
      }))
      .query(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Database not available");

          const { medicalProfessionals, users } = await import("../drizzle/schema");
          const { eq, like, and } = await import("drizzle-orm");

          let query = db.select().from(medicalProfessionals);

          const conditions = [];
          if (input.specialization) {
            conditions.push(like(medicalProfessionals.specialization, `%${input.specialization}%`));
          }
          if (input.wilaya) {
            conditions.push(eq(medicalProfessionals.wilaya, input.wilaya));
          }

          if (conditions.length > 0) {
            query = query.where(and(...conditions));
          }

          const results = await query;
          return results;
        } catch (error) {
          console.error("[Router] Error searching doctors:", error);
          return [];
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

// Development mode note:
// In development (NODE_ENV=development), OTP operations bypass database
// and return test data directly. This allows testing without Supabase access.
// In production, all operations require database connectivity.
