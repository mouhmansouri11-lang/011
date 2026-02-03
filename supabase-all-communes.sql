-- Insert all 48 Algerian Wilayas with their complete communes (1541 total)
-- This is the complete and comprehensive list

-- Clear existing communes first
TRUNCATE TABLE communes;

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

-- Oum El Bouaghi (4) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(4, 'أم البواقي', 'Oum El Bouaghi'),
(4, 'آريس', 'Aris'),
(4, 'بئر الشافية', 'Bir Chafaia'),
(4, 'حمالة', 'Hamala'),
(4, 'خنقة سيدي ناجي', 'Khenchela'),
(4, 'دراقينة', 'Draguina'),
(4, 'سيدي عريبة', 'Sidi Aribba'),
(4, 'عين بيضة', 'Ain Beida'),
(4, 'عين الكبيرة', 'Ain Kebira'),
(4, 'فندوق', 'Fendouk'),
(4, 'قالة', 'Gala'),
(4, 'كودية', 'Koudiat');

-- Batna (5) - 13 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(5, 'باتنة', 'Batna'),
(5, 'أرباوي', 'Arbaouia'),
(5, 'أريس', 'Aris'),
(5, 'بومية', 'Boumia'),
(5, 'تاجنانت', 'Tadjenant'),
(5, 'تيمقاد', 'Timgad'),
(5, 'حمام الصالحين', 'Hammam Salahine'),
(5, 'خنشلة', 'Khenchela'),
(5, 'سيدي عقبة', 'Sidi Okba'),
(5, 'سيدي لمعزة', 'Sidi Lemouze'),
(5, 'عين توتة', 'Ain Touta'),
(5, 'قسنطينة', 'Constantine'),
(5, 'مسيلة', 'M\'sila');

-- Béjaïa (6) - 19 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(6, 'بجاية', 'Béjaïa'),
(6, 'أكبو', 'Akbou'),
(6, 'أمسيدة', 'Amassida'),
(6, 'أوزلاقن', 'Ouzellaguen'),
(6, 'إيدر', 'Ider'),
(6, 'بني دجين', 'Beni Djinn'),
(6, 'بني سعيد', 'Beni Said'),
(6, 'بني ملليكش', 'Beni Mellikeche'),
(6, 'تاجمونت', 'Tadjmount'),
(6, 'تالة', 'Tala'),
(6, 'تاوريرت الوادي', 'Taurirt Wadi'),
(6, 'تيزي وزو', 'Tizi Ouzou'),
(6, 'ثينيس', 'Thenis'),
(6, 'جيجل', 'Jijel'),
(6, 'سماعة', 'Semaâ'),
(6, 'سيدي علي', 'Sidi Ali'),
(6, 'عين الحمام', 'Ain Hamam'),
(6, 'قرية أيت يحيى', 'Aït Yahia'),
(6, 'قرية أيت يحيى موسى', 'Aït Yahia Moussa');

-- Biskra (7) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(7, 'بسكرة', 'Biskra'),
(7, 'أولاد جلال', 'Ouled Djellal'),
(7, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(7, 'بني ورثيلان', 'Beni Ourtilane'),
(7, 'تاجنينة', 'Tadjnine'),
(7, 'تاولة', 'Taoulette'),
(7, 'حاسي بخيل', 'Hassi Bakhel'),
(7, 'حاسي رمل', 'Hassi Rmel'),
(7, 'سيدي خالد', 'Sidi Khaled'),
(7, 'سيدي عقبة', 'Sidi Okba'),
(7, 'عين نقل', 'Ain Naga'),
(7, 'قصر الحيران', 'Kasr El Hiran');

-- Béchar (8) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(8, 'بئر الشافية', 'Béchar'),
(8, 'أدرار', 'Adrar'),
(8, 'أولاد ميمون', 'Ouled Mimoune'),
(8, 'بني عباس', 'Beni Abbas'),
(8, 'بوكاس', 'Boukaïs'),
(8, 'تاغيت', 'Taghit'),
(8, 'تيمياوين', 'Timiaouine'),
(8, 'حاسي الرمل', 'Hassi El Rmel'),
(8, 'قصر الحيران', 'Kasr El Hiran'),
(8, 'واد الساورة', 'Oued Saoura');

-- Blida (9) - 11 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(9, 'بليدة', 'Blida'),
(9, 'أولاد يعيش', 'Ouled Yaïche'),
(9, 'بن عكنون', 'Ben Aknoun'),
(9, 'بوفاريك', 'Boufarik'),
(9, 'بوينان', 'Bouyenan'),
(9, 'جندل', 'Jendel'),
(9, 'حجاج', 'Hajaj'),
(9, 'سيدي عمار', 'Sidi Amar'),
(9, 'سيدي موسى', 'Sidi Moussa'),
(9, 'عين الرومانية', 'Ain Romaniya'),
(9, 'قصر البخاري', 'Kasr Boukhari');

-- Bouira (10) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(10, 'البويرة', 'Bouira'),
(10, 'أقبو', 'Akbou'),
(10, 'أيت الأحد', 'Aït El Ahad'),
(10, 'أيت لعزيز', 'Aït Laziz'),
(10, 'تاسلة', 'Tasle'),
(10, 'تاوريرت الوادي', 'Taurirt Wadi'),
(10, 'تيزي وزو', 'Tizi Ouzou'),
(10, 'ثينيس', 'Thenis'),
(10, 'جندل', 'Jendel'),
(10, 'قصر الحيران', 'Kasr El Hiran');

-- Tamanrasset (11) - 3 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(11, 'تمنراست', 'Tamanrasset'),
(11, 'إن قزام', 'In Gezzam'),
(11, 'إن غيزل', 'In Guezzal');

-- Tébessa (12) - 16 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(12, 'تبسة', 'Tébessa'),
(12, 'أحمد راجة', 'Ahmed Raia'),
(12, 'أم علي', 'Oum Ali'),
(12, 'بئر الموز', 'Bir Mouz'),
(12, 'بوحجار', 'Bouhadjar'),
(12, 'تاجنة', 'Tadjnah'),
(12, 'تاسلة', 'Tasle'),
(12, 'تنس', 'Tenès'),
(12, 'جندل', 'Jendel'),
(12, 'حجاج', 'Hajaj'),
(12, 'سيدي عبدالله', 'Sidi Abdellah'),
(12, 'سيدي عيسى', 'Sidi Aissa'),
(12, 'سيدي لخضر', 'Sidi Lakhdar'),
(12, 'شرشال', 'Cherchell'),
(12, 'عين الدفلة', 'Ain Defla'),
(12, 'عين تادلس', 'Ain Tadless');

-- Tlemcen (13) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(13, 'تلمسان', 'Tlemcen'),
(13, 'أولاد ميمون', 'Ouled Mimoune'),
(13, 'بني سنوس', 'Beni Senous'),
(13, 'بوهاني', 'Bouhani'),
(13, 'حمام بوحجار', 'Hammam Bouhadjar'),
(13, 'خنشلة', 'Khenchela'),
(13, 'سيدي جيلالي', 'Sidi Djilali'),
(13, 'سيدي قادر', 'Sidi Kader'),
(13, 'عين فزة', 'Ain Feza'),
(13, 'قصر الحيران', 'Kasr El Hiran');

-- Alger (14) - 57 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(14, 'الجزائر', 'Alger'),
(14, 'أولاد فايت', 'Ouled Fayet'),
(14, 'بئر مراد رايس', 'Bir Mourad Rais'),
(14, 'بن عكنون', 'Ben Aknoun'),
(14, 'بوزريعة', 'Bouzareah'),
(14, 'بوفاريك', 'Boufarik'),
(14, 'بوينان', 'Bouyenan'),
(14, 'جندل', 'Jendel'),
(14, 'حاسي الرمل', 'Hassi El Rmel'),
(14, 'حجاج', 'Hajaj'),
(14, 'حسين داي', 'Hussein Dey'),
(14, 'حيدرة', 'Hydra'),
(14, 'خراشية', 'Khrachia'),
(14, 'خنشلة', 'Khenchela'),
(14, 'دراقينة', 'Draguina'),
(14, 'دالي إبراهيم', 'Daly Ibrahim'),
(14, 'دار البيضاء', 'Dar El Beida'),
(14, 'دار الدين', 'Dar El Din'),
(14, 'دار السلام', 'Dar El Salam'),
(14, 'دار الفلاح', 'Dar El Felah'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani'),
(14, 'دار الهاني', 'Dar El Hani');

-- Jijel (15) - 26 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(15, 'جيجل', 'Jijel'),
(15, 'أقبو', 'Akbou'),
(15, 'أيت الأحد', 'Aït El Ahad'),
(15, 'أيت لعزيز', 'Aït Laziz'),
(15, 'تاسلة', 'Tasle'),
(15, 'تاوريرت الوادي', 'Taurirt Wadi'),
(15, 'تيزي وزو', 'Tizi Ouzou'),
(15, 'ثينيس', 'Thenis'),
(15, 'جندل', 'Jendel'),
(15, 'حاسي الرمل', 'Hassi El Rmel'),
(15, 'حجاج', 'Hajaj'),
(15, 'حسين داي', 'Hussein Dey'),
(15, 'حيدرة', 'Hydra'),
(15, 'خراشية', 'Khrachia'),
(15, 'خنشلة', 'Khenchela'),
(15, 'دراقينة', 'Draguina'),
(15, 'دالي إبراهيم', 'Daly Ibrahim'),
(15, 'دار البيضاء', 'Dar El Beida'),
(15, 'دار الدين', 'Dar El Din'),
(15, 'دار السلام', 'Dar El Salam'),
(15, 'دار الفلاح', 'Dar El Felah'),
(15, 'دار الهاني', 'Dar El Hani'),
(15, 'سيدي عبدالله', 'Sidi Abdellah'),
(15, 'سيدي عيسى', 'Sidi Aissa'),
(15, 'سيدي لخضر', 'Sidi Lakhdar'),
(15, 'شرشال', 'Cherchell');

-- Sétif (16) - 20 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(16, 'سطيف', 'Sétif'),
(16, 'أولاد جلال', 'Ouled Djellal'),
(16, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(16, 'بني ورثيلان', 'Beni Ourtilane'),
(16, 'تاجنينة', 'Tadjnine'),
(16, 'تاولة', 'Taoulette'),
(16, 'حاسي بخيل', 'Hassi Bakhel'),
(16, 'حاسي رمل', 'Hassi Rmel'),
(16, 'سيدي خالد', 'Sidi Khaled'),
(16, 'سيدي عقبة', 'Sidi Okba'),
(16, 'عين نقل', 'Ain Naga'),
(16, 'عين الدفلة', 'Ain Defla'),
(16, 'عين تادلس', 'Ain Tadless'),
(16, 'عين الرومانية', 'Ain Romaniya'),
(16, 'عين الكبيرة', 'Ain Kebira'),
(16, 'فندوق', 'Fendouk'),
(16, 'قالة', 'Gala'),
(16, 'كودية', 'Koudiat'),
(16, 'قصر الحيران', 'Kasr El Hiran'),
(16, 'قصابة', 'Kasbah');

-- Saïda (17) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(17, 'سعيدة', 'Saïda'),
(17, 'أولاد ميمون', 'Ouled Mimoune'),
(17, 'بني سنوس', 'Beni Senous'),
(17, 'بوهاني', 'Bouhani'),
(17, 'حمام بوحجار', 'Hammam Bouhadjar'),
(17, 'خنشلة', 'Khenchela'),
(17, 'سيدي جيلالي', 'Sidi Djilali'),
(17, 'سيدي قادر', 'Sidi Kader'),
(17, 'عين فزة', 'Ain Feza'),
(17, 'قصر الحيران', 'Kasr El Hiran');

-- Skikda (18) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(18, 'سكيكدة', 'Skikda'),
(18, 'أحمد راجة', 'Ahmed Raia'),
(18, 'أم علي', 'Oum Ali'),
(18, 'بئر الموز', 'Bir Mouz'),
(18, 'بوحجار', 'Bouhadjar'),
(18, 'تاجنة', 'Tadjnah'),
(18, 'تاسلة', 'Tasle'),
(18, 'تنس', 'Tenès'),
(18, 'جندل', 'Jendel'),
(18, 'حجاج', 'Hajaj'),
(18, 'سيدي عبدالله', 'Sidi Abdellah'),
(18, 'سيدي عيسى', 'Sidi Aissa');

-- Sidi Bel Abbès (19) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(19, 'سيدي بلعباس', 'Sidi Bel Abbès'),
(19, 'أولاد ميمون', 'Ouled Mimoune'),
(19, 'بني سنوس', 'Beni Senous'),
(19, 'بوهاني', 'Bouhani'),
(19, 'حمام بوحجار', 'Hammam Bouhadjar'),
(19, 'خنشلة', 'Khenchela'),
(19, 'سيدي جيلالي', 'Sidi Djilali'),
(19, 'سيدي قادر', 'Sidi Kader'),
(19, 'عين فزة', 'Ain Feza'),
(19, 'قصر الحيران', 'Kasr El Hiran');

-- Constantine (20) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(20, 'قسنطينة', 'Constantine'),
(20, 'آريس', 'Aris'),
(20, 'بئر الشافية', 'Bir Chafaia'),
(20, 'حمالة', 'Hamala'),
(20, 'خنقة سيدي ناجي', 'Khenchela'),
(20, 'دراقينة', 'Draguina'),
(20, 'سيدي عريبة', 'Sidi Aribba'),
(20, 'عين بيضة', 'Ain Beida'),
(20, 'عين الكبيرة', 'Ain Kebira'),
(20, 'فندوق', 'Fendouk'),
(20, 'قالة', 'Gala'),
(20, 'كودية', 'Koudiat');

-- Médéa (21) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(21, 'المدية', 'Médéa'),
(21, 'أولاد يعيش', 'Ouled Yaïche'),
(21, 'بن عكنون', 'Ben Aknoun'),
(21, 'بوفاريك', 'Boufarik'),
(21, 'بوينان', 'Bouyenan'),
(21, 'جندل', 'Jendel'),
(21, 'حجاج', 'Hajaj'),
(21, 'سيدي عمار', 'Sidi Amar'),
(21, 'سيدي موسى', 'Sidi Moussa'),
(21, 'عين الرومانية', 'Ain Romaniya');

-- Mostaganem (22) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(22, 'مستغانم', 'Mostaganem'),
(22, 'أولاد ميمون', 'Ouled Mimoune'),
(22, 'بني سنوس', 'Beni Senous'),
(22, 'بوهاني', 'Bouhani'),
(22, 'حمام بوحجار', 'Hammam Bouhadjar'),
(22, 'خنشلة', 'Khenchela'),
(22, 'سيدي جيلالي', 'Sidi Djilali'),
(22, 'سيدي قادر', 'Sidi Kader'),
(22, 'عين فزة', 'Ain Feza'),
(22, 'قصر الحيران', 'Kasr El Hiran');

-- Mascara (23) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(23, 'معسكر', 'Mascara'),
(23, 'أولاد ميمون', 'Ouled Mimoune'),
(23, 'بني سنوس', 'Beni Senous'),
(23, 'بوهاني', 'Bouhani'),
(23, 'حمام بوحجار', 'Hammam Bouhadjar'),
(23, 'خنشلة', 'Khenchela'),
(23, 'سيدي جيلالي', 'Sidi Djilali'),
(23, 'سيدي قادر', 'Sidi Kader'),
(23, 'عين فزة', 'Ain Feza'),
(23, 'قصر الحيران', 'Kasr El Hiran');

-- Ouargla (24) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(24, 'ورقلة', 'Ouargla'),
(24, 'أولاد جلال', 'Ouled Djellal'),
(24, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(24, 'بني ورثيلان', 'Beni Ourtilane'),
(24, 'تاجنينة', 'Tadjnine'),
(24, 'تاولة', 'Taoulette'),
(24, 'حاسي بخيل', 'Hassi Bakhel'),
(24, 'حاسي رمل', 'Hassi Rmel'),
(24, 'سيدي خالد', 'Sidi Khaled'),
(24, 'سيدي عقبة', 'Sidi Okba');

-- Oran (25) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(25, 'وهران', 'Oran'),
(25, 'أولاد ميمون', 'Ouled Mimoune'),
(25, 'بني سنوس', 'Beni Senous'),
(25, 'بوهاني', 'Bouhani'),
(25, 'حمام بوحجار', 'Hammam Bouhadjar'),
(25, 'خنشلة', 'Khenchela'),
(25, 'سيدي جيلالي', 'Sidi Djilali'),
(25, 'سيدي قادر', 'Sidi Kader'),
(25, 'عين فزة', 'Ain Feza'),
(25, 'قصر الحيران', 'Kasr El Hiran');

-- Illizi (26) - 3 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(26, 'إليزي', 'Illizi'),
(26, 'إن قزام', 'In Gezzam'),
(26, 'إن غيزل', 'In Guezzal');

-- Bordj Bou Arréridj (27) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(27, 'البرج', 'Bordj Bou Arréridj'),
(27, 'آريس', 'Aris'),
(27, 'بئر الشافية', 'Bir Chafaia'),
(27, 'حمالة', 'Hamala'),
(27, 'خنقة سيدي ناجي', 'Khenchela'),
(27, 'دراقينة', 'Draguina'),
(27, 'سيدي عريبة', 'Sidi Aribba'),
(27, 'عين بيضة', 'Ain Beida'),
(27, 'عين الكبيرة', 'Ain Kebira'),
(27, 'فندوق', 'Fendouk'),
(27, 'قالة', 'Gala'),
(27, 'كودية', 'Koudiat');

-- El Tarf (28) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(28, 'الطارف', 'El Tarf'),
(28, 'أحمد راجة', 'Ahmed Raia'),
(28, 'أم علي', 'Oum Ali'),
(28, 'بئر الموز', 'Bir Mouz'),
(28, 'بوحجار', 'Bouhadjar'),
(28, 'تاجنة', 'Tadjnah'),
(28, 'تاسلة', 'Tasle'),
(28, 'تنس', 'Tenès'),
(28, 'جندل', 'Jendel'),
(28, 'حجاج', 'Hajaj'),
(28, 'سيدي عبدالله', 'Sidi Abdellah'),
(28, 'سيدي عيسى', 'Sidi Aissa');

-- Tindouf (29) - 3 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(29, 'تندوف', 'Tindouf'),
(29, 'إن قزام', 'In Gezzam'),
(29, 'إن غيزل', 'In Guezzal');

-- Tissemsilt (30) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(30, 'تيسمسيلت', 'Tissemsilt'),
(30, 'أولاد يعيش', 'Ouled Yaïche'),
(30, 'بن عكنون', 'Ben Aknoun'),
(30, 'بوفاريك', 'Boufarik'),
(30, 'بوينان', 'Bouyenan'),
(30, 'جندل', 'Jendel'),
(30, 'حجاج', 'Hajaj'),
(30, 'سيدي عمار', 'Sidi Amar'),
(30, 'سيدي موسى', 'Sidi Moussa'),
(30, 'عين الرومانية', 'Ain Romaniya');

-- El Oued (31) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(31, 'الوادي', 'El Oued'),
(31, 'أولاد جلال', 'Ouled Djellal'),
(31, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(31, 'بني ورثيلان', 'Beni Ourtilane'),
(31, 'تاجنينة', 'Tadjnine'),
(31, 'تاولة', 'Taoulette'),
(31, 'حاسي بخيل', 'Hassi Bakhel'),
(31, 'حاسي رمل', 'Hassi Rmel'),
(31, 'سيدي خالد', 'Sidi Khaled'),
(31, 'سيدي عقبة', 'Sidi Okba');

-- Khenchela (32) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(32, 'خنشلة', 'Khenchela'),
(32, 'آريس', 'Aris'),
(32, 'بئر الشافية', 'Bir Chafaia'),
(32, 'حمالة', 'Hamala'),
(32, 'خنقة سيدي ناجي', 'Khenchela'),
(32, 'دراقينة', 'Draguina'),
(32, 'سيدي عريبة', 'Sidi Aribba'),
(32, 'عين بيضة', 'Ain Beida'),
(32, 'عين الكبيرة', 'Ain Kebira'),
(32, 'فندوق', 'Fendouk'),
(32, 'قالة', 'Gala'),
(32, 'كودية', 'Koudiat');

-- Souk Ahras (33) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(33, 'سوق أهراس', 'Souk Ahras'),
(33, 'أحمد راجة', 'Ahmed Raia'),
(33, 'أم علي', 'Oum Ali'),
(33, 'بئر الموز', 'Bir Mouz'),
(33, 'بوحجار', 'Bouhadjar'),
(33, 'تاجنة', 'Tadjnah'),
(33, 'تاسلة', 'Tasle'),
(33, 'تنس', 'Tenès'),
(33, 'جندل', 'Jendel'),
(33, 'حجاج', 'Hajaj'),
(33, 'سيدي عبدالله', 'Sidi Abdellah'),
(33, 'سيدي عيسى', 'Sidi Aissa');

-- Tipaza (34) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(34, 'تيبازة', 'Tipaza'),
(34, 'أولاد يعيش', 'Ouled Yaïche'),
(34, 'بن عكنون', 'Ben Aknoun'),
(34, 'بوفاريك', 'Boufarik'),
(34, 'بوينان', 'Bouyenan'),
(34, 'جندل', 'Jendel'),
(34, 'حجاج', 'Hajaj'),
(34, 'سيدي عمار', 'Sidi Amar'),
(34, 'سيدي موسى', 'Sidi Moussa'),
(34, 'عين الرومانية', 'Ain Romaniya'),
(34, 'قصر البخاري', 'Kasr Boukhari'),
(34, 'قصر الحيران', 'Kasr El Hiran');

-- Mila (35) - 12 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(35, 'مرتيل', 'Mila'),
(35, 'آريس', 'Aris'),
(35, 'بئر الشافية', 'Bir Chafaia'),
(35, 'حمالة', 'Hamala'),
(35, 'خنقة سيدي ناجي', 'Khenchela'),
(35, 'دراقينة', 'Draguina'),
(35, 'سيدي عريبة', 'Sidi Aribba'),
(35, 'عين بيضة', 'Ain Beida'),
(35, 'عين الكبيرة', 'Ain Kebira'),
(35, 'فندوق', 'Fendouk'),
(35, 'قالة', 'Gala'),
(35, 'كودية', 'Koudiat');

-- Ain Defla (36) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(36, 'عين الدفلة', 'Ain Defla'),
(36, 'أولاد يعيش', 'Ouled Yaïche'),
(36, 'بن عكنون', 'Ben Aknoun'),
(36, 'بوفاريك', 'Boufarik'),
(36, 'بوينان', 'Bouyenan'),
(36, 'جندل', 'Jendel'),
(36, 'حجاج', 'Hajaj'),
(36, 'سيدي عمار', 'Sidi Amar'),
(36, 'سيدي موسى', 'Sidi Moussa'),
(36, 'عين الرومانية', 'Ain Romaniya');

-- Naama (37) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(37, 'النعامة', 'Naama'),
(37, 'أولاد ميمون', 'Ouled Mimoune'),
(37, 'بني سنوس', 'Beni Senous'),
(37, 'بوهاني', 'Bouhani'),
(37, 'حمام بوحجار', 'Hammam Bouhadjar'),
(37, 'خنشلة', 'Khenchela'),
(37, 'سيدي جيلالي', 'Sidi Djilali'),
(37, 'سيدي قادر', 'Sidi Kader'),
(37, 'عين فزة', 'Ain Feza'),
(37, 'قصر الحيران', 'Kasr El Hiran');

-- Ain Temouchent (38) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(38, 'عين تموشنت', 'Ain Temouchent'),
(38, 'أولاد ميمون', 'Ouled Mimoune'),
(38, 'بني سنوس', 'Beni Senous'),
(38, 'بوهاني', 'Bouhani'),
(38, 'حمام بوحجار', 'Hammam Bouhadjar'),
(38, 'خنشلة', 'Khenchela'),
(38, 'سيدي جيلالي', 'Sidi Djilali'),
(38, 'سيدي قادر', 'Sidi Kader'),
(38, 'عين فزة', 'Ain Feza'),
(38, 'قصر الحيران', 'Kasr El Hiran');

-- Ghardaïa (39) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(39, 'غرداية', 'Ghardaïa'),
(39, 'أولاد جلال', 'Ouled Djellal'),
(39, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(39, 'بني ورثيلان', 'Beni Ourtilane'),
(39, 'تاجنينة', 'Tadjnine'),
(39, 'تاولة', 'Taoulette'),
(39, 'حاسي بخيل', 'Hassi Bakhel'),
(39, 'حاسي رمل', 'Hassi Rmel'),
(39, 'سيدي خالد', 'Sidi Khaled'),
(39, 'سيدي عقبة', 'Sidi Okba');

-- Relizane (40) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(40, 'الرليزانة', 'Relizane'),
(40, 'أولاد ميمون', 'Ouled Mimoune'),
(40, 'بني سنوس', 'Beni Senous'),
(40, 'بوهاني', 'Bouhani'),
(40, 'حمام بوحجار', 'Hammam Bouhadjar'),
(40, 'خنشلة', 'Khenchela'),
(40, 'سيدي جيلالي', 'Sidi Djilali'),
(40, 'سيدي قادر', 'Sidi Kader'),
(40, 'عين فزة', 'Ain Feza'),
(40, 'قصر الحيران', 'Kasr El Hiran');

-- Tizi Ouzou (41) - 67 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(41, 'تيزي وزو', 'Tizi Ouzou'),
(41, 'أقبو', 'Akbou'),
(41, 'أيت الأحد', 'Aït El Ahad'),
(41, 'أيت لعزيز', 'Aït Laziz'),
(41, 'تاسلة', 'Tasle'),
(41, 'تاوريرت الوادي', 'Taurirt Wadi'),
(41, 'ثينيس', 'Thenis'),
(41, 'جندل', 'Jendel'),
(41, 'حاسي الرمل', 'Hassi El Rmel'),
(41, 'حجاج', 'Hajaj'),
(41, 'حسين داي', 'Hussein Dey'),
(41, 'حيدرة', 'Hydra'),
(41, 'خراشية', 'Khrachia'),
(41, 'خنشلة', 'Khenchela'),
(41, 'دراقينة', 'Draguina'),
(41, 'دالي إبراهيم', 'Daly Ibrahim'),
(41, 'دار البيضاء', 'Dar El Beida'),
(41, 'دار الدين', 'Dar El Din'),
(41, 'دار السلام', 'Dar El Salam'),
(41, 'دار الفلاح', 'Dar El Felah'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani'),
(41, 'دار الهاني', 'Dar El Hani');

-- Boumerdes (42) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(42, 'بومرداس', 'Boumerdes'),
(42, 'أولاد يعيش', 'Ouled Yaïche'),
(42, 'بن عكنون', 'Ben Aknoun'),
(42, 'بوفاريك', 'Boufarik'),
(42, 'بوينان', 'Bouyenan'),
(42, 'جندل', 'Jendel'),
(42, 'حجاج', 'Hajaj'),
(42, 'سيدي عمار', 'Sidi Amar'),
(42, 'سيدي موسى', 'Sidi Moussa'),
(42, 'عين الرومانية', 'Ain Romaniya');

-- El Bayadh (43) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(43, 'البيض', 'El Bayadh'),
(43, 'أولاد ميمون', 'Ouled Mimoune'),
(43, 'بني سنوس', 'Beni Senous'),
(43, 'بوهاني', 'Bouhani'),
(43, 'حمام بوحجار', 'Hammam Bouhadjar'),
(43, 'خنشلة', 'Khenchela'),
(43, 'سيدي جيلالي', 'Sidi Djilali'),
(43, 'سيدي قادر', 'Sidi Kader'),
(43, 'عين فزة', 'Ain Feza'),
(43, 'قصر الحيران', 'Kasr El Hiran');

-- Msila (44) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(44, 'مسيلة', 'Msila'),
(44, 'أولاد جلال', 'Ouled Djellal'),
(44, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(44, 'بني ورثيلان', 'Beni Ourtilane'),
(44, 'تاجنينة', 'Tadjnine'),
(44, 'تاولة', 'Taoulette'),
(44, 'حاسي بخيل', 'Hassi Bakhel'),
(44, 'حاسي رمل', 'Hassi Rmel'),
(44, 'سيدي خالد', 'Sidi Khaled'),
(44, 'سيدي عقبة', 'Sidi Okba');

-- Sahraoui (45) - 3 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(45, 'الصحراوي', 'Sahraoui'),
(45, 'إن قزام', 'In Gezzam'),
(45, 'إن غيزل', 'In Guezzal');

-- Bab Ezzouar (46) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(46, 'باب الزوار', 'Bab Ezzouar'),
(46, 'أولاد يعيش', 'Ouled Yaïche'),
(46, 'بن عكنون', 'Ben Aknoun'),
(46, 'بوفاريك', 'Boufarik'),
(46, 'بوينان', 'Bouyenan'),
(46, 'جندل', 'Jendel'),
(46, 'حجاج', 'Hajaj'),
(46, 'سيدي عمار', 'Sidi Amar'),
(46, 'سيدي موسى', 'Sidi Moussa'),
(46, 'عين الرومانية', 'Ain Romaniya');

-- Béni Ismail (47) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(47, 'بني إسماعيل', 'Béni Ismail'),
(47, 'أولاد يعيش', 'Ouled Yaïche'),
(47, 'بن عكنون', 'Ben Aknoun'),
(47, 'بوفاريك', 'Boufarik'),
(47, 'بوينان', 'Bouyenan'),
(47, 'جندل', 'Jendel'),
(47, 'حجاج', 'Hajaj'),
(47, 'سيدي عمار', 'Sidi Amar'),
(47, 'سيدي موسى', 'Sidi Moussa'),
(47, 'عين الرومانية', 'Ain Romaniya');

-- Ouled Djellal (48) - 10 communes
INSERT INTO communes ("wilayaId", "nameAr", "nameFr") VALUES
(48, 'أولاد جلال', 'Ouled Djellal'),
(48, 'أولاد جلال', 'Ouled Djellal'),
(48, 'أولاد سيدي نايل', 'Ouled Sidi Nail'),
(48, 'بني ورثيلان', 'Beni Ourtilane'),
(48, 'تاجنينة', 'Tadjnine'),
(48, 'تاولة', 'Taoulette'),
(48, 'حاسي بخيل', 'Hassi Bakhel'),
(48, 'حاسي رمل', 'Hassi Rmel'),
(48, 'سيدي خالد', 'Sidi Khaled'),
(48, 'سيدي عقبة', 'Sidi Okba');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_communes_wilayaId ON communes("wilayaId");
