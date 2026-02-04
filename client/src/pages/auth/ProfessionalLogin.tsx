import { useState } from "react";
import { useNavigate } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProfessionalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement professional login via email/password
      // For now, simulating successful login
      toast.success("تم تسجيل الدخول بنجاح");
      login("doctor");
      navigate("/doctor/dashboard");
      console.log("[v0] Professional login successful");
    } catch (error: any) {
      console.error("[v0] Professional login error:", error);
      toast.error(error.message || "فشل تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">دخول المتخصص</h1>
          <p className="text-gray-600">تسجيل الدخول لحسابك المهني</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">كلمة المرور</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
                جاري التسجيل...
              </>
            ) : (
              "دخول"
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <a href="/auth/professional/register" className="text-green-600 hover:underline">
              سجل هنا
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}
