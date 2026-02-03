/**
 * Medical specializations data
 */

export interface Specialization {
  id: string;
  nameAr: string;
  nameFr: string;
  description?: string;
  icon?: string;
}

export const MEDICAL_SPECIALIZATIONS: Specialization[] = [
  { id: "cardiology", nameAr: "أمراض القلب", nameFr: "Cardiologie", icon: "Heart" },
  { id: "neurology", nameAr: "أمراض الأعصاب", nameFr: "Neurologie", icon: "Brain" },
  { id: "pediatrics", nameAr: "طب الأطفال", nameFr: "Pédiatrie", icon: "Baby" },
  { id: "orthopedics", nameAr: "جراحة العظام", nameFr: "Orthopédie", icon: "Bone" },
  { id: "dermatology", nameAr: "أمراض الجلد", nameFr: "Dermatologie", icon: "Skin" },
  { id: "psychiatry", nameAr: "الطب النفسي", nameFr: "Psychiatrie", icon: "Mind" },
  { id: "oncology", nameAr: "الأورام", nameFr: "Oncologie", icon: "AlertCircle" },
  { id: "gastroenterology", nameAr: "أمراض الجهاز الهضمي", nameFr: "Gastro-entérologie", icon: "Stomach" },
  { id: "pulmonology", nameAr: "أمراض الجهاز التنفسي", nameFr: "Pneumologie", icon: "Lungs" },
  { id: "nephrology", nameAr: "أمراض الكلى", nameFr: "Néphrologie", icon: "Droplet" },
  { id: "endocrinology", nameAr: "الغدد الصماء والسكري", nameFr: "Endocrinologie", icon: "Zap" },
  { id: "rheumatology", nameAr: "أمراض الروماتيزم", nameFr: "Rhumatologie", icon: "Activity" },
  { id: "ophthalmology", nameAr: "طب العيون", nameFr: "Ophtalmologie", icon: "Eye" },
  { id: "otolaryngology", nameAr: "أنف وأذن وحنجرة", nameFr: "ORL", icon: "Ear" },
  { id: "urology", nameAr: "المسالك البولية", nameFr: "Urologie", icon: "Droplets" },
  { id: "gynecology", nameAr: "أمراض النساء والتوليد", nameFr: "Gynécologie", icon: "Heart" },
  { id: "dentistry", nameAr: "طب الأسنان", nameFr: "Dentisterie", icon: "Smile" },
  { id: "general_surgery", nameAr: "الجراحة العامة", nameFr: "Chirurgie générale", icon: "Scalpel" },
  { id: "vascular_surgery", nameAr: "جراحة الأوعية الدموية", nameFr: "Chirurgie vasculaire", icon: "Zap" },
  { id: "thoracic_surgery", nameAr: "جراحة الصدر", nameFr: "Chirurgie thoracique", icon: "Wind" },
  { id: "neurosurgery", nameAr: "جراحة الأعصاب", nameFr: "Neurochirurgie", icon: "Brain" },
  { id: "plastic_surgery", nameAr: "الجراحة التجميلية", nameFr: "Chirurgie plastique", icon: "Sparkles" },
  { id: "anesthesiology", nameAr: "التخدير", nameFr: "Anesthésiologie", icon: "Droplet" },
  { id: "radiology", nameAr: "الأشعات", nameFr: "Radiologie", icon: "Radio" },
  { id: "pathology", nameAr: "علم الأمراض", nameFr: "Pathologie", icon: "Microscope" },
  { id: "immunology", nameAr: "المناعة", nameFr: "Immunologie", icon: "Shield" },
  { id: "infectious_diseases", nameAr: "الأمراض المعدية", nameFr: "Maladies infectieuses", icon: "Virus" },
  { id: "hematology", nameAr: "أمراض الدم", nameFr: "Hématologie", icon: "Droplets" },
  { id: "allergy", nameAr: "الحساسية والمناعة", nameFr: "Allergologie", icon: "AlertTriangle" },
  { id: "physical_medicine", nameAr: "الطب الفيزيائي", nameFr: "Médecine physique", icon: "Activity" },
  { id: "sports_medicine", nameAr: "طب الرياضة", nameFr: "Médecine du sport", icon: "Zap" },
  { id: "occupational_medicine", nameAr: "طب العمل", nameFr: "Médecine du travail", icon: "Briefcase" },
  { id: "emergency_medicine", nameAr: "الطب الطارئ", nameFr: "Médecine d'urgence", icon: "AlertCircle" },
  { id: "family_medicine", nameAr: "الطب العام", nameFr: "Médecine générale", icon: "Users" },
];

export function getSpecializationById(id: string): Specialization | undefined {
  return MEDICAL_SPECIALIZATIONS.find(s => s.id === id);
}

export function getSpecializationsByIds(ids: string[]): Specialization[] {
  return MEDICAL_SPECIALIZATIONS.filter(s => ids.includes(s.id));
}
