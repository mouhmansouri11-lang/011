import { useState } from "react";
import { useNavigate } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProfessionalRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    fullName: "",
    professionalType: "doctor" as "doctor" | "clinic" | "lab",
    licenseNumber: "",
    specialization: "",
    wilaya: "",
    commune: "",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useNavigate();
  const { login } = useAuth();

  const registerMutation = trpc.auth.registerProfessional.useMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    setIsLoading(true);

    try {
      await registerMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        professionalType: formData.professionalType,
        licenseNumber: formData.licenseNumber,
        specialization: formData.specialization || undefined,
        wilaya: formData.wilaya,
        commune: formData.commune,
        address: formData.address,
        phone: formData.phone,
      });
      login("doctor");
      toast.success("تم إنشاء الحساب بنجاح!");
      console.log("[v0] Professional registration complete");
      navigate("/doctor/dashboard");
    } catch (error: any) {
      console.error("[v0] Registration error:", error);
      toast.error(error.message || "فشل التسجيل");
    } finally {
      setIsLoading(false);
    }
  };

  const wilayas = [
    "الجزائر", "قسنطينة", "الإسكندرية", "وهران", "تيارت", "سطيف", "أم البواقي",
  ];

  const specializations = [
    "أخصائي القلب",
    "أخصائي الأعصاب",
    "أخصائي الجهاز الهضمي",
    "أخصائي الجراحة",
    "أخصائي العيون",
    "طبيب أسنان",
    "أخصائي الجلدية",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل متخصص</h1>
          <p className="text-gray-600">إنشاء حسابك المهني</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
              <Input
                placeholder="د. أحمد"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع المهنة</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.professionalType}
                onChange={(e) => setFormData({...formData, professionalType: e.target.value as any})}
              >
                <option value="doctor">طبيب</option>
                <option value="clinic">عيادة</option>
                <option value="lab">مختبر</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">رقم الترخيص</label>
              <Input
                placeholder="رقم الترخيص"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.passwordConfirm}
                onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">التخصص</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              >
                <option value="">اختر التخصص</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <Input
                type="tel"
                placeholder="+213 XXX XX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الولاية</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.wilaya}
                onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                required
              >
                <option value="">اختر الولاية</option>
                {wilayas.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">البلدية</label>
              <Input
                placeholder="البلدية"
                value={formData.commune}
                onChange={(e) => setFormData({...formData, commune: e.target.value})}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">العنوان</label>
              <Input
                placeholder="العنوان الكامل"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري التسجيل...
              </>
            ) : (
              "إنشاء الحساب"
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            لديك حساب؟{" "}
            <a href="/auth/professional/login" className="text-green-600 hover:underline">
              دخول
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}
