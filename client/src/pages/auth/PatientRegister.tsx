import { useState } from "react";
import { useNavigate } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function PatientRegister() {
  const [step, setStep] = useState<"register" | "otp">("register");
  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    wilaya: "",
    commune: "",
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useNavigate();
  const { login } = useAuth();

  const registerMutation = trpc.auth.registerPatient.useMutation();
  const sendOTPMutation = trpc.auth.sendOTP.useMutation();
  const verifyOTPMutation = trpc.auth.verifyOTP.useMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerMutation.mutateAsync(formData);
      await sendOTPMutation.mutateAsync({ phone: formData.phone });
      setStep("otp");
      toast.success("تم إرسال كود التحقق");
      console.log("[v0] Registration step 1 complete");
    } catch (error: any) {
      console.error("[v0] Registration error:", error);
      toast.error(error.message || "فشل التسجيل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifyOTPMutation.mutateAsync({ phone: formData.phone, otp });
      login("patient");
      toast.success("تم إنشاء الحساب بنجاح!");
      console.log("[v0] Patient registration complete");
      navigate("/patient/dashboard");
    } catch (error: any) {
      console.error("[v0] OTP verification error:", error);
      toast.error(error.message || "كود التحقق غير صحيح");
    } finally {
      setIsLoading(false);
    }
  };

  const wilayas = [
    "الجزائر", "قسنطينة", "الإسكندرية", "وهران", "تيارت", "سطيف", "أم البواقي",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل مريض جديد</h1>
          <p className="text-gray-600">إنشاء حسابك الصحي</p>
        </div>

        {step === "register" ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
              <Input
                placeholder="اسمك"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
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
                placeholder="بلديتك"
                value={formData.commune}
                onChange={(e) => setFormData({...formData, commune: e.target.value})}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري...
                </>
              ) : (
                "التالي"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              لديك حساب؟{" "}
              <a href="/auth/patient/login" className="text-blue-600 hover:underline">
                دخول
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">كود التحقق</label>
              <p className="text-sm text-gray-600 mb-3">
                تم إرسال كود إلى {formData.phone}
              </p>
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                maxLength={6}
                required
                className="text-center text-2xl tracking-widest"
                dir="ltr"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  التحقق...
                </>
              ) : (
                "أكمل التسجيل"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep("register");
                setOtp("");
              }}
            >
              تعديل البيانات
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
