import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";

export default function Prescriptions() {
  const prescriptionsQuery = trpc.patient.getPrescriptions.useQuery();

  return (
    <DashboardLayout title="الوصفات الطبية">
      <div className="space-y-6">
        {prescriptionsQuery.isLoading ? (
          <Card className="p-8 text-center">جاري التحميل...</Card>
        ) : prescriptionsQuery.data?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">لا توجد وصفات طبية</p>
          </Card>
        ) : (
          prescriptionsQuery.data?.map((pres: any) => (
            <Card key={pres.id} className="p-6">
              <h3 className="font-bold mb-2">وصفة من: {new Date(pres.issuedDate).toLocaleDateString('ar-SA')}</h3>
              <p className="text-gray-600">الحالة: {pres.status}</p>
              {pres.medications && (
                <div className="mt-3">
                  <p className="font-medium mb-2">الأدوية:</p>
                  {Array.isArray(pres.medications) && pres.medications.map((med: any, i: number) => (
                    <p key={i} className="text-sm text-gray-600">
                      {med.name} - {med.dosage} ({med.frequency})
                    </p>
                  ))}
                </div>
              )}
              {pres.notes && <p className="text-gray-600 mt-2">ملاحظات: {pres.notes}</p>}
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
