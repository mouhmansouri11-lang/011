import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { isValidAlgerianPhone, formatAlgerianPhone } from "../../shared/phone-utils";

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

export const authRouter = router({
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
      const formattedPhone = formatAlgerianPhone(phone);

      try {
        const db = await getDb();
        if (!db) {
          console.log(`[OTP] Development mode: OTP ${otp} for ${formattedPhone}`);
          return {
            success: true,
            message: "OTP sent successfully",
            otp: otp, // Return OTP for development
          };
        }

        // Import schema and insert OTP
        const { otpVerifications } = await import("../../drizzle/schema");
        const result = await db.insert(otpVerifications).values({
          phone: formattedPhone,
          code: otp,
          expiresAt,
        });

        console.log(`[OTP] OTP ${otp} stored for ${formattedPhone}`);

        // Send SMS via Twilio if configured
        if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
          try {
            const twilio = require('twilio');
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            await client.messages.create({
              body: `Your Tabibi OTP code is: ${otp}. Valid for 10 minutes.`,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: formattedPhone,
            });
            console.log(`[SMS] OTP sent to ${formattedPhone}`);
          } catch (smsError) {
            console.error("[SMS] Error:", smsError);
          }
        }

        return {
          success: true,
          message: "OTP sent successfully",
          otp: process.env.NODE_ENV === "development" ? otp : undefined,
        };
      } catch (error) {
        console.error("Error sending OTP:", error);
        // In development, still return OTP for testing
        if (process.env.NODE_ENV === "development") {
          return {
            success: true,
            message: "OTP generated (development mode)",
            otp: otp,
          };
        }
        throw new Error(`Failed to send OTP: ${error instanceof Error ? error.message : String(error)}`);
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

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      try {
        const { otpVerifications } = await import("../../drizzle/schema");
        const { eq } = await import("drizzle-orm");

        const record = await db
          .select()
          .from(otpVerifications)
          .where(eq(otpVerifications.phone, formatAlgerianPhone(phone)))
          .orderBy((t) => t.createdAt)
          .limit(1);

        if (record.length === 0) {
          throw new Error("OTP not found");
        }

        const otpRecord = record[0];

        if (otpRecord.code !== otp) {
          throw new Error("Invalid OTP");
        }

        if (new Date() > otpRecord.expiresAt) {
          throw new Error("OTP expired");
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

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      try {
        const { patients, users } = await import("../../drizzle/schema");
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
        const result = await db.insert(patients).values({
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

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      try {
        const { medicalProfessionals, users } = await import("../../drizzle/schema");
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
        const result = await db.insert(medicalProfessionals).values({
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
});
