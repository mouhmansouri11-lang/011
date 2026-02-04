import { useState } from "react";
import { useNavigate } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function PatientLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useNavigate();
  const { login } = useAuth();

  const sendOTPMutation = trpc.auth.sendOTP.useMutation();
  const verifyOTPMutation = trpc.auth.verifyOTP.useMutation();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendOTPMutation.mutateAsync({ phone });
      setStep("otp");
      toast.success("تم إرسال كود التحقق إلى رقمك");
      console.log("[v0] OTP sent to phone:", phone);
    } catch (error: any) {
      console.error("[v0] Error sending OTP:", error);
      toast.error(error.message || "فشل إرسال كود التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifyOTPMutation.mutateAsync({ phone, otp });
      login("patient");
      toast.success("تم تسجيل الدخول بنجاح");
      console.log("[v0] Patient login successful");
      navigate("/patient/dashboard");
    } catch (error: any) {
      console.error("[v0] Error verifying OTP:", error);
      toast.error(error.message || "كود التحقق غير صحيح");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">دخول المريض</h1>
          <p className="text-gray-600">تسجيل الدخول عبر رقم الهاتف</p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <Input
                type="tel"
                placeholder="+213 XXX XX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                dir="ltr"
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
                  جاري الإرسال...
                </>
              ) : (
                "إرسال كود التحقق"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              ليس لديك حساب؟{" "}
              <a href="/auth/patient/register" className="text-blue-600 hover:underline">
                سجل هنا
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">كود التحقق</label>
              <p className="text-sm text-gray-600 mb-3">
                تم إرسال كود التحقق إلى {phone}
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
                "تحقق الآن"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep("phone");
                setOtp("");
              }}
            >
              تغيير الرقم
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
