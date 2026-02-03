-- Create enums
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'clinic', 'lab', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE prescription_status AS ENUM ('active', 'expired', 'completed');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  "openId" VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(320),
  phone VARCHAR(20),
  name TEXT,
  "userType" user_role NOT NULL DEFAULT 'patient',
  "loginMethod" VARCHAR(64),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSignedIn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "dateOfBirth" TIMESTAMP,
  gender VARCHAR(10),
  "bloodType" VARCHAR(5),
  wilaya VARCHAR(100),
  commune VARCHAR(100),
  address TEXT,
  "emergencyContact" VARCHAR(20),
  "medicalHistory" JSONB,
  allergies JSONB,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Medical professionals table
CREATE TABLE IF NOT EXISTS "medicalProfessionals" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "professionalType" VARCHAR(50) NOT NULL,
  specialization VARCHAR(100),
  "licenseNumber" VARCHAR(100) UNIQUE,
  "yearsOfExperience" INTEGER,
  wilaya VARCHAR(100),
  commune VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  website VARCHAR(255),
  "consultationFee" NUMERIC(10, 2),
  bio TEXT,
  avatar VARCHAR(255),
  rating NUMERIC(3, 2),
  "reviewCount" INTEGER DEFAULT 0,
  "isVerified" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Blood pressure records table
CREATE TABLE IF NOT EXISTS "bloodPressureRecords" (
  id SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  systolic INTEGER NOT NULL,
  diastolic INTEGER NOT NULL,
  pulse INTEGER,
  notes TEXT,
  "recordedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Blood sugar records table
CREATE TABLE IF NOT EXISTS "bloodSugarRecords" (
  id SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  value INTEGER NOT NULL,
  type VARCHAR(50),
  notes TEXT,
  "recordedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "professionalId" INTEGER NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  "appointmentDate" TIMESTAMP NOT NULL,
  duration INTEGER,
  status appointment_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  reason TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "professionalId" INTEGER NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  medications JSONB NOT NULL,
  notes TEXT,
  "issuedDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiryDate" TIMESTAMP,
  status prescription_status NOT NULL DEFAULT 'active',
  "documentUrl" VARCHAR(255),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Lab results table
CREATE TABLE IF NOT EXISTS "labResults" (
  id SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "labId" INTEGER NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  "testName" VARCHAR(255) NOT NULL,
  results JSONB,
  notes TEXT,
  "orderedDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "resultDate" TIMESTAMP,
  "documentUrl" VARCHAR(255),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Wilayas table
CREATE TABLE IF NOT EXISTS wilayas (
  id SERIAL PRIMARY KEY,
  code INTEGER NOT NULL UNIQUE,
  "nameAr" VARCHAR(100) NOT NULL,
  "nameFr" VARCHAR(100) NOT NULL
);

-- Communes table
CREATE TABLE IF NOT EXISTS communes (
  id SERIAL PRIMARY KEY,
  "wilayaId" INTEGER NOT NULL REFERENCES wilayas(id) ON DELETE CASCADE,
  "nameAr" VARCHAR(100) NOT NULL,
  "nameFr" VARCHAR(100) NOT NULL
);

-- Specializations table
CREATE TABLE IF NOT EXISTS specializations (
  id SERIAL PRIMARY KEY,
  "nameAr" VARCHAR(100) NOT NULL UNIQUE,
  "nameFr" VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  "patientId" INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "professionalId" INTEGER NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  comment TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- OTP Verifications table
CREATE TABLE IF NOT EXISTS "otpVerifications" (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  attempts INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_openId ON users("openId");
CREATE INDEX idx_patients_userId ON patients("userId");
CREATE INDEX idx_medicalProfessionals_userId ON "medicalProfessionals"("userId");
CREATE INDEX idx_medicalProfessionals_licenseNumber ON "medicalProfessionals"("licenseNumber");
CREATE INDEX idx_bloodPressureRecords_patientId ON "bloodPressureRecords"("patientId");
CREATE INDEX idx_bloodSugarRecords_patientId ON "bloodSugarRecords"("patientId");
CREATE INDEX idx_appointments_patientId ON appointments("patientId");
CREATE INDEX idx_appointments_professionalId ON appointments("professionalId");
CREATE INDEX idx_prescriptions_patientId ON prescriptions("patientId");
CREATE INDEX idx_labResults_patientId ON "labResults"("patientId");
CREATE INDEX idx_reviews_patientId ON reviews("patientId");
CREATE INDEX idx_reviews_professionalId ON reviews("professionalId");
CREATE INDEX idx_otpVerifications_phone ON "otpVerifications"(phone);
