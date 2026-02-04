import { useNavigate } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, navigate] = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">الصفحة غير موجودة</p>
        <p className="text-gray-600 mb-8">عذراً، الصفحة التي تبحث عنها غير متوفرة.</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
}
