import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { trpc } from "@/utils/trpc";
import { useDataManager } from "@/utils/dataManager";
import { Heart, Calendar, Pill, TestTube, Activity, LogOut } from "lucide-react";

export default function PatientDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, navigate] = useNavigate();
  const manager = useDataManager();
  const data = manager;

  // Fetch patient data on mount
  const patientQuery = trpc.patient.getProfile.useQuery();
  const appointmentsQuery = trpc.patient.getAppointments.useQuery();
  const bloodPressureQuery = trpc.patient.getBloodPressure.useQuery();
  const bloodSugarQuery = trpc.patient.getBloodSugar.useQuery();
  const prescriptionsQuery = trpc.patient.getPrescriptions.useQuery();
  const labResultsQuery = trpc.patient.getLabResults.useQuery();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/patient/login");
    }
    if (user && user.userType !== "patient") {
      navigate("/");
    }
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Quick stats
  const stats = [
    {
      label: "المواعيد القادمة",
      value: appointmentsQuery.data?.length || 0,
      icon: Calendar,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "الوصفات الطبية",
      value: prescriptionsQuery.data?.length || 0,
      icon: Pill,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "نتائج المختبر",
      value: labResultsQuery.data?.length || 0,
      icon: TestTube,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "السجل الصحي",
      value: (bloodPressureQuery.data?.length || 0) + (bloodSugarQuery.data?.length || 0),
      icon: Activity,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <DashboardLayout title="لوحة تحكم المريض">
      <div className="space-y-6">
        {/* Header with user info */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">مرحباً، {user?.name || "المريض"}</h1>
            <p className="text-gray-600">البريد الإلكتروني: {user?.email || user?.phone}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/patient/search")}
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">ابحث عن طبيب</h3>
                <p className="text-sm text-gray-600">ابحث عن أفضل الأطباء في منطقتك</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/patient/appointments")}
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">المواعيد</h3>
                <p className="text-sm text-gray-600">اعرض وأدير مواعيدك</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/patient/prescriptions")}
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 text-purple-700 p-3 rounded-lg">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">الوصفات الطبية</h3>
                <p className="text-sm text-gray-600">اعرض الأدوية الموصوفة</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/patient/lab-results")}
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                <TestTube className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">نتائج المختبر</h3>
                <p className="text-sm text-gray-600">اعرض نتائج الفحوصات</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/patient/health/blood-pressure")}
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              ضغط الدم
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {bloodPressureQuery.data?.length || 0} قياسات مسجلة
            </p>
            <Button variant="outline" className="w-full">
              اعرض التفاصيل
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/patient/health/blood-sugar")}
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              السكر في الدم
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {bloodSugarQuery.data?.length || 0} قياسات مسجلة
            </p>
            <Button variant="outline" className="w-full">
              اعرض التفاصيل
            </Button>
          </Card>
        </div>

        {/* Data loading status */}
        <div className="text-sm text-gray-500 text-center">
          {patientQuery.isLoading ? "جاري تحميل البيانات..." : "البيانات محدثة"}
        </div>
      </div>
    </DashboardLayout>
  );
}
