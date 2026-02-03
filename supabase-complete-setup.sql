-- ============================================================================
-- TABIBI - Complete Supabase Setup Script
-- This script inserts all data needed for the healthcare platform
-- ============================================================================

-- ============================================================================
-- 1. INSERT DISEASES (70+ diseases)
-- ============================================================================
TRUNCATE TABLE diseases CASCADE;

INSERT INTO diseases ("nameAr", "nameFr", category) VALUES
-- Cardiovascular
('أمراض القلب', 'Maladies Cardiaques', 'cardiovascular'),
('ارتفاع ضغط الدم', 'Hypertension', 'cardiovascular'),
('السكتة الدماغية', 'Accident Vasculaire Cérébral', 'cardiovascular'),
('قصور القلب', 'Insuffisance Cardiaque', 'cardiovascular'),
('الذبحة الصدرية', 'Angine de Poitrine', 'cardiovascular'),
('عدم انتظام ضربات القلب', 'Arythmie Cardiaque', 'cardiovascular'),
('تصلب الشرايين', 'Athérosclérose', 'cardiovascular'),
('جلطات الدم', 'Thrombose', 'cardiovascular'),
-- Respiratory
('الربو', 'Asthme', 'respiratory'),
('الإنفلونزا', 'Grippe', 'respiratory'),
('السعال الديكي', 'Coqueluche', 'respiratory'),
('الدرن الرئوي', 'Tuberculose', 'respiratory'),
('الالتهاب الرئوي', 'Pneumonie', 'respiratory'),
('الحساسية التنفسية', 'Allergie Respiratoire', 'respiratory'),
('الانسداد الرئوي المزمن', 'BPCO', 'respiratory'),
-- Endocrine
('السكري من النوع الأول', 'Diabète Type 1', 'endocrine'),
('السكري من النوع الثاني', 'Diabète Type 2', 'endocrine'),
('قصور الغدة الدرقية', 'Hypothyroïdie', 'endocrine'),
('فرط الغدة الدرقية', 'Hyperthyroïdie', 'endocrine'),
('السمنة', 'Obésité', 'endocrine'),
-- Neurological
('الزهايمر', 'Alzheimer', 'neurological'),
('الشلل الرعاشي', 'Parkinson', 'neurological'),
('الصرع', 'Épilepsie', 'neurological'),
('السكتة الدماغية', 'AVC', 'neurological'),
('الصداع النصفي', 'Migraine', 'neurological'),
('التهاب السحايا', 'Méningite', 'neurological'),
-- Gastrointestinal
('قرحة المعدة', 'Ulcère Gastrique', 'gastrointestinal'),
('التهاب الكبد', 'Hépatite', 'gastrointestinal'),
('التهاب المرارة', 'Cholécystite', 'gastrointestinal'),
('الإمساك المزمن', 'Constipation Chronique', 'gastrointestinal'),
('الإسهال المزمن', 'Diarrhée Chronique', 'gastrointestinal'),
('متلازمة القولون العصبي', 'Syndrome Côlon Irritable', 'gastrointestinal'),
-- Urinary
('التهاب المسالك البولية', 'Infection Urinaire', 'urinary'),
('حصى الكلى', 'Calculs Rénaux', 'urinary'),
('قصور الكلى', 'Insuffisance Rénale', 'urinary'),
('التهاب المثانة', 'Cystite', 'urinary'),
-- Musculoskeletal
('هشاشة العظام', 'Ostéoporose', 'musculoskeletal'),
('التهاب المفاصل الروماتويدي', 'Polyarthrite Rhumatoïde', 'musculoskeletal'),
('الفصال العظمي', 'Arthrose', 'musculoskeletal'),
('آلام الظهر المزمنة', 'Mal de Dos Chronique', 'musculoskeletal'),
('الالتواءات والكسور', 'Entorses et Fractures', 'musculoskeletal'),
-- Infectious
('السل', 'Tuberculose', 'infectious'),
('الإيدز', 'VIH/SIDA', 'infectious'),
('الملاريا', 'Paludisme', 'infectious'),
('حمى التيفوئيد', 'Fièvre Typhoïde', 'infectious'),
-- Dermatological
('الأكزيما', 'Eczéma', 'dermatological'),
('الصدفية', 'Psoriasis', 'dermatological'),
('حب الشباب', 'Acné', 'dermatological'),
('الفطريات الجلدية', 'Mycose', 'dermatological'),
-- Mental Health
('الاكتئاب', 'Dépression', 'mental'),
('القلق المزمن', 'Anxiété Chronique', 'mental'),
('الاضطراب ثنائي القطب', 'Trouble Bipolaire', 'mental'),
('الفصام', 'Schizophrénie', 'mental'),
-- Oncological
('سرطان الثدي', 'Cancer du Sein', 'oncological'),
('سرطان الرئة', 'Cancer du Poumon', 'oncological'),
('سرطان القولون', 'Cancer du Côlon', 'oncological'),
('سرطان الكبد', 'Cancer du Foie', 'oncological'),
-- Hematological
('فقر الدم', 'Anémie', 'hematological'),
('الهيموفيليا', 'Hémophilie', 'hematological'),
('الثلاسيميا', 'Thalassémie', 'hematological'),
-- Immunological
('نقص المناعة', 'Immunodéficience', 'immunological'),
('الحساسية الغذائية', 'Allergie Alimentaire', 'immunological'),
('الربو التحسسي', 'Asthme Allergique', 'immunological'),
-- Ophthalmological
('قصر النظر', 'Myopie', 'ophthalmological'),
('طول النظر', 'Hypermétropie', 'ophthalmological'),
('الماء الأبيض', 'Cataracte', 'ophthalmological'),
('الجلوكوما', 'Glaucome', 'ophthalmological'),
-- ENT
('التهاب الأذن الوسطى', 'Otite Moyenne', 'ent'),
('التهاب الحلق', 'Pharyngite', 'ent'),
('التهاب الجيوب الأنفية', 'Sinusite', 'ent');

-- ============================================================================
-- 2. INSERT TEST USERS (Patients and Professionals)
-- ============================================================================
TRUNCATE TABLE users CASCADE;

-- Insert test patients
INSERT INTO users ("openId", email, phone, name, "userType", "loginMethod", "createdAt", "updatedAt", "lastSignedIn") VALUES
('patient_001', 'ahmed.ali@email.com', '+213555123456', 'أحمد علي', 'patient', 'otp', NOW(), NOW(), NOW()),
('patient_002', 'fatima.zahra@email.com', '+213666234567', 'فاطمة الزهراء', 'patient', 'otp', NOW(), NOW(), NOW()),
('patient_003', 'mohammed.hassan@email.com', '+213777345678', 'محمد حسن', 'patient', 'otp', NOW(), NOW(), NOW()),
('patient_004', 'leila.ben@email.com', '+213555456789', 'ليلى بن', 'patient', 'otp', NOW(), NOW(), NOW()),
('patient_005', 'karim.medina@email.com', '+213666567890', 'كريم المدينة', 'patient', 'otp', NOW(), NOW(), NOW());

-- Insert test doctors
INSERT INTO users ("openId", email, phone, name, "userType", "loginMethod", "createdAt", "updatedAt", "lastSignedIn") VALUES
('doctor_001', 'dr.ahmed.cardio@email.com', '+213555111111', 'د. أحمد القلب', 'doctor', 'email', NOW(), NOW(), NOW()),
('doctor_002', 'dr.fatima.pediatric@email.com', '+213666222222', 'د. فاطمة الأطفال', 'doctor', 'email', NOW(), NOW(), NOW()),
('doctor_003', 'dr.hassan.neuro@email.com', '+213777333333', 'د. حسن الأعصاب', 'doctor', 'email', NOW(), NOW(), NOW()),
('doctor_004', 'dr.leila.surgery@email.com', '+213555444444', 'د. ليلى الجراحة', 'doctor', 'email', NOW(), NOW(), NOW()),
('doctor_005', 'dr.karim.dental@email.com', '+213666555555', 'د. كريم الأسنان', 'doctor', 'email', NOW(), NOW(), NOW());

-- ============================================================================
-- 3. INSERT PATIENT PROFILES
-- ============================================================================
TRUNCATE TABLE patients CASCADE;

INSERT INTO patients ("userId", "dateOfBirth", gender, "bloodType", wilaya, commune, address, "emergencyContact", "medicalHistory", allergies) VALUES
(1, '1990-05-15'::timestamp, 'M', 'O+', 'الجزائر', 'الجزائر', 'شارع ديدوش مراد، الجزائر', '+213555999999', '{"conditions": ["hypertension"]}', '{"allergens": ["penicillin"]}'),
(2, '1985-08-22'::timestamp, 'F', 'A+', 'وهران', 'وهران', 'حي السعادة، وهران', '+213666888888', '{"conditions": ["diabetes"]}', '{"allergens": ["aspirin"]}'),
(3, '1992-03-10'::timestamp, 'M', 'B+', 'قسنطينة', 'قسنطينة', 'حي الشريعة، قسنطينة', '+213777777777', '{}', '{}'),
(4, '1988-11-30'::timestamp, 'F', 'AB+', 'بليدة', 'بليدة', 'حي الثورة، بليدة', '+213555666666', '{"conditions": ["asthma"]}', '{"allergens": ["dust"]}'),
(5, '1995-07-18'::timestamp, 'M', 'O-', 'تيزي وزو', 'تيزي وزو', 'حي الاستقلال، تيزي وزو', '+213666555555', '{}', '{}');

-- ============================================================================
-- 4. INSERT MEDICAL PROFESSIONALS
-- ============================================================================
TRUNCATE TABLE "medicalProfessionals" CASCADE;

INSERT INTO "medicalProfessionals" ("userId", specialization, "licenseNumber", "clinicName", wilaya, commune, address, phone, "yearsExperience", "consultationFee", "availableHours", rating, "reviewCount") VALUES
(6, 'Cardiologie', 'LIC-CARDIO-001', 'عيادة القلب المتخصصة', 'الجزائر', 'الجزائر', 'شارع علي لكحل، الجزائر', '+213555111111', 15, 3000, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "14:00-18:00"}', 4.8, 127),
(7, 'Pédiatrie', 'LIC-PEDIA-002', 'عيادة الأطفال الحديثة', 'وهران', 'وهران', 'شارع الأمير عبد القادر، وهران', '+213666222222', 12, 2500, '{"monday": "08:00-16:00", "tuesday": "08:00-16:00", "wednesday": "08:00-16:00", "thursday": "08:00-16:00", "friday": "15:00-19:00"}', 4.9, 89),
(8, 'Neurologie', 'LIC-NEURO-003', 'عيادة الأعصاب المتقدمة', 'قسنطينة', 'قسنطينة', 'شارع ديدوش مراد، قسنطينة', '+213777333333', 18, 3500, '{"monday": "10:00-18:00", "tuesday": "10:00-18:00", "wednesday": "10:00-18:00", "thursday": "10:00-18:00", "friday": "16:00-20:00"}', 4.7, 156),
(9, 'Chirurgie Générale', 'LIC-SURG-004', 'مستشفى الجراحة المتخصصة', 'بليدة', 'بليدة', 'شارع الاستقلال، بليدة', '+213555444444', 20, 5000, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "14:00-18:00"}', 4.6, 203),
(10, 'Dentisterie', 'LIC-DENT-005', 'عيادة الأسنان المتقدمة', 'تيزي وزو', 'تيزي وزو', 'شارع الثورة، تيزي وزو', '+213666555555', 10, 2000, '{"monday": "08:00-17:00", "tuesday": "08:00-17:00", "wednesday": "08:00-17:00", "thursday": "08:00-17:00", "friday": "15:00-19:00"}', 4.9, 234);

-- ============================================================================
-- 5. INSERT APPOINTMENTS (Test booking data)
-- ============================================================================
TRUNCATE TABLE appointments CASCADE;

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
-- 6. INSERT BLOOD PRESSURE RECORDS
-- ============================================================================
TRUNCATE TABLE "bloodPressureRecords" CASCADE;

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
-- 7. INSERT BLOOD SUGAR RECORDS
-- ============================================================================
TRUNCATE TABLE "bloodSugarRecords" CASCADE;

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
-- 8. INSERT PRESCRIPTIONS
-- ============================================================================
TRUNCATE TABLE prescriptions CASCADE;

INSERT INTO prescriptions ("patientId", "professionalId", medication, dosage, frequency, duration, "startDate", "endDate", status, notes) VALUES
(1, 1, 'Lisinopril', '10mg', 'مرة يومياً', '30 days', NOW(), NOW() + interval '30 days', 'active', 'لعلاج ارتفاع ضغط الدم'),
(1, 1, 'Atorvastatin', '20mg', 'مرة يومياً', '60 days', NOW(), NOW() + interval '60 days', 'active', 'لتخفيض الكوليسترول'),
(2, 2, 'Amoxicillin', '500mg', 'ثلاث مرات يومياً', '7 days', NOW() - interval '3 days', NOW() + interval '4 days', 'active', 'مضاد حيوي'),
(3, 3, 'Paracetamol', '500mg', 'عند الحاجة', '10 days', NOW(), NOW() + interval '10 days', 'active', 'لتسكين الآلام'),
(4, 4, 'Ibuprofen', '400mg', 'مرتين يومياً', '14 days', NOW(), NOW() + interval '14 days', 'active', 'لتقليل الالتهاب'),
(5, 5, 'Fluoride Gel', '1.1%', 'مرة يومياً', '30 days', NOW(), NOW() + interval '30 days', 'active', 'لتقوية الأسنان');

-- ============================================================================
-- 9. INSERT LAB RESULTS
-- ============================================================================
TRUNCATE TABLE "labResults" CASCADE;

INSERT INTO "labResults" ("patientId", "testName", "testType", result, "normalRange", status, "testDate", notes) VALUES
(1, 'تحليل الدم الشامل', 'blood', '{"RBC": "4.5", "WBC": "7.2", "Hemoglobin": "13.5"}', '{"RBC": "4.5-5.5", "WBC": "4.5-11", "Hemoglobin": "13.5-17.5"}', 'ready', NOW() - interval '5 days', 'النتائج طبيعية'),
(1, 'فحص الكوليسترول', 'blood', '{"Total": "200", "LDL": "120", "HDL": "50"}', '{"Total": "<200", "LDL": "<100", "HDL": ">40"}', 'ready', NOW() - interval '3 days', 'الكوليسترول مرتفع قليلاً'),
(2, 'اختبار السكر', 'blood', '{"Glucose": "110"}', '{"Glucose": "70-100"}', 'ready', NOW() - interval '7 days', 'السكر مرتفع قليلاً'),
(3, 'تحليل البول', 'urine', '{"Color": "Yellow", "Clarity": "Clear"}', '{"Color": "Pale Yellow", "Clarity": "Clear"}', 'ready', NOW() - interval '2 days', 'النتائج طبيعية'),
(4, 'أشعة X الصدر', 'imaging', '{"Finding": "Normal"}', 'Normal', 'ready', NOW() - interval '1 day', 'الأشعة طبيعية'),
(5, 'فحص الأسنان بالأشعة', 'imaging', '{"Finding": "No cavities"}', 'No abnormalities', 'pending', NOW(), 'قيد المراجعة');

-- ============================================================================
-- 10. INSERT REVIEWS
-- ============================================================================
TRUNCATE TABLE reviews CASCADE;

INSERT INTO reviews ("patientId", "professionalId", rating, comment, "reviewDate") VALUES
(1, 1, 5, 'طبيب ممتاز جداً، خدمة احترافية وسريعة', NOW() - interval '10 days'),
(2, 2, 5, 'طبيبة رائعة، تتعامل مع الأطفال بحنان', NOW() - interval '8 days'),
(3, 3, 4, 'طبيب جيد، لكن الانتظار طويل قليلاً', NOW() - interval '6 days'),
(4, 4, 5, 'جراح ماهر جداً، شعرت بالأمان التام', NOW() - interval '4 days'),
(5, 5, 5, 'طبيب أسنان رائع، عمل احترافي', NOW() - interval '2 days'),
(1, 2, 4, 'خدمة جيدة وودية', NOW() - interval '1 day');

-- ============================================================================
-- 11. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_appointments_patientId ON appointments("patientId");
CREATE INDEX IF NOT EXISTS idx_appointments_professionalId ON appointments("professionalId");
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments("appointmentDate");

CREATE INDEX IF NOT EXISTS idx_bloodPressure_patientId ON "bloodPressureRecords"("patientId");
CREATE INDEX IF NOT EXISTS idx_bloodPressure_date ON "bloodPressureRecords"("recordDate");

CREATE INDEX IF NOT EXISTS idx_bloodSugar_patientId ON "bloodSugarRecords"("patientId");
CREATE INDEX IF NOT EXISTS idx_bloodSugar_date ON "bloodSugarRecords"("recordDate");

CREATE INDEX IF NOT EXISTS idx_prescriptions_patientId ON prescriptions("patientId");
CREATE INDEX IF NOT EXISTS idx_prescriptions_professionalId ON prescriptions("professionalId");
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);

CREATE INDEX IF NOT EXISTS idx_labResults_patientId ON "labResults"("patientId");
CREATE INDEX IF NOT EXISTS idx_labResults_status ON "labResults"(status);

CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_specialization ON "medicalProfessionals"(specialization);
CREATE INDEX IF NOT EXISTS idx_medicalProfessionals_wilaya ON "medicalProfessionals"(wilaya);

CREATE INDEX IF NOT EXISTS idx_reviews_professionalId ON reviews("professionalId");
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- ============================================================================
-- 12. VERIFY DATA INTEGRITY
-- ============================================================================
-- Check counts
SELECT 'Diseases' as table_name, COUNT(*) as count FROM diseases
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Patients', COUNT(*) FROM patients
UNION ALL
SELECT 'Medical Professionals', COUNT(*) FROM "medicalProfessionals"
UNION ALL
SELECT 'Appointments', COUNT(*) FROM appointments
UNION ALL
SELECT 'Blood Pressure Records', COUNT(*) FROM "bloodPressureRecords"
UNION ALL
SELECT 'Blood Sugar Records', COUNT(*) FROM "bloodSugarRecords"
UNION ALL
SELECT 'Prescriptions', COUNT(*) FROM prescriptions
UNION ALL
SELECT 'Lab Results', COUNT(*) FROM "labResults"
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews;
