import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { trpc } from "@/utils/trpc";
import { LogOut, Calendar, Users, Clock } from "lucide-react";

export default function DoctorDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, navigate] = useNavigate();

  // Fetch doctor data
  const profileQuery = trpc.doctor.getProfile.useQuery();
  const appointmentsQuery = trpc.doctor.getAppointments.useQuery();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/professional/login");
    }
    if (user && !["doctor", "clinic", "lab"].includes(user.userType)) {
      navigate("/");
    }
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const upcomingAppointments = appointmentsQuery.data?.filter(
    (apt: any) => apt.status === "confirmed" || apt.status === "pending"
  ) || [];

  const completedAppointments = appointmentsQuery.data?.filter(
    (apt: any) => apt.status === "completed"
  ) || [];

  const stats = [
    {
      label: "المواعيد القادمة",
      value: upcomingAppointments.length,
      icon: Calendar,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "المواعيد المكتملة",
      value: completedAppointments.length,
      icon: Clock,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "عدد المرضى",
      value: new Set(appointmentsQuery.data?.map((a: any) => a.patientId)).size || 0,
      icon: Users,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <DashboardLayout title="لوحة تحكم الطبيب">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              مرحباً، د. {user?.name || "الطبيب"}
            </h1>
            <p className="text-gray-600">البريد الإلكتروني: {user?.email}</p>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Profile Info */}
        {profileQuery.data && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">معلومات المهنة</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">نوع المهنة</p>
                <p className="font-medium">{profileQuery.data.professionalType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">التخصص</p>
                <p className="font-medium">{profileQuery.data.specialization || "غير محدد"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">سنوات الخبرة</p>
                <p className="font-medium">{profileQuery.data.yearsOfExperience || 0} سنة</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">رقم الترخيص</p>
                <p className="font-medium">{profileQuery.data.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">الموقع</p>
                <p className="font-medium">{profileQuery.data.wilaya}, {profileQuery.data.commune}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">التقييم</p>
                <p className="font-medium">
                  {profileQuery.data.rating ? `${profileQuery.data.rating} ⭐` : "لا يوجد تقييمات"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Upcoming Appointments */}
        <div>
          <h2 className="text-xl font-bold mb-4">المواعيد القادمة</h2>
          {appointmentsQuery.isLoading ? (
            <Card className="p-8 text-center">جاري التحميل...</Card>
          ) : upcomingAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">لا توجد مواعيد قادمة</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((apt: any) => (
                <Card key={apt.id} className="p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold mb-1">المريض رقم: {apt.patientId}</h3>
                      <p className="text-sm text-gray-600">
                        📅 {new Date(apt.appointmentDate).toLocaleString('ar-SA')}
                      </p>
                      {apt.reason && <p className="text-sm text-gray-600">السبب: {apt.reason}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        تأكيد
                      </Button>
                      <Button size="sm" variant="outline">
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
