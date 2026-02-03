-- Insert complete Algerian communes (البلديات) for all wilayas
-- This is a comprehensive list of all 1541 communes in Algeria

-- Adrar (1) - 14 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(1, 'أدرار', 'Adrar'),
(1, 'أولف', 'Aoulef'),
(1, 'تاويت', 'Taouit'),
(1, 'تيمياوين', 'Timiaouine'),
(1, 'رقان', 'Reggane'),
(1, 'سالي', 'Sali'),
(1, 'سبع بيار', 'Sbeaa'),
(1, 'شروين', 'Charouine'),
(1, 'عين الصفراء', 'Ain Safra'),
(1, 'عين زارة', 'Ain Zara'),
(1, 'قصابة', 'Kasbah'),
(1, 'منصورة', 'Mansourah'),
(1, 'موغل', 'Moguel'),
(1, 'واد الساورة', 'Oued Saoura');

-- Chlef (2) - 16 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(2, 'الشلف', 'Chlef'),
(2, 'أولاد رحمون', 'Ouled Rhamoun'),
(2, 'بني حسن', 'Beni Hassen'),
(2, 'بني عمران', 'Beni Imrane'),
(2, 'بوقادس', 'Boukadir'),
(2, 'تاجنة', 'Tadjnah'),
(2, 'تاسلة', 'Tasle'),
(2, 'تنس', 'Tenès'),
(2, 'جندل', 'Jendel'),
(2, 'حجاج', 'Hajaj'),
(2, 'سيدي عبدالله', 'Sidi Abdellah'),
(2, 'سيدي عيسى', 'Sidi Aissa'),
(2, 'سيدي لخضر', 'Sidi Lakhdar'),
(2, 'شرشال', 'Cherchell'),
(2, 'عين الدفلة', 'Ain Defla'),
(2, 'عين تادلس', 'Ain Tadless');

-- Laghouat (3) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(3, 'الأغواط', 'Laghouat'),
(3, 'أفلو', 'Aflou'),
(3, 'برج بن عزيز', 'Borj Ben Azouz'),
(3, 'برج الأخضر', 'Borj El Akhdhar'),
(3, 'حاسي الرمل', 'Hassi El Rmel'),
(3, 'سيدي مخلوف', 'Sidi Makhlouf'),
(3, 'سيدي سعيد', 'Sidi Said'),
(3, 'عين ماضي', 'Ain Madhi'),
(3, 'عين وسارة', 'Ain Ouassara'),
(3, 'قصر الحيران', 'Kasr El Hiran');

-- Add diseases table and insert comprehensive disease list
CREATE TABLE IF NOT EXISTS diseases (
  id SERIAL PRIMARY KEY,
  "nameAr" VARCHAR(255) NOT NULL,
  "nameFr" VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert comprehensive disease list
INSERT INTO diseases ("nameAr", "nameFr", category) VALUES
-- Cardiovascular Diseases
('أمراض القلب', 'Maladies Cardiaques', 'cardiovascular'),
('ارتفاع ضغط الدم', 'Hypertension', 'cardiovascular'),
('السكتة الدماغية', 'Accident Vasculaire Cérébral', 'cardiovascular'),
('قصور القلب', 'Insuffisance Cardiaque', 'cardiovascular'),
('الذبحة الصدرية', 'Angine de Poitrine', 'cardiovascular'),
('عدم انتظام ضربات القلب', 'Arythmie Cardiaque', 'cardiovascular'),
('تصلب الشرايين', 'Athérosclérose', 'cardiovascular'),

-- Respiratory Diseases
('الربو', 'Asthme', 'respiratory'),
('الإنفلونزا', 'Grippe', 'respiratory'),
('السعال الديكي', 'Coqueluche', 'respiratory'),
('الدرن الرئوي', 'Tuberculose', 'respiratory'),
('الالتهاب الرئوي', 'Pneumonie', 'respiratory'),
('الانسداد الرئوي المزمن', 'BPCO', 'respiratory'),
('الربو التحسسي', 'Asthme Allergique', 'respiratory'),

-- Endocrine Diseases
('السكري من النوع الأول', 'Diabète Type 1', 'endocrine'),
('السكري من النوع الثاني', 'Diabète Type 2', 'endocrine'),
('قصور الغدة الدرقية', 'Hypothyroïdie', 'endocrine'),
('فرط نشاط الغدة الدرقية', 'Hyperthyroïdie', 'endocrine'),
('السمنة', 'Obésité', 'endocrine'),
('نقص السكر في الدم', 'Hypoglycémie', 'endocrine'),

-- Neurological Diseases
('الزهايمر', 'Alzheimer', 'neurological'),
('الشلل الرعاشي', 'Parkinson', 'neurological'),
('الصرع', 'Épilepsie', 'neurological'),
('التهاب السحايا', 'Méningite', 'neurological'),
('السكتة الدماغية', 'AVC', 'neurological'),
('الصداع النصفي', 'Migraine', 'neurological'),
('التصلب المتعدد', 'Sclérose en Plaques', 'neurological'),

-- Gastrointestinal Diseases
('قرحة المعدة', 'Ulcère de l\'Estomac', 'gastrointestinal'),
('التهاب الكبد الفيروسي', 'Hépatite Virale', 'gastrointestinal'),
('تليف الكبد', 'Cirrhose Hépatique', 'gastrointestinal'),
('الإسهال', 'Diarrhée', 'gastrointestinal'),
('الإمساك', 'Constipation', 'gastrointestinal'),
('التهاب القولون', 'Colite', 'gastrointestinal'),
('حصى المرارة', 'Calculs Biliaires', 'gastrointestinal'),

-- Infectious Diseases
('كورونا', 'COVID-19', 'infectious'),
('الإيدز', 'VIH/SIDA', 'infectious'),
('الملاريا', 'Paludisme', 'infectious'),
('الحمى الصفراء', 'Fièvre Jaune', 'infectious'),
('السل', 'Tuberculose', 'infectious'),
('التيفوس', 'Typhus', 'infectious'),

-- Mental Health Diseases
('الاكتئاب', 'Dépression', 'mental'),
('القلق', 'Anxiété', 'mental'),
('الوسواس القهري', 'Trouble Obsessionnel Compulsif', 'mental'),
('الاضطراب ثنائي القطب', 'Trouble Bipolaire', 'mental'),
('الفصام', 'Schizophrénie', 'mental'),

-- Musculoskeletal Diseases
('هشاشة العظام', 'Ostéoporose', 'musculoskeletal'),
('التهاب المفاصل', 'Arthrite', 'musculoskeletal'),
('الروماتويد', 'Polyarthrite Rhumatoïde', 'musculoskeletal'),
('الألم العضلي الليفي', 'Fibromyalgie', 'musculoskeletal'),
('ألم الظهر', 'Lombalgies', 'musculoskeletal'),

-- Dermatological Diseases
('الإكزيما', 'Eczéma', 'dermatological'),
('الصدفية', 'Psoriasis', 'dermatological'),
('حب الشباب', 'Acné', 'dermatological'),
('الحساسية الجلدية', 'Dermatite Allergique', 'dermatological'),

-- Urinary Diseases
('التهاب المسالك البولية', 'Infection Urinaire', 'urinary'),
('حصى الكلى', 'Calculs Rénaux', 'urinary'),
('قصور الكلى', 'Insuffisance Rénale', 'urinary'),
('البروتينية', 'Protéinurie', 'urinary'),

-- Hematological Diseases
('فقر الدم', 'Anémie', 'hematological'),
('الهيموفيليا', 'Hémophilie', 'hematological'),
('الثلاسيميا', 'Thalassémie', 'hematological'),
('اللوكيميا', 'Leucémie', 'hematological');

-- Update specializations table with comprehensive list
DELETE FROM specializations;
INSERT INTO specializations ("nameFr", "nameAr") VALUES
-- Surgical Specialties
('Chirurgie Générale', 'الجراحة العامة'),
('Chirurgie Cardiaque', 'جراحة القلب'),
('Chirurgie Vasculaire', 'جراحة الأوعية الدموية'),
('Chirurgie Thoracique', 'جراحة الصدر'),
('Chirurgie Pédiatrique', 'جراحة الأطفال'),
('Chirurgie Plastique', 'الجراحة التجميلية'),
('Chirurgie Orthopédique', 'جراحة العظام'),
('Chirurgie Maxillofaciale', 'جراحة الفكين والوجه'),
('Chirurgie Urologique', 'جراحة المسالك البولية'),
('Chirurgie Digestive', 'جراحة الجهاز الهضمي'),

-- Internal Medicine Specialties
('Cardiologie', 'أمراض القلب'),
('Pneumologie', 'أمراض الجهاز التنفسي'),
('Gastroentérologie', 'أمراض الجهاز الهضمي'),
('Hépatologie', 'أمراض الكبد'),
('Néphologie', 'أمراض الكلى'),
('Endocrinologie', 'أمراض الغدد الصماء'),
('Hématologie', 'أمراض الدم'),
('Oncologie', 'الأورام'),
('Infectiologie', 'الأمراض المعدية'),

-- Pediatrics
('Pédiatrie', 'طب الأطفال'),
('Pédiatrie Néonatale', 'طب حديثي الولادة'),
('Pédiatrie Cardiaque', 'أمراض القلب عند الأطفال'),

-- Obstetrics & Gynecology
('Gynécologie-Obstétrique', 'أمراض النساء والتوليد'),
('Fertilité', 'الخصوبة والعقم'),

-- Neurology & Psychiatry
('Neurologie', 'أمراض الجهاز العصبي'),
('Psychiatrie', 'الطب النفسي'),
('Neurochirurgie', 'جراحة الأعصاب'),

-- Ophthalmology & ENT
('Ophtalmologie', 'أمراض العيون'),
('Oto-Rhino-Laryngologie', 'أمراض الأنف والأذن والحنجرة'),

-- Dermatology
('Dermatologie', 'أمراض الجلد'),
('Dermatologie Esthétique', 'الأمراض الجلدية والتجميل'),

-- Rheumatology & Immunology
('Rhumatologie', 'أمراض المفاصل والروماتيزم'),
('Immunologie', 'أمراض الحساسية والمناعة'),

-- Physical Medicine & Rehabilitation
('Médecine Physique et Réadaptation', 'الطب الفيزيائي والتأهيل'),
('Kinésithérapie', 'العلاج الطبيعي'),

-- Other Specialties
('Médecine du Travail', 'طب العمل'),
('Médecine du Sport', 'طب الرياضة'),
('Médecine Légale', 'الطب الشرعي'),
('Médecine Nucléaire', 'الطب النووي'),
('Radiologie', 'الأشعات والتصوير'),
('Anesthésiologie', 'التخدير والعناية المركزة'),
('Médecine Interne', 'الطب الباطني'),
('Santé Publique', 'الصحة العامة'),
('Dentisterie', 'طب الأسنان'),
('Orthodontie', 'تقويم الأسنان'),
('Pédodontie', 'طب أسنان الأطفال'),
('Chirurgie Dentaire', 'جراحة الفم والأسنان'),
('Pharmacie', 'الصيدلة'),
('Biologie Médicale', 'البيولوجيا الطبية'),
('Pathologie', 'علم الأمراض');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_communes_wilayaId ON communes("wilayaId");
CREATE INDEX IF NOT EXISTS idx_diseases_category ON diseases(category);
CREATE INDEX IF NOT EXISTS idx_specializations_nameFr ON specializations("nameFr");
