import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const [location, navigate] = useNavigate();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated && user) {
      if (user.userType === "patient") {
        navigate("/patient/dashboard");
      } else if (["doctor", "clinic", "lab"].includes(user.userType)) {
        navigate("/doctor/dashboard");
      }
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            طبيبي - شبكة الحجز الطبي الموثوقة
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            احجز موعدك مع أفضل الأطباء والعيادات في الجزائر
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">أنت مريض؟</h2>
            <p className="text-gray-600 mb-6">
              ابحث عن أفضل الأطباء والعيادات، احجز موعدك، وادير سجلاتك الطبية
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate("/auth/patient/login")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                دخول
              </Button>
              <Button 
                onClick={() => navigate("/auth/patient/register")}
                variant="outline"
              >
                تسجيل جديد
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">أنت متخصص طبي؟</h2>
            <p className="text-gray-600 mb-6">
              ادير مواعيدك، تواصل مع المرضى، وقدم الخدمات الطبية بكفاءة
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate("/auth/professional/login")}
                className="bg-green-600 hover:bg-green-700"
              >
                دخول
              </Button>
              <Button 
                onClick={() => navigate("/auth/professional/register")}
                variant="outline"
              >
                تسجيل جديد
              </Button>
            </div>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">المميزات</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold mb-2">شبكة واسعة</h3>
              <p className="text-gray-600">آلاف الأطباء والعيادات والمختبرات</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-bold mb-2">حجز سهل</h3>
              <p className="text-gray-600">احجز موعدك في ثوانٍ معدودة</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold mb-2">آمن وموثوق</h3>
              <p className="text-gray-600">حماية بيانات المريض الشخصية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
