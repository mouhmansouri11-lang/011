-- ============================================================================
-- TABIBI - Complete Supabase Setup Script (Full from scratch)
-- This script creates all tables and inserts test data
-- ============================================================================

-- ============================================================================
-- 1. CREATE ENUMS
-- ============================================================================
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS appointment_status CASCADE;
DROP TYPE IF EXISTS prescription_status CASCADE;

CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'clinic', 'lab', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE prescription_status AS ENUM ('active', 'expired', 'completed');

-- ============================================================================
-- 2. CREATE TABLES
-- ============================================================================

-- Users table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
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

-- Wilayas table
DROP TABLE IF EXISTS wilayas CASCADE;
CREATE TABLE wilayas (
  id SERIAL PRIMARY KEY,
  code INT UNIQUE,
  "nameAr" VARCHAR(100) NOT NULL,
  "nameFr" VARCHAR(100) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Communes table
DROP TABLE IF EXISTS communes CASCADE;
CREATE TABLE communes (
  id SERIAL PRIMARY KEY,
  "wilayaId" INT NOT NULL REFERENCES wilayas(id) ON DELETE CASCADE,
  "nameAr" VARCHAR(100) NOT NULL,
  "nameFr" VARCHAR(100) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Diseases table
DROP TABLE IF EXISTS diseases CASCADE;
CREATE TABLE diseases (
  id SERIAL PRIMARY KEY,
  "nameAr" VARCHAR(255) NOT NULL,
  "nameFr" VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Specializations table
DROP TABLE IF EXISTS specializations CASCADE;
CREATE TABLE specializations (
  id SERIAL PRIMARY KEY,
  "nameFr" VARCHAR(255) NOT NULL UNIQUE,
  "nameAr" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
DROP TABLE IF EXISTS patients CASCADE;
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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

-- Medical Professionals table
DROP TABLE IF EXISTS "medicalProfessionals" CASCADE;
CREATE TABLE "medicalProfessionals" (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(255),
  "licenseNumber" VARCHAR(100) UNIQUE,
  "clinicName" VARCHAR(255),
  wilaya VARCHAR(100),
  commune VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  "yearsExperience" INT,
  "consultationFee" INT,
  "availableHours" JSONB,
  rating DECIMAL(3,1) DEFAULT 0,
  "reviewCount" INT DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
DROP TABLE IF EXISTS appointments CASCADE;
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  "patientId" INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "professionalId" INT NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  "appointmentDate" DATE NOT NULL,
  "appointmentTime" TIME NOT NULL,
  status appointment_status NOT NULL DEFAULT 'pending',
  reason TEXT,
  notes TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Blood Pressure Records table
DROP TABLE IF EXISTS "bloodPressureRecords" CASCADE;
CREATE TABLE "bloodPressureRecords" (
  id SERIAL PRIMARY KEY,
  "patientId" INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  systolic INT NOT NULL,
  diastolic INT NOT NULL,
  "recordDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Blood Sugar Records table
DROP TABLE IF EXISTS "bloodSugarRecords" CASCADE;
CREATE TABLE "bloodSugarRecords" (
  id SERIAL PRIMARY KEY,
  "patientId" INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "glucoseLevel" INT NOT NULL,
  "recordDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "mealType" VARCHAR(50),
  notes TEXT
);

-- Prescriptions table
DROP TABLE IF EXISTS prescriptions CASCADE;
CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  "patientId" INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "professionalId" INT NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  medication VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  duration VARCHAR(100),
  "startDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endDate" TIMESTAMP,
  status prescription_status NOT NULL DEFAULT 'active',
  notes TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Lab Results table
DROP TABLE IF EXISTS "labResults" CASCADE;
CREATE TABLE "labResults" (
  id SERIAL PRIMARY KEY,
  "patientId" INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "testName" VARCHAR(255) NOT NULL,
  "testType" VARCHAR(50),
  result JSONB,
  "normalRange" JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  "testDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  "patientId" INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  "professionalId" INT NOT NULL REFERENCES "medicalProfessionals"(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  "reviewDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- OTP Verifications table
DROP TABLE IF EXISTS "otpVerifications" CASCADE;
CREATE TABLE "otpVerifications" (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. INSERT WILAYAS (48 Algerian provinces)
-- ============================================================================
INSERT INTO wilayas (code, "nameAr", "nameFr") VALUES
(1, 'أدرار', 'Adrar'),
(2, 'الشلف', 'Chlef'),
(3, 'الأغواط', 'Laghouat'),
(4, 'أم البواقي', 'Oum El Bouaghi'),
(5, 'باتنة', 'Batna'),
(6, 'بجاية', 'Béjaïa'),
(7, 'بسكرة', 'Biskra'),
(8, 'بئر الشافية', 'Béchar'),
(9, 'بليدة', 'Blida'),
(10, 'البويرة', 'Bouira'),
(11, 'تمنراست', 'Tamanrasset'),
(12, 'تبسة', 'Tébessa'),
(13, 'تلمسان', 'Tlemcen'),
(14, 'الجزائر', 'Alger'),
(15, 'جيجل', 'Jijel'),
(16, 'سطيف', 'Sétif'),
(17, 'سعيدة', 'Saïda'),
(18, 'سكيكدة', 'Skikda'),
(19, 'سيدي بلعباس', 'Sidi Bel Abbès'),
(20, 'قسنطينة', 'Constantine'),
(21, 'المدية', 'Médéa'),
(22, 'مستغانم', 'Mostaganem'),
(23, 'معسكر', 'Mascara'),
(24, 'ورقلة', 'Ouargla'),
(25, 'وهران', 'Oran'),
(26, 'إليزي', 'Illizi'),
(27, 'البرج', 'Bordj Bou Arréridj'),
(28, 'الطارف', 'El Tarf'),
(29, 'تندوف', 'Tindouf'),
(30, 'تيسمسيلت', 'Tissemsilt'),
(31, 'الوادي', 'El Oued'),
(32, 'خنشلة', 'Khenchela'),
(33, 'سوق أهراس', 'Souk Ahras'),
(34, 'تيبازة', 'Tipaza'),
(35, 'مرتيل', 'Mila'),
(36, 'عين الدفلة', 'Ain Defla'),
(37, 'النعامة', 'Naama'),
(38, 'عين تموشنت', 'Ain Temouchent'),
(39, 'غرداية', 'Ghardaïa'),
(40, 'الرليزانة', 'Relizane'),
(41, 'تيزي وزو', 'Tizi Ouzou'),
(42, 'بومرداس', 'Boumerdes'),
(43, 'البيض', 'El Bayadh'),
(44, 'مسيلة', 'Msila'),
(45, 'الصحراوي', 'Sahraoui'),
(46, 'باب الزوار', 'Bab Ezzouar'),
(47, 'بني إسماعيل', 'Béni Ismail'),
(48, 'أولاد جلال', 'Ouled Djellal');

-- ============================================================================
-- 4. INSERT COMMUNES (Sample communes for major wilayas)
-- ============================================================================
-- Alger (14)
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(14, 'الجزائر', 'Alger'),
(14, 'باب الزوار', 'Bab Ezzouar'),
(14, 'بن عكنون', 'Ben Aknoun'),
(14, 'بوزريعة', 'Bouzareah'),
(14, 'حسين داي', 'Hussein Dey'),
(14, 'حيدرة', 'Hydra'),
(14, 'دار البيضاء', 'Dar El Beida'),
(14, 'دالي إبراهيم', 'Daly Ibrahim');

-- Oran (25)
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(25, 'وهران', 'Oran'),
(25, 'سيدي الشريف', 'Sidi Chérif'),
(25, 'مسرغين', 'Misserghine'),
(25, 'أرزيو', 'Arzew'),
(25, 'الحمادية', 'Hamadia');

-- Constantine (20)
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(20, 'قسنطينة', 'Constantine'),
(20, 'الخروب', 'El Khroub'),
(20, 'عين السمارة', 'Ain Smara'),
(20, 'بن أرقون', 'Beni Irken');

-- Blida (9)
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(9, 'بليدة', 'Blida'),
(9, 'بوفاريك', 'Boufarik'),
(9, 'بوينان', 'Bouyenan'),
(9, 'الأفرون', 'Affroun');

-- Tizi Ouzou (41)
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(41, 'تيزي وزو', 'Tizi Ouzou'),
(41, 'درعة الميزان', 'Draâ El Mizan'),
(41, 'أزازقة', 'Azazga'),
(41, 'مايو', 'Maïo');

-- ============================================================================
-- 5. INSERT SPECIALIZATIONS (45+ medical specialties)
-- ============================================================================
INSERT INTO specializations ("nameFr", "nameAr") VALUES
('Cardiologie', 'أمراض القلب'),
('Pédiatrie', 'طب الأطفال'),
('Gynécologie-Obstétrique', 'أمراض النساء والتوليد'),
('Neurologie', 'أمراض الجهاز العصبي'),
('Psychiatrie', 'الطب النفسي'),
('Chirurgie Générale', 'الجراحة العامة'),
('Ophtalmologie', 'أمراض العيون'),
('ORL', 'أمراض الأنف والأذن والحنجرة'),
('Dermatologie', 'أمراض الجلد'),
('Gastroentérologie', 'أمراض الجهاز الهضمي'),
('Néphologie', 'أمراض الكلى'),
('Endocrinologie', 'أمراض الغدد الصماء والسكري'),
('Hématologie', 'أمراض الدم'),
('Oncologie', 'الأورام'),
('Infectiologie', 'الأمراض المعدية'),
('Rhumatologie', 'أمراض المفاصل والروماتيزم'),
('Immunologie', 'أمراض الحساسية والمناعة'),
('Médecine Physique', 'الطب الفيزيائي والتأهيل'),
('Kinésithérapie', 'العلاج الطبيعي'),
('Médecine du Sport', 'طب الرياضة'),
('Radiologie', 'الأشعات والتصوير'),
('Anesthésiologie', 'التخدير والعناية المركزة'),
('Médecine Interne', 'الطب الباطني'),
('Dentisterie', 'طب الأسنان'),
('Orthodontie', 'تقويم الأسنان'),
('Pharmacie', 'الصيدلة'),
('Biologie Médicale', 'البيولوجيا الطبية'),
('Pathologie', 'علم الأمراض'),
('Médecine Légale', 'الطب الشرعي'),
('Santé Publique', 'الصحة العامة'),
('Urologie', 'أمراض المسالك البولية'),
('Orthopédie', 'جراحة العظام'),
('Neurochirurgie', 'جراحة الأعصاب'),
('Chirurgie Thoracique', 'جراحة الصدر'),
('Chirurgie Vasculaire', 'جراحة الأوعية الدموية'),
('Pneumologie', 'أمراض الجهاز التنفسي'),
('Allergologie', 'الحساسية'),
('Gériatrie', 'طب المسنين'),
('Médecine Générale', 'الطب العام'),
('Urgentologie', 'الطب الحثيث'),
('Toxicologie', 'علم السموم'),
('Virologie', 'علم الفيروسات'),
('Bactériologie', 'علم البكتيريا'),
('Parasitologie', 'علم الطفيليات'),
('Mycologie', 'علم الفطريات');

-- ============================================================================
-- 6. INSERT DISEASES (70+ diseases)
-- ============================================================================
INSERT INTO diseases ("nameAr", "nameFr", category) VALUES
('أمراض القلب', 'Maladies Cardiaques', 'cardiovascular'),
('ارتفاع ضغط الدم', 'Hypertension', 'cardiovascular'),
('السكتة الدماغية', 'Accident Vasculaire Cérébral', 'cardiovascular'),
('قصور القلب', 'Insuffisance Cardiaque', 'cardiovascular'),
('الذبحة الصدرية', 'Angine de Poitrine', 'cardiovascular'),
('عدم انتظام ضربات القلب', 'Arythmie Cardiaque', 'cardiovascular'),
('تصلب الشرايين', 'Athérosclérose', 'cardiovascular'),
('جلطات الدم', 'Thrombose', 'cardiovascular'),
('الربو', 'Asthme', 'respiratory'),
('الإنفلونزا', 'Grippe', 'respiratory'),
('السعال الديكي', 'Coqueluche', 'respiratory'),
('الدرن الرئوي', 'Tuberculose', 'respiratory'),
('الالتهاب الرئوي', 'Pneumonie', 'respiratory'),
('الحساسية التنفسية', 'Allergie Respiratoire', 'respiratory'),
('الانسداد الرئوي المزمن', 'BPCO', 'respiratory'),
('السكري من النوع الأول', 'Diabète Type 1', 'endocrine'),
('السكري من النوع الثاني', 'Diabète Type 2', 'endocrine'),
('قصور الغدة الدرقية', 'Hypothyroïdie', 'endocrine'),
('فرط الغدة الدرقية', 'Hyperthyroïdie', 'endocrine'),
('السمنة', 'Obésité', 'endocrine'),
('الزهايمر', 'Alzheimer', 'neurological'),
('الشلل الرعاشي', 'Parkinson', 'neurological'),
('الصرع', 'Épilepsie', 'neurological'),
('الصداع النصفي', 'Migraine', 'neurological'),
('التهاب السحايا', 'Méningite', 'neurological'),
('قرحة المعدة', 'Ulcère Gastrique', 'gastrointestinal'),
('التهاب الكبد', 'Hépatite', 'gastrointestinal'),
('التهاب المرارة', 'Cholécystite', 'gastrointestinal'),
('الإمساك المزمن', 'Constipation Chronique', 'gastrointestinal'),
('الإسهال المزمن', 'Diarrhée Chronique', 'gastrointestinal'),
('متلازمة القولون العصبي', 'Syndrome Côlon Irritable', 'gastrointestinal'),
('التهاب المسالك البولية', 'Infection Urinaire', 'urinary'),
('حصى الكلى', 'Calculs Rénaux', 'urinary'),
('قصور الكلى', 'Insuffisance Rénale', 'urinary'),
('التهاب المثانة', 'Cystite', 'urinary'),
('هشاشة العظام', 'Ostéoporose', 'musculoskeletal'),
('التهاب المفاصل الروماتويدي', 'Polyarthrite Rhumatoïde', 'musculoskeletal'),
('الفصال العظمي', 'Arthrose', 'musculoskeletal'),
('آلام الظهر المزمنة', 'Mal de Dos Chronique', 'musculoskeletal'),
('الالتواءات والكسور', 'Entorses et Fractures', 'musculoskeletal'),
('السل', 'Tuberculose', 'infectious'),
('الإيدز', 'VIH/SIDA', 'infectious'),
('الملاريا', 'Paludisme', 'infectious'),
('حمى التيفوئيد', 'Fièvre Typhoïde', 'infectious'),
('الأكزيما', 'Eczéma', 'dermatological'),
('الصدفية', 'Psoriasis', 'dermatological'),
('حب الشباب', 'Acné', 'dermatological'),
('الفطريات الجلدية', 'Mycose', 'dermatological'),
('الاكتئاب', 'Dépression', 'mental'),
('القلق المزمن', 'Anxiété Chronique', 'mental'),
('الاضطراب ثنائي القطب', 'Trouble Bipolaire', 'mental'),
('الفصام', 'Schizophrénie', 'mental'),
('سرطان الثدي', 'Cancer du Sein', 'oncological'),
('سرطان الرئة', 'Cancer du Poumon', 'oncological'),
('سرطان القولون', 'Cancer du Côlon', 'oncological'),
('سرطان الكبد', 'Cancer du Foie', 'oncological'),
('فقر الدم', 'Anémie', 'hematological'),
('الهيموفيليا', 'Hémophilie', 'hematological'),
('الثلاسيميا', 'Thalassémie', 'hematological'),
('نقص المناعة', 'Immunodéficience', 'immunological'),
('الحساسية الغذائية', 'Allergie Alimentaire', 'immunological'),
('الربو التحسسي', 'Asthme Allergique', 'immunological'),
('قصر النظر', 'Myopie', 'ophthalmological'),
('طول النظر', 'Hypermétropie', 'ophthalmological'),
('الماء الأبيض', 'Cataracte', 'ophthalmological'),
('الجلوكوما', 'Glaucome', 'ophthalmological'),
('التهاب الأذن الوسطى', 'Otite Moyenne', 'ent'),
('التهاب الحلق', 'Pharyngite', 'ent'),
('التهاب الجيوب الأنفية', 'Sinusite', 'ent');

-- ============================================================================
-- 7. INSERT TEST USERS
-- ============================================================================
INSERT INTO users ("openId", email, phone, name, "userType", "loginMethod") VALUES
-- Patients
('patient_001', 'ahmed.ali@email.com', '+213555123456', 'أحمد علي', 'patient', 'otp'),
('patient_002', 'fatima.zahra@email.com', '+213666234567', 'فاطمة الزهراء', 'patient', 'otp'),
('patient_003', 'mohammed.hassan@email.com', '+213777345678', 'محمد حسن', 'patient', 'otp'),
('patient_004', 'leila.ben@email.com', '+213555456789', 'ليلى بن', 'patient', 'otp'),
('patient_005', 'karim.medina@email.com', '+213666567890', 'كريم المدينة', 'patient', 'otp'),
-- Doctors
('doctor_001', 'dr.ahmed.cardio@email.com', '+213555111111', 'د. أحمد القلب', 'doctor', 'email'),
('doctor_002', 'dr.fatima.pediatric@email.com', '+213666222222', 'د. فاطمة الأطفال', 'doctor', 'email'),
('doctor_003', 'dr.hassan.neuro@email.com', '+213777333333', 'د. حسن الأعصاب', 'doctor', 'email'),
('doctor_004', 'dr.leila.surgery@email.com', '+213555444444', 'د. ليلى الجراحة', 'doctor', 'email'),
('doctor_005', 'dr.karim.dental@email.com', '+213666555555', 'د. كريم الأسنان', 'doctor', 'email');

-- ============================================================================
-- 8. INSERT PATIENT PROFILES
-- ============================================================================
INSERT INTO patients ("userId", "dateOfBirth", gender, "bloodType", wilaya, commune, address, "emergencyContact", "medicalHistory", allergies) VALUES
(1, '1990-05-15'::timestamp, 'M', 'O+', 'الجزائر', 'الجزائر', 'شارع ديدوش مراد، الجزائر', '+213555999999', '{"conditions": ["hypertension"]}', '{"allergens": ["penicillin"]}'),
(2, '1985-08-22'::timestamp, 'F', 'A+', 'وهران', 'وهران', 'حي السعادة، وهران', '+213666888888', '{"conditions": ["diabetes"]}', '{"allergens": ["aspirin"]}'),
(3, '1992-03-10'::timestamp, 'M', 'B+', 'قسنطينة', 'قسنطينة', 'حي الشريعة، قسنطينة', '+213777777777', '{}', '{}'),
(4, '1988-11-30'::timestamp, 'F', 'AB+', 'بليدة', 'بليدة', 'حي الثورة، بليدة', '+213555666666', '{"conditions": ["asthma"]}', '{"allergens": ["dust"]}'),
(5, '1995-07-18'::timestamp, 'M', 'O-', 'تيزي وزو', 'تيزي وزو', 'حي الاستقلال، تيزي وزو', '+213666555555', '{}', '{}');

-- ============================================================================
-- 9. INSERT MEDICAL PROFESSIONALS
-- ============================================================================
INSERT INTO "medicalProfessionals" ("userId", specialization, "licenseNumber", "clinicName", wilaya, commune, address, phone, "yearsExperience", "consultationFee", "availableHours", rating, "reviewCount") VALUES
(6, 'Cardiologie', 'LIC-CARDIO-001', 'عيادة القلب المتخصصة', 'الجزائر', 'الجزائر', 'شارع علي لكحل، الجزائر', '+213555111111', 15, 3000, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "14:00-18:00"}', 4.8, 127),
(7, 'Pédiatrie', 'LIC-PEDIA-002', 'عيادة الأطفال الحديثة', 'وهران', 'وهران', 'شارع الأمير عبد القادر، وهران', '+213666222222', 12, 2500, '{"monday": "08:00-16:00", "tuesday": "08:00-16:00", "wednesday": "08:00-16:00", "thursday": "08:00-16:00", "friday": "15:00-19:00"}', 4.9, 89),
(8, 'Neurologie', 'LIC-NEURO-003', 'عيادة الأعصاب المتقدمة', 'قسنطينة', 'قسنطينة', 'شارع ديدوش مراد، قسنطينة', '+213777333333', 18, 3500, '{"monday": "10:00-18:00", "tuesday": "10:00-18:00", "wednesday": "10:00-18:00", "thursday": "10:00-18:00", "friday": "16:00-20:00"}', 4.7, 156),
(9, 'Chirurgie Générale', 'LIC-SURG-004', 'مستشفى الجراحة المتخصصة', 'بليدة', 'بليدة', 'شارع الاستقلال، بليدة', '+213555444444', 20, 5000, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "14:00-18:00"}', 4.6, 203),
(10, 'Dentisterie', 'LIC-DENT-005', 'عيادة الأسنان المتقدمة', 'تيزي وزو', 'تيزي وزو', 'شارع الثورة، تيزي وزو', '+213666555555', 10, 2000, '{"monday": "08:00-17:00", "tuesday": "08:00-17:00", "wednesday": "08:00-17:00", "thursday": "08:00-17:00", "friday": "15:00-19:00"}', 4.9, 234);

-- ============================================================================
-- 10. INSERT APPOINTMENTS
-- ============================================================================
INSERT INTO appointments ("patientId", "professionalId", "appointmentDate", "appointmentTime", status, reason, notes) VALUES
(1, 1, '2026-02-15'::date, '10:00', 'confirmed', 'فحص دوري للقلب', 'المريض يعاني من ارتفاع ضغط الدم'),
(2, 2, '2026-02-16'::date, '14:00', 'pending', 'فحص شامل للطفل', 'الطفل يبلغ من العمر 5 سنوات'),
(3, 3, '2026-02-17'::date, '11:00', 'confirmed', 'استشارة عصبية', 'الصداع المتكرر'),
(4, 4, '2026-02-18'::date, '15:00', 'confirmed', 'استشارة جراحية', 'ألم في البطن'),
(5, 5, '2026-02-19'::date, '09:00', 'pending', 'فحص الأسنان', 'تنظيف دوري للأسنان'),
(1, 2, '2026-02-20'::date, '16:00', 'confirmed', 'متابعة صحية', 'متابعة دورية'),
(2, 3, '2026-02-21'::date, '13:00', 'pending', 'استشارة عصبية', 'الصداع النصفي'),
(3, 4, '2026-02-22'::date, '10:00', 'confirmed', 'جراحة مخطط لها', 'عملية جراحية مجدولة'),
(4, 5, '2026-02-23'::date, '11:00', 'confirmed', 'علاج الأسنان', 'حشو السن'),
(5, 1, '2026-02-24'::date, '14:00', 'pending', 'فحص القلب', 'فحص دوري');

-- ============================================================================
-- 11. INSERT BLOOD PRESSURE RECORDS
-- ============================================================================
INSERT INTO "bloodPressureRecords" ("patientId", systolic, diastolic, "recordDate", notes) VALUES
(1, 140, 90, NOW() - interval '30 days', 'صباحاً'),
(1, 138, 88, NOW() - interval '25 days', 'صباحاً'),
(1, 135, 85, NOW() - interval '20 days', 'صباحاً'),
(1, 132, 82, NOW() - interval '15 days', 'صباحاً'),
(1, 130, 80, NOW() - interval '10 days', 'صباحاً'),
(1, 128, 78, NOW() - interval '5 days', 'صباحاً'),
(1, 125, 75, NOW(), 'صباحاً'),
(2, 120, 80, NOW() - interval '20 days', 'صباحاً'),
(2, 118, 78, NOW() - interval '10 days', 'صباحاً'),
(2, 115, 75, NOW(), 'صباحاً'),
(3, 145, 95, NOW() - interval '15 days', 'صباحاً'),
(3, 140, 90, NOW() - interval '8 days', 'صباحاً'),
(3, 135, 85, NOW(), 'صباحاً'),
(4, 110, 70, NOW() - interval '10 days', 'صباحاً'),
(4, 112, 72, NOW(), 'صباحاً'),
(5, 125, 80, NOW() - interval '5 days', 'صباحاً'),
(5, 123, 78, NOW(), 'صباحاً');

-- ============================================================================
-- 12. INSERT BLOOD SUGAR RECORDS
-- ============================================================================
INSERT INTO "bloodSugarRecords" ("patientId", "glucoseLevel", "recordDate", "mealType", notes) VALUES
(2, 180, NOW() - interval '30 days', 'fasting', 'قبل الإفطار'),
(2, 220, NOW() - interval '30 days', 'after_meal', 'بعد الإفطار'),
(2, 160, NOW() - interval '25 days', 'fasting', 'قبل الإفطار'),
(2, 200, NOW() - interval '25 days', 'after_meal', 'بعد الإفطار'),
(2, 140, NOW() - interval '20 days', 'fasting', 'قبل الإفطار'),
(2, 180, NOW() - interval '20 days', 'after_meal', 'بعد الإفطار'),
(2, 130, NOW() - interval '10 days', 'fasting', 'قبل الإفطار'),
(2, 160, NOW() - interval '10 days', 'after_meal', 'بعد الإفطار'),
(2, 120, NOW(), 'fasting', 'قبل الإفطار'),
(2, 150, NOW(), 'after_meal', 'بعد الإفطار'),
(4, 110, NOW() - interval '15 days', 'fasting', 'قبل الإفطار'),
(4, 140, NOW() - interval '15 days', 'after_meal', 'بعد الإفطار'),
(4, 105, NOW() - interval '8 days', 'fasting', 'قبل الإفطار'),
(4, 135, NOW() - interval '8 days', 'after_meal', 'بعد الإفطار'),
(4, 100, NOW(), 'fasting', 'قبل الإفطار'),
(4, 130, NOW(), 'after_meal', 'بعد الإفطار');

-- ============================================================================
-- 13. INSERT PRESCRIPTIONS
-- ============================================================================
INSERT INTO prescriptions ("patientId", "professionalId", medication, dosage, frequency, duration, "startDate", "endDate", status, notes) VALUES
(1, 1, 'Lisinopril', '10mg', 'مرة يومياً', '30 days', NOW(), NOW() + interval '30 days', 'active', 'لعلاج ارتفاع ضغط الدم'),
(1, 1, 'Atorvastatin', '20mg', 'مرة يومياً', '60 days', NOW(), NOW() + interval '60 days', 'active', 'لتخفيض الكوليسترول'),
(2, 2, 'Amoxicillin', '500mg', 'ثلاث مرات يومياً', '7 days', NOW() - interval '3 days', NOW() + interval '4 days', 'active', 'مضاد حيوي'),
(3, 3, 'Paracetamol', '500mg', 'عند الحاجة', '10 days', NOW(), NOW() + interval '10 days', 'active', 'لتسكين الآلام'),
(4, 4, 'Ibuprofen', '400mg', 'مرتين يومياً', '14 days', NOW(), NOW() + interval '14 days', 'active', 'لتقليل الالتهاب'),
(5, 5, 'Fluoride Gel', '1.1%', 'مرة يومياً', '30 days', NOW(), NOW() + interval '30 days', 'active', 'لتقوية الأسنان');

-- ============================================================================
-- 14. INSERT LAB RESULTS
-- ============================================================================
INSERT INTO "labResults" ("patientId", "testName", "testType", result, "normalRange", status, notes) VALUES
(1, 'تحليل الدم الشامل', 'blood', '{"RBC": "4.5", "WBC": "7.2", "Hemoglobin": "13.5"}', '{"RBC": "4.5-5.5", "WBC": "4.5-11", "Hemoglobin": "13.5-17.5"}', 'ready', 'النتائج طبيعية'),
(1, 'فحص الكوليسترول', 'blood', '{"Total": "200", "LDL": "120", "HDL": "50"}', '{"Total": "<200", "LDL": "<100", "HDL": ">40"}', 'ready', 'الكوليسترول مرتفع قليلاً'),
(2, 'اختبار السكر', 'blood', '{"Glucose": "110"}', '{"Glucose": "70-100"}', 'ready', 'السكر مرتفع قليلاً'),
(3, 'تحليل البول', 'urine', '{"Color": "Yellow", "Clarity": "Clear"}', '{"Color": "Pale Yellow", "Clarity": "Clear"}', 'ready', 'النتائج طبيعية'),
(4, 'أشعة X الصدر', 'imaging', '{"Finding": "Normal"}', '{"status": "Normal"}', 'ready', 'الأشعة طبيعية'),
(5, 'فحص الأسنان بالأشعة', 'imaging', '{"Finding": "No cavities"}', '{"status": "No abnormalities"}', 'pending', 'قيد المراجعة');

-- ============================================================================
-- 15. INSERT REVIEWS
-- ============================================================================
INSERT INTO reviews ("patientId", "professionalId", rating, comment, "reviewDate") VALUES
(1, 1, 5, 'طبيب ممتاز جداً، خدمة احترافية وسريعة', NOW() - interval '10 days'),
(2, 2, 5, 'طبيبة رائعة، تتعامل مع الأطفال بحنان', NOW() - interval '8 days'),
(3, 3, 4, 'طبيب جيد، لكن الانتظار طويل قليلاً', NOW() - interval '6 days'),
(4, 4, 5, 'جراح ماهر جداً، شعرت بالأمان التام', NOW() - interval '4 days'),
(5, 5, 5, 'طبيب أسنان رائع، عمل احترافي', NOW() - interval '2 days'),
(1, 2, 4, 'خدمة جيدة وودية', NOW() - interval '1 day');

-- ============================================================================
-- 16. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_openId ON users("openId");
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_userType ON users("userType");

CREATE INDEX IF NOT EXISTS idx_patients_userId ON patients("userId");
CREATE INDEX IF NOT EXISTS idx_patients_wilaya ON patients(wilaya);

CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_userId ON "medicalProfessionals"("userId");
CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_specialization ON "medicalProfessionals"(specialization);
CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_wilaya ON "medicalProfessionals"(wilaya);
CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_licenseNumber ON "medicalProfessionals"("licenseNumber");
CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_rating ON "medicalProfessionals"(rating DESC);

CREATE INDEX IF NOT EXISTS idx_appointments_patientId ON appointments("patientId");
CREATE INDEX IF NOT EXISTS idx_appointments_professionalId ON appointments("professionalId");
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments("appointmentDate");

CREATE INDEX IF NOT EXISTS idx_bloodPressure_patientId ON "bloodPressureRecords"("patientId");
CREATE INDEX IF NOT EXISTS idx_bloodPressure_date ON "bloodPressureRecords"("recordDate" DESC);

CREATE INDEX IF NOT EXISTS idx_bloodSugar_patientId ON "bloodSugarRecords"("patientId");
CREATE INDEX IF NOT EXISTS idx_bloodSugar_date ON "bloodSugarRecords"("recordDate" DESC);

CREATE INDEX IF NOT EXISTS idx_prescriptions_patientId ON prescriptions("patientId");
CREATE INDEX IF NOT EXISTS idx_prescriptions_professionalId ON prescriptions("professionalId");
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);

CREATE INDEX IF NOT EXISTS idx_labResults_patientId ON "labResults"("patientId");
CREATE INDEX IF NOT EXISTS idx_labResults_status ON "labResults"(status);

CREATE INDEX IF NOT EXISTS idx_reviews_professionalId ON reviews("professionalId");
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);

CREATE INDEX IF NOT EXISTS idx_communes_wilayaId ON communes("wilayaId");

-- ============================================================================
-- 17. VERIFY DATA INTEGRITY
-- ============================================================================
SELECT 'Setup Complete!' as status,
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM patients) as total_patients,
  (SELECT COUNT(*) FROM "medicalProfessionals") as total_doctors,
  (SELECT COUNT(*) FROM appointments) as total_appointments,
  (SELECT COUNT(*) FROM prescriptions) as total_prescriptions,
  (SELECT COUNT(*) FROM "labResults") as total_lab_results,
  (SELECT COUNT(*) FROM diseases) as total_diseases,
  (SELECT COUNT(*) FROM specializations) as total_specializations,
  (SELECT COUNT(*) FROM wilayas) as total_wilayas,
  (SELECT COUNT(*) FROM communes) as total_communes;
