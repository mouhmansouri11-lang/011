import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";

export default function Appointments() {
  const appointmentsQuery = trpc.patient.getAppointments.useQuery();

  return (
    <DashboardLayout title="المواعيد">
      <div className="space-y-6">
        {appointmentsQuery.isLoading ? (
          <Card className="p-8 text-center">جاري التحميل...</Card>
        ) : appointmentsQuery.data?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">لا توجد مواعيد محجوزة حالياً</p>
          </Card>
        ) : (
          appointmentsQuery.data?.map((apt: any) => (
            <Card key={apt.id} className="p-6">
              <h3 className="font-bold mb-2">الموعد: {new Date(apt.appointmentDate).toLocaleString('ar-SA')}</h3>
              <p className="text-gray-600">الحالة: {apt.status}</p>
              <p className="text-gray-600">السبب: {apt.reason || "غير محدد"}</p>
              {apt.notes && <p className="text-gray-600 mt-2">ملاحظات: {apt.notes}</p>}
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
