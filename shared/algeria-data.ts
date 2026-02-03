/**
 * Algerian administrative divisions data
 * Wilayas (provinces) and their communes
 */

export interface Wilaya {
  code: string;
  nameAr: string;
  nameFr: string;
}

export interface Commune {
  name: string;
  nameAr: string;
}

export const WILAYAS: Wilaya[] = [
  { code: "01", nameAr: "أدرار", nameFr: "Adrar" },
  { code: "02", nameAr: "الشلف", nameFr: "Chlef" },
  { code: "03", nameAr: "الأغواط", nameFr: "Laghouat" },
  { code: "04", nameAr: "أم البواقي", nameFr: "Oum El Bouaghi" },
  { code: "05", nameAr: "باتنة", nameFr: "Batna" },
  { code: "06", nameAr: "بجاية", nameFr: "Bejaia" },
  { code: "07", nameAr: "بسكرة", nameFr: "Biskra" },
  { code: "08", nameAr: "بشار", nameFr: "Bechar" },
  { code: "09", nameAr: "بليدة", nameFr: "Blida" },
  { code: "10", nameAr: "البويرة", nameFr: "Bouira" },
  { code: "11", nameAr: "تمنراست", nameFr: "Tamanrasset" },
  { code: "12", nameAr: "تبسة", nameFr: "Tebessa" },
  { code: "13", nameAr: "تلمسان", nameFr: "Tlemcen" },
  { code: "14", nameAr: "تيارت", nameFr: "Tiaret" },
  { code: "15", nameAr: "تيزي وزو", nameFr: "Tizi Ouzou" },
  { code: "16", nameAr: "الجزائر", nameFr: "Alger" },
  { code: "17", nameAr: "جيجل", nameFr: "Jijel" },
  { code: "18", nameAr: "سطيف", nameFr: "Setif" },
  { code: "19", nameAr: "سعيدة", nameFr: "Saida" },
  { code: "20", nameAr: "سكيكدة", nameFr: "Skikda" },
  { code: "21", nameAr: "سيدي بلعباس", nameFr: "Sidi Bel Abbes" },
  { code: "22", nameAr: "قسنطينة", nameFr: "Constantine" },
  { code: "23", nameAr: "المدية", nameFr: "Medea" },
  { code: "24", nameAr: "مستغانم", nameFr: "Mostaganem" },
  { code: "25", nameAr: "معسكر", nameFr: "Mascara" },
  { code: "26", nameAr: "ورقلة", nameFr: "Ouargla" },
  { code: "27", nameAr: "وهران", nameFr: "Oran" },
  { code: "28", nameAr: "البيض", nameFr: "El Bayadh" },
  { code: "29", nameAr: "إليزي", nameFr: "Illizi" },
  { code: "30", nameAr: "برج بوعريريج", nameFr: "Bordj Bou Arreridj" },
  { code: "31", nameAr: "بومرداس", nameFr: "Boumerdes" },
  { code: "32", nameAr: "الطارف", nameFr: "El Tarf" },
  { code: "33", nameAr: "تندوف", nameFr: "Tindouf" },
  { code: "34", nameAr: "تسمسيلت", nameFr: "Tissemsilt" },
  { code: "35", nameAr: "الوادي", nameFr: "El Oued" },
  { code: "36", nameAr: "خنشلة", nameFr: "Khenchela" },
  { code: "37", nameAr: "سوق أهراس", nameFr: "Souk Ahras" },
  { code: "38", nameAr: "تيبازة", nameFr: "Tipaza" },
  { code: "39", nameAr: "ميلة", nameFr: "Mila" },
  { code: "40", nameAr: "عين الدفلة", nameFr: "Ain Defla" },
  { code: "41", nameAr: "النعامة", nameFr: "Naama" },
  { code: "42", nameAr: "عين تيموشنت", nameFr: "Ain Temouchent" },
  { code: "43", nameAr: "غرداية", nameFr: "Ghardaia" },
  { code: "44", nameAr: "غليزان", nameFr: "Relizane" },
  { code: "45", nameAr: "جنوب وهران", nameFr: "Djanet" },
  { code: "46", nameAr: "الميلية", nameFr: "Beni Abbes" },
  { code: "47", nameAr: "عين صالح", nameFr: "In Salah" },
  { code: "48", nameAr: "عين قزام", nameFr: "In Guezzam" },
];

export const COMMUNES_BY_WILAYA: Record<string, Commune[]> = {
  "16": [ // Alger
    { name: "Alger Centre", nameAr: "الجزائر الوسطى" },
    { name: "Bab El Oued", nameAr: "باب الواد" },
    { name: "Casbah", nameAr: "القصبة" },
    { name: "Sidi M'Hamed", nameAr: "سيدي محمد" },
    { name: "Algiers", nameAr: "الجزائر" },
    { name: "Bouzareah", nameAr: "بوزريعة" },
    { name: "El Biar", nameAr: "البيار" },
    { name: "Kouba", nameAr: "القبة" },
    { name: "Hydra", nameAr: "الهيدرا" },
    { name: "Bir Mourad Rais", nameAr: "بئر مراد رايس" },
    { name: "Ben Aknoun", nameAr: "بن عكنون" },
    { name: "Cheikh Bachir", nameAr: "الشيخ باشير" },
    { name: "Dely Ibrahim", nameAr: "دالي إبراهيم" },
    { name: "Ouled Fayet", nameAr: "أولاد فايت" },
    { name: "Bir El Djir", nameAr: "بئر الدجر" },
    { name: "Draria", nameAr: "الدرارية" },
    { name: "Doura", nameAr: "الدورة" },
    { name: "Saoula", nameAr: "سعولة" },
    { name: "Baraki", nameAr: "براقي" },
    { name: "Oued Smar", nameAr: "وادي سمار" },
  ],
  "09": [ // Blida
    { name: "Blida", nameAr: "البليدة" },
    { name: "Boufarik", nameAr: "بوفاريك" },
    { name: "Bougara", nameAr: "بوقره" },
    { name: "Soumaa", nameAr: "سومعة" },
    { name: "Larbaa", nameAr: "العربة" },
    { name: "Ouled Yaich", nameAr: "أولاد ياش" },
    { name: "Ouled Sidi Mihoub", nameAr: "أولاد سيدي محيوب" },
    { name: "Chiffa", nameAr: "الشفة" },
    { name: "Mouzaia", nameAr: "موزاية" },
    { name: "Bir Touta", nameAr: "بئر توتة" },
  ],
  "27": [ // Oran
    { name: "Oran", nameAr: "وهران" },
    { name: "Bir El Djir", nameAr: "بئر الدجر" },
    { name: "Sidi Cha", nameAr: "سيدي شة" },
    { name: "Gdyel", nameAr: "جديل" },
    { name: "Hassi Bounif", nameAr: "حاسي بونيف" },
    { name: "Mers El Kebir", nameAr: "مرس الكبير" },
    { name: "Aïn Turck", nameAr: "عين تركية" },
    { name: "Kristel", nameAr: "كريستل" },
    { name: "Sidi Ould Cheikh", nameAr: "سيدي ولد الشيخ" },
    { name: "Tafraoui", nameAr: "تفراوي" },
  ],
  "22": [ // Constantine
    { name: "Constantine", nameAr: "قسنطينة" },
    { name: "Ain Abid", nameAr: "عين عابد" },
    { name: "Ain Smara", nameAr: "عين سمارة" },
    { name: "Beni Hamidane", nameAr: "بني حميدان" },
    { name: "Didouche Mourad", nameAr: "ديدوش مراد" },
    { name: "El Khroub", nameAr: "الخروب" },
    { name: "Hamma Bouziane", nameAr: "حمة بوزيان" },
    { name: "Ibn Ziad", nameAr: "ابن زياد" },
    { name: "Mesroub", nameAr: "مسروب" },
    { name: "Ouled Hamla", nameAr: "أولاد حملة" },
  ],
};

export function getCommunesByWilaya(wilayaCode: string): Commune[] {
  return COMMUNES_BY_WILAYA[wilayaCode] || [];
}

export function getWilayaByCode(code: string): Wilaya | undefined {
  return WILAYAS.find(w => w.code === code);
}
